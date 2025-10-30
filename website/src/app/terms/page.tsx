import Heading from "@/components/common/Heading";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { fetchTermsPage } from "@/lib/strapiApiCall";

async function TermsPage() {
  const data = await fetchTermsPage();
  return (
    <div className="min-h-screen">
      <Header />
      <div className="py-8 sm:py-10 md:py-12 padding">
        <Heading title="TERMS" subtitle="Our terms & conditions" />
        <div className="w-full mx-auto max-w-5xl">
          {
            data && (
              <div
                dangerouslySetInnerHTML={{ __html: data }}
              />
            )
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TermsPage;
