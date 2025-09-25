"use client";

import { memo, useCallback, useEffect, useMemo, useRef } from "react";

declare global {
  interface Window {
    ShopifyBuy: any;
  }
}

interface ShopifyBuyButtonProps {
  productId: number | string;
  storeDomain?: string;
  storefrontAccessToken?: string;
  moneyFormat?: string;
  className?: string;
}

// Constants moved outside component to prevent re-creation
const SHOPIFY_STORE_DOMAIN = process.env
  .NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN as string;
const SHOPIFY_STOREFRONT_TOKEN = process.env
  .NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN as string;
const SCRIPT_URL =
  "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

// Global script loading state to prevent multiple loads
let isScriptLoaded = false;
let scriptPromise: Promise<void> | null = null;

// Memoized styles configuration
const getComponentOptions = () => ({
  product: {
    styles: {
      product: {
        display: "flex",
        "justify-content": "flex-start",
        "align-items": "flex-start",
        margin: 0,
        transform: "translateY(-20px)",
      },
      button: {
        "border-radius": "0px",
        padding: "12px 32px",
        "text-transform": "uppercase",
        "font-family": "Geist Dosis, sans-serif",
        "letter-spacing": "1px",
        "background-color": "black",
        width: "max-content",
        color: "white",
        "font-size": "10px",
        "font-weight": "100",
        ":hover": { "background-color": "#333" },
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
        "font-size": "10px",
        "text-transform": "uppercase",
        ":hover": { "background-color": "#333" },
        ":focus": { "background-color": "black" },
        ":active": { "background-color": "black" },
      },
    },
    text: { total: "Subtotal", button: "Checkout" },
    popup: false,
  },
  toggle: {
    styles: {
      toggle: {
        "background-color": "black",
        color: "white",
        "font-family": "Geist Dosis, sans-serif",
        ":hover": { "background-color": "#333" },
        ":focus": { "background-color": "black" },
        ":active": { "background-color": "black" },
      },
      count: { color: "white" },
    },
  },
});

// Optimized script loader with Promise-based approach
const loadShopifyScript = (): Promise<void> => {
  if (isScriptLoaded) {
    return Promise.resolve();
  }

  if (scriptPromise) {
    return scriptPromise;
  }

  // Check if script already exists in DOM
  if (document.querySelector(`script[src="${SCRIPT_URL}"]`)) {
    isScriptLoaded = true;
    return Promise.resolve();
  }

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.async = true;
    script.src = SCRIPT_URL;
    script.onload = () => {
      isScriptLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error("Failed to load Shopify script"));
    document.head.appendChild(script);
  });

  return scriptPromise;
};

export default function ShopifyBuyButton({
  productId,
  storeDomain = SHOPIFY_STORE_DOMAIN,
  storefrontAccessToken = SHOPIFY_STOREFRONT_TOKEN,
  className = "w-full flex justify-start",
}: ShopifyBuyButtonProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<any>(null);
  const isInitialized = useRef(false);

  // Memoize component options to prevent recreation on every render
  const componentOptions = useMemo(() => getComponentOptions(), []);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (componentRef.current) {
      try {
        componentRef.current.destroy?.();
      } catch (error) {
        console.warn("Error destroying Shopify component:", error);
      }
      componentRef.current = null;
    }
    if (divRef.current) {
      divRef.current.innerHTML = "";
    }
    isInitialized.current = false;
  }, []);

  // Initialize Shopify component
  const initializeComponent = useCallback(async () => {
    if (!divRef.current || !window.ShopifyBuy || isInitialized.current) return;

    try {
      const client = window.ShopifyBuy.buildClient({
        domain: storeDomain,
        storefrontAccessToken,
      });

      const ui = await window.ShopifyBuy.UI.onReady(client);

      // Double-check component hasn't been unmounted
      if (!divRef.current || isInitialized.current) return;

      componentRef.current = ui.createComponent("product", {
        id: productId,
        node: divRef.current,
        options: componentOptions,
      });

      isInitialized.current = true;
    } catch (error) {
      console.error("Error initializing Shopify Buy Button:", error);
    }
  }, [productId, storeDomain, storefrontAccessToken, componentOptions]);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      if (!isMounted) return;

      cleanup();

      try {
        await loadShopifyScript();
        if (isMounted) {
          await initializeComponent();
        }
      } catch (error) {
        console.error("Failed to load Shopify Buy Button:", error);
      }
    };

    init();

    return () => {
      isMounted = false;
      cleanup();
    };
  }, [initializeComponent, cleanup]);

  return <div ref={divRef} className={className} />;
}

export const MemoizedShopifyBuyButton = memo(ShopifyBuyButton);
