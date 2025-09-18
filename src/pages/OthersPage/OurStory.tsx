import { FaArrowRight } from "react-icons/fa";

const OurStory = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-12 py-16">
      {/* Hero Banner */}
      <div
        className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-12"
        style={{
          backgroundImage: `url('https://i.ibb.co.com/Y7fRD9p2/pexels-norma-mortenson-4392032.jpg')`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1
            className="text-3xl md:text-5xl font-bold text-white"
            data-aos="fade-up"
          >
            যাত্রী
          </h1>
        </div>
      </div>

      {/* Main Story Content */}
      <div className="text-center">
        <h2
          className="text-2xl md:text-3xl font-bold mb-6"
          data-aos="fade-up"
        >
          যাত্রার শুরু
        </h2>
        <p
          className="max-w-3xl mx-auto text-gray-600 leading-relaxed mb-8"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          চলো শুরু হয়েছিল একটি সাধারণ ভাবনা থেকে – “বাংলাদেশে কিভাবে মানুষের
          যাতায়াতকে আরও সহজ, নিরাপদ এবং সাশ্রয়ী করা যায়?”। আমাদের চারপাশে
          প্রতিদিন লাখো মানুষ অফিস, পড়াশোনা কিংবা জরুরি প্রয়োজনে এক জায়গা থেকে
          অন্য জায়গায় যাচ্ছে, কিন্তু তারা প্রায়ই ভুগছে ভিড়, অনিরাপত্তা এবং
          সময়মতো পৌঁছাতে না পারার সমস্যায়। এই বাস্তবতা থেকেই আমাদের পথচলা
          শুরু।
        </p>

        <h2
          className="text-2xl md:text-3xl font-bold mb-6"
          data-aos="fade-up"
        >
          প্রাথমিক চ্যালেঞ্জ
        </h2>
        <p
          className="max-w-3xl mx-auto text-gray-600 leading-relaxed mb-8"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          শুরুটা সহজ ছিল না। সীমিত রিসোর্স, সীমিত টিম এবং সীমিত প্রযুক্তি
          নিয়েই এগোতে হয়েছিল। আমাদের প্রথম লক্ষ্য ছিল মানুষের আস্থা অর্জন করা।
          প্রতিটি যাত্রীর নিরাপত্তা, প্রতিটি পার্টনারের ন্যায্য আয় এবং প্রতিটি
          রাইডের সঠিক সময় — এগুলো নিশ্চিত করাই ছিল আমাদের সবচেয়ে বড় চ্যালেঞ্জ।
        </p>

        <h2
          className="text-2xl md:text-3xl font-bold mb-6"
          data-aos="fade-up"
        >
          আমাদের অগ্রযাত্রা
        </h2>
        <p
          className="max-w-3xl mx-auto text-gray-600 leading-relaxed mb-8"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          সময়ের সাথে সাথে আমরা উন্নত প্রযুক্তি, সহজ ইউজার ইন্টারফেস এবং
          নির্ভরযোগ্য সেবা প্রদান করতে পেরেছি। আজ হাজারো যাত্রী প্রতিদিন “চলো”
          ব্যবহার করছেন। শুধু যাত্রীই নয়, অসংখ্য ড্রাইভার এবং পার্টনারও আমাদের
          নেটওয়ার্কে যুক্ত হয়েছেন। আমাদের এই পরিবার প্রতিদিন বড় হচ্ছে, আর
          বাংলাদেশ এগোচ্ছে একটি স্মার্ট ট্রান্সপোর্ট সিস্টেমের দিকে।
        </p>

        <h2
          className="text-2xl md:text-3xl font-bold mb-6"
          data-aos="fade-up"
        >
          আমাদের স্বপ্ন
        </h2>
        <p
          className="max-w-3xl mx-auto text-gray-600 leading-relaxed mb-8"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          আমাদের উদ্দেশ্য শুধু যাতায়াতকে সহজ করা নয়; আমরা চাই একটি পরিবেশবান্ধব
          ও টেকসই বাংলাদেশ গড়ে তুলতে। আমরা বিশ্বাস করি, সঠিক পরিকল্পনা এবং
          প্রযুক্তি ব্যবহার করে যাতায়াতকে আরও নিরাপদ, কার্যকরী এবং সবুজ করা
          সম্ভব। আমাদের ভিশন হলো — বাংলাদেশে এমন এক ভবিষ্যৎ তৈরি করা যেখানে
          সবার যাতায়াত হবে দ্রুত, সাশ্রয়ী এবং ঝামেলামুক্ত।
        </p>

        <h2
          className="text-2xl md:text-3xl font-bold mb-6"
          data-aos="fade-up"
        >
          আমাদের প্রতিশ্রুতি
        </h2>
        <p
          className="max-w-3xl mx-auto text-gray-600 leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          প্রতিটি যাত্রী, ড্রাইভার এবং পার্টনার আমাদের কাছে সমান গুরুত্বপূর্ণ।
          তাদের বিশ্বাসই আমাদের মূল শক্তি। আমরা প্রতিশ্রুতিবদ্ধ প্রতিটি
          যাত্রায় নির্ভরযোগ্যতা, নিরাপত্তা এবং স্বচ্ছতা বজায় রাখতে। চলো শুধুমাত্র
          একটি যাতায়াতের অ্যাপ নয়, বরং একটি নতুন দৃষ্টিভঙ্গি — সবার জন্য একটি
          স্মার্ট ও টেকসই বাংলাদেশ।
        </p>

        <button className="btn bg-[#71BBB2] hover:bg-[#5AA29F] text-white border-none mt-10 flex items-center gap-2 mx-auto">
          আমাদের সেবাসমূহ <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default OurStory;
