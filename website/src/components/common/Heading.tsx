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
    <div className="flex flex-col items-center mt-8 sm:mt-10 md:mt-12 lg:mt-16 mb-8 sm:mb-10 md:mb-12">
      <Image
        src={"/images/design.png"}
        alt={"design"}
        width={210}
        height={100}
        className="mb-4 sm:mb-5 md:mb-6 w-32 sm:w-40 md:w-48 lg:w-52 xl:w-[210px]"
        priority
      />
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
