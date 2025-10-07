import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiTrendingUp, FiCreditCard, FiHeart } from "react-icons/fi";
import { Galleria } from "primereact/galleria";

// Hero Section Slides
const heroSlides = [
    {
        src: "https://i.ibb.co/99p19Mgq/pexels-saturnus99-28779638.jpg",
        caption: "আমাদের টিমে যোগ দিন – পরিবর্তনের যাত্রী হোন",
        sub: "একসাথে গড়ে তুলি নিরাপদ ও নির্ভরযোগ্য যাত্রা। আমাদের সাথে ক্যারিয়ার শুরু করুন।"
    },
    {
        src: "https://i.ibb.co/Jw7qQ8pR/rsz-2pexels-cottonbro-4606338.jpg",
        caption: "সবার জন্য নিরাপদ যাত্রা",
        sub: "আমাদের সাথে কাজ করে আপনি শুধু আয় করবেন না, বরং মানুষের জীবন সহজ করবেন।"
    },
    {
        src: "https://i.ibb.co/4n2LdgML/yeh-che-wei-164w-Db4cw-T8-unsplash.jpg",
        caption: "টেক টিমে কাজের সুযোগ",
        sub: "স্মার্ট প্রযুক্তি দিয়ে রাইড শেয়ারিংকে আরও উন্নত করুন।"
    }
];



interface Job {
    _id: string;
    title: string;
    location: string;
    type: string;
    deadline: string;
    description: string;
    iconName: string;
    image: string;
}

export default function CareerPage() {
    const [activeIndex, setActiveIndex] = useState(0);

    // Fetch jobs from backend
    const { data: jobs, isLoading, isError } = useQuery<Job[]>({
        queryKey: ["jobs"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/jobs");
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center my-20">লোড হচ্ছে...</p>;
    if (isError) return <p className="text-center my-20">ডেটা আনতে সমস্যা হয়েছে!</p>;

    // Hero item template
    const itemTemplate = (item: any) => (
        <div className="relative w-full h-[500px]">
            <img src={item.src} alt={item.caption} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40 flex flex-col justify-center items-center text-center text-white px-6">
                <h1 className="text-4xl font-bold mb-4">{item.caption}</h1>
                <p className="text-lg mb-6">{item.sub}</p>
                <button className="btn bg-[#71BBB2] hover:bg-[#5AA29F] text-white border-none">
                    খালি পদ দেখুন
                </button>
            </div>
        </div>
    );

    return (
        <div>
            {/* Hero Carousel */}
            <section className="pb-5">
                <Galleria
                    value={heroSlides}
                    activeIndex={activeIndex}
                    onItemChange={(e) => setActiveIndex(e.index)}
                    showThumbnails={false}
                    showIndicators
                    showIndicatorsOnItem
                    circular
                    autoPlay
                    transitionInterval={4000}
                    item={itemTemplate}
                    className="custom-galleria"
                />
            </section>

            {/* Job Listings */}
            <section className="py-16 bg-[#e6fcf9] mb-5">
                <h2 className="text-4xl font-bold text-[#27445D] text-center mb-10">
                    বর্তমানে খালি পদ
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full px-6 mx-auto">
                    {jobs?.map((job) => (
                        <div
                            key={job._id}
                            className="bg-white rounded-3xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-500 relative flex flex-col"
                        >
                            
                            <div className="relative h-48">
                                <img
                                    src={job.image}
                                    alt={job.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                            </div>

                           
                            <div className="p-6 flex-1 flex flex-col justify-between text-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-[#274450] mt-3">{job.title}</h3>
                                    <div className="bg-[#71BBB2] text-white px-4 py-1 rounded-full shadow-md text-sm inline-block mt-3">
                                        {job.type}
                                    </div>
                                    <p className="text-gray-600 mt-4">{job.description}</p>
                                    <p className="text-sm text-[#497D74] font-medium mt-2">{job.location}</p>
                                    <span className="text-sm text-gray-500 block mt-2">
                                        শেষ তারিখ: {job.deadline}
                                    </span>
                                </div>

                               
                                <button className="mt-6 bg-[#71BBB2] text-white text-sm font-semibold px-6 py-2 rounded-full hover:bg-[#27445D] transition duration-300">
                                    আবেদন করুন
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>



            {/* Perks & Benefits */}
            <section className="py-16 bg-[#e6fcf9]">
                <h2 className="text-4xl font-bold text-[#27445D] text-center mb-10">
                    আমাদের সাথে কাজ করার সুবিধাসমূহ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-full px-6 mx-auto text-center text-[#27445D]">
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition">
                        <FiTrendingUp className="mx-auto mb-3 w-12 h-12 text-[#27445D]" />
                        <h3 className="text-xl font-bold mb-3">ক্যারিয়ার উন্নতি</h3>
                        <p>আমরা ট্রেনিং ও উন্নতির সুযোগ দিয়ে আপনার ভবিষ্যৎ গড়ে তুলতে সাহায্য করি।</p>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition">
                        <FiCreditCard className="mx-auto mb-3 w-12 h-12 text-[#27445D]" />
                        <h3 className="text-xl font-bold mb-3">আকর্ষণীয় বেতন</h3>
                        <p>প্রতিযোগিতামূলক বেতন, বোনাস এবং রিওয়ার্ড সিস্টেম রয়েছে।</p>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition">
                        <FiHeart className="mx-auto mb-3 w-12 h-12 text-[#27445D]" />
                        <h3 className="text-xl font-bold mb-3">স্বাস্থ্য বীমা</h3>
                        <p>আমাদের টিম মেম্বারদের জন্য স্বাস্থ্য সুরক্ষা বীমা ও বিশেষ সুবিধা।</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
