// constants/fakeData.ts

export const getFakeBlogs = (count = 10) => {
  const fakeImages = [
    "https://picsum.photos/seed/blog1/600/400",
    "https://picsum.photos/seed/blog2/600/400",
    "https://picsum.photos/seed/blog3/600/400",
    "https://picsum.photos/seed/blog4/600/400",
    "https://picsum.photos/seed/blog5/600/400",
    "https://picsum.photos/seed/blog6/600/400",
    "https://picsum.photos/seed/blog7/600/400",
    "https://picsum.photos/seed/blog8/600/400",
    "https://picsum.photos/seed/blog9/600/400",
    "https://picsum.photos/seed/blog10/600/400",
  ];

  const toSlug = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  return Array.from({ length: count }).map((_, i) => {
    const title = `Bài viết tin tức số ${i + 1}`;
    return {
      _id: `blog_${i + 1}`,
      title,
      slug: { current: toSlug(title) },
      image: {
        asset: {
          url: fakeImages[i % fakeImages.length],
        },
      },
      description: `Đây là mô tả ngắn gọn cho bài viết "${title}". Nội dung giới thiệu hấp dẫn, thu hút người đọc.`,
      createdAt: new Date().toISOString(),
    };
  });
};
