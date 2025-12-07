export const fakeCategories = [
  {
    _id: "cat1",
    name: "Smartphones",
    slug: { current: "smartphones" },
    description: "Latest smartphones and mobile devices",
    productCount: 5,
    image: { asset: { url: "/images/banner/banner_1.png" } }
  },
  {
    _id: "cat2",
    name: "Laptops",
    slug: { current: "laptops" },
    description: "High-performance laptops and computers",
    productCount: 3,
    image: { asset: { url: "/images/products/product_2.jpg" } }
  },
  {
    _id: "cat3",
    name: "Headphones",
    slug: { current: "headphones" },
    description: "Premium audio devices and headphones",
    productCount: 4,
    image: { asset: { url: "/images/products/product_3.png" } }
  },
  {
    _id: "cat4",
    name: "Tablets",
    slug: { current: "tablets" },
    description: "Tablets and e-readers",
    productCount: 2,
    image: { asset: { url: "/images/products/product_4.png" } }
  },
  {
    _id: "cat5",
    name: "Smart Watch",
    slug: { current: "smart-watch" },
    description: "Smartwatches and fitness trackers",
    productCount: 3,
    image: { asset: { url: "/images/products/product_5.png" } }
  }
];
export const fakeBrands = [
  {
    _id: "brand1",
    name: "Apple",
    slug: { current: "apple" },
    description: "Premium technology products",
    image: { asset: { url: "/images/brands/brand_1.webp" } }
  },
  {
    _id: "brand2",
    name: "Samsung",
    slug: { current: "samsung" },
    description: "Innovation for everyone",
    image: { asset: { url: "/images/brands/brand_2.jpg" } }
  },
  {
    _id: "brand3",
    name: "Sony",
    slug: { current: "sony" },
    description: "Audio and entertainment",
    image: { asset: { url: "/images/brands/brand_3.png" } }
  },
  {
    _id: "brand4",
    name: "Microsoft",
    slug: { current: "microsoft" },
    description: "Software and hardware solutions",
    image: { asset: { url: "/images/brands/brand_4.png" } }
  },
  {
    _id: "brand5",
    name: "Google",
    slug: { current: "google" },
    description: "Search and mobile technology",
    image: { asset: { url: "/images/brands/brand_5.png" } }
  }
];
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

