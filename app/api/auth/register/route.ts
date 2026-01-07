import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  if (!body.name || !body.email || !body.password) {
    return NextResponse.json(
      { error: "Name, email and password are required" },
      { status: 400 }
    );
  }

  const existing = await User.findOne({ email: body.email });
  if (existing) {
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 400 }
    );
  }

  const user = await User.create({
    name: body.name,
    email: body.email,
    phone: body.phone ?? "",
    password: body.password,   // hashed by model hook
    role: body.role ?? "user"
  });

  const safeUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt
  };

  return NextResponse.json(safeUser, { status: 201 });
}
