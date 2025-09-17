// src/pages/Blog_Page/BlogDetailsPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

type Blog = {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  content: string;
  category: string;
  author: string;
  date: string;
};

export const BlogDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/blogs.json")
      .then(res => res.json())
      .then((data: Blog[]) => {
        const found = data.find(b => String(b.id) === id);
        setBlog(found || null);
      });
  }, [id]);

  if (!blog) return <div className="min-h-screen flex items-center justify-center">লোড হচ্ছে...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <button onClick={() => navigate(-1)} className="px-3 py-2 mb-4 border rounded">← ব্লগে ফিরে যান</button>
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <div className="text-gray-600 text-sm mb-4">
        {blog.author} • {blog.date} • <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded">{blog.category}</span>
      </div>
      <img src={blog.thumbnail} alt={blog.title} className="w-full h-64 object-cover rounded mb-6" />
      <div className="text-gray-800" dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, "<br/>") }} />
    </div>
  );
};