export const fakeProducts = [
  {
    _id: "prod1",
    name: "iPhone 15 Pro Max",
    slug: { current: "iphone-15-pro-max" },
    price: 1199,
    warrantyPeriod: 12,
    discount: 20,
    description: "Latest iPhone with advanced camera system and A17 Pro chip",
    image: {
      asset: {
        url: "/images/products/product_1.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_1.png" } },
      { asset: { url: "/images/products/product_2.jpg" } }
    ],
    category: {
      _ref: "cat1",
      name: "Smartphones"
    },
    brand: {
      _ref: "brand1",
      name: "Apple"
    },
    stock: 50,
    isNew: true,
    isFeatured: true,
    specifications: [
      "6.7-inch Super Retina XDR display",
      "A17 Pro chip",
      "48MP Main camera",
      "5G connectivity"
    ],
    reviews: [
      {
        _id: "review1",
        rating: 5,
        comment: "Sản phẩm tuyệt vời! Camera chụp rất đẹp, pin trâu, màn hình sắc nét. Rất hài lòng!",
        createdAt: new Date("2025-12-03T08:30:00Z"),
        user: { _id: "user1", name: "John Doe", avatar: "/images/products/product_1.png" },
        type: 'Đã mua hàng',
        images: ["/images/products/product_1.png", "/images/products/product_2.jpg"],
        replies: [
          { _id: "reply1", comment: "Cảm ơn bạn đã tin tưởng và mua hàng! Chúc bạn sử dụng vui vẻ ạ 🎉", createdAt: new Date("2025-12-03"), user: { _id: "admin1", name: "Admin Shop", isAdmin: true } },
          { _id: "reply2", comment: "Mình cũng mua con này, dùng rất ổn!", createdAt: new Date("2025-12-03"), user: { _id: "user1", name: "John Doe" } },
        ]
      },
      {
        _id: "review2",
        rating: 4,
        comment: "Máy đẹp, chạy mượt. Chỉ tiếc là hơi nóng khi chơi game nặng.",
        createdAt: new Date("2025-12-02T10:00:00Z"),
        user: { _id: "user2", name: "Jane Doe", avatar: "/images/products/product_3.png" },
        type: 'Đã mua hàng',
        images: ["/images/products/product_3.png"],
        replies: [
          { _id: "reply3", comment: "Cảm ơn góp ý của bạn! Bạn có thể giảm đồ họa game để máy mát hơn nhé.", createdAt: new Date("2025-12-02"), user: { _id: "admin1", name: "Admin Shop", isAdmin: true } },
        ]
      },
      {
        _id: "review3",
        rating: 3,
        comment: "Sản phẩm tạm được, giao hàng hơi chậm.",
        type: 'Đã mua hàng',
        createdAt: new Date("2025-12-01T14:00:00Z"),
        user: { _id: "user3", name: "Jim Doe", avatar: "/images/products/product_5.png" },
        images: [],
        replies: []
      },
      {
        _id: "review4",
        rating: 5,
        comment: "10 điểm không có nhưng! Ship nhanh, đóng gói cẩn thận.",
        type: 'Đã mua hàng',
        createdAt: new Date("2025-11-30T09:00:00Z"),
        user: { _id: "user4", name: "Jill Doe", avatar: "/images/products/product_7.png" },
        images: ["/images/products/product_5.png", "/images/products/product_6.png"],
        replies: [
          { _id: "reply4", comment: "Cảm ơn bạn nhiều ạ! 💖", createdAt: new Date("2025-11-30"), user: { _id: "admin1", name: "Admin Shop", isAdmin: true } },
        ]
      }
    ],
  },
  
  // Additional GADGET products
  {
    _id: "prod9",
    name: "Google Pixel 8 Pro",
    slug: { current: "google-pixel-8-pro" },
    price: 999,
    discount: 8,
    description: "AI-powered smartphone with exceptional camera",
    image: {
      asset: {
        url: "/images/products/product_16.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_16.png" } }
    ],
    category: {
      _ref: "cat1",
      name: "Smartphones"
    },
    brand: {
      _ref: "brand5",
      name: "Google"
    },
    stock: 35,
    isNew: true,
    isFeatured: false,
    specifications: [
      "6.7-inch LTPO OLED display",
      "Google Tensor G3",
      "50MP main camera",
      "Magic Eraser"
    ]
  },
  
  // APPLIANCES products
  {
    _id: "prod17",
    name: "HP Pavilion 15",
    slug: { current: "hp-pavilion-15" },
    price: 899,
    discount: 15,
    description: "Reliable laptop for everyday computing",
    image: {
      asset: {
        url: "/images/products/product_2.jpg"
      }
    },
    images: [
      { asset: { url: "/images/products/product_2.jpg" } }
    ],
    category: {
      _ref: "cat2",
      name: "Laptops"
    },
    brand: {
      _ref: "brand6",
      name: "Dell"
    },
    stock: 25,
    isNew: false,
    isFeatured: false,
    specifications: [
      "15.6-inch Full HD display",
      "Intel Core i5",
      "8GB RAM",
      "256GB SSD"
    ]
  },
  {
    _id: "prod19",
    name: "LG Window AC 1 Ton",
    slug: { current: "lg-window-ac-1-ton" },
    price: 399,
    discount: 18,
    description: "Compact window air conditioner",
    image: {
      asset: {
        url: "/images/products/product_8.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_8.png" } }
    ],
    category: {
      _ref: "cat7",
      name: "Air Conditioners"
    },
    brand: {
      _ref: "brand2",
      name: "Samsung"
    },
    stock: 20,
    isNew: false,
    isFeatured: false,
    specifications: [
      "1 Ton capacity",
      "3 Star energy rating",
      "Window installation",
      "Auto restart"
    ]
  },
  
  // REFRIGERATORS products
  {
    _id: "prod22",
    name: "Samsung Double Door 253L",
    slug: { current: "samsung-double-door-253l" },
    price: 899,
    discount: 10,
    description: "Energy efficient double door refrigerator",
    image: {
      asset: {
        url: "/images/products/product_11.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_11.png" } }
    ],
    category: {
      _ref: "cat9",
      name: "Refrigerators"
    },
    brand: {
      _ref: "brand2",
      name: "Samsung"
    },
    stock: 10,
    isNew: true,
    isFeatured: true,
    specifications: [
      "253L capacity",
      "Double door design",
      "Digital inverter compressor",
      "5 Star energy rating"
    ]
  },
  {
    _id: "prod23",
    name: "LG Single Door 190L",
    slug: { current: "lg-single-door-190l" },
    price: 599,
    discount: 8,
    description: "Compact single door refrigerator",
    image: {
      asset: {
        url: "/images/products/product_12.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_12.png" } }
    ],
    category: {
      _ref: "cat9",
      name: "Refrigerators"
    },
    brand: {
      _ref: "brand2",
      name: "Samsung"
    },
    stock: 15,
    isNew: false,
    isFeatured: false,
    specifications: [
      "190L capacity",
      "Single door design",
      "Smart inverter compressor",
      "4 Star energy rating"
    ]
  },
  
  // OTHERS products
  {
    _id: "prod26",
    name: "PlayStation 5 Console",
    slug: { current: "playstation-5-console" },
    price: 499,
    discount: 5,
    description: "Next-gen gaming console with 4K gaming",
    image: {
      asset: {
        url: "/images/products/product_15.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_15.png" } }
    ],
    category: {
      _ref: "cat6",
      name: "Gaming"
    },
    brand: {
      _ref: "brand3",
      name: "Sony"
    },
    stock: 5,
    isNew: true,
    isFeatured: true,
    specifications: [
      "Custom AMD Zen 2 CPU",
      "4K gaming support",
      "Ray tracing",
      "Ultra-fast SSD"
    ]
  },
  {
    _id: "prod27",
    name: "Xbox Series X",
    slug: { current: "xbox-series-x" },
    price: 499,
    discount: 3,
    description: "Powerful gaming console with Game Pass",
    image: {
      asset: {
        url: "/images/products/product_16.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_16.png" } }
    ],
    category: {
      _ref: "cat6",
      name: "Gaming"
    },
    brand: {
      _ref: "brand4",
      name: "Microsoft"
    },
    stock: 8,
    isNew: true,
    isFeatured: true,
    specifications: [
      "Custom AMD Zen 2 CPU",
      "12 TFLOPS GPU",
      "Quick Resume",
      "Game Pass compatible"
    ]
  },
];

