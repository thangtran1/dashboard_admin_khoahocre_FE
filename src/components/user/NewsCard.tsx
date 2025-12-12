import Title from "@/ui/title";
import { getFakeBlogs } from "@/constants/fakeData";
import { Link } from "react-router";
import SeeMore from "@/ui/see-more";

const NewsPage = () => {
    const blogs = getFakeBlogs(10);
    return (
        <div >
            <div className="flex items-center justify-between mb-4">
                <Title className="text-xl font-bold uppercase tracking-wider text-foreground">
                    TIN TỨCádasdasd
                </Title>
                <SeeMore to="/all-news">Xem thêm</SeeMore>
            </div>

            <div className="grid  grid-cols-2 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {blogs?.slice(0, 5).map((blog) => (
                    <div
                        key={blog?._id}
                        className="group rounded-lg p-2 overflow-hidden border border-border shadow-md hover:shadow-lg transition-shadow duration-300 bg-muted"
                    >
                        {blog?.image && (
                            <Link to={`/all-news/${blog?.slug?.current}`} className="block h-40">
                                <img
                                    src={blog?.image?.asset?.url}
                                    alt="blogImage"
                                    className="w-full h-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </Link>
                        )}

                        <div>
                            <Link to={`/blog/${blog.slug.current}`} className="block">
                                <span className="text-base !text-foreground font-semibold tracking-wide mt-1 text-gray-900 block transition-colors group-hover:underline">
                                    {blog.title}
                                </span>
                            </Link>

                            <p className="text-xs text-muted-foreground mt-1 line-clamp-3">
                                {blog.description}
                            </p>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default NewsPage;