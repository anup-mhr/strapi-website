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
        {data && <div dangerouslySetInnerHTML={{ __html: data }} />}

        {/* Contact Form */}
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}

export default ContactPage;
