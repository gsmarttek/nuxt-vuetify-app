import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    let user = null;

    if (body.firstname && body.lastname) {
        await prisma.user.create({
            data: {
                firstname: body.firstname,
                lastname: body.lastname,
                email: body.email,
                phone: body.phone,
                sex: body.sex,
                username: body.username,
                password: body.password,
            },
        }).then((response) => {
            user = response

            return { success: true, data: user };
        }).catch(error => {
            return {
                success: false,
                error: 'Server Failure: Something went wrong!',
            };
        })
    }
});