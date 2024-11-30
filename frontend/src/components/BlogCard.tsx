import { Link } from "react-router-dom";
import { useState } from "react";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    const [style, setStyle] = useState({
        transform: "rotateX(0deg) rotateY(0deg)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left; // X coordinate relative to card
        const y = e.clientY - rect.top; // Y coordinate relative to card
        const centerX = rect.width / 2; // Center X coordinate
        const centerY = rect.height / 2; // Center Y coordinate
        const rotateX = ((y - centerY) / centerY) * 10; // Rotate angle for Y-axis
        const rotateY = -((x - centerX) / centerX) * 10; // Rotate angle for X-axis

        const shadowX = -rotateY * 3; // Shadow offset for X
        const shadowY = rotateX * 3; // Shadow offset for Y

        setStyle({
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            boxShadow: `${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.2)`
        });
    };

    const handleMouseLeave = () => {
        setStyle({
            transform: "rotateX(0deg) rotateY(0deg)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
        });
    };

    return (
        <Link to={`/blog/${id}`}>
            <div
                className="p-4 border-b mt-4 border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer transition-transform duration-300 ease-out bg-white rounded-lg"
                style={style}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex">
                    <Avatar name={authorName} />
                    <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div>
                    <div className="flex justify-center flex-col pl-2">
                        <Circle />
                    </div>
                    <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                        {publishedDate}
                    </div>
                </div>
                <div className="text-xl font-semibold pt-2">{title}</div>
                <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
                <div className="text-slate-500 text-sm font-thin pt-4">
                    {`${Math.ceil(content.length / 1000)} minute(s) read`}
                </div>
            </div>
        </Link>
    );
};

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({ name, size = "small" }: { name: string; size?: "small" | "big" }) {
    return (
        <div
            className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
                size === "small" ? "w-6 h-6" : "w-10 h-10"
            }`}
        >
            <span
                className={`${
                    size === "small" ? "text-xs" : "text-md"
                } font-extralight text-gray-600 dark:text-gray-300`}
            >
                {name[0]}
            </span>
        </div>
    );
}
