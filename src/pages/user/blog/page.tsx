import Title from "@/ui/title";
import { getFakeBlogs } from "@/constants/fakeData";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import { Link } from "react-router";

const BlogPage = async () => {
  const blogs = await getFakeBlogs(10);
  return (
    <div >
      <Title className="text-lg uppercase tracking-wide">
        Blog</Title>
      <div className="grid grid-cols-2 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-2">
        {blogs?.map((blog) => (
          <div
            key={blog?._id}
            className="rounded-lg group overflow-hidden border border-border"
          >
            {blog?.image && (
              <Link to={`/blog/${blog?.slug?.current}`} className="block">
                <img
                  src={blog?.image?.asset?.url || "/images/products/product_1.png"}
                  alt="blogImage"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105
"
                />
              </Link>
            )}
            <div className="p-3 border-t border-border">
              <div className="text-xs flex items-center gap-5">
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
