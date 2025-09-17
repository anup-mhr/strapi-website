export interface ProductImage {
  node: {
    src: string;
    altText?: string;
  };
}

export interface ProductNode {
  id: string;
  title: string;
  description: string;
  images: {
    edges: ProductImage[];
  };
}

export interface ProductEdge {
  node: ProductNode;
}

export interface Collection {
  node: {
    id: string;
    title: string;
    handle: string;
  };
}
