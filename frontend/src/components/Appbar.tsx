import { useUser } from "../hooks";
import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"

export const Appbar = () => {
    const { loading, user, posts, error } = useUser();
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
                Medium
        </Link>
        <div>
        <Link to={`/publish`}>
          <button
            type="button"
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            New
          </button>
        </Link>
            <Link to={`/user`}>
            <Avatar size={"big"} name={user?.name || "Nikhil"} />
            </Link>
        </div>
    </div>
}