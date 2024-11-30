import { Appbar } from "../components/Appbar";
import { Avatar, BlogCard } from "../components/BlogCard";
import { useUser } from "../hooks";

export const UserDetails = () => {
  const { loading, user, posts, error } = useUser();

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center items-center h-screen">
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center pt-8">
        <div className="max-w-screen-md w-full bg-white p-6 shadow rounded-lg">
          <div className="text-center">
            <Avatar name={user?.name || ""} size="big" />
            <h2 className="text-2xl font-semibold">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Additional Details</h3>
            <p>
              <span className="font-semibold">Joined: </span>
              {new Date(user?.createdAt || "").toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Posts</h2>
        <div className="grid gap-4">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              id={post.id}
              authorName={user?.name || "Anonymous"}
              title={post.title}
              content={post.content}
              publishedDate={"2nd Feb 2024"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
