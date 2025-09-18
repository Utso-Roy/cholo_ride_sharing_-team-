import { Card } from "primereact/card";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import aboutBanner from "../../assets/banner/aboutBanner1.jpg";
import aboutBanner2 from '../../assets/banner/aboutBanner2.jpg';
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import CountUp from "react-countup";

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      once: true,
    });
  }, []);

  return (
    <div className="w-full overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="w-full h-[60vh] md:h-[70vh]">
        <Card
          className="relative w-full h-full rounded-none"
          style={{
            backgroundImage: `url(${aboutBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4 md:px-12 text-white">
            <h1
              className="text-3xl md:text-6xl font-bold mb-4"
              data-aos="fade-up"
            >
              চলো
            </h1>
            <p
              className="text-sm md:text-lg max-w-2xl"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              সবার জন্য নিরাপদ, নির্ভরযোগ্য এবং পরিবেশবান্ধব যাতায়াত নিশ্চিত করছে
              সমগ্র বাংলাদেশে।
            </p>
          </div>
        </Card>
      </section>
      {/* Mission & Vision Section */}
      <section className=" py-16 px-4 md:px-12 bg-white">
        <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold mb-12 text-[#27445D]  text-center">
          আমাদের লক্ষ্য ও উদ্দেশ্য
        </h2>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-around gap-14 bg-white  overflow-hidden rounded-lg">

          {/* Left Image */}
          <div className="md:w-1/2 w-full h-64 md:h-[550px] lg:h-[550px]  flex-shrink-0">
            <img
              src={aboutBanner2}
              alt="Mission & Vision"
              className="w-full h-full object-cover rounded-2xl"
              data-aos="fade-right"
            />
          </div>

          {/* Right Text */}
          <div className="md:w-1/2 w-full  p-6 md:p-10 flex flex-col justify-center" data-aos="fade-left">

            <ol type="i" className="list-disc  text-xl space-y-10 text-black leading-relaxed ">
              <li>
                প্রতিটি নাগরিককে <span className="font-semibold text-[#27445D]">নিরাপদ ও নির্ভরযোগ্য</span> যাতায়াত সেবা প্রদান করা।
              </li>
              <li>
                প্রযুক্তি-নির্ভর সমাধানের মাধ্যমে যাতায়াতকে <span className="font-semibold text-[#27445D]">সহজ ও সাশ্রয়ী</span> করা।
              </li>
              <li>
                <span className="font-semibold text-[#27445D]">পরিবেশবান্ধব পরিবহন</span> ব্যবস্থার প্রসার ঘটিয়ে টেকসই উন্নয়ন নিশ্চিত করা।
              </li>
              <li>
                যাত্রী ও চালকের মধ্যে <span className="font-semibold text-[#27445D]">আস্থা ও সম্মানের সংস্কৃতি</span> তৈরি করা।
              </li>
              <li>
                বাংলাদেশকে একটি <span className="font-semibold text-[#27445D]">স্মার্ট পরিবহন যুগে</span> নিয়ে যাওয়া যেখানে প্রতিটি যাত্রা হবে আনন্দদায়ক অভিজ্ঞতা।
              </li>
            </ol>
          </div>

        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto bg-black rounded-2xl py-16 px-4 md:px-12 text-center">
        <h2
          className="text-3xl font-bold mb-6"
          data-aos="fade-up"
        >
          আমাদের গল্প
        </h2>
        <p
          className="max-w-3xl mx-auto text-gray-600"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          চলো যাত্রা শুরু করেছিল এক সাধারণ ধারণা থেকে – কিভাবে মানুষকে দ্রুত, নিরাপদ
          এবং সাশ্রয়ীভাবে গন্তব্যে পৌঁছে দেওয়া যায়। আজ আমরা হাজারো যাত্রী এবং
          পার্টনারদের নিয়ে এগিয়ে যাচ্ছি আরও স্মার্ট বাংলাদেশের দিকে।
        </p>

        <div className="flex justify-center">
          <Link to="/our-story">
            <button
              className="btn bg-[#71BBB2] hover:bg-[#5AA29F] text-white border-none mt-4 flex items-center gap-2"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              আরো জানুন <FaArrowRight />
            </button>
          </Link>
        </div>
      </section>
        {/* Stats Section */}
       <section className="max-w-7xl mx-auto py-16 my-16 rounded-2xl bg-[#71BBB2]   text-white text-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 ">
        <div>
          <h3 className="text-4xl font-bold">
            <CountUp end={1000000} suffix="+" duration={10} />
          </h3>
          <p>রাইড সম্পন্ন</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">
            <CountUp end={500000} suffix="+" duration={10} />
          </h3>
          <p>ইউজার</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">
            <CountUp end={50000} suffix="+" duration={10} />
          </h3>
          <p>পার্টনার</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">
            <CountUp end={64} duration={10} />
          </h3>
          <p>জেলায় সেবা</p>
        </div>
      </div>
    </section>

    


    </div>
  );
}
