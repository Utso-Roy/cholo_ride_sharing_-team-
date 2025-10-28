import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import GoogleLogin from "./GoogleLogin";
import Lottie from "lottie-react";
import taxiLottie from "../../public/Lottie/TAXI.json";
import taxi2Lottie from "../../public/Lottie/TAXI 2.json";
import { AuthContext } from "../Auth/AuthProvider";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { toast } from "react-toastify";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormData>();
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password") || "";
  const email = watch("email") || "";

  const validations = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[\W_]/.test(password),
  };

  const onSubmit = async (data: FormData) => {
    try {
      await loginUser(data.email, data.password);
      toast.success("Login successful!");
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-base-100">
      {/* Left Section */}
      <div className="w-full md:w-1/3 flex items-center justify-center bg-gradient-to-br from-[#71BBB2] to-[#5AA29F] p-4 md:p-0">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="bg-white/10 rounded-2xl shadow-lg px-4 py-6 md:px-6 md:py-8 max-w-xs md:max-w-sm mx-auto text-center border border-white/20">
            <div className="flex justify-center mb-2">
              <Lottie
                animationData={taxiLottie}
                loop
                style={{ width: "100%", maxWidth: 180, height: "auto" }}
              />
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3">
              স্বাগতম!
            </h2>
            <p className="text-white text-sm md:text-base lg:text-lg">
              লগইন করে আপনার যাত্রা শুরু করুন সহজেই ।
            </p>
          </div>
        </div>
      </div>

      {/* Right Section (Login Form) */}
      <div className="w-full md:w-2/3 flex items-center justify-center p-4 bg-[#e6f6f5]">
        <div className="card bg-[#e6f6f5] w-full max-w-sm shadow-2xl rounded-3xl mx-auto my-6">
          <div className="card-body text-gray-800">
            <div className="flex justify-center mb-2">
              <Lottie
                animationData={taxi2Lottie}
                loop
                style={{ width: "100%", maxWidth: 140, height: "auto" }}
              />
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              লগইন করুন
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
              {/* Email */}
              <div className="w-full">
                <label className="block text-gray-700 text-sm mb-1">
                  ইমেইল
                </label>
                <InputText
                  type="email"
                  placeholder="ইমেইল লিখুন"
                  {...register("email", { required: "ইমেইল আবশ্যক" })}
                  className="w-full"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="w-full">
                <label className="block text-gray-700 text-sm mb-1">
                  পাসওয়ার্ড
                </label>
                <div className="relative">
                  <InputText
                    value={password}
                    type="password"
                    onChange={(e) => setValue("password", e.target.value)}
                    placeholder="পাসওয়ার্ড লিখুন"
                    className="w-full"
                  />
                </div>
                {password && (
                  <ul className="text-xs text-gray-600 mt-1 ml-1 space-y-1">
                    <li
                      className={
                        validations.length ? "text-green-600" : "text-red-500"
                      }
                    >
                      {validations.length ? "✅" : "❌"} কমপক্ষে ৮ অক্ষর
                    </li>
                    <li
                      className={
                        validations.upper ? "text-green-600" : "text-red-500"
                      }
                    >
                      {validations.upper ? "✅" : "❌"} একটি বড় হাতের অক্ষর
                    </li>
                    <li
                      className={
                        validations.lower ? "text-green-600" : "text-red-500"
                      }
                    >
                      {validations.lower ? "✅" : "❌"} একটি ছোট হাতের অক্ষর
                    </li>
                    <li
                      className={
                        validations.number ? "text-green-600" : "text-red-500"
                      }
                    >
                      {validations.number ? "✅" : "❌"} একটি সংখ্যা
                    </li>
                    <li
                      className={
                        validations.special ? "text-green-600" : "text-red-500"
                      }
                    >
                      {validations.special ? "✅" : "❌"} একটি বিশেষ অক্ষর
                    </li>
                  </ul>
                )}
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  to="/forget-password-with-email"
                  className="text-sm text-blue-500 hover:underline"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                label="লগইন করুন"
                className="w-full !bg-[#71BBB2] !border-none !text-white hover:!bg-[#5AA29F]"
              />

              {/* Sign Up Link */}
              <p className="mt-2 text-sm text-center">
                একাউন্ট নেই?{" "}
                <Link to="/signup" className="text-blue-500 hover:underline">
                  নিবন্ধন করুন
                </Link>
              </p>
            </form>

            {/* Google Login */}
            <div className="mt-4">
              <GoogleLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
