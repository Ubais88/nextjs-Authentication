import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    // Extract token from request headers
    const token = request.headers.get("Authorization")?.split(" ")[1];
    console.log("Token: ", token);
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Authorization token is missing",
        },
        { status: 401 }
      );
    }

    // Verify token
    // const decodedToken:any = jwt.verify(token, process.env.JWT_SECRET!);
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

    const userId = decodedToken.id;

    const userDetails = await User.findOne({ _id: userId });

    if (!userDetails) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User details fetched successfully",
        success: true,
        data: userDetails,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
