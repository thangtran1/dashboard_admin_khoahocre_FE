export const fakeBlogs = [
  {
    _id: "blog1",
    title: "Top 10 Smartphones of 2024",
    slug: { current: "top-10-smartphones-2024" },
    excerpt: "Discover the best smartphones that defined 2024 with cutting-edge features and innovative designs.",
    content: "Content for the blog post about top smartphones...",
    publishedAt: "2024-01-15T10:00:00Z",
    image: { asset: { url: "/images/emptyCart.png" } },
    author: {
      name: "Tech Reviewer",
      image: { asset: { url: "/images/products/product_1.png" } }
    },
    category: { title: "Technology", slug: { current: "technology" } }
  },
  {
    _id: "blog2",
    title: "Gaming Laptop Buying Guide",
    slug: { current: "gaming-laptop-buying-guide" },
    excerpt: "Everything you need to know before buying your next gaming laptop.",
    content: "Content for the gaming laptop guide...",
    publishedAt: "2024-01-10T14:30:00Z",
    image: { asset: { url: "/images/products/product_7.png" } },
    author: {
      name: "Gaming Expert",
      image: { asset: { url: "/images/products/product_7.png" } }
    },
    category: { title: "Gaming", slug: { current: "gaming" } }
  },
  {
    _id: "blog3",
    title: "Wireless Audio Revolution",
    slug: { current: "wireless-audio-revolution" },
    excerpt: "How wireless audio technology is changing the way we listen to music.",
    content: "Content about wireless audio technology...",
    publishedAt: "2024-01-05T09:15:00Z",
    image: { asset: { url: "/images/products/product_3.png" } },
    author: {
      name: "Audio Specialist",
      image: { asset: { url: "/images/products/product_3.png" } }
    },
    category: { title: "Audio", slug: { current: "audio" } }
  },
  {
    _id: "blog4",
    title: "Smart Home Automation",
    slug: { current: "smart-home-automation" },
    excerpt: "How smart home automation is changing the way we live.",
    content: "Content about smart home automation...",
    publishedAt: "2024-01-05T09:15:00Z",
    image: { asset: { url: "/images/products/product_4.png" } },
    author: {
      name: "Smart Home Expert",
      image: { asset: { url: "/images/products/product_4.png" } }
    },
    category: { title: "Smart Home", slug: { current: "smart-home" } }
  },
  {
    _id: "blog5",
    title: "Health & Fitness",
    slug: { current: "health-fitness" },
    excerpt: "How health & fitness is changing the way we live.",
    content: "Content about health & fitness...",
    publishedAt: "2024-01-05T09:15:00Z",
    image: { asset: { url: "/images/products/product_4.png" } },
    author: {
      name: "Health Expert",
      image: { asset: { url: "/images/products/product_4.png" } }
    },
    category: { title: "Health & Fitness", slug: { current: "health-fitness" } }
  }
];

export const getFakeBlogs = (quantity?: number) => {
  return quantity ? fakeBlogs.slice(0, quantity) : fakeBlogs;
};

export const getFakeBlogBySlug = (slug: string) => {
  return fakeBlogs.find(blog => blog.slug.current === slug) || null;
};

export const getFakeOtherBlogs = (currentSlug: string, quantity: number) => {
  return fakeBlogs.filter(blog => blog.slug.current !== currentSlug).slice(0, quantity);
};