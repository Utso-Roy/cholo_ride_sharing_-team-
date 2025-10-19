import React from "react";

const Banner = () => {
  return (
   <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
  {/* YouTube Video */}
  <iframe
    className="absolute inset-0 w-full h-full"
    src="https://www.youtube.com/embed/MYhkO-6cft0?autoplay=1&mute=1&loop=1&playlist=MYhkO-6cft0&controls=0&modestbranding=1"
    title="YouTube video"
    frameBorder="0"
    allow="autoplay; fullscreen"
    allowFullScreen
    style={{ width: '100%', height: '100%' }}
  ></iframe>

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Content */}
  <div className="relative z-10 text-white px-6 md:px-10 max-w-2xl text-center">
    <h1 className="text-4xl md:text-6xl font-bold mb-4">চলুন, একসাথে যাত্রা করি </h1>
    <p className="text-lg md:text-xl mb-6">
      <span className="font-semibold">চলো রাইড</span> আপনাকে সংযুক্ত করে কাছের রাইডার ও যাত্রীদের সঙ্গে। নিরাপদ, সাশ্রয়ী ও পরিবেশবান্ধব ভ্রমণের নতুন অভিজ্ঞতা।
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="bg-gradient-to-r from-[#14b8a6] to-[#0d9488] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300">
        রাইড শুরু করুন
      </button>
      <button className="bg-white/90 text-[#0f766e] font-semibold px-8 py-3 rounded-full shadow-md hover:bg-white hover:scale-105 transition duration-300">
        আরও জানুন
      </button>
    </div>
  </div>
</section>


  );
};

export default Banner;
