import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from "next-auth/providers/credentials"
import { createError } from 'h3';
import bcrypt from 'bcryptjs';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default NuxtAuthHandler({
    secret: useRuntimeConfig().authSecret,

    pages: {
        signIn: "/login"
    },

    providers: [
        // @ts-expect-error
        CredentialsProvider.default({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials: {
                username: string,
                password: string
            }) {
                // TODO: Fetch user from database
                const user = await prisma.user.findUnique({
                    where: {
                        username: credentials.username // Assuming username is a unique field
                    },
                });

                if (!user) {
                    throw createError({
                        statusCode: 401,
                        message: 'Unauthorized',
                    });
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) {
                    throw createError({
                        statusCode: 401,
                        message: 'Unauthorized',
                    });
                }

                return {
                    ...user,
                    password: undefined
                }
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token = {
                    ...token,
                    ...user
                }
            }

            return token;
        },

        async session({ session, token }) {
            session.user = {
                ...token,
                ...session.user
            }

            return session;
        }
    }
});