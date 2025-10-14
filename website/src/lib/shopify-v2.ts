import { Cart, CartItem, Product } from "@/types/shopify-v2";

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    id: "1",
    title: "Heritage Ceramic Vase",
    description:
      "Handcrafted ceramic vase inspired by ancient Naga traditions. Each piece is unique, featuring intricate patterns and a timeless design.",
    price: 189.0,
    compareAtPrice: 249.0,
    images: [
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=800&fit=crop",
    ],
    variants: [
      {
        id: "v1",
        title: "Default Title",
        price: 189.0,
        available: true,
      },
    ],
    options: [],
    vendor: "Heirloom Naga",
    productType: "Home Decor",
    tags: ["ceramic", "vase", "handcrafted", "traditional"],
    availableForSale: true,
  },
  {
    id: "2",
    title: "Naga Weaving Throw",
    description:
      "Luxurious throw blanket featuring traditional Naga weaving patterns. Made from premium wool and natural dyes.",
    price: 245.0,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop",
    ],
    variants: [
      {
        id: "v2",
        title: "Default Title",
        price: 245.0,
        available: true,
      },
    ],
    options: [],
    vendor: "Heirloom Naga",
    productType: "Textiles",
    tags: ["throw", "blanket", "wool", "traditional"],
    availableForSale: true,
  },
  {
    id: "3",
    title: "Ancient Wisdom Journal",
    description:
      "Artisan journal with hand-bound pages and traditional Naga motifs. Perfect for capturing thoughts and preserving memories.",
    price: 65.0,
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=800&fit=crop",
    ],
    variants: [
      {
        id: "v3",
        title: "Default Title",
        price: 65.0,
        available: true,
      },
    ],
    options: [],
    vendor: "Heirloom Naga",
    productType: "Stationery",
    tags: ["journal", "handbound", "artisan", "traditional"],
    availableForSale: true,
  },
  {
    id: "4",
    title: "Sacred Geometry Wall Art",
    description:
      "Stunning wall art piece featuring sacred geometry patterns inspired by Naga culture. Hand-carved from sustainable wood.",
    price: 320.0,
    compareAtPrice: 380.0,
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1618331835717-801e976710b3?w=800&h=800&fit=crop",
    ],
    variants: [
      {
        id: "v4",
        title: "Default Title",
        price: 320.0,
        available: true,
      },
    ],
    options: [],
    vendor: "Heirloom Naga",
    productType: "Wall Art",
    tags: ["wall-art", "wood", "sacred-geometry", "hand-carved"],
    availableForSale: true,
  },
  {
    id: "5",
    title: "Traditional Tea Set",
    description:
      "Complete tea set featuring traditional Naga design elements. Includes teapot, cups, and serving tray.",
    price: 285.0,
    images: [
      "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1578862973954-066d8a7f9b96?w=800&h=800&fit=crop",
    ],
    variants: [
      {
        id: "v5",
        title: "Default Title",
        price: 285.0,
        available: true,
      },
    ],
    options: [],
    vendor: "Heirloom Naga",
    productType: "Kitchen",
    tags: ["tea-set", "ceramic", "traditional", "serving"],
    availableForSale: true,
  },
  {
    id: "6",
    title: "Meditation Cushion Set",
    description:
      "Premium meditation cushion set with traditional Naga patterns. Filled with organic buckwheat hulls for optimal comfort.",
    price: 155.0,
    images: [
      "https://images.unsplash.com/photo-1590074072786-a66914d668f1?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop",
    ],
    variants: [
      {
        id: "v6",
        title: "Default Title",
        price: 155.0,
        available: true,
      },
    ],
    options: [],
    vendor: "Heirloom Naga",
    productType: "Wellness",
    tags: ["meditation", "cushion", "organic", "traditional"],
    availableForSale: true,
  },
];

const mockCart: Cart = {
  id: "cart-1",
  checkoutUrl: "#",
  totalPrice: 0,
  lineItems: [
    // {
    //   id: "line-item-1",
    //   quantity: 1,
    //   title: "Heirloom Naga Journal",
    //   price: 65.0,
    //   image:
    //     "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop",
    //   product: mockProducts[3],
    //   variantId: mockProducts[3].variants[0].id,
    // },
  ],
};

export const shopifyService = {
  async getProducts(): Promise<Product[]> {
    // In a real implementation, this would use the Shopify client
    // return client.product.fetchAll();
    return mockProducts;
  },

  // Get product by ID
  async getProduct(id: string): Promise<Product | null> {
    // In a real implementation: return client.product.fetch(id);
    return mockProducts.find((p) => p.id === id) || null;
  },

  // Get products by type
  async getProductsByType(type: string): Promise<Product[]> {
    return mockProducts.filter(
      (p) =>
        p.productType.toLowerCase().includes(type.toLowerCase()) ||
        p.tags.some((tag) => tag.toLowerCase().includes(type.toLowerCase()))
    );
  },

  // Create checkout
  async createCheckout(): Promise<any> {
    // In a real implementation: return client.checkout.create();
    return { id: "checkout-1", webUrl: "#" };
  },

  // Add item to cart
  async addToCart(
    productId: string,
    variantId: string,
    quantity: number = 1
  ): Promise<Cart> {
    const product = mockProducts.find((p) => p.id === productId);
    if (!product) return mockCart;

    const existingItem = mockCart.lineItems.find(
      (item) => item.variantId === variantId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const variant = product.variants.find((v) => v.id === variantId);
      if (!variant) return mockCart;

      const newItem: CartItem = {
        id: `item-${Date.now()}`,
        product,
        variantId,
        quantity,
        title: product.title,
        price: variant.price,
        image: product.images[0],
      };

      mockCart.lineItems.push(newItem);
    }

    mockCart.totalPrice = mockCart.lineItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    return mockCart;
  },

  // Remove item from cart
  async removeFromCart(itemId: string): Promise<Cart> {
    mockCart.lineItems = mockCart.lineItems.filter(
      (item) => item.id !== itemId
    );
    mockCart.totalPrice = mockCart.lineItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return mockCart;
  },

  // Update cart item quantity
  async updateCartQuantity(itemId: string, quantity: number): Promise<Cart> {
    const item = mockCart.lineItems.find((item) => item.id === itemId);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) {
        return this.removeFromCart(itemId);
      }
    }

    mockCart.totalPrice = mockCart.lineItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    return mockCart;
  },

  // Get cart
  async getCart(): Promise<Cart> {
    return mockCart;
  },

  // Clear cart
  async clearCart(): Promise<Cart> {
    mockCart.lineItems = [];
    mockCart.totalPrice = 0;
    return mockCart;
  },
};
