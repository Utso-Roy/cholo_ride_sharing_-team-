import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import driverLottie from "../../public/Lottie/A driver.json";
import cabBookingLottie from "../../public/Lottie/cab booking.json";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import GoogleLogin from "./GoogleLogin";
import { AuthContext } from "../Auth/AuthProvider";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { api, } from "../lib/api";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<FormData>();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const authContext = useContext(AuthContext);

  if (!authContext) throw new Error("AuthContext must be used within AuthProvider");
  const { signup } = authContext;

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const password = watch("password") || passwordValue;

  const validations = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[\W_]/.test(password),
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error("ফাইল নির্বাচন করা হয়নি!");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        { method: "POST", body: formData }
      );
      const data = await res.json();

      if (data.success && data.data.display_url) {
        setProfilePic(data.data.display_url);
        toast.success("ছবি আপলোড হয়েছে ");
      } else {
        toast.error("ছবি আপলোড ব্যর্থ। আবার চেষ্টা করুন।");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("ছবি আপলোড ব্যর্থ। আবার চেষ্টা করুন।");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (isUploading) {
      toast.info("ছবি আপলোড শেষ না হওয়া পর্যন্ত অপেক্ষা করুন।");
      return;
    }

    try {
      const user = await signup(data.email, data.password);

      if (user) {
        await updateProfile(user, {
          displayName: data.name,
          photoURL: profilePic || undefined,
        });
      }

          const saveUser = {
        name: data.name,
        email: data.email,
        photo: profilePic || null,
        createdAt: new Date(),
        role : 'user'
      };

     await api.post('/users',saveUser)

      toast.success("নিবন্ধন সফল!");
      navigate(from);
    } catch (error: any) {
      console.error("Signup error:", error.message);
      toast.error(`নিবন্ধন ব্যর্থ: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Left Section */}
      <div className="w-full md:w-1/3 flex items-center justify-center bg-gradient-to-br from-[#71BBB2] to-[#5AA29F] p-6">
        <div className="bg-white/10 rounded-2xl shadow-lg px-6 py-8 max-w-sm text-center border border-white/20">
          <Lottie animationData={driverLottie} loop style={{ width: "100%", maxWidth: 200, margin: "0 auto" }} />
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-4">রাইড দিয়ে আয় করুন</h2>
          <p className="text-white/90 mt-2 text-base">আপনার গাড়ি শেয়ার করুন, আয় করুন সহজেই!</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-2/3 flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-md shadow-2xl rounded-3xl p-8">
          <div className="flex justify-center mb-4">
            <Lottie animationData={cabBookingLottie} loop style={{ width: "100%", maxWidth: 120 }} />
          </div>

          <h1 className="text-2xl font-bold text-center text-[#27445D] mb-6">রাইড বুক করতে একাউন্ট তৈরি করুন</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full max-w-md mx-auto">
            {/* Name */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2 text-gray-700">আপনার নাম</label>
              <InputText
                placeholder="আপনার নাম"
                {...register("name", { required: "নাম আবশ্যক" })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Profile Pic with DaisyUI */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2 text-gray-700">প্রোফাইল ছবি</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input file-input-bordered file-input-lg w-full"
              />
              
            </div>

            {/* Email */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2 text-gray-700">ইমেইল</label>
              <InputText
                type="email"
                placeholder="ইমেইল লিখুন"
                {...register("email", { required: "ইমেইল আবশ্যক" })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2 text-gray-700">পাসওয়ার্ড</label>
              <Password
                value={passwordValue}
                onChange={(e) => {
                  setPasswordValue(e.target.value);
                  setValue("password", e.target.value);
                }}
                toggleMask
                feedback
                placeholder="পাসওয়ার্ড লিখুন"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              label={isUploading ? "ছবি আপলোড হচ্ছে..." : "নিবন্ধন করুন"}
              icon="pi pi-user-plus"
              className="w-full !bg-[#71BBB2] !border-none !text-white hover:!bg-[#5AA29F]"
              disabled={isUploading}
            />

            <Divider align="center">
              <span className="text-gray-400 text-sm">অথবা</span>
            </Divider>

            <GoogleLogin />

            <p className="text-sm text-center mt-4">
              ইতিমধ্যে একাউন্ট আছে?{" "}
              <Link to="/login" className="text-blue-600 font-medium hover:underline">
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
