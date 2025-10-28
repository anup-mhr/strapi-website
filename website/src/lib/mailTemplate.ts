export function mailTemplate({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>From Heirloom Naga - Contact Page</title>
  </head>
  <body style="margin:0; padding:20px; background-color:#f9f9f9; font-family: Arial, sans-serif; color:#333; letter-spacing:1.5px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;">
            <!-- Header -->
            <tr>
              <td style="padding:30px 40px; font-size:20px; font-weight:600; text-align:center;">
                New Contact Form Submission
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:20px 40px;">
                <p style="margin:8px 0;"><strong>Name:</strong><br />${name}</p>
                <p style="margin:8px 0;"><strong>Email:</strong><br />${email}</p>

                <p style="margin:12px 0;"><strong>Message:</strong></p>
                <p style="margin:8px 0;">${message}</p>

                <!-- Button -->
                <p style="margin-top:20px;">
                  <a href="mailto:${email}" style="
                    display:inline-block;
                    padding:12px 20px;
                    background-color:#000;
                    color:#fff;
                    text-decoration:none;
                    font-weight:200;
                  ">Reply to ${name}</a>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:16px; font-size:12px; color:#666; text-align:center; background-color:#fafafa;">
                You received this email from Heirloom Naga contact form.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;
}
