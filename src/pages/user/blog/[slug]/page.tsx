import Title from "@/ui/title";
import {
  getFakeOtherBlogs,
  getFakeBlogBySlug,
} from "@/constants/fakeData";
import dayjs from "dayjs";
import { Calendar, ChevronLeftIcon, Pencil } from "lucide-react";
import { Link, useParams } from "react-router";

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = getFakeBlogBySlug(slug || "");
  if (!blog) return <div>Blog not found</div>;
  const blogData = blog;

  const otherBlogs = getFakeOtherBlogs(slug || "", 10);
  return (
    <div className="py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="md:col-span-3">
          <div className="border border-border rounded-lg overflow-hidden">
          {blogData?.image && (
            <img
              src={blogData?.image?.asset?.url || "/images/products/product_1.png"}
              alt={blogData.title || "Blog Image"}
              className="w-full max-h-[500px] object-cover rounded-lg"
            />
          )}
          </div>
          <div>
            <div className="text-xs flex items-center gap-5 my-7">
              <div className="flex items-center relative group cursor-pointer">
                <p className="font-semibold text-shop_dark_green tracking-wider">
                  {blogData?.category?.title || "Technology"}
                </p>
                <span className="absolute left-0 -bottom-1.5 bg-border/30 inline-block w-full h-[2px] group-hover:bg-shop_dark_green hover:cursor-pointer hoverEffect" />
              </div>
              <p className="flex items-center gap-1 relative group hover:cursor-pointer hover:text-shop_dark_green hoverEffect">
                <Calendar size={15} />{" "}
                {dayjs(blogData.publishedAt).format("MMMM D, YYYY")}
                <span className="absolute left-0 -bottom-1.5 bg-border/30 inline-block w-full h-[2px] group-hover:bg-shop_dark_green hoverEffect" />
              </p>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-darkColor mb-5">
              {blogData?.title}
            </h1>
            <div>
              <div>
                {blogData.content && (
                  <div className="prose max-w-none">
                    <p className="my-5 text-base leading-8 first:mt-0 last:mb-0">
                      {blogData.content}
                    </p>
                  </div>
                )}
                {!blogData.content && blogData.excerpt && (
                  <div className="prose max-w-none">
                    <p className="my-5 text-base leading-8 first:mt-0 last:mb-0">
                      {blogData.excerpt}
                    </p>
                  </div>
                )}
                <div className="mt-10">
                  <div className="flex items-center gap-2 text-sm">
                    <Pencil size={16} />
                    <p>
                      Written by{" "}
                      <span className="font-semibold text-darkColor">
                        {blogData?.author?.name || "Admin"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>  
          </div>
        </div>
        <div className="w-full p-2 border border-border rounded-lg h-[500px] overflow-y-auto pr-1">
  <div className="bg-shop_light_bg rounded-lg">
    <Title className="text-lg mb-0">Related Posts</Title>

    <div className="mt-5 space-y-2">
      {otherBlogs?.map((otherBlog: any) => (
        <div key={otherBlog?._id} className="group mb-1">
          <Link
            to={`/blog/${otherBlog?.slug?.current}`}
            className="flex gap-3 border-b border-border py-3"
          >
            {otherBlog?.image && (
              <img
                src={otherBlog?.image?.asset?.url || "/images/products/product_1.png"}
                alt={otherBlog?.title || "Blog image"}
                className="w-14 h-14 object-cover rounded-md"
              />
            )}

            <div className="flex-1">
              <h3 className="text-sm font-semibold text-darkColor group-hover:text-shop_dark_green hoverEffect line-clamp-2">
                {otherBlog?.title}
              </h3>

              <p className="text-xs mt-1">
                {dayjs(otherBlog?.publishedAt).format("MMM D, YYYY")}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
</div>

      </div>
      <div className="mt-10">
        <div className="flex items-center justify-between border-t border-t-gray-200 pt-5">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-sm hover:text-shop_dark_green hoverEffect"
          >
            <ChevronLeftIcon size={16} />
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;