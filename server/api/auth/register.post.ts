import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { z } from 'zod';
import { createError } from 'h3';
import bcrypt from 'bcryptjs';

// Define the schema using Zod
const registerSchema = z.object({
    firstname: z.string().min(3, 'Firstname must be at least 3 characters long'),
    lastname: z.string().min(3, 'Lastname must be at least 3 characters long'),
    phone: z.string().regex(/^[0-9-]{11,}$/, "Phone number needs to be 11 digits long"),
    sex: z.enum(['male', 'female']),
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Pasword must be at least 8 characters with uppercase and lowercase, digits and special characters"),
});

export default defineEventHandler(async (event) => {
    try {
        let user = null;

        const body = await readBody(event);
        const data = registerSchema.parse(body);

        const email = await prisma.user.findUnique({
            where: {
                email: data.email, // Assuming email is a unique field
            },
        });

        const username = await prisma.user.findUnique({
            where: {
                username: data.username, // Assuming username is a unique field
            },
        });

        if (email) {
            return {
                success: false,
                error: 'Email already exist!',
            };
        } else if (username) {
            return {
                success: false,
                error: 'Username already exist!',
            };
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data.password, salt)

            user = await prisma.user.create({
                data: {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    phone: data.phone,
                    sex: data.sex,
                    username: data.username,
                    password: hashedPassword,
                },
            })

            return { success: true, data: { ...user, password: undefined } };
        }
    } catch (error) {
        /// Handle validation errors
        if (error instanceof z.ZodError) {
            throw createError({
                statusCode: 400,
                message: error.errors.map((err) => err.message).join(', '),
            });
        }

        // Handle other errors
        throw createError({
            statusCode: 500,
            message: 'Internal server error',
        });
    }
});