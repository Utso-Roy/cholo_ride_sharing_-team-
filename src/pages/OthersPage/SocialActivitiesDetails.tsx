import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Loading/Loading";

interface Activity {
  _id: string;
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  volunteers: number;
  badge: string;
}

export default function SocialActivitiesDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: activity, isLoading, isError } = useQuery<Activity | null>({
    queryKey: ["activity", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/activities/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
     <Loading/>
    );
  }

  if (isError || !activity) {
    return (
      <p className="text-center my-20 text-lg text-[#27445D]">
        Activity not found
      </p>
    );
  }

  return (

    <section
     

      className="w-full px-6  bg-cover bg-center py-16  bg-no-repeat bg-fixed"
                style={{
                    // backgroundImage: "url('https://i.ibb.co.com/zTQ6z80G/map.jpg')",
                    backgroundImage: "linear-gradient(to right, rgba(230,252,249,0.8), rgba(249,250,251,0.8)), url('https://i.ibb.co/zTQ6z80G/map.jpg')",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    backgroundBlendMode: "overlay",
                }}
    >

    <div className="py-16  px-6 w-full  md:max-w-4xl lg:max-w-4xl  mx-auto bg-white rounded-2xl shadow-lg"
    
    
    >
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-[#27445D] font-semibold hover:underline"
      >
        ← ফিরে যান
      </button>

      <img
        src={activity.image}
        alt={activity.title}
        className="w-full h-80 object-cover rounded-2xl mb-6"
      />

      <h1 className="text-3xl font-bold text-[#27445D] mb-4">
        {activity.title}
      </h1>

      <p className="text-sm text-gray-500 mb-4">
        {activity.date} | {activity.location} | স্বেচ্ছাসেবক:{" "}
        {activity.volunteers}
      </p>

      <span className="inline-block bg-[#71BBB2] text-white px-3 py-1 rounded-full text-xs font-semibold mb-6">
        {activity.badge}
      </span>

      <p className="text-[#27445D] leading-relaxed">{activity.description}</p>
    </div>
    </section>
 
  );
}
