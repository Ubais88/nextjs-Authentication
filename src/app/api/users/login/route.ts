import bcrypt from "bcrypt";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user: any = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 400 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        {
          success: false,
          error: "Password is not matched",
        },
        { status: 402 }
      );
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id.toString(),
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "24h",
      }
    );

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      token,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    console.log("error", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
