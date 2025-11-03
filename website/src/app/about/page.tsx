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
        {data && (
          <div
            className="
              ck-content
              [&_p]:mb-4
              [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:mb-5
              [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mb-4
              [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3
              [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mb-2

              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
              [&_li]:mb-1

              [&_a]:underline
              [&_strong]:font-semibold
              [&_em]:italic

              [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-4

              [&_img]:rounded-lg [&_img]:w-full [&_img]:my-6
              [&_figure]:my-6 [&_figure_img]:rounded-lg [&_figure_img]:w-full

              [&_section]:mt-6 [&_section]:mb-6
              [&_div]:leading-relaxed

              **:font-inherit!
            "
            dangerouslySetInnerHTML={{ __html: data }}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default AboutPage;
