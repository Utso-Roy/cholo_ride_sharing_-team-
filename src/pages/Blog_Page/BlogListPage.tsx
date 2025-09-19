/// src/pages/Blog_Page/BlogListPage.tsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import Hello from "../../assets/WelcomeAnimation.json";
import Lottie from "lottie-react";

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
            result = result.filter(b =>
                (b.title + b.short_description + b.content).toLowerCase().includes(q)
            );
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="bg-gradient-to-r from-[#274450] to-[#71BBB2] rounded-2xl">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex  justify-between items-center gap-4 px-4 sm:px-8"
                >
                    <h1 className="text-xl lg:text-4xl font-extrabold text-white drop-shadow">
                        স্বাগতম চলো ব্লগ পেইজে 🚖
                    </h1>
                    <Lottie
                        animationData={Hello}
                        loop={true}
                        style={{ width: 200, height: 200 }}
                    />
                </motion.div>

                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8 px-4 sm:px-8 pb-6">
                    <input
                        placeholder="ব্লগ সার্চ করুন..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg text-white border border-[#EFE9D5] focus:outline-none focus:ring-2 focus:ring-[#EFE9D5]"
                    />
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-[#497D74] bg-white focus:outline-none focus:ring-2 focus:ring-[#EFE9D5]"
                    >
                        {categories.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
            </div>


            {/* Blog Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((blog, idx) => (
                    <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        whileHover={{ scale: 1.10 }}
                        whileTap={{ scale: 0.97 }}
                        className="bg-white border-2 border-[#EFE9D5]  rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                        <img
                            src={blog.thumbnail}
                            alt={blog.title}
                            className="w-full h-52 object-cover"
                        />
                        <div className="p-5">
                            <h3 className="font-bold text-lg mb-2 text-[#274450]">{blog.title}</h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-3">{blog.short_description}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{blog.author} • {blog.date}</span>
                                <Link
                                    to={`/blogs/${blog.id}`}
                                    className="bg-[#497D74] font-extrabold hover:bg-[#71BBB2] text-white px-3 py-1 rounded-lg text-sm transition-colors"
                                >
                                    বিস্তারিত
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
