import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiTrendingUp, FiCreditCard, FiHeart } from "react-icons/fi";
import { Galleria } from "primereact/galleria";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import Loading from "../../Loading/Loading";
import { toast } from "react-toastify";
import AOS from "aos";

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
    const [visible, setVisible] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        resume: ""
    });


    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);


    // Fetch jobs from backend
    const { data: jobs, isLoading, isError } = useQuery<Job[]>({
        queryKey: ["jobs"],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;
    if (isError) return <p className="text-center my-20">ডেটা আনতে সমস্যা হয়েছে!</p>;

    const handleApplyClick = (job: Job) => {
        setSelectedJob(job);
        setVisible(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/jobs/apply`, {
                jobId: selectedJob?._id,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                resume: formData.resume
            });

            toast.success("Application submitted successfully! Status: Pending");
            setVisible(false);
            setFormData({ name: "", email: "", phone: "", resume: "" });
        } catch (err) {
            console.error(err);
            toast.warn("Failed to submit application. Please try again.");
        }
    };


    // Hero template omitted for brevity, same as your code
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
            <section className="">

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
            <section className="py-16  mb-5 bg-cover bg-center  bg-no-repeat bg-fixed"

                style={{
                    // backgroundImage: "url('https://i.ibb.co.com/zTQ6z80G/map.jpg')",
                    backgroundImage: "linear-gradient(to right, rgba(230,252,249,0.8), rgba(249,250,251,0.8)), url('https://i.ibb.co/zTQ6z80G/map.jpg')",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    backgroundBlendMode: "overlay",
                }}
            >
                <h2 className="text-4xl font-bold text-[#27445D] text-center mb-3">
                    বর্তমানে খালি পদ
                </h2>
                <p className="text-center text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
                    আমাদের টিমে যুক্ত হোন! নিচে বর্তমান খালি পদের তালিকা দেওয়া হলো।
                    আপনি যদি উদ্যমী, সৃজনশীল এবং প্রযুক্তিপ্রেমী হন — তাহলে আমরা আপনার অপেক্ষায় আছি।
                </p>


                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 w-full px-6 mx-auto">
                    {jobs?.map((job) => (
                        <div
                            key={job._id}
                            className="bg-white rounded-3xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-500 relative flex flex-col"
                        >
                            <div className="relative h-48">
                                <img src={job.image} alt={job.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col justify-between text-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-[#274450] mt-3">{job.title}</h3>
                                    <div className="bg-gray-100 text-[#27445D] px-4 py-1 rounded-full shadow-md text-sm inline-block mt-3">
                                        {job.type}
                                    </div>
                                    <p className="text-gray-600 mt-4">{job.description}</p>
                                    <p className="text-sm text-[#497D74] font-medium mt-2">{job.location}</p>
                                    <span className="text-sm text-gray-500 block mt-2">শেষ তারিখ: {job.deadline}</span>
                                </div>

                                <button
                                    onClick={() => handleApplyClick(job)}
                                    className="mt-6 bg-[#71BBB2]  hover:bg-[#5AA29F] text-white text-sm font-semibold px-6 py-2 rounded-full  transition duration-300"
                                >
                                    আবেদন করুন
                                </button>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="w-full mx-auto px-6 text center mt-16">
                    <h2
                        className="text-3xl text-center md:text-4xl font-bold text-[#27445D] mb-4"
                        data-aos="fade-up"
                    >
                        আমাদের মিশনে যোগ দিন
                    </h2>
                    <p
                        className="text-gray-600 text-center text-lg mb-8 max-w-3xl mx-auto"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        আমরা শুধু রাইড নয় — তৈরি করছি এক নিরাপদ, সহজ এবং স্মার্ট যাত্রা প্ল্যাটফর্ম।
                        আপনি যদি প্রযুক্তি, উদ্ভাবন ও টিমওয়ার্কে বিশ্বাস করেন, তবে আপনিই আমাদের পরবর্তী সহকর্মী।
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center mt-12">
                        {/* Card 1 */}
                        <div
                            className="bg-white border shadow-md hover:shadow-xl transition transform hover:-translate-y-1  border-gray-200 rounded-2xl p-8  duration-300"
                            data-aos="fade-up"
                        >
                            <h3 className="text-xl font-semibold text-[#27445D] mb-2">
                                🚀 নতুন সুযোগ
                            </h3>
                            <p className="text-gray-600 text-sm">
                                প্রতিটি প্রকল্পে শেখার ও চ্যালেঞ্জ নেয়ার নতুন সুযোগ।
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div
                            className="bg-white border shadow-md hover:shadow-xl transition transform hover:-translate-y-1  border-gray-200 rounded-2xl p-8 duration-300"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            <h3 className="text-xl font-semibold text-[#27445D] mb-2">
                                🤝 টিমওয়ার্ক
                            </h3>
                            <p className="text-gray-600 text-sm">
                                বন্ধুত্বপূর্ণ পরিবেশে একসাথে কাজের অভিজ্ঞতা।
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div
                            className="bg-white border shadow-md hover:shadow-xl transition transform hover:-translate-y-1  border-gray-200 rounded-2xl p-8  duration-300"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <h3 className="text-xl font-semibold text-[#27445D] mb-2">
                                💡 উদ্ভাবন
                            </h3>
                            <p className="text-gray-600 text-sm">
                                আধুনিক প্রযুক্তি ব্যবহার করে নতুন আইডিয়া বাস্তবায়নের সুযোগ।
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div
                            className="bg-white border shadow-md hover:shadow-xl transition transform hover:-translate-y-1  border-gray-200 rounded-2xl p-8  duration-300"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            <h3 className="text-xl font-semibold text-[#27445D] mb-2">
                                🌱 উন্নতির পথ
                            </h3>
                            <p className="text-gray-600 text-sm">
                                শেখার মাধ্যমে ক্যারিয়ার গ্রোথের বাস্তব সুযোগ।
                            </p>
                        </div>
                    </div>


                </div>
            </section>


            {/* Apply Form Dialog */}
            <Dialog
                header={selectedJob?.title || "আবেদন ফর্ম"}
                visible={visible}
                style={{ width: "500px" }}
                modal
                onHide={() => setVisible(false)}
                className="rounded-xl"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">নাম</label>
                        <InputText
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="আপনার পুরো নাম লিখুন"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#71BBB2]"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">ইমেইল</label>
                        <InputText
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="আপনার ইমেইল লিখুন"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#71BBB2]"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">ফোন</label>
                        <InputText
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="আপনার ফোন নম্বর লিখুন"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#71BBB2]"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">রিজিউম / কভার লেটার</label>
                        <InputTextarea
                            name="resume"
                            value={formData.resume}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="আপনার রিজিউম বা কভার লেটার এখানে লিখুন"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#71BBB2]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#71BBB2]  hover:bg-[#5AA29F] text-white font-semibold py-3 rounded-lg transition-colors duration-300"
                    >
                        Submit
                    </button>
                </form>
            </Dialog>

        </div>
    );
}
