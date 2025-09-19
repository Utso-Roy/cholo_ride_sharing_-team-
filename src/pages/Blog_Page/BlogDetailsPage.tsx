/// src/pages/Blog_Page/BlogDetailsPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";

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

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center text-[#274450] font-semibold">
        লোড হচ্ছে...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">


      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl lg:text-4xl font-extrabold mb-3 text-[#274450]"
      >
        {blog.title}
      </motion.h1>

      {/* Meta Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm mb-6 flex flex-wrap gap-2 items-center text-gray-600"
      >
        <span className="font-medium text-[#274450]">{blog.author}</span> •{" "}
        {blog.date} •{" "}
        <span className="px-2 py-1 bg-[#71BBB2] text-white rounded-md text-xs">
          {blog.category}
        </span>
      </motion.div>

      {/* Thumbnail */}
      <motion.img
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        src={blog.thumbnail}
        alt={blog.title}
        className="w-full h-90 object-cover rounded-xl shadow-xs mb-8"
      />

      {/* Blog Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="prose max-w-none text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: blog.content.replace(/\n/g, "<br/>"),
        }}
      />

      {/* Back Button */}
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="my-4  px-4 py-2 mb-6 rounded-lg border-3 border-[#497D74] text-[#274450] font-bold hover:bg-[#274450] hover:text-white transition btn"
        >
          ← ব্লগে ফিরে যান
        </motion.button>

      </div>

    </div>
  );
};
