import Title from "@/components/user/Title";
import { getFakeBlogs } from "@/constants/fakeData";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import { Link } from "react-router";

const BlogPage = async () => {
  const blogs = await getFakeBlogs(10);
  return (
    <div className="mb-10 lg:mb-20">
      <Title>Blog</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
        {blogs?.map((blog) => (
          <div key={blog?._id} className="rounded-lg overflow-hidden border border-border">
            {blog?.image && (
              <Link to={`/blog/${blog?.slug?.current}`}>
                <img
                  src={blog?.image?.asset?.url || "/images/products/product_1.png"}
                  alt="blogImage"
                  className="w-full max-h-80 object-cover"
                />
              </Link>
            )}
            <div className="bg-background p-3 border-t border-border">
              <div className="text-xs flex items-center gap-5">
                {/* CATEGORY WITH BEAUTIFUL UNDERLINE ANIMATION */}
                <div className="flex items-center relative cursor-pointer">
                  <p
                    className="
                      font-semibold tracking-wider relative
                      after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                      after:h-[1.5px] after:w-0 after:bg-current after:transition-all
                      hover:after:w-full
                    "
                  >
                    {blog?.category?.title || "Technology"}
                  </p>
                </div>

                {/* DATE */}
                <p className="
                flex items-center gap-1 text-lightColor cursor-pointer font-semibold tracking-wider relative
                      after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                      after:h-[1.5px] after:w-0 after:bg-current after:transition-all
                      hover:after:w-full">
                  <Calendar size={15} /> {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                </p>
              </div>

              {/* BLOG TITLE */}
              <Link
                to={`/blog/${blog?.slug?.current}`}
                className="text-base font-semibold tracking-wide mt-3 line-clamp-2"
              >
                {blog?.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
