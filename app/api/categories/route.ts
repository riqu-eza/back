import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Category from "@/models/Category";

export async function GET() {
  await connectDB();
  const categories = await Category.find();
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  if (!body.name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });

  const cat = await Category.create({
    name: body.name,
    description: body.description ?? ""
  });

  return NextResponse.json(cat, { status: 201 });
}
