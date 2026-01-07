import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Category from "@/models/Category";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;

  const cat = await Category.findById(id);
  if (!cat) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(cat);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();

  const cat = await Category.findByIdAndUpdate(
    id,
    { name: body.name, description: body.description ?? "" },
    { new: true }
  );

  return NextResponse.json(cat);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();

  const cat = await Category.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(cat);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;

  await Category.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
