import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log("token : ", token);
    
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Authorization token is missing",
        },
        { status: 401 }
      );
    }

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gte: Date.now() },
    });


    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 400 }
      );
    }
    console.log("User fetched Successfully: ", user)

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();
    console.log("User Verified Successfully: ", user)
    return NextResponse.json(
      {
        success: true,
        message: "User Verified Successfully",
        user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("error", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
