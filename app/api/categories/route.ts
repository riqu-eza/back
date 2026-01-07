import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

// GET /api/categories
export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}

// POST /api/categories
export async function POST(req: Request) {
  const body = await req.json();

  if (!body.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const cat = await prisma.category.create({
    data: { name: body.name, description: body.description ?? "" }
  });

  return NextResponse.json(cat, { status: 201 });
}
