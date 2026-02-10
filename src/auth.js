import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcrypt";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y contraseña son requeridos");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Correo no registrado");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) {
          throw new Error("Contraseña incorrecta");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          phone: user.phone,
          address: user.address,
          city: user.city,
          state: user.state,
          zip: user.zip,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.phone = user.phone;
        token.address = user.address;
        token.city = user.city;
        token.state = user.state;
        token.zip = user.zip;
      }

      // Cuando se llama update() refrescamos desde la BD
      if (trigger === "update") {
        const freshUser = await prisma.user.findUnique({
          where: { id: token.id },
        });
        if (freshUser) {
          token.name = freshUser.name;
          token.email = freshUser.email;
          token.role = freshUser.role;
          token.phone = freshUser.phone;
          token.address = freshUser.address;
          token.city = freshUser.city;
          token.state = freshUser.state;
          token.zip = freshUser.zip;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.phone = token.phone;
        session.user.address = token.address;
        session.user.city = token.city;
        session.user.state = token.state;
        session.user.zip = token.zip;
      }
      return session;
    },
  },
  pages: {
    signIn: "/", // No tenemos una página de login dedicada, usamos el modal
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
