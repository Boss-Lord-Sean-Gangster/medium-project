import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface Blog {
    "content": string;
    "title": string;
    "id": number;
    "publishedDate"?: string;
    "author": {
        "name": string
    }
}

export interface User {
    id: number;
    name: string;
    email: string;
    createdAt?: string; // Optional, in case it's not always returned
  }

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.posts);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}
export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.post);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        blog
    }

}


  
export const useUser = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Blog[]>([]); // New state to hold the user's posts
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          
          // Set user data
          setUser(response.data);
  
          // Set posts data
          if (response.data.posts) {
            setPosts(response.data.posts);
          }
        } catch (err) {
          setError("Failed to fetch user data. Please try again.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchUser();
    }, []);
  
    return { loading, user, posts, error }; // Return posts alongside user data
  };