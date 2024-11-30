import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useState, useEffect } from "react";
import { useBlogs } from "../hooks";
import { SideBar } from "../components/SideBar";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  const [sortedBlogs, setSortedBlogs] = useState(blogs);
  const [sortOrder, setSortOrder] = useState("asc"); // For ascending or descending sort
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to track dropdown visibility
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  // Function to calculate reading time
  const calculateReadingTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200); // Assume average reading speed is 200 words per minute
    return minutes;
  };

  // Sort the blogs based on the selected reading time
  const sortBlogs = (order: string) => {
    const sorted = [...blogs].sort((a, b) => {
      const aReadingTime = calculateReadingTime(a.content);
      const bReadingTime = calculateReadingTime(b.content);

      if (order === "asc") {
        return aReadingTime - bReadingTime;
      } else {
        return bReadingTime - aReadingTime;
      }
    });
    setSortedBlogs(sorted);
  };

  // Update sortedBlogs when the blogs or sortOrder changes
  useEffect(() => {
    if (blogs.length) {
      sortBlogs(sortOrder);
    }
  }, [blogs, sortOrder]);

  // Handle pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handleSortChange = (order: string) => {
    setSortOrder(order);
    setDropdownOpen(false); // Close the dropdown after selecting an option
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex flex-col mt-4 px-4">
        <div className="flex flex-col items-end mb-4 relative">
          <button
            id="dropdownDefaultButton"
            onClick={toggleDropdown}
            className="text-white max-w-fit bg-slate-600 hover:bg-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-slate-600 dark:hover:bg-black"
            type="button"
          >
            Sort by reading time
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {/* Dropdown options */}
          <div
            id="dropdown"
            className={`z-10 absolute top-full mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${dropdownOpen ? "block" : "hidden"}`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <a
                  href="#"
                  onClick={() => handleSortChange("asc")}
                  className="block px-4 py-2 hover:bg-slate-500 hover:text-white transition-all rounded-md"
                >
                  Shortest to Longest
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => handleSortChange("desc")}
                  className="block px-4 py-2 hover:bg-slate-500 hover:text-white transition-all rounded-md"
                >
                  Longest to Shortest
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Main blog content and sidebar */}
        <div className="grid grid-cols-12 gap-4">
          {/* Main blog section (10 columns) */}
          <div className="col-span-12 lg:col-span-10 flex flex-col justify-start items-center mt-8">
            {currentBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={"2nd Feb 2024"}
              />
            ))}

            {/* Pagination */}
            <div className="flex gap-20 mt-4">
              <button
                className="px-4 py-2 bg-slate-600 text-white rounded-md"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                className="px-4 py-2 bg-slate-600 text-white rounded-md"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={indexOfLastBlog >= sortedBlogs.length}
              >
                Next
              </button>
            </div>
          </div>

          {/* Sidebar section (2 columns only visible on lg screens and above) */}
          <div className="col-span-12 lg:col-span-2 mt-4 lg:mt-8">
            <SideBar />
          </div>
        </div>
      </div>
    </div>
  );
};
