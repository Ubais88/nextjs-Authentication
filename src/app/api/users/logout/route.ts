import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
        message:"Logout Successfully",
        success:true
    })


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
