import { NextResponse } from "next/server";
import { prisma } from "../../../../libs/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const userFound = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userFound) {
      return NextResponse.json(
        {
          message: "Correo no registrado",
        },
        { status: 400 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, userFound.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Contraseña incorrecta",
        },
        { status: 400 },
      );
    }

    const { password: _, ...userWithoutPassword } = userFound;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 },
    );
  }
}