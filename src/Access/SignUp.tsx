import React, { useState } from 'react';
import Lottie from 'lottie-react';
// Lottie animation imports
import driverLottie from '../../public/Lottie/A driver.json';
import cabBookingLottie from '../../public/Lottie/cab booking.json';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import GoogleLogin from './GoogleLogin';

const SignUp = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const [profilePic, setProfilePic] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const password = watch('password') || '';

    const validations = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[\W_]/.test(password),
    };

    const onSubmit = (data: any) => {
        // Placeholder for user creation logic
        alert('Sign up successful! (No backend logic implemented)');
        navigate(from);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const image = files && files[0];
    setProfilePic(image ? image.name : '');
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-base-100">
            {/* Left Section */}
            <div
                className="w-full md:w-1/3 flex items-center justify-center bg-gradient-to-br from-[#71BBB2] to-[#5AA29F] p-4 md:p-0  transition hover:brightness-95"
            >
                <div className="flex flex-col items-center justify-center w-full">
                    <div className="bg-white/10 rounded-2xl shadow-lg px-4 py-6 md:px-6 md:py-8 max-w-xs md:max-w-sm mx-auto text-center border border-white/20">
                        <div className="flex justify-center mb-2">
                            <Lottie animationData={driverLottie} loop={true} style={{ width: '100%', maxWidth: 180, height: 'auto' }} />
                        </div>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3">রাইড দিয়ে আয় করতে নিবন্ধন করুন</h2>
                        <p className="text-white text-sm md:text-base lg:text-lg">আপনার গাড়ি শেয়ার করুন, আয় করুন সহজেই!</p>
                        <button className="mt-5 px-5 py-2 bg-white text-[#71BBB2] font-semibold rounded-lg shadow hover:bg-gray-100 transition text-base md:text-lg cursor-pointer">এখনই নিবন্ধন করুন</button>
                    </div>
                </div>
            </div>
            {/* Right Section (Sign Up Form) */}
            <div className="w-full md:w-2/3 flex items-center justify-center p-4 bg-[#e6f6f5]">
                <div className="card bg-[#e6f6f5] w-full max-w-sm shadow-2xl rounded-3xl mx-auto my-6">
                    <div className="card-body text-gray-800">
                        <div className="flex justify-center mb-2">
                            <Lottie animationData={cabBookingLottie} loop={true} style={{ width: '100%', maxWidth: 140, height: 'auto' }} />
                        </div>
                        <h1 className="text-3xl font-bold text-center text-gray-900">রাইড বুক করতে <br/>একাউন্ট তৈরি করুন</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-4">
                            {/* Name */}
                            <div>
                                <label className="label">আপনার নাম</label>
                                <input
                                    type="text"
                                    {...register('name', { required: true })}
                                    className="input input-bordered w-full bg-white text-black placeholder-gray-500"
                                    placeholder="আপনার নাম"
                                />
                                {errors.name && <p className="text-red-500 text-sm">নাম আবশ্যক</p>}
                            </div>
                            <div>
                                <label className="label">প্রোফাইল ছবি</label>
                                <input
                                    type="file"
                                    onChange={handleImageUpload}
                                    className="file-input file-input-bordered w-full bg-white text-black"
                                />
                            </div>
                            <div>
                                <label className="label">ইমেইল</label>
                                <input
                                    type="email"
                                    {...register('email', { required: true })}
                                    className="input input-bordered w-full bg-white text-black placeholder-gray-500"
                                    placeholder="ইমেইল"
                                />
                                {errors.email && <p className="text-red-500 text-sm">ইমেইল আবশ্যক</p>}
                            </div>
                            <div>
                                <label className="label">পাসওয়ার্ড</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password', {
                                            required: true,
                                            minLength: 8,
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                                                message: 'Password must meet all criteria'
                                            }
                                        })}
                                        className="input input-bordered w-full pr-10 bg-white text-black placeholder-gray-500"
                                        placeholder="পাসওয়ার্ড"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-xl text-gray-500"
                                    >
                                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                    </button>
                                </div>
                                {errors.password?.type === 'required' && (
                                    <p className="text-red-500 text-sm">পাসওয়ার্ড আবশ্যক</p>
                                )}
                                {errors.password?.type === 'minLength' && (
                                    <p className="text-red-500 text-sm">পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে</p>
                                )}
                                {errors.password?.message && (
                                    <p className="text-red-500 text-sm">{String(errors.password.message) === 'Password must meet all criteria' ? 'পাসওয়ার্ড অবশ্যই বড় হাতের, ছোট হাতের, সংখ্যা ও বিশেষ অক্ষর থাকতে হবে' : String(errors.password.message)}</p>
                                )}
                            </div>
                            {password && (
                                <ul className="text-xs text-gray-600 ml-1 mt-1 space-y-1">
                                    <li className={validations.length ? 'text-green-600' : 'text-red-500'}>
                                        {validations.length ? '✅' : '❌'} কমপক্ষে ৮ অক্ষর দিন
                                    </li>
                                    <li className={validations.upper ? 'text-green-600' : 'text-red-500'}>
                                        {validations.upper ? '✅' : '❌'} কমপক্ষে একটি বড় হাতের অক্ষর দিন
                                    </li>
                                    <li className={validations.lower ? 'text-green-600' : 'text-red-500'}>
                                        {validations.lower ? '✅' : '❌'} কমপক্ষে একটি ছোট হাতের অক্ষর দিন
                                    </li>
                                    <li className={validations.number ? 'text-green-600' : 'text-red-500'}>
                                        {validations.number ? '✅' : '❌'} কমপক্ষে একটি সংখ্যা দিন
                                    </li>
                                    <li className={validations.special ? 'text-green-600' : 'text-red-500'}>
                                        {validations.special ? '✅' : '❌'} কমপক্ষে একটি বিশেষ অক্ষর দিন
                                    </li>
                                </ul>
                            )}
                            <button className="btn bg-[#71BBB2] hover:bg-[#5AA29F] text-white border-none w-full mt-3">নিবন্ধন করুন</button>
                            <p className="text-sm text-center mt-2">
                                ইতিমধ্যে একাউন্ট আছে?{' '}
                                <Link to="/login" className="text-blue-500 hover:underline">
                                    লগইন করুন
                                </Link>
                            </p>
                        </form>
                        <GoogleLogin></GoogleLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;