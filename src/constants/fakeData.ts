// Fake data để thay thế Sanity CMS
export const fakeCategories = [
  {
    _id: "cat1",
    name: "Smartphones",
    slug: { current: "smartphones" },
    description: "Latest smartphones and mobile devices",
    productCount: 5,
    image: {
      asset: {
        url: "/images/banner/banner_1.png"
      }
    }
  },
  {
    _id: "cat2", 
    name: "Laptops",
    slug: { current: "laptops" },
    description: "High-performance laptops and computers",
    productCount: 3,
    image: {
      asset: {
        url: "/images/products/product_2.jpg"
      }
    }
  },
  {
    _id: "cat3",
    name: "Headphones",
    slug: { current: "headphones" },
    description: "Premium audio devices and headphones",
    productCount: 4,
    image: {
      asset: {
        url: "/images/products/product_3.png"
      }
    }
  },
  {
    _id: "cat4",
    name: "Tablets",
    slug: { current: "tablets" },
    description: "Tablets and e-readers",
    productCount: 2,
    image: {
      asset: {
        url: "/images/products/product_4.png"
      }
    }
  },
  {
    _id: "cat5",
    name: "Smart Watch",
    slug: { current: "smart-watch" },
    description: "Smartwatches and fitness trackers",
    productCount: 3,
    image: {
      asset: {
        url: "/images/products/product_5.png"
      }
    }
  },
  {
    _id: "cat6",
    name: "Gaming",
    slug: { current: "gaming" },
    description: "Gaming accessories and devices",
    productCount: 2,
    image: {
      asset: {
        url: "/images/products/product_6.png"
      }
    }
  },
  {
    _id: "cat7",
    name: "Air Conditioners",
    slug: { current: "air-conditioners" },
    description: "Cooling and heating solutions",
    productCount: 2,
    image: {
      asset: {
        url: "/images/products/product_7.png"
      }
    }
  },
  {
    _id: "cat8",
    name: "Washing Machines",
    slug: { current: "washing-machines" },
    description: "Laundry appliances and solutions",
    productCount: 2,
    image: {
      asset: {
        url: "/images/products/product_8.png"
      }
    }
  },
  {
    _id: "cat9",
    name: "Refrigerators",
    slug: { current: "refrigerators" },
    description: "Kitchen refrigeration appliances",
    productCount: 2,
    image: {
      asset: {
        url: "/images/products/product_9.png"
      }
    }
  },
  {
    _id: "cat10",
    name: "Freezers",
    slug: { current: "freezers" },
    description: "Deep freezers and chest freezers",
    productCount: 2,
    image: {
      asset: {
        url: "/images/products/product_10.png"
      }
    }
  },
  {
    _id: "cat11",
    name: "Home Decor",
    slug: { current: "home-decor" },
    description: "Decorative items and furniture",
    productCount: 2,
    image: {
      asset: {
        url: "/images/products/product_11.png"
      }
    }
  },
  {
    _id: "cat12",
    name: "Sports & Fitness",
    slug: { current: "sports-fitness" },
    description: "Sports equipment and fitness gear",
    productCount: 2,
    image: {
      asset: {
        url: "/images/products/product_12.png"
      }
    }
  }
];

export const fakeBrands = [
  {
    _id: "brand1",
    name: "Apple",
    slug: { current: "apple" },
    description: "Premium technology products",
    image: {
      asset: {
        url: "/images/brands/brand_1.webp"
      }
    }
  },
  {
    _id: "brand2",
    name: "Samsung",
    slug: { current: "samsung" },
    description: "Innovation for everyone",
    image: {
      asset: {
        url: "/images/brands/brand_2.jpg"
      }
    }
  },
  {
    _id: "brand3",
    name: "Sony",
    slug: { current: "sony" },
    description: "Audio and entertainment",
    image: {
      asset: {
        url: "/images/brands/brand_3.png"
      }
    }
  },
  {
    _id: "brand4",
    name: "Microsoft",
    slug: { current: "microsoft" },
    description: "Software and hardware solutions",
    image: {
      asset: {
        url: "/images/brands/brand_4.png"
      }
    }
  },
  {
    _id: "brand5",
    name: "Google",
    slug: { current: "google" },
    description: "Search and mobile technology",
    image: {
      asset: {
        url: "/images/brands/brand_5.png"
      }
    }
  },
  {
    _id: "brand6",
    name: "Dell",
    slug: { current: "dell" },
    description: "Computer technology solutions",
    image: {
      asset: {
        url: "/images/brands/brand_6.png"
      }
    }
  },
  {
    _id: "brand7",
    name: "Lenovo",
    slug: { current: "lenovo" },
    description: "Computer technology solutions",
    image: {
      asset: {
        url: "/images/brands/brand_7.png"
      }
    }
  },
  {
    _id: "brand8",
    name: "HP",
    slug: { current: "hp" },
    description: "Computer technology solutions",
    image: {
      asset: {
        url: "/images/brands/brand_8.png"
      }
    }
  }
];

