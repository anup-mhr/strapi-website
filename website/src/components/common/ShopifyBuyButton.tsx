"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    ShopifyBuy: any;
  }
}

type ShopifyBuyButtonProps = {
  productId: number;
  storeDomain?: string;
  storefrontAccessToken?: string;
  moneyFormat?: string;
};

export default function ShopifyBuyButton({
  productId,
  storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN as string,
  storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN as string,
  moneyFormat = "Rs{{amount}}",
}: ShopifyBuyButtonProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const scriptURL = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

    const loadScript = (callback: () => void) => {
      if (document.querySelector(`script[src="${scriptURL}"]`)) {
        callback();
        return;
      }
      const script = document.createElement("script");
      script.async = true;
      script.src = scriptURL;
      script.onload = callback;
      document.head.appendChild(script);
    };

    const initShopifyBuy = () => {
      if (!window.ShopifyBuy || !divRef.current) return;

      const client = window.ShopifyBuy.buildClient({
        domain: storeDomain,
        storefrontAccessToken,
      });

      window.ShopifyBuy.UI.onReady(client).then((ui: any) => {
        if (!divRef.current || divRef.current.children.length > 0) return;

        // Use a small timeout to ensure the container is fully mounted
        setTimeout(() => {
          if (!divRef.current) return;

          ui.createComponent("product", {
            id: productId,
            node: divRef.current,
            moneyFormat,
            options: {
              product: {
                styles: {
                  product: { display:"flex", "justify-content":"centre", "align-items":"flex-start" ,margin: "0" },
                  button: {
                    "border-radius": "0px",
                    "padding": "20px 40px",
                    "text-transform": "uppercase",
                    "font-family": "Geist Dosis, sans-serif",
                    "letter-spacing": "2px",
                    "background-color": "black",
                    color: "white",
                    ":hover": { "background-color": "black" },
                    ":focus": { "background-color": "black" },
                    ":active": { "background-color": "black" },
                  },
                },
                contents: { img: false, title: false, price: false },
                text: { button: "BUY NOW" },
              },
              cart: {
                styles: {
                  button: {
                    "border-radius": "0px",
                    "background-color": "black",
                    color: "white",
                    "font-family": "Geist Dosis, sans-serif",
                    "text-transform": "uppercase",
                    ":hover": { "background-color": "black" },
                    ":focus": { "background-color": "black" },
                    ":active": { "background-color": "black" },
                  },
                },
                text: { total: "Subtotal", button: "Checkout" },
                popup: false
              },
              toggle: {
                styles: {
                  toggle: {
                    "background-color": "black",
                    color: "white",
                    "font-family": "Geist Dosis, sans-serif",
                    ":hover": { "background-color": "black" },
                    ":focus": { "background-color": "black" },
                    ":active": { "background-color": "black" },
                  },
                  count: { color: "white" },
                },
              },
            },
          });
        }, 50);
      });
    };

    if (window.ShopifyBuy && window.ShopifyBuy.UI) {
      initShopifyBuy();
    } else {
      loadScript(initShopifyBuy);
    }
  }, [productId, storeDomain, storefrontAccessToken, moneyFormat]);

  return <div ref={divRef} className="w-full flex justify-start -translate-y-10"></div>;
}
