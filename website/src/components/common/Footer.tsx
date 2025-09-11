import React from "react";

function Footer() {
  return (
    <div className="bg-secondary px-[12rem] pt-24 pb-18 flex justify-between items-end text-gray-600 h-[18rem] text-sm uppercase tracking-widest">
      <p>
        FOLLOW US ON <span className="text-black font-medium">INSTAGRAM</span>
      </p>

      <div className="flex flex-col items-center">
        <p>HEIRLOON NAGA</p>
        <p>URRA DESIGN STUDIO</p>
        <p>CANE CONCEPT</p>

        <p className="mt-6">AKU ZELIANG &copy; 2025</p>
        <p>INFO@AKUZELIANG.COM</p>
      </div>

      <p>TERMS & CONDITIONS</p>
    </div>
  );
}

export default Footer;
