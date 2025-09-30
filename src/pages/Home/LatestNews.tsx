// LatestNews.tsx
import React from "react";
import { FaArrowRight } from "react-icons/fa";

interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

const blogs: Blog[] = [
  {
    id: 1,
    title: "কিভাবে নিরাপদে রাইড বুক করবেন",
    description: "আমাদের নিরাপত্তা নীতিমালা মেনে সহজে এবং নিরাপদে রাইড বুক করার টিপস।",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60",
    link: "/blog/1",
  },
  {
    id: 2,
    title: "কম খরচে যাত্রার উপায়",
    description: "কম খরচে রাইডের জন্য আমাদের বিভিন্ন অফার এবং প্যাকেজ।",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60",
    link: "/blog/2",
  },
  {
    id: 3,
    title: "Verified ড্রাইভারদের সাথে যাত্রা",
    description: "নিশ্চিন্তে যাত্রা করতে Verified ড্রাইভারদের নির্বাচন করুন।",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60",
    link: "/blog/3",
  },
  {
    id: 4,
    title: "নতুন রুট ও সার্ভিস আপডেট",
    description: "আপনার যাত্রার সুবিধার জন্য নতুন রুট এবং সার্ভিস সমূহ।",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60",
    link: "/blog/4",
  },
];

const LatestNews: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#e6fcf9] to-gray-50">
      <div className=" mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#27445D] mb-2">
  সর্বশেষ খবর
</h2>
<p className="text-center text-gray-600 mb-8">
  নতুন অফার, নিরাপত্তা নির্দেশিকা এবং ভেরিফায়েড ড্রাইভারদের তথ্য পেতে পড়ুন।
</p>

        <div className="grid sm:grid-cols-2  md:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#27445D] mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">{blog.description}</p>
                <a
                  href={blog.link}
                  className="flex items-center text-[#71BBB2] hover:text-[#5AA29F] font-medium"
                >
                  আরও পড়ুন <FaArrowRight className="ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
