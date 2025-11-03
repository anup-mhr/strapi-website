import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col gap-2 items-center mt-16 md:mt-20 lg:mt-24">
        <Image
          src={"/images/design.png"}
          alt={"design"}
          width={210}
          height={100}
          className="w-[120px] sm:w-[150px] md:w-[180px] lg:w-[210px] mb-2"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-8 md:gap-10 lg:gap-12 mt-12 md:mt-16 lg:mt-18 text-primary padding">
        <Link
          href="/"
          className="mx-auto sm:mx-0 w-33 md:w-37 lg:w-45 h-10 md:h-12 relative"
        >
          <Image
            src="/images/logo.png"
            alt="Hierloom Naga Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        <div className="text-xs sm:text-sm text-center mx-auto font-semibold">
          FIND US ON
          <div className="flex justify-center gap-3 sm:gap-4 lg:gap-6 mt-4 sm:mt-5 lg:mt-6">
            <Link
              href="https://www.instagram.com/heirloom.naga/"
              target="_blank"
            >
              <Image
                src={"/images/socials/instagram.svg"}
                alt="instagram"
                width={44}
                height={44}
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11"
              />
            </Link>
            {/* <Link href="https://www.facebook.com/people/Heirloom-Naga/" target="_blank">
                <Image
                  src={"/images/socials/facebook.svg"}
                  alt="facebook"
                  width={44}
                  height={44}
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11"
                />
              </Link>
              <Link href="/" target="_blank">
                <Image
                  src={"/images/socials/x-twitter.svg"}
                  alt="x-twitter"
                  width={44}
                  height={44}
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11"
                />
              </Link> */}
          </div>
        </div>
        
        <div className="flex flex-col items-center md:items-end  text-center sm:text-left">
          <div>
            <p className="text-xs sm:text-sm font-semibold">
              HELP
            </p>
            <ul className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 lg:mt-6 space-y-1 sm:space-y-1.5 flex flex-col">
              <Link href="/return-refund-policy">Returns & Refunds</Link>
              <Link href="/shipping">Shipping</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms">Terms & Conditions</Link>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full py-6 sm:py-7 md:py-8 mt-4 sm:mt-5">
        <p className="text-gray-500 text-[10px] sm:text-sm text-center">
          © {new Date().getFullYear()} Heirloom Naga. <span className="hidden sm:inline">All rights reserved.</span>
        </p>
      </div>

    </div>
  );
};

export default Footer;
