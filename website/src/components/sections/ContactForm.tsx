"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto space-y-3 sm:space-y-4 text-center"
    >
      {/* Success Message */}
      {submitStatus === "success" && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md text-sm animate-in fade-in duration-300">
          Thank you for your message! We&apos;ll get back to you soon.
        </div>
      )}

      {/* Error Message */}
      {submitStatus === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-sm animate-in fade-in duration-300">
          Something went wrong. Please try again later.
        </div>
      )}

      <div>
        <p className="font-semibold text-sm sm:text-base">YOUR NAME*</p>
        <input
          type="text"
          {...register("name")}
          className={`mt-1.5 sm:mt-2 mb-1 w-full border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 ${
            errors.name ? "focus:ring-red-500" : "focus:ring-black"
          } transition-colors`}
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && (
          <p
            className="text-red-500 text-xs sm:text-sm text-left mt-1"
            role="alert"
          >
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <p className="font-semibold text-sm sm:text-base mt-4 sm:mt-5 md:mt-6">
          YOUR EMAIL*
        </p>
        <input
          type="email"
          {...register("email")}
          className={`mt-1.5 sm:mt-2 mb-1 w-full border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 ${
            errors.email ? "focus:ring-red-500" : "focus:ring-black"
          } transition-colors`}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <p
            className="text-red-500 text-xs sm:text-sm text-left mt-1"
            role="alert"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <p className="font-semibold text-sm sm:text-base mt-4 sm:mt-5 md:mt-6">
          YOUR MESSAGE*
        </p>
        <textarea
          {...register("message")}
          rows={5}
          className={`mt-1.5 sm:mt-2 mb-1 w-full border ${
            errors.message ? "border-red-500" : "border-gray-300"
          } px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 ${
            errors.message ? "focus:ring-red-500" : "focus:ring-black"
          } resize-none transition-colors`}
          aria-invalid={errors.message ? "true" : "false"}
        ></textarea>
        {errors.message && (
          <p
            className="text-red-500 text-xs sm:text-sm text-left mt-1"
            role="alert"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black rounded-md text-white px-12 sm:px-14 md:px-16 py-2.5 sm:py-3 text-sm sm:text-base font-bold tracking-wide hover:bg-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4 sm:mt-6"
      >
        {isSubmitting ? "SENDING..." : "SEND"}
      </button>
    </form>
  );
}
