import React from "react";

function Footer() {
  return (
    <div className="bg-secondary px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 pt-12 md:pt-14 pb-12 flex flex-col md:flex-row md:justify-between md:items-end text-gray-600 text-2xs uppercase tracking-widest space-y-8 md:space-y-0 md:space-x-8">
      {/* Left Section */}
      <p className="text-center md:text-left">
        FOLLOW US ON <span className="text-black font-medium">INSTAGRAM</span>
      </p>
      {/* Middle Section */}
      <div className="flex flex-col items-center text-center">
        <p>HEIRLOON NAGA</p>
        <p>URRA DESIGN STUDIO</p>
        <p>CANE CONCEPT</p>

        <p className="mt-6">AKU ZELIANG &copy; {new Date().getFullYear()}</p>
        <p>
          hello<span className="text-sm">@</span>akuzeliang.com
        </p>
      </div>
      {/* Right Section */}
      <p className="text-center md:text-right">TERMS & CONDITIONS</p>
    </div>
  );
}

export default Footer;
