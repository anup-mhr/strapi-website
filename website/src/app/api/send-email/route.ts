import { mailTemplate } from "@/lib/mailTemplate";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST;
const port = process.env.SMTP_PORT;
const user = process.env.SMTP_MAIL;
const pass = process.env.SMTP_PASS;

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const subject = "Inquiry - Heirloom Naga";

    const htmlContent = mailTemplate({
      name,
      email,
      message,
    });

    const transporter = nodemailer.createTransport({
      host,
      port: Number(port) || 465,
      secure: true,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: `Heirloom Naga <${user}>`,
      to: "zeroo3442@gmail.com",
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
