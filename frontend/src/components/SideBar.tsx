import { SmallBlogCard } from "./SmallBlogCard";
import { useBlogs } from "../hooks"; // Assuming you have the `useBlogs` hook

export const SideBar = () => {
  const { blogs, loading } = useBlogs();

  if (loading) {
    return (
      <div className="flex justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-gray-100">
      <h2 className="text-xl font-semibold mb-4">Recent Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {blogs.slice(0, 5).map((blog) => (
          <SmallBlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            authorName={blog.author.name || "Anonymous"}
            publishedDate={"2nd Feb 2024"} // You can dynamically change this based on your data
          />
        ))}
      </div>
    </div>
  );
};
