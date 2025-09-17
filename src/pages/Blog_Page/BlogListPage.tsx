// src/pages/BlogListPage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
// import { Link } from "react-router-dom";

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

export const BlogListPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filtered, setFiltered] = useState<Blog[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("সবগুলো ব্লগ দেখুন");

  useEffect(() => {
    fetch("/blogs.json")
      .then(res => res.json())
      .then((data: Blog[]) => {
        setBlogs(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    let result = [...blogs];
    if (category && category !== "সবগুলো ব্লগ দেখুন") {
      if (category === "সর্বশেষ ব্লগ") {
        result = result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      } else {
        result = result.filter(b => b.category === category);
      }
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(b => (b.title + b.short_description + b.content).toLowerCase().includes(q));
    }
    setFiltered(result);
  }, [blogs, query, category]);

  const categories = [
    "সবগুলো ব্লগ দেখুন",
    "সর্বশেষ ব্লগ",
    "নিরাপত্তা ও সুরক্ষা টিপস",
    "ট্রাফিক ও ভ্রমণ গাইড",
    "ড্রাইভার/পার্টনার সফলতার গল্প",
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">স্বাগতম আমাদের ব্লগ পেইজে 🚖</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          placeholder="ব্লগ সার্চ করুন..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded border"
        />
        <select value={category} onChange={e => setCategory(e.target.value)} className="px-4 py-2 rounded border">
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(blog => (
          <div key={blog.id} className="border rounded-lg overflow-hidden shadow-sm">
            <img src={blog.thumbnail} alt={blog.title} className="w-full h-44 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
              <p className="text-gray-700 text-sm mb-2">{blog.short_description}</p>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>{blog.author} • {blog.date}</span>
                <Link to={`/blogs/${blog.id}`} className="text-white bg-teal-500 px-2 py-1 rounded">বিস্তারিত</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
