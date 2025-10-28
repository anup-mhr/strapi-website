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

      <div className="grid grid-cols-2  md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mt-12 md:mt-16 lg:mt-18 text-primary padding">
        <div className="grid md:grid-cols-2 md:col-span-2 space-y-10">
          <Link
            href="/"
            className="flex flex-col justify-center items-center md:items-start"
          >
            <Image
              src="/images/logo.png"
              alt={"Hierloom Naga Logo"}
              width={200}
              height={96}
              className="object-contain w-32 sm:w-36 md:w-40 lg:w-50 h-auto"
            />
          </Link>

          <div className="text-xs sm:text-sm text-center mx-auto font-semibold">
            FIND US ON
            <div className="flex gap-3 sm:gap-4 lg:gap-6 mt-4 sm:mt-5 lg:mt-6">
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
              <Link href="/" target="_blank">
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
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-center md:text-left">
              HELP
            </p>
            <ul className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-5 lg:mt-6 space-y-1 sm:space-y-1.5 flex flex-col items-center md:items-start">
              <Link href="/return-refund-policy">Returns & Refunds</Link>
              <Link href="/shipping">Shipping</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms">Terms & Conditions</Link>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full py-6 sm:py-7 md:py-8 mt-4 sm:mt-5">
        <p className="text-gray-500 text-xs sm:text-sm text-center">
          © {new Date().getFullYear()} Heirloomnaga.com All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
