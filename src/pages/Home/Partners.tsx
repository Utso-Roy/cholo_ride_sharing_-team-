import React from "react";
import Container from "../../Container/Container";

const partners = [
  { id: 1, name: "Bkash", logo: "https://i.ibb.co.com/0Wjv7Cx/bkash.png" },
  { id: 2, name: "Nagad", logo: "https://i.ibb.co.com/v4FXZZqX/images.png" },
  { id: 3, name: "Rocket", logo: "https://i.ibb.co.com/x8tcdhKp/Rocket.png" },
  { id: 4, name: "Visa", logo: "https://i.ibb.co.com/zTTkZkWN/visa2.png" },
  { id: 5, name: "MasterCard", logo: "https://i.ibb.co.com/PztLDn3F/mastercardlogo.png" },
  { id: 6, name: "DBBL", logo: "https://i.ibb.co/pjXcYt2W/DBBL.jpg" },
];

const Partners = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <Container>

        <div className="relative max-w-7xl mx-auto">
        {/* Heading with modern styling */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <span className="text-sm font-semibold tracking-wider text-[#27445d] uppercase bg-blue-100 px-4 py-2 rounded-full">
              বিশ্বস্ত অংশীদার
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold   text-[#27445d]">
            আমাদের পার্টনার
          </h2>
          <p className="mt-4 text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            আমরা বিশ্বাসযোগ্য এবং পরিচিত কোম্পানি ও পেমেন্ট গেটওয়ের সাথে কাজ করি
          </p>
        </div>

        {/* Content: Image + Partner Cards */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Side: Enhanced Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://i.ibb.co.com/BVD2NsmC/partnar.jpg"
                  alt="Partners Background"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Right Side: Enhanced Partner Cards */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {partners.map((partner, index) => (
                <div
                  key={partner.id}
                  className="group relative"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
                  <div className="relative flex items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-14 md:max-h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Trust Badge */}
            <div className="mt-10 p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100">
              <div className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <p className="text-gray-700 font-medium">
                  <span className="font-bold text-blue-700">১০০% সুরক্ষিত</span> পেমেন্ট সিস্টেম
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Container>
      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Partners;