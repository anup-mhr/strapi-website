import Heading from "@/components/common/Heading";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { fetchContactPage } from "@/lib/strapiApiCall";

async function ContactPage() {
  const data = await fetchContactPage();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="py-8 sm:py-10 md:py-12 padding">
        <Heading title="CONTACT" subtitle="Get in touch with us!" />
        {
          data && (
            <div
              dangerouslySetInnerHTML={{ __html: data }}
            />
          )
        }

        {/* Contact Form */}
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}

export default ContactPage;
