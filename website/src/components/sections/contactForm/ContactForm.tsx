"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ContactFrom, contactSchema } from "./schema";
import { cn } from "@/lib/utils";

function ContactForm({ className }: { className?: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFrom>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFrom) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-7 text-lg font-semibold", className)}
    >
      <input
        type="text"
        placeholder="First name*"
        className={`border px-5 placeholder-gray-400 p-3 text-gray-400 outline-none focus:ring-1 ${
          errors.firstName
            ? "border-red-300 focus:ring-red-300"
            : "border-gray-200"
        }`}
        {...register("firstName")}
      />
      <input
        type="text"
        placeholder="Last name*"
        className={`border px-5 placeholder-gray-400 p-3 text-gray-400 outline-none focus:ring-1 ${
          errors.lastName
            ? "border-red-300 focus:ring-red-300"
            : "border-gray-200"
        }`}
        {...register("lastName")}
      />
      <input
        type="text"
        placeholder="Company name"
        className={`border px-5 placeholder-gray-400 p-3 text-gray-400 outline-none focus:ring-1 ${
          errors.companyName ? "border-red-300 " : "border-gray-200"
        }`}
        {...register("companyName")}
      />
      <input
        type="tel"
        placeholder="Phone number*"
        className={`border px-5 placeholder-gray-400 p-3 text-gray-400 outline-none focus:ring-1 ${
          errors.phoneNumber
            ? "border-red-300 focus:ring-red-300"
            : "border-gray-200"
        }`}
        {...register("phoneNumber")}
      />
      <input
        type="email"
        placeholder="Email*"
        className={`border px-5 placeholder-gray-400 p-3 text-gray-400 outline-none focus:ring-1 ${
          errors.email ? "border-red-300 focus:ring-red-300" : "border-gray-200"
        }`}
        {...register("email")}
      />
      <textarea
        placeholder="Message"
        className={`border px-5 placeholder-gray-400 p-3 text-gray-400 outline-none focus:ring-1 min-h-[10rem] ${
          errors.message
            ? "border-red-300 focus:ring-red-300"
            : "border-gray-200"
        }`}
        {...register("message")}
      ></textarea>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white py-4 px-10 mt-2 w-max uppercase font-light tracking-widest text-sm cursor-pointer"
      >
        Send Message
      </button>
    </form>
  );
}

export default ContactForm;
