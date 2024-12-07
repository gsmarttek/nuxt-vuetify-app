import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { z } from 'zod';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    let user = null;

    if (body.firstname && body.lastname) {
        try {
            const email = await prisma.user.findUnique({
                where: {
                    email: body.email, // Assuming email is a unique field
                },
            });

            const username = await prisma.user.findUnique({
                where: {
                    username: body.username, // Assuming username is a unique field
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
                user = await prisma.user.create({
                    data: {
                        firstname: body.firstname,
                        lastname: body.lastname,
                        email: body.email,
                        phone: body.phone,
                        sex: body.sex,
                        username: body.username,
                        password: body.password,
                    },
                })

                return { success: true, data: user };
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
    }
});