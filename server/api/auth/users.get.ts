import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async () => {
    try {
        const users = await prisma.user.findMany();
        return { success: true, data: users };
    } catch (error) {
        // Log the error for debugging
        console.error('Prisma Error:', error);

        // Return an error response
        return {
            success: false,
            error: 'Server Failure: Something went wrong!',
        };
    }
});