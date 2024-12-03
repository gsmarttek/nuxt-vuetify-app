import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const id = body.id;

    let user = null;
    let error = null;

    if (!id) return createError({ statusCode: 400, statusMessage: 'Missing ID' })

    if (id)
        await prisma.user.update({
            where: {
                id
            },
            data: {
                firstname: body.firstname,
                lastname: body.lastname,
                email: body.email,
                phone: body.phone,
                sex: body.sex,
            },
        }).then(async (response) => {
            user = response;
        }).catch(async (e) => {
            error = e;
        })

    if (error) return createError({ statusCode: 500, statusMessage: 'Server error' })

    return user;
});