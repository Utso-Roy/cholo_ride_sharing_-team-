import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const toast = useRef<Toast>(null);

  const handleSubscribe = () => {
    if (!email) {
      toast.current?.show({
        severity: "warn",
        summary: "Warning",
        detail: "Please enter your email",
        life: 3000,
      });
      return;
    }
    toast.current?.show({
      severity: "success",
      summary: "Subscribed",
      detail: `You have subscribed with ${email}`,
      life: 3000,
    });
    setEmail("");
  };

  return (
    <section className="py-16 bg-gray-50">
      <Toast ref={toast} />
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-[#27445D] ">
          আমাদের নিউজলেটার সাবস্ক্রাইব করুন
        </h2>
        <p className="text-gray-600 mb-8">
          সর্বশেষ খবর, অফার এবং আপডেট পেতে আপনার ইমেইল দিন
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
          <InputText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="আপনার ইমেইল লিখুন"
            className="w-full sm:flex-1"
          />
          <Button
            label="সাবস্ক্রাইব করুন"
            className="!bg-[#71BBB2] !hover:bg-[#5AA29F] !text-white"
            onClick={handleSubscribe}
          />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
