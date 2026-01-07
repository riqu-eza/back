import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// GET /api/users  -> list users
export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, phone: true, createdAt: true }
  });

  return NextResponse.json(users);
}

// POST /api/users -> create user
export async function POST(req: Request) {
  const body = await req.json();

  if (!body.name || !body.email || !body.password) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone ?? "",
      password: body.password // will hash later
    }
  });

  return NextResponse.json(user, { status: 201 });
}
