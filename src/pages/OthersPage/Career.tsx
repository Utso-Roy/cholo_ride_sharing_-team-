import React, { FC, ReactNode, useState } from "react";
import { Card } from "primereact/card";
import { Galleria } from "primereact/galleria";
import { FaCarSide, FaHeadset, FaLaptopCode } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FiTrendingUp, FiCreditCard, FiHeart } from "react-icons/fi";


// Job type interface
interface Job {
    id: number;
    title: string;
    location: string;
    type: string;
    deadline: string;
    description: string;
    icon: ReactNode;
}

// Dummy Job Data (বাংলায়)
const jobs: Job[] = [
    {
        id: 1,
        title: "ড্রাইভার পার্টনার",
        location: "ঢাকা",
        type: "ফুল-টাইম",
        deadline: "৩০ সেপ্টেম্বর ২০২৫",
        description: "ঢাকা শহরে আমাদের সাথে ড্রাইভার পার্টনার হিসেবে কাজ করুন এবং আয় করুন।",
        icon: <FaCarSide className="text-4xl text-[#274450]" />,
    },
    {
        id: 2,
        title: "কাস্টমার সাপোর্ট এক্সিকিউটিভ",
        location: "চট্টগ্রাম",
        type: "পার্ট-টাইম",
        deadline: "০৫ অক্টোবর ২০২৫",
        description: "রাইডার ও ড্রাইভারদের প্রশ্ন ও সমস্যার সমাধান দিন, টিকিট হ্যান্ডল করুন।",
        icon: <FaHeadset className="text-4xl text-[#274450]" />,
    },
    {
        id: 3,
        title: "ফ্রন্টএন্ড ডেভেলপার",
        location: "রিমোট",
        type: "ফুল-টাইম",
        deadline: "১০ অক্টোবর ২০২৫",
        description: "আমাদের টেক টিমে যোগ দিন এবং React ব্যবহার করে দুর্দান্ত ইউজার এক্সপেরিয়েন্স তৈরি করুন।",
        icon: <FaLaptopCode className="text-4xl text-[#274450]" />,
    },
];
// Carousel Images
const heroSlides = [
    {
        src: "https://i.ibb.co.com/99p19Mgq/pexels-saturnus99-28779638.jpg",
        caption: "আমাদের টিমে যোগ দিন – পরিবর্তনের যাত্রী হোন",
        sub: "একসাথে গড়ে তুলি নিরাপদ ও নির্ভরযোগ্য যাত্রা। আমাদের সাথে ক্যারিয়ার শুরু করুন।",
    },
    {
        src: "https://i.ibb.co.com/Jw7qQ8pR/rsz-2pexels-cottonbro-4606338.jpg",
        caption: "সবার জন্য নিরাপদ যাত্রা",
        sub: "আমাদের সাথে কাজ করে আপনি শুধু আয় করবেন না, বরং মানুষের জীবন সহজ করবেন।",
    },
    {
        src: "https://i.ibb.co.com/4n2LdgML/yeh-che-wei-164w-Db4cw-T8-unsplash.jpg",
        caption: "টেক টিমে কাজের সুযোগ",
        sub: "স্মার্ট প্রযুক্তি দিয়ে রাইড শেয়ারিংকে আরও উন্নত করুন।",
    },
];

