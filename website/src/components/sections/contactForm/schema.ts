import { z } from "zod";

const phoneRegex: RegExp = /^\+?[1-9]\d{1,14}$/;

export const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().optional(),
  phoneNumber: z.string().regex(phoneRegex, "Invalid phone number"),
  email: z.email(),
  message: z.string().optional(),
});

export type ContactFrom = z.infer<typeof contactSchema>;
