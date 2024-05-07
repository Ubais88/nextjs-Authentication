import bcrypt from "bcrypt";
import User from "@/models/userModel";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    console.log("hashed Token: ", hashedToken)
    if (emailType === "Verify") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "Reset") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USERID,
        pass:process.env.USER_PASSWORD,
      },
    });

    const mailOptions = {
      from: "moubais3143@gmail.com",
      to: email,
      subject:
        emailType === "Verify" ? "Verify your Email" : "Reset Your Password",
      html: `<p>Click 
      <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>Here</a>
       to 
       ${
         emailType === "Verify" ? "verify your email id" : "reset your password"
       } 
       or copy paste the link below in your browser.<br>
        ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;

  } catch (error: any) {
    throw new Error(error.message);
  }
};
