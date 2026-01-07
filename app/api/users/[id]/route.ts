import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/users/:id
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const user = await prisma.user.findUnique({
    where: { id: Number(id) }
  });

  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(user);
}

// PUT /api/users/:id   (full update)
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone
    }
  });

  return NextResponse.json(user);
}

// DELETE /api/users/:id
export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await prisma.user.delete({
    where: { id: Number(id) }
  });

  return NextResponse.json({ message: "Deleted" });
}
