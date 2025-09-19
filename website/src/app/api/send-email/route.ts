import { mailTemplate } from "@/lib/mailTemplate";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST;
const port = process.env.SMTP_PORT;
const user = process.env.SMTP_MAIL;
const pass = process.env.SMTP_PASS;

export async function POST(req: Request) {
  try {
    const { companyName, email, firstName, lastName, message, phoneNumber } =
      await req.json();

    console.log("companyname", companyName);

    const subject = `Aku Zeliang - New Contact Message from ${firstName} ${lastName}`;

    const htmlContent = mailTemplate({
      companyName,
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
    });

    const transporter = nodemailer.createTransport({
      host,
      port: Number(port) || 587,
      secure: false,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: user,
      to: user,
      subject,
      text: message,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
