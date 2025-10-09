import Image from "next/image";
import LinkButton from "./LinkButton";

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
    <div className="flex flex-col items-center mt-12 lg:mt-16 mb-12">
      <Image
        src={"/images/design.png"}
        alt={"design"}
        width={210}
        height={100}
        className="mb-6"
      />
      <h1 className="text-2xl heading uppercase">{title}</h1>
      <h2 className="text-2xl subheading">{subtitle}</h2>
      {CTA && href && (
        <LinkButton href={href} className="bg-black">
          {CTA}
        </LinkButton>
      )}
    </div>
  );
};

export default Heading;