// Functional Component
const Career: FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const itemTemplate = (item: any) => (
        <div className="relative w-full h-[500px]">
            <img src={item.src} alt={item.caption} className="w-full h-full object-cover" />

            <div className="absolute inset-0  bg-gradient-to-br from-black/40 via-black/20 to-black/40  bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-6">
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
            <section className="pb-5">
                {/*  Hero Carousel Section */}
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

            {/* Why Join Us Section */}
            <section className="py-16 mb-5 bg-[#e6fcf9]">
                <h2
                    className="text-4xl font-bold text-[#27445D]  text-center mb-10"

                >
                    কেন আমাদের সাথে কাজ করবেন?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
                    <Card title="ফ্লেক্সিবল কাজ" className="bg-white p-6 rounded-2xl  shadow hover:shadow-xl transition-transform hover:-translate-y-1">
                        <p className="text-gray-600 text-sm">পার্টটাইম বা ফুলটাইম – নিজের সুবিধামতো কাজ করার সুযোগ।</p>
                    </Card>
                    <Card title="গ্রোথ" className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition-transform hover:-translate-y-1">
                        <p className="text-gray-600 text-sm">ট্রেনিং এবং ক্যারিয়ার উন্নতির নিশ্চয়তা।</p>
                    </Card>
                    <Card title="সুবিধাসমূহ" className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition-transform hover:-translate-y-1">
                        <p className="text-gray-600 text-sm">বীমা, বোনাস এবং রেফারেল রিওয়ার্ড উপভোগ করুন।</p>
                    </Card>
                </div>
            </section>

            {/*  Job Listings Section */}
            <section className="py-16  bg-[#e6fcf9] mb-5">
                <h2 className="text-4xl font-bold text-[#27445D]  text-center mb-10">
                    বর্তমানে খালি পদ
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {jobs.map((job: Job) => (
                        <div
                            key={job.id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer"
                        >

                            <div className="relative h-40 flex flex-col items-center justify-center bg-[#F9FAFB]">
                                {job.icon}
                                <h3 className="text-xl font-bold text-[#274450] mt-3">{job.title}</h3>
                                <div className="absolute top-3 left-3 bg-[#71BBB2] text-white px-3 py-1 rounded-full shadow-md text-sm">
                                    {job.type}
                                </div>
                            </div>


                            <div className="p-6 text-center">
                                <p className="text-gray-600 mb-3">{job.description}</p>
                                <p className="text-sm text-[#497D74] font-medium mb-4 flex justify-center items-center gap-2">
                                    <FaLocationDot />{job.location}
                                </p>

                                {/* 🔹 Footer */}
                                <div className="flex justify-between items-center border-t pt-4">
                                    <span className="text-sm text-gray-500">
                                        শেষ তারিখ: {job.deadline}
                                    </span>
                                    <button className="mt-4 bg-[#71BBB2] text-white text-sm font-semibold px-6 py-2 rounded-full hover:bg-[#27445D] transition duration-300">
                                        আবেদন করুন
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Perks & Benefits) */}
            <section className="py-16 bg-[#e6fcf9] mb-5">
                <h2 className="text-4xl font-bold text-[#27445D] text-center mb-10">
                    আমাদের সাথে কাজ করার সুবিধাসমূহ
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center text-[#27445D]">
                    {/* Career Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition">
                        <FiTrendingUp className="mx-auto mb-3 w-12 h-12 text-[#27445D]" />
                        <h3 className="text-xl font-bold mb-3">ক্যারিয়ার উন্নতি</h3>
                        <p>আমরা ট্রেনিং ও উন্নতির সুযোগ দিয়ে আপনার ভবিষ্যৎ গড়ে তুলতে সাহায্য করি।</p>
                    </div>

                    {/* Salary Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition">
                        <FiCreditCard className="mx-auto mb-3 w-12 h-12 text-[#27445D]" />
                        <h3 className="text-xl font-bold mb-3">আকর্ষণীয় বেতন</h3>
                        <p>প্রতিযোগিতামূলক বেতন, বোনাস এবং রিওয়ার্ড সিস্টেম রয়েছে।</p>
                    </div>

                    {/* Health Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition">
                        <FiHeart className="mx-auto mb-3 w-12 h-12 text-[#27445D]" />
                        <h3 className="text-xl font-bold mb-3">স্বাস্থ্য বীমা</h3>
                        <p>আমাদের টিম মেম্বারদের জন্য স্বাস্থ্য সুরক্ষা বীমা ও বিশেষ সুবিধা।</p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Career;
