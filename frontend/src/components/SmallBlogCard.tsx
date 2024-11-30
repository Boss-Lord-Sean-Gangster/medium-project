// components/SmallBlogCard.tsx

import React from "react";
import { Link } from "react-router-dom";

interface SmallBlogCardProps {
  id: number;
  title: string;
  authorName: string;
  publishedDate: string;
}

export const SmallBlogCard: React.FC<SmallBlogCardProps> = ({ title, authorName, publishedDate, id }) => {
  return (
    <Link to={`/blog/${id}`}>
    <div className="w-40 h-40 cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900">{title.split(" ").slice(0, 3).join(" ")}...</h3>
        <p className="text-xs text-gray-600">{authorName}</p>
        <p className="text-xs text-gray-400">{publishedDate}</p>
      </div>
    </div>
    </Link>
  );
};
