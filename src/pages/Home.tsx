import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen my-10 bg-[#e6fcf9]">
      <header className="bg-[#27445D] text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">যাত্রী</h1>
        <nav className="space-x-4">
          <a href="#home" className="hover:text-[#71BBB2]">হোম</a>
          <a href="#services" className="hover:text-[#71BBB2]">সার্ভিসসমূহ</a>
          <a href="#contact" className="hover:text-[#71BBB2]">যোগাযোগ</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 bg-[#71BBB2] text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">যাত্রী-এ স্বাগতম</h2>
        <p className="text-lg md:text-xl mb-6">
          দ্রুত, নির্ভরযোগ্য এবং নিরাপদ রাইডসবার জন্য
        </p>
        <button className="bg-[#e6fcf9] text-[#27445D] font-semibold px-6 py-3 rounded-lg hover:bg-white transition">
          শুরু করুন
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-20 grid md:grid-cols-3 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold mb-2 text-[#27445D]">মেডিকেল রাইড</h3>
          <p className="text-gray-700">
            জরুরি সময়ের জন্য অ্যাম্বুল্যান্স সার্ভিস সর্বদা প্রস্তুত।
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold mb-2 text-[#27445D]">স্কুল শাটল</h3>
          <p className="text-gray-700">
            নিরাপদ ও সময়মত স্কুল ও শাটল বাস সার্ভিস।
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold mb-2 text-[#27445D]">লাইভ ট্র্যাকিং</h3>
          <p className="text-gray-700">
            রিয়েল-টাইমে আপনার রাইড ট্র্যাক করুন।
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#27445D] text-white py-16 text-center">
        <h3 className="text-3xl font-bold mb-4">আপডেটের জন্য সাবস্ক্রাইব করুন</h3>
        <p className="mb-6">আমাদের সর্বশেষ রাইডস এবং সার্ভিস সম্পর্কে আপডেট পান</p>
        <button className="bg-[#71BBB2] px-6 py-3 rounded-lg font-semibold hover:bg-[#5aa9a1] transition">
          এখনই সাবস্ক্রাইব করুন 
        </button>
      </section>
    </div>
  );
};

export default Home;
