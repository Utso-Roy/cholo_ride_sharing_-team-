// About.tsx
import { Card } from "primereact/card";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import aboutBanner from "../../assets/banner/aboutBanner1.jpg";
import aboutBanner2 from '../../assets/banner/aboutBanner2.jpg';

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      once: true,
    });
  }, []);

  return (
    <div className="w-full overflow-hidden ">
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
              আমাদের লক্ষ্য ও ভিশন
            </h2>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-around gap-14 bg-white  overflow-hidden rounded-lg">

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
          
            <ol type="i" className="list-disc  text-xl space-y-8 text-black leading-relaxed ">
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

      
    </div>
  );
}