// Helper functions để lấy data
export const getFakeCategories = (quantity?: number) => {
  return quantity ? fakeCategories.slice(0, quantity) : fakeCategories;
};

export const getFakeBrands = () => {
  return fakeBrands;
};

export const getFakeProducts = (quantity?: number) => {
  return quantity ? fakeProducts.slice(0, quantity) : fakeProducts;
};

export const getFakeDealProducts = () => {
  return fakeProducts.filter(product => product.discount > 10);
};

export const getFakeProductBySlug = (slug: string) => {
  return fakeProducts.find(product => product.slug.current === slug) || null;
};

export const getFakeBrandBySlug = (slug: string) => {
  return fakeBrands.find(brand => brand.slug.current === slug) || null;
};

export const getFakeBlogs = (quantity?: number) => {
  return quantity ? fakeBlogs.slice(0, quantity) : fakeBlogs;
};

export const getFakeBlogBySlug = (slug: string) => {
  return fakeBlogs.find(blog => blog.slug.current === slug) || null;
};

export const getFakeOtherBlogs = (currentSlug: string, quantity: number) => {
  return fakeBlogs.filter(blog => blog.slug.current !== currentSlug).slice(0, quantity);
};

export const fakeUser = {
  id: "user1",
  name: "John Doe",
  email: "john.doe@example.com",
  image: {
    asset: {
      url: "/images/products/product_1.png"
    }
  }
};
export const getFakeUser = (quantity?: number) => {
  return quantity ? [fakeUser] : [fakeUser];
};
