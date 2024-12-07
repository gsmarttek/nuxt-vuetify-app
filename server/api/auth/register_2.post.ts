import { z } from 'zod';
import { createError } from 'h3';

// Define the schema using Zod
const registerSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

// Define the API handler
export default defineEventHandler(async (event) => {
    try {
        // Parse and validate the incoming data
        const body = await readBody(event); // Read the request body
        const data = registerSchema.parse(body);

        // Process valid data (e.g., save to the database)
        return {
            success: true,
            message: 'User registered successfully',
            data,
        };
    } catch (error) {
        // Handle validation errors
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
