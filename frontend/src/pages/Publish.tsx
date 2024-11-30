import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 min-h-screen">
            <Appbar />
            <div className="flex justify-center w-full pt-12">
                <div className="max-w-4xl w-full">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <input
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            type="text"
                            className="w-full bg-transparent border-b-2 border-gray-300 text-4xl font-semibold text-gray-800 focus:outline-none focus:ring-0 mb-6"
                            placeholder="Title"
                        />
                        <TextEditor
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                        <div className="flex justify-between mt-8">
                            <button
                                onClick={async () => {
                                    const response = await axios.post(
                                        `${BACKEND_URL}/api/v1/blog`,
                                        {
                                            title,
                                            content: description,
                                        },
                                        {
                                            headers: {
                                                Authorization: localStorage.getItem("token"),
                                            },
                                        }
                                    );
                                    navigate(`/blog/${response.data.id}`);
                                }}
                                type="submit"
                                className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-black rounded-full focus:ring-4 focus:ring-blue-200 transition duration-200"
                            >
                                Publish Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="mt-6">
            <div className="bg-white rounded-lg shadow-sm mb-4">
                <textarea
                    onChange={onChange}
                    id="editor"
                    rows={12}
                    className="block w-full p-6 text-lg text-gray-700 bg-transparent border-0 focus:outline-none focus:ring-0"
                    placeholder="Write an article..."
                    required
                />
            </div>
        </div>
    );
}
