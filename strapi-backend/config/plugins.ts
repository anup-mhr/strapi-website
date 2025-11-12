module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtpout.secureserver.net"),
        port: env("SMTP_PORT", 465),
        secure: true,
        auth: {
          user: env("SMTP_MAIL"),
          pass: env("SMTP_PASS"),
        },
      },
      settings: {
        defaultFrom: env("SMTP_MAIL"),
        defaultReplyTo: env("SMTP_MAIL"),
        testAddress: env("SMTP_MAIL"),
      },
    },
  },
});
