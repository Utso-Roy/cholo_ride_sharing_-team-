import React from "react";

const CustomerCare = () => {
  return (
    <div className="bg-gradient-to-br from-[#E3FDFD] via-[#CBF1F5] to-[#A6E3E9] min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-[#27445D] mb-10 drop-shadow-md">
          কাস্টমার কেয়ার
        </h2>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/90 shadow-lg rounded-2xl p-6 text-center border border-gray-200 hover:shadow-2xl transition-transform transform hover:-translate-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#71BBB2] to-[#5AA29F] flex items-center justify-center text-3xl text-white mb-4 shadow-md">
              📞
            </div>
            <h3 className="text-xl font-semibold text-[#27445D] mb-1">হেল্পলাইন নাম্বার</h3>
            <p className="text-[#27445D] font-medium">+880 1234 567 890</p>
            <p className="text-sm text-gray-500">২৪/৭ খোলা</p>
          </div>

          <div className="bg-white/90 shadow-lg rounded-2xl p-6 text-center border border-gray-200 hover:shadow-2xl transition-transform transform hover:-translate-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#71BBB2] to-[#5AA29F] flex items-center justify-center text-3xl text-white mb-4 shadow-md">
              ✉️
            </div>
            <h3 className="text-xl font-semibold text-[#27445D] mb-1">ইমেইল সাপোর্ট</h3>
            <p className="text-[#27445D] font-medium">support@choloride.com</p>
            <p className="text-sm text-gray-500">আমরা দ্রুত রিপ্লাই দেব</p>
          </div>

          <div className="bg-white/90 shadow-lg rounded-2xl p-6 text-center border border-gray-200 hover:shadow-2xl transition-transform transform hover:-translate-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#71BBB2] to-[#5AA29F] flex items-center justify-center text-3xl text-white mb-4 shadow-md">
              📍
            </div>
            <h3 className="text-xl font-semibold text-[#27445D] mb-1">আমাদের ঠিকানা</h3>
            <p className="text-[#27445D] font-medium">ঢাকা, বাংলাদেশ</p>
            <p className="text-sm text-gray-500">Head Office</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-12 bg-white/90 shadow-lg rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-[#27445D] mb-6 text-center">আমাদের সাথে যোগাযোগ করুন</h3>
          <form className="space-y-6">
            <input
              type="text"
              placeholder="আপনার নাম"
              className="w-full p-4 rounded-lg border border-gray-300 bg-gradient-to-r from-[#fdfefe] to-[#f3f8f9] text-[#27445D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#71BBB2] focus:border-[#71BBB2] transition"
              required
            />
            <input
              type="email"
              placeholder="আপনার ইমেইল"
              className="w-full p-4 rounded-lg border border-gray-300 bg-gradient-to-r from-[#fdfefe] to-[#f3f8f9] text-[#27445D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#71BBB2] focus:border-[#71BBB2] transition"
              required
            />
            <textarea
              placeholder="আপনার বার্তা লিখুন..."
              rows="4"
              className="w-full p-4 rounded-lg border border-gray-300 bg-gradient-to-r from-[#fdfefe] to-[#f3f8f9] text-[#27445D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#71BBB2] focus:border-[#71BBB2] transition resize-none"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#71BBB2] to-[#5AA29F] hover:from-[#5AA29F] hover:to-[#71BBB2] text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              বার্তা পাঠান
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerCare;
