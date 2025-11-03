import Heading from "@/components/common/Heading";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { fetchContactPage } from "@/lib/strapiApiCall";

export const metadata = {
  title: "Heirloom Naga - Contact",
  description:
    "Get in touch with Heirloom Naga to explore our handcrafted Naga heritage pieces, workshops, and guesthouse experiences. Reach us via email, phone, or visit us in Dimapur, Nagaland.",
  keywords:
    "Heirloom Naga, contact, Naga crafts, Dimapur, Nagaland, workshops, guesthouse, handmade",
  author: "Heirloom Naga",
};

async function ContactPage() {
  const data = await fetchContactPage();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="py-8 sm:py-10 md:py-12 padding">
        <Heading title="CONTACT" subtitle="Get in touch with us!" />
        {data && (
          <div
            className="
              ck-content
              [&_p]:mb-4
              [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:mb-5
              [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mb-4
              [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3

              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
              [&_li]:mb-1

              [&_strong]:font-semibold
              [&_em]:italic

              [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-4

              [&_img]:rounded-lg [&_img]:w-full [&_img]:my-6
              [&_figure]:my-6 [&_figure_img]:rounded-lg [&_figure_img]:w-full

              [&_section]:mt-6 [&_section]:mb-6 

              **:font-inherit!
            "
            dangerouslySetInnerHTML={{ __html: data }}
          />
        )}

        {/* Contact Form */}
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}

export default ContactPage;
