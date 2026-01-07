import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import User from "@/models/User";

export async function GET() {
  await connectDB();
  const users = await User.find().select("-password");
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  if (!body.name || !body.email || !body.password)
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

  const user = await User.create({
    name: body.name,
    email: body.email,
    phone: body.phone ?? "",
    password: body.password
  });

  return NextResponse.json(user, { status: 201 });
}