export const fakeProducts = [
  {
    _id: "prod1",
    name: "iPhone 15 Pro Max",
    slug: { current: "iphone-15-pro-max" },
    price: 1199,
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
    ]
  },
  {
    _id: "prod2",
    name: "MacBook Pro 16-inch",
    slug: { current: "macbook-pro-16" },
    price: 2499,
    discount: 0,
    description: "Powerful laptop for professionals with M3 Pro chip",
    image: {
      asset: {
        url: "/images/products/product_7.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_7.png" } },
      { asset: { url: "/images/products/product_8.png" } }
    ],
    category: {
      _ref: "cat2",
      name: "Laptops"
    },
    brand: {
      _ref: "brand1",
      name: "Apple"
    },
    stock: 25,
    isNew: true,
    isFeatured: true,
    specifications: [
      "16.2-inch Liquid Retina XDR display",
      "M3 Pro chip",
      "18GB unified memory",
      "512GB SSD storage"
    ]
  },
  {
    _id: "prod3",
    name: "AirPods Pro (2nd generation)",
    slug: { current: "airpods-pro-2nd" },
    price: 249,
    discount: 0,
    description: "Premium wireless earbuds with active noise cancellation",
    image: {
      asset: {
        url: "/images/products/product_3.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_3.png" } },
      { asset: { url: "/images/products/product_4.png" } }
    ],
    category: {
      _ref: "cat3",
      name: "Headphones"
    },
    brand: {
      _ref: "brand1",
      name: "Apple"
    },
    stock: 100,
    isNew: false,
    isFeatured: true,
    specifications: [
      "Active Noise Cancellation",
      "Transparency mode",
      "Spatial audio",
      "Up to 6 hours listening time"
    ]
  },
  {
    _id: "prod4",
    name: "iPad Air",
    slug: { current: "ipad-air" },
    price: 599,
    discount: 0,
    description: "Versatile tablet with M1 chip for work and creativity",
    image: {
      asset: {
        url: "/images/products/product_9.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_9.png" } },
      { asset: { url: "/images/products/product_10.png" } }
    ],
    category: {
      _ref: "cat4",
      name: "Tablets"
    },
    brand: {
      _ref: "brand1",
      name: "Apple"
    },
    stock: 75,
    isNew: false,
    isFeatured: false,
    specifications: [
      "10.9-inch Liquid Retina display",
      "M1 chip",
      "12MP Wide camera",
      "All-day battery life"
    ]
  },
  {
    _id: "prod5",
    name: "Apple Watch Series 9",
    slug: { current: "apple-watch-series-9" },
    price: 399,
    discount: 12,
    description: "Advanced smartwatch with health monitoring",
    image: {
      asset: {
        url: "/images/products/product_5.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_5.png" } },
      { asset: { url: "/images/products/product_6.png" } }
    ],
    category: {
      _ref: "cat5",
      name: "Smart Watch"
    },
    brand: {
      _ref: "brand1",
      name: "Apple"
    },
    stock: 60,
    isNew: true,
    isFeatured: true,
    specifications: [
      "45mm Retina display",
      "S9 SiP chip",
      "Blood oxygen monitoring",
      "ECG app"
    ]
  },
  {
    _id: "prod6",
    name: "Samsung Galaxy S24 Ultra",
    slug: { current: "samsung-galaxy-s24-ultra" },
    price: 1299,
    discount: 7,
    description: "Premium Android smartphone with S Pen",
    image: {
      asset: {
        url: "/images/products/product_11.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_11.png" } },
      { asset: { url: "/images/products/product_12.png" } }
    ],
    category: {
      _ref: "cat1",
      name: "Smartphones"
    },
    brand: {
      _ref: "brand2",
      name: "Samsung"
    },
    stock: 40,
    isNew: true,
    isFeatured: true,
    specifications: [
      "6.8-inch Dynamic AMOLED 2X",
      "Snapdragon 8 Gen 3",
      "200MP main camera",
      "S Pen included"
    ]
  },
  {
    _id: "prod7",
    name: "Sony WH-1000XM5",
    slug: { current: "sony-wh-1000xm5" },
    price: 399,
    discount: 20,
    description: "Industry-leading noise canceling headphones",
    image: {
      asset: {
        url: "/images/products/product_13.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_13.png" } },
      { asset: { url: "/images/products/product_14.png" } }
    ],
    category: {
      _ref: "cat3",
      name: "Headphones"
    },
    brand: {
      _ref: "brand3",
      name: "Sony"
    },
    stock: 30,
    isNew: false,
    isFeatured: true,
    specifications: [
      "Industry-leading noise canceling",
      "30-hour battery life",
      "Quick Attention mode",
      "Multipoint connection"
    ]
  },
  {
    _id: "prod8",
    name: "Dell XPS 13",
    slug: { current: "dell-xps-13" },
    price: 1199,
    discount: 10,
    description: "Ultra-portable laptop with stunning display",
    image: {
      asset: {
        url: "/images/products/product_15.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_15.png" } },
      { asset: { url: "/images/products/product_16.png" } }
    ],
    category: {
      _ref: "cat2",
      name: "Laptops"
    },
    brand: {
      _ref: "brand6",
      name: "Dell"
    },
    stock: 20,
    isNew: false,
    isFeatured: false,
    specifications: [
      "13.4-inch InfinityEdge display",
      "Intel Core i7 processor",
      "16GB LPDDR5 RAM",
      "512GB SSD"
    ]
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
  {
    _id: "prod10",
    name: "OnePlus 12",
    slug: { current: "oneplus-12" },
    price: 799,
    discount: 12,
    description: "Flagship killer with premium features",
    image: {
      asset: {
        url: "/images/products/product_17.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_17.png" } }
    ],
    category: {
      _ref: "cat1",
      name: "Smartphones"
    },
    brand: {
      _ref: "brand2",
      name: "Samsung"
    },
    stock: 25,
    isNew: true,
    isFeatured: false,
    specifications: [
      "6.82-inch AMOLED display",
      "Snapdragon 8 Gen 3",
      "50MP triple camera",
      "100W fast charging"
    ]
  },
  {
    _id: "prod11",
    name: "Samsung Galaxy Tab S9",
    slug: { current: "samsung-galaxy-tab-s9" },
    price: 799,
    discount: 15,
    description: "Premium Android tablet with S Pen",
    image: {
      asset: {
        url: "/images/products/product_18.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_18.png" } }
    ],
    category: {
      _ref: "cat4",
      name: "Tablets"
    },
    brand: {
      _ref: "brand2",
      name: "Samsung"
    },
    stock: 20,
    isNew: true,
    isFeatured: true,
    specifications: [
      "11-inch Dynamic AMOLED 2X",
      "Snapdragon 8 Gen 2",
      "S Pen included",
      "IP68 water resistance"
    ]
  },
  {
    _id: "prod12",
    name: "Microsoft Surface Pro 9",
    slug: { current: "microsoft-surface-pro-9" },
    price: 1099,
    discount: 10,
    description: "2-in-1 laptop tablet hybrid",
    image: {
      asset: {
        url: "/images/products/product_19.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_19.png" } }
    ],
    category: {
      _ref: "cat4",
      name: "Tablets"
    },
    brand: {
      _ref: "brand4",
      name: "Microsoft"
    },
    stock: 15,
    isNew: true,
    isFeatured: false,
    specifications: [
      "13-inch PixelSense display",
      "Intel Core i7",
      "16GB RAM",
      "Type Cover compatible"
    ]
  },
  {
    _id: "prod13",
    name: "Samsung Galaxy Watch 6",
    slug: { current: "samsung-galaxy-watch-6" },
    price: 329,
    discount: 18,
    description: "Advanced smartwatch with health monitoring",
    image: {
      asset: {
        url: "/images/products/product_20.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_20.png" } }
    ],
    category: {
      _ref: "cat5",
      name: "Smart Watch"
    },
    brand: {
      _ref: "brand2",
      name: "Samsung"
    },
    stock: 40,
    isNew: true,
    isFeatured: true,
    specifications: [
      "1.5-inch Super AMOLED",
      "Exynos W930",
      "Sleep tracking",
      "40mm case size"
    ]
  },
  {
    _id: "prod14",
    name: "Garmin Fenix 7",
    slug: { current: "garmin-fenix-7" },
    price: 699,
    discount: 5,
    description: "Rugged GPS smartwatch for athletes",
    image: {
      asset: {
        url: "/images/products/product_21.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_21.png" } }
    ],
    category: {
      _ref: "cat5",
      name: "Smart Watch"
    },
    brand: {
      _ref: "brand3",
      name: "Sony"
    },
    stock: 20,
    isNew: false,
    isFeatured: false,
    specifications: [
      "1.3-inch display",
      "Multi-GNSS support",
      "22-day battery life",
      "Military-grade durability"
    ]
  },
  {
    _id: "prod15",
    name: "Bose QuietComfort 45",
    slug: { current: "bose-quietcomfort-45" },
    price: 329,
    discount: 25,
    description: "Premium noise-cancelling headphones",
    image: {
      asset: {
        url: "/images/products/product_22.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_22.png" } }
    ],
    category: {
      _ref: "cat3",
      name: "Headphones"
    },
    brand: {
      _ref: "brand3",
      name: "Sony"
    },
    stock: 30,
    isNew: false,
    isFeatured: true,
    specifications: [
      "Active noise cancellation",
      "24-hour battery life",
      "TriPort acoustic architecture",
      "Comfortable over-ear design"
    ]
  },
  {
    _id: "prod16",
    name: "Audio-Technica ATH-M50x",
    slug: { current: "audio-technica-ath-m50x" },
    price: 149,
    discount: 20,
    description: "Professional studio monitor headphones",
    image: {
      asset: {
        url: "/images/products/product_23.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_23.png" } }
    ],
    category: {
      _ref: "cat3",
      name: "Headphones"
    },
    brand: {
      _ref: "brand3",
      name: "Sony"
    },
    stock: 50,
    isNew: false,
    isFeatured: false,
    specifications: [
      "45mm large-aperture drivers",
      "Professional-grade sound",
      "Detachable cables",
      "Swiveling earcups"
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
    _id: "prod18",
    name: "Daikin Split AC 1.5 Ton",
    slug: { current: "daikin-split-ac-1-5-ton" },
    price: 599,
    discount: 12,
    description: "Energy efficient split air conditioner",
    image: {
      asset: {
        url: "/images/products/product_7.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_7.png" } }
    ],
    category: {
      _ref: "cat7",
      name: "Air Conditioners"
    },
    brand: {
      _ref: "brand2",
      name: "Samsung"
    },
    stock: 15,
    isNew: true,
    isFeatured: true,
    specifications: [
      "1.5 Ton capacity",
      "5 Star energy rating",
      "Copper condenser",
      "Remote control"
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
  {
    _id: "prod20",
    name: "Samsung Front Load 7kg",
    slug: { current: "samsung-front-load-7kg" },
    price: 699,
    discount: 20,
    description: "Efficient front loading washing machine",
    image: {
      asset: {
        url: "/images/products/product_9.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_9.png" } }
    ],
    category: {
      _ref: "cat8",
      name: "Washing Machines"
    },
    brand: {
      _ref: "brand2",
      name: "Samsung"
    },
    stock: 12,
    isNew: true,
    isFeatured: true,
    specifications: [
      "7kg capacity",
      "Front loading",
      "Digital inverter motor",
      "15 wash programs"
    ]
  },
  {
    _id: "prod21",
    name: "LG Top Load 6.5kg",
    slug: { current: "lg-top-load-6-5kg" },
    price: 449,
    discount: 15,
    description: "Affordable top loading washing machine",
    image: {
      asset: {
        url: "/images/products/product_10.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_10.png" } }
    ],
    category: {
      _ref: "cat8",
      name: "Washing Machines"
    },
    brand: {
      _ref: "brand2",
      name: "Samsung"
    },
    stock: 18,
    isNew: false,
    isFeatured: false,
    specifications: [
      "6.5kg capacity",
      "Top loading",
      "Smart inverter motor",
      "10 wash programs"
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
  {
    _id: "prod24",
    name: "Haier Deep Freezer 300L",
    slug: { current: "haier-deep-freezer-300l" },
    price: 799,
    discount: 12,
    description: "Large capacity deep freezer",
    image: {
      asset: {
        url: "/images/products/product_13.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_13.png" } }
    ],
    category: {
      _ref: "cat10",
      name: "Freezers"
    },
    brand: {
      _ref: "brand2",
      name: "Samsung"
    },
    stock: 8,
    isNew: true,
    isFeatured: false,
    specifications: [
      "300L capacity",
      "Deep freezer design",
      "Manual defrost",
      "Lock and key"
    ]
  },
  {
    _id: "prod25",
    name: "Blue Star Chest Freezer 200L",
    slug: { current: "blue-star-chest-freezer-200l" },
    price: 549,
    discount: 15,
    description: "Reliable chest freezer for home use",
    image: {
      asset: {
        url: "/images/products/product_14.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_14.png" } }
    ],
    category: {
      _ref: "cat10",
      name: "Freezers"
    },
    brand: {
      _ref: "brand3",
      name: "Sony"
    },
    stock: 12,
    isNew: false,
    isFeatured: false,
    specifications: [
      "200L capacity",
      "Chest freezer design",
      "Energy efficient",
      "Removable baskets"
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
  {
    _id: "prod28",
    name: "IKEA Hemnes Bed Frame",
    slug: { current: "ikea-hemnes-bed-frame" },
    price: 299,
    discount: 20,
    description: "Solid wood bed frame with storage",
    image: {
      asset: {
        url: "/images/products/product_17.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_17.png" } }
    ],
    category: {
      _ref: "cat11",
      name: "Home Decor"
    },
    brand: {
      _ref: "brand1",
      name: "Apple"
    },
    stock: 15,
    isNew: false,
    isFeatured: false,
    specifications: [
      "Queen size",
      "Solid pine wood",
      "Under-bed storage",
      "Easy assembly"
    ]
  },
  {
    _id: "prod29",
    name: "Philips Smart LED TV 55\"",
    slug: { current: "philips-smart-led-tv-55" },
    price: 799,
    discount: 18,
    description: "4K Smart LED TV with Android",
    image: {
      asset: {
        url: "/images/products/product_18.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_18.png" } }
    ],
    category: {
      _ref: "cat11",
      name: "Home Decor"
    },
    brand: {
      _ref: "brand3",
      name: "Sony"
    },
    stock: 12,
    isNew: true,
    isFeatured: true,
    specifications: [
      "55-inch 4K display",
      "Android TV",
      "HDR support",
      "Built-in WiFi"
    ]
  },
  {
    _id: "prod30",
    name: "Adidas Running Shoes",
    slug: { current: "adidas-running-shoes" },
    price: 129,
    discount: 25,
    description: "Comfortable running shoes for daily training",
    image: {
      asset: {
        url: "/images/products/product_19.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_19.png" } }
    ],
    category: {
      _ref: "cat12",
      name: "Sports & Fitness"
    },
    brand: {
      _ref: "brand1",
      name: "Apple"
    },
    stock: 30,
    isNew: false,
    isFeatured: false,
    specifications: [
      "Breathable mesh upper",
      "Boost midsole",
      "Continental rubber outsole",
      "Size 7-12 available"
    ]
  },
  {
    _id: "prod31",
    name: "Nike Fitness Tracker",
    slug: { current: "nike-fitness-tracker" },
    price: 199,
    discount: 15,
    description: "Advanced fitness tracker with GPS",
    image: {
      asset: {
        url: "/images/products/product_20.png"
      }
    },
    images: [
      { asset: { url: "/images/products/product_20.png" } }
    ],
    category: {
      _ref: "cat12",
      name: "Sports & Fitness"
    },
    brand: {
      _ref: "brand5",
      name: "Google"
    },
    stock: 25,
    isNew: true,
    isFeatured: false,
    specifications: [
      "Built-in GPS",
      "Heart rate monitor",
      "7-day battery life",
      "Water resistant"
    ]
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
    image: {
      asset: {
        url: "/images/emptyCart.png"
      }
    },
    author: {
      name: "Tech Reviewer",
      image: {
        asset: {
          url: "/images/products/product_1.png"
        }
      }
    },
    category: {
      title: "Technology",
      slug: { current: "technology" }
    }
  },
  {
    _id: "blog2",
    title: "Gaming Laptop Buying Guide",
    slug: { current: "gaming-laptop-buying-guide" },
    excerpt: "Everything you need to know before buying your next gaming laptop.",
    content: "Content for the gaming laptop guide...",
    publishedAt: "2024-01-10T14:30:00Z",
    image: {
      asset: {
        url: "/images/products/product_7.png"
      }
    },
    author: {
      name: "Gaming Expert",
      image: {
        asset: {
          url: "/images/products/product_7.png"
        }
      }
    },
    category: {
      title: "Gaming",
      slug: { current: "gaming" }
    }
  },
  {
    _id: "blog3",
    title: "Wireless Audio Revolution",
    slug: { current: "wireless-audio-revolution" },
    excerpt: "How wireless audio technology is changing the way we listen to music.",
    content: "Content about wireless audio technology...",
    publishedAt: "2024-01-05T09:15:00Z",
    image: {
      asset: {
        url: "/images/products/product_3.png"
      }
    },
    author: {
      name: "Audio Specialist",
      image: {
        asset: {
          url: "/images/products/product_3.png"
        }
      }
    },
    category: {
      title: "Audio",
      slug: { current: "audio" }
    }
  },
  {
    _id: "blog4",
    title: "Smart Home Automation",
    slug: { current: "smart-home-automation" },
    excerpt: "How smart home automation is changing the way we live.",
    content: "Content about smart home automation...",
    publishedAt: "2024-01-05T09:15:00Z",
    image: {
      asset: {
        url: "/images/products/product_4.png"
      }
    },
    author: {
      name: "Smart Home Expert",
      image: {
        asset: {
          url: "/images/products/product_4.png"
        }
      }
    },
    category: {
      title: "Smart Home",
      slug: { current: "smart-home" }
    }
  },
  {
    _id: "blog5",
    title: "Health & Fitness",
    slug: { current: "smart-home-automation" },
    excerpt: "How health & fitness is changing the way we live.",
    content: "Content about health & fitness...",
    publishedAt: "2024-01-05T09:15:00Z",
    image: {
      asset: {
        url: "/images/products/product_4.png"
      }
    },
    author: {
      name: "Smart Home Expert",
      image: {
        asset: {
          url: "/images/products/product_4.png"
        }
      }
    },
    category: {
      title: "Health & Fitness",
      slug: { current: "smart-home" }
    }
  },
  {
    _id: "blog1",
    title: "Top 10 Smartphones of 2024",
    slug: { current: "top-10-smartphones-2024" },
    excerpt: "Discover the best smartphones that defined 2024 with cutting-edge features and innovative designs.",
    content: "Content for the blog post about top smartphones...",
    publishedAt: "2024-01-15T10:00:00Z",
    image: {
      asset: {
        url: "/images/emptyCart.png"
      }
    },
    author: {
      name: "Tech Reviewer",
      image: {
        asset: {
          url: "/images/products/product_1.png"
        }
      }
    },
    category: {
      title: "Technology",
      slug: { current: "technology" }
    }
  },
  {
    _id: "blog2",
    title: "Gaming Laptop Buying Guide",
    slug: { current: "gaming-laptop-buying-guide" },
    excerpt: "Everything you need to know before buying your next gaming laptop.",
    content: "Content for the gaming laptop guide...",
    publishedAt: "2024-01-10T14:30:00Z",
    image: {
      asset: {
        url: "/images/products/product_7.png"
      }
    },
    author: {
      name: "Gaming Expert",
      image: {
        asset: {
          url: "/images/products/product_7.png"
        }
      }
    },
    category: {
      title: "Gaming",
      slug: { current: "gaming" }
    }
  },
  {
    _id: "blog3",
    title: "Wireless Audio Revolution",
    slug: { current: "wireless-audio-revolution" },
    excerpt: "How wireless audio technology is changing the way we listen to music.",
    content: "Content about wireless audio technology...",
    publishedAt: "2024-01-05T09:15:00Z",
    image: {
      asset: {
        url: "/images/products/product_3.png"
      }
    },
    author: {
      name: "Audio Specialist",
      image: {
        asset: {
          url: "/images/products/product_3.png"
        }
      }
    },
    category: {
      title: "Audio",
      slug: { current: "audio" }
    }
  },
  {
    _id: "blog4",
    title: "Smart Home Automation",
    slug: { current: "smart-home-automation" },
    excerpt: "How smart home automation is changing the way we live.",
    content: "Content about smart home automation...",
    publishedAt: "2024-01-05T09:15:00Z",
    image: {
      asset: {
        url: "/images/products/product_4.png"
      }
    },
    author: {
      name: "Smart Home Expert",
      image: {
        asset: {
          url: "/images/products/product_4.png"
        }
      }
    },
    category: {
      title: "Smart Home",
      slug: { current: "smart-home" }
    }
  },
  {
    _id: "blog5",
    title: "Health & Fitness",
    slug: { current: "smart-home-automation" },
    excerpt: "How health & fitness is changing the way we live.",
    content: "Content about health & fitness...",
    publishedAt: "2024-01-05T09:15:00Z",
    image: {
      asset: {
        url: "/images/products/product_4.png"
      }
    },
    author: {
      name: "Smart Home Expert",
      image: {
        asset: {
          url: "/images/products/product_4.png"
        }
      }
    },
    category: {
      title: "Health & Fitness",
      slug: { current: "smart-home" }
    }
  }
];

export const fakeBlogCategories = [
  {
    _id: "blogcat1",
    title: "Technology",
    slug: { current: "technology" },
    description: "Latest tech news and reviews"
  },
  {
    _id: "blogcat2", 
    title: "Gaming",
    slug: { current: "gaming" },
    description: "Gaming hardware and software"
  },
  {
    _id: "blogcat3",
    title: "Audio",
    slug: { current: "audio" },
    description: "Audio equipment and reviews"
  }
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

export const getFakeBlogCategories = () => {
  return fakeBlogCategories;
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
