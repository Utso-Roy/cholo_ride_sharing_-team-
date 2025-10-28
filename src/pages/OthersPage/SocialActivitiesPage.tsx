import {  useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FiFilter, FiSearch } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Loading/Loading";

interface Activity {
  _id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  volunteers: number;
  badge: string;
}

export default function SocialActivitiesPage() {
 
  const [visibleCount, setVisibleCount] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBadge, setFilterBadge] = useState("all");
  const navigate = useNavigate();

   const { data: activities = [], isLoading, isError } = useQuery<Activity[]>({
    queryKey: ["activities"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/activities`);
      return res.data;
    },
  });

  if(isLoading){
    return <Loading/>
  }

  const toggleVisibility = () => {
    if (visibleCount >= activities.length) {
      setVisibleCount(9);
    } else {
      setVisibleCount((prev) => prev + 9);
    }
  };


  const badges = ["all", ...new Set(activities.map((a) => a.badge))];

  // search + filter logic
  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterBadge === "all" ? true : activity.badge === filterBadge;
    return matchesSearch && matchesFilter;
  });

  return (
    <section 
      className="bg-cover bg-center py-20 px-6  bg-no-repeat bg-fixed"
                style={{
                    // backgroundImage: "url('https://i.ibb.co.com/zTQ6z80G/map.jpg')",
                    backgroundImage: "linear-gradient(to right, rgba(230,252,249,0.8), rgba(249,250,251,0.8)), url('https://i.ibb.co/zTQ6z80G/map.jpg')",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    backgroundBlendMode: "overlay",
                }}
    >
      {/* Heading */}
      <motion.h1
        className="text-5xl font-bold text-[#27445D] text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        আমাদের সামাজিক কার্যক্রম
      </motion.h1>

      {/* Small description */}
      <motion.p
        className="text-center text-lg text-gray-700 max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        আমাদের টিম সমাজের উন্নয়নে নিয়মিত কার্যক্রম পরিচালনা করে। এখানে আমাদের
        সাম্প্রতিক সামাজিক কার্যক্রমগুলির কিছু ঝলক দেওয়া হলো।
      </motion.p>

      {/* Search & Filter */}
      <div className="w-full mx-auto flex flex-col md:flex-row gap-6 justify-between items-center mb-12 px-6">
        <div className="relative w-full md:w-1/2">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#27445D] text-lg" />
          <input
            type="text"
            placeholder="কার্যক্রম খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-3 rounded-full  w-full focus:outline-none focus:ring-2 focus:ring-[#71BBB2] bg-white shadow-sm"
          />
        </div>


        <div className="relative w-full md:w-1/3">
          <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-[#27445D] text-lg" />
          <select
            value={filterBadge}
            onChange={(e) => setFilterBadge(e.target.value)}
            className="pl-12 pr-4 py-3 rounded-full  w-full focus:outline-none focus:ring-2 focus:ring-[#71BBB2] bg-white shadow-sm"
          >
            {badges.map((badge, index) => (
              <option
                key={index}
                value={badge}
                style={{
                  border: "none",
                  backgroundColor: "#71BBB2",
                  color: "#27445D",
                  fontWeight: "bold"
                }}
              >
                {badge === "all" ? "সব" : badge}
              </option>

            ))}
          </select>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-full mx-auto px-6">
        {filteredActivities.slice(0, visibleCount).map((activity) => (
          <motion.div
            key={activity._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-500 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-[#27445D] mb-2">
                {activity.title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                {activity.date} | {activity.location}
              </p>
              <span className="inline-block bg-[#71BBB2] text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
                {activity.badge}
              </span>

              <button
                onClick={() => navigate(`/activities/${activity._id}`)}
                className="mt-4 bg-[#71BBB2] text-white text-sm font-semibold px-6 py-2 rounded-full shadow hover:bg-[#1f3245] transition-colors duration-300 absolute bottom-4 right-4"
              >
                বিস্তারিত
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More / Show Less */}
      {filteredActivities.length > 9 && (
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <button
            onClick={toggleVisibility}
            className=" text-white bg-[#71BBB2] px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-[#1f3245] transition-all duration-300"
          >
            {visibleCount >= filteredActivities.length ? "কম দেখুন" : "আরও দেখুন"}
          </button>
        </motion.div>
      )}
    </section>
  );
}
