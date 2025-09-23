import React from 'react';
import { Link } from 'react-router';
import Lottie from 'lottie-react';
import taxiLottie from '../../public/Lottie/TAXI.json';

const ForgetPasswordwithNumber = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-base-100">
            {/* Left Section */}
            <div className="w-full md:w-1/3 flex items-center justify-center bg-gradient-to-br from-[#71BBB2] to-[#5AA29F] p-4 md:p-0">
                <div className="flex flex-col items-center justify-center w-full">
                    <div className="bg-white/10 rounded-2xl shadow-lg px-4 py-6 md:px-6 md:py-8 max-w-xs md:max-w-sm mx-auto text-center border border-white/20">
                        <div className="flex justify-center mb-2">
                            <Lottie animationData={taxiLottie} loop={true} style={{ width: '100%', maxWidth: 180, height: 'auto' }} />
                        </div>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3">পাসওয়ার্ড ভুলে গেছেন?</h2>
                        <p className="text-white text-sm md:text-base lg:text-lg">ফোন নম্বর দিয়ে পাসওয়ার্ড পুনরুদ্ধার করুন।</p>
                    </div>
                </div>
            </div>
            {/* Right Section (Form) */}
            <div className="w-full md:w-2/3 flex items-center justify-center p-4 bg-[#e6f6f5]">
                <div className="card bg-[#e6f6f5] w-full max-w-sm shadow-2xl rounded-3xl mx-auto my-6">
                    <div className="card-body text-gray-800">
                        <h2 className="text-2xl font-bold text-center mb-4 text-[#71BBB2]">পাসওয়ার্ড পুনরুদ্ধার করুন</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="label">ফোন নম্বর</label>
                                <input type="tel" placeholder="ফোন নম্বর দিন" className="input input-bordered w-full bg-white text-black placeholder-gray-500" />
                            </div>
                            <button type="submit" className="btn bg-[#71BBB2] hover:bg-[#5AA29F] text-white border-none w-full">পাসওয়ার্ড রিসেট লিঙ্ক পাঠান</button>
                        </form>
                            <Link to="/forget-password-with-email" className="btn bg-white text-[#71BBB2] border border-[#71BBB2] hover:bg-[#e6f6f5] w-full mt-3">ই-মেইল দিয়ে পুনরুদ্ধার করুন</Link>
                        <p className="text-sm text-center mt-4">
                            <Link to="/login" className="text-blue-500 hover:underline">লগইন পেজে ফিরে যান</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPasswordwithNumber;