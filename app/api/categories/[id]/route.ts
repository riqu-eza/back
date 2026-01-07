/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/categories/:id
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const cat = await prisma.category.findUnique({
    where: { id: Number(id) },
  });

  if (!cat) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(cat);
}

// PUT /api/categories/:id
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  if (!body.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const cat = await prisma.category.update({
    where: { id: Number(id) },
    data: { name: body.name },
  });

  return NextResponse.json(cat);
}

// DELETE /api/categories/:id
export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await prisma.category.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Deleted" });
}
// PATCH /api/categories/:id
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  // Build a dynamic update object (only fields provided will update)
  const data: any = {};

  if (body.name) data.name = body.name;
  if (body.description) data.description = body.description;

  const updated = await prisma.category.update({
    where: { id: Number(id) },
    data,
  });

  return NextResponse.json(updated);
}