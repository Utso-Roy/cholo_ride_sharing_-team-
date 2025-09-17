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

      
    </div>
  );
}
