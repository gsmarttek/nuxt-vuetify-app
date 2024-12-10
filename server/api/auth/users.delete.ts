import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    let user = null;
    let error = null;

    if (body.id)
        await prisma.user.delete({
            where: {
                id: body.id,
            },
        }).then(async (response) => {
            user = response;
        }).catch(async (e) => {
            error = e;
        })

    if (error) return createError({ statusCode: 500, statusMessage: 'Server error' })

    return user;
});