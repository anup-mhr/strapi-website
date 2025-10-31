import Heading from "@/components/common/Heading";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { fetchAboutPage } from "@/lib/strapiApiCall";

export const metadata = {
  title: "Heirloom Naga - About Us",
  description:
    "Discover exquisite handcrafted pieces that preserve ancient Naga traditions. From ceramics to textiles, each item tells a story of heritage and timeless beauty.",
};

async function AboutPage() {
  const data = await fetchAboutPage();
  return (
    <div className="min-h-screen flex flex-col text-gray-600">
      <Header />

      <main className="bg-white padding py-8 sm:py-10 md:py-12s">
        <Heading title="ABOUT" subtitle="Our Journey" />
        {data && <div dangerouslySetInnerHTML={{ __html: data }} />}
      </main>

      <Footer />
    </div>
  );
}

export default AboutPage;
