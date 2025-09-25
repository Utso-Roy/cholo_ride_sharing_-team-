import React, { useState } from "react";
import Lottie from "lottie-react";
import driverLottie from "../../public/Lottie/A driver.json";
import cabBookingLottie from "../../public/Lottie/cab booking.json";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router"; 
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { FileUpload } from "primereact/fileupload";
import GoogleLogin from "./GoogleLogin";

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const [profilePic, setProfilePic] = useState("");
  const password = watch("password") || "";

  const validations = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[\W_]/.test(password),
  };

  const onSubmit = (data: any) => {
    alert("Sign up successful! (No backend logic implemented)");
    navigate(from);
  };

  const handleFileSelect = (e: any) => {
    if (e.files && e.files[0]) {
      setProfilePic(e.files[0].name);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Section */}
      <div className="w-full md:w-1/3 flex items-center justify-center bg-gradient-to-br from-[#71BBB2] to-[#5AA29F] p-6">
        <div className="bg-white/10 rounded-2xl shadow-lg px-6 py-8 max-w-sm text-center border border-white/20">
          <Lottie
            animationData={driverLottie}
            loop
            style={{ width: "100%", maxWidth: 200, margin: "0 auto" }}
          />
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-4">
            রাইড দিয়ে আয় করুন
          </h2>
          <p className="text-white/90 mt-2 text-base">
            আপনার গাড়ি শেয়ার করুন, আয় করুন সহজেই!
          </p>
          <Button
            label="এখনই নিবন্ধন করুন"
            className="mt-6 !bg-white !text-[#71BBB2] hover:!bg-gray-100 w-full"
          />
        </div>
      </div>

      {/* Right Section (Sign Up Form) */}
      <div className="w-full md:w-2/3 flex items-center justify-center p-6 bg-[#f7faf9]">
        <div className="bg-white w-full max-w-md shadow-2xl rounded-3xl p-8">
          <div className="flex justify-center mb-4">
            <Lottie
              animationData={cabBookingLottie}
              loop
              style={{ width: "100%", maxWidth: 120 }}
            />
          </div>
          <h1 className="text-2xl font-bold text-center text-[#27445D] mb-6">
            রাইড বুক করতে একাউন্ট তৈরি করুন
          </h1>

         <form
  onSubmit={handleSubmit(onSubmit)}
  className="space-y-5 w-full max-w-md mx-auto"
>
  {/* Name */}
  <div>
    <label className="block text-sm font-medium mb-2 text-gray-700">
      আপনার নাম
    </label>
    <span className="p-input-icon-left w-full">
      <i className="pi pi-user" />
      <InputText
        placeholder="আপনার নাম"
        {...register("name", { required: true })}
        className="w-full"
      />
    </span>
    {errors.name && (
      <p className="text-red-500 text-sm mt-1">নাম আবশ্যক</p>
    )}
  </div>

  {/* Profile Pic */}
  <div>
    <label className="block text-sm font-medium mb-2 text-gray-700">
      প্রোফাইল ছবি
    </label>
    <FileUpload
      mode="basic"
      name="profilePic"
      accept="image/*"
      maxFileSize={1000000}
      chooseLabel="ছবি আপলোড করুন"
      className="w-full"
      customUpload
      uploadHandler={handleFileSelect}
    />
    {profilePic && (
      <p className="text-xs text-green-600 mt-1">
         {profilePic} নির্বাচিত হয়েছে
      </p>
    )}
  </div>

  {/* Email */}
  <div>
    <label className="block text-sm font-medium mb-2 text-gray-700">
      ইমেইল
    </label>
    <span className="p-input-icon-left w-full">
      <i className="pi pi-envelope" />
      <InputText
        type="email"
        placeholder="ইমেইল লিখুন"
        {...register("email", { required: true })}
        className="w-full"
      />
    </span>
    {errors.email && (
      <p className="text-red-500 text-sm mt-1">ইমেইল আবশ্যক</p>
    )}
  </div>

  {/* Password */}
  <div>
    <label className="block text-sm font-medium mb-2 text-gray-700">
      পাসওয়ার্ড
    </label>
    <Password
      toggleMask
      feedback={false}
      placeholder="পাসওয়ার্ড লিখুন"
      {...register("password", {
        required: "পাসওয়ার্ড আবশ্যক",
        minLength: {
          value: 8,
          message: "কমপক্ষে ৮ অক্ষর দিতে হবে",
        },
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
          message:
            "বড় হাতের, ছোট হাতের, সংখ্যা ও বিশেষ অক্ষর থাকতে হবে",
        },
      })}
      className="w-full"
      inputClassName="w-full"
    />
    {errors.password && (
      <p className="text-red-500 text-sm mt-1">
        {String(errors.password.message)}
      </p>
    )}
  </div>

  {/* Password Validation */}
  {password && (
    <ul className="text-xs text-gray-600 ml-1 mt-2 space-y-1">
      <li className={validations.length ? "text-green-600" : "text-red-500"}>
        {validations.length ? "✅" : "❌"} কমপক্ষে ৮ অক্ষর দিন
      </li>
      <li className={validations.upper ? "text-green-600" : "text-red-500"}>
        {validations.upper ? "✅" : "❌"} একটি বড় হাতের অক্ষর দিন
      </li>
      <li className={validations.lower ? "text-green-600" : "text-red-500"}>
        {validations.lower ? "✅" : "❌"} একটি ছোট হাতের অক্ষর দিন
      </li>
      <li className={validations.number ? "text-green-600" : "text-red-500"}>
        {validations.number ? "✅" : "❌"} একটি সংখ্যা দিন
      </li>
      <li className={validations.special ? "text-green-600" : "text-red-500"}>
        {validations.special ? "✅" : "❌"} একটি বিশেষ অক্ষর দিন
      </li>
    </ul>
  )}

  {/* Submit */}
  <Button
    type="submit"
    label="নিবন্ধন করুন"
    icon="pi pi-user-plus"
    className="w-full !bg-[#71BBB2] !border-none !text-white hover:!bg-[#5AA29F]"
  />

  {/* Divider */}
  <Divider align="center">
    <span className="text-gray-400 text-sm">অথবা</span>
  </Divider>

  {/* Google Login */}
  <GoogleLogin />

  {/* Already have account */}
  <p className="text-sm text-center mt-4">
    ইতিমধ্যে একাউন্ট আছে?{" "}
    <Link
      to="/login"
      className="text-blue-600 font-medium hover:underline"
    >
      লগইন করুন
    </Link>
  </p>
</form>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
