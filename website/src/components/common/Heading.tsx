import Image from "next/image";
import LinkButton from "../LinkButton";

const Heading = ({
  title,
  subtitle,
  CTA,
  href,
}: {
  title: string;
  subtitle: string;
  CTA?: string;
  href?: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center mt-8 pt-[30px] sm:mt-10 md:mt-12 lg:mt-16 mb-8 sm:mb-10 md:mb-12">
      <h1 className="text-lg sm:text-xl md:text-2xl heading uppercase">
        {title}
      </h1>
      <h2 className="text-lg sm:text-xl md:text-2xl subheading">{subtitle}</h2>
      {CTA && href && (
        <LinkButton href={href} className="bg-black">
          {CTA}
        </LinkButton>
      )}
    </div>
  );
};

export default Heading;
