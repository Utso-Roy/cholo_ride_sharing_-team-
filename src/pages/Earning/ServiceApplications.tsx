import React, { useRef } from "react";
import { useParams } from "react-router";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Label } from "recharts";

const ServiceApplication: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const toast = useRef<Toast>(null);

  // Common form data states (for simplicity, you can expand this)
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    vehicleType: "",
    date: null as Date | null,
    notes: "",
    agree: false,
  });

  const vehicleOptions = [
    { label: "ছোট", value: "mini" },
    { label: "মাঝারি", value: "medium" },
    { label: "বড়", value: "large" },
  ];

  const getTitle = () => {
    switch (type) {
      case "truck":
        return "ট্রাক সার্ভিস আবেদন ফর্ম";
      case "ambulance":
        return "অ্যাম্বুলেন্স সার্ভিস আবেদন ফর্ম";
      case "bus":
        return "স্কু ল বাস সার্ভিস আবেদন ফর্ম";
      case "shuttle":
        return "শাটল সার্ভিস আবেদন ফর্ম";
      default:
        return "সার্ভিস আবেদন ফর্ম";
    }
  };

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.phone || !formData.agree) {
      toast.current?.show({
        severity: "warn",
        summary: "ত্রুটি",
        detail: "দয়া করে সব প্রয়োজনীয় তথ্য পূরণ করুন।",
      });
      return;
    }

    console.log("Submitted Data:", { type, ...formData });
    toast.current?.show({
      severity: "success",
      summary: "সফলভাবে জমা হয়েছে!",
      detail: `${getTitle()} এর আবেদন সফল হয়েছে।`,
    });

    // reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      vehicleType: "",
      date: null,
      notes: "",
      agree: false,
    });
  };

  return (
    <section
      className="bg-cover py-15 bg-center  bg-no-repeat bg-fixed"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(230,252,249,0.8), rgba(249,250,251,0.8)), url('https://i.ibb.co/zTQ6z80G/map.jpg')",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        backgroundBlendMode: "overlay",
      }}
    >
      <div
        className="
    relative p-6 max-w-2xl mx-auto
    rounded-2xl border border-white/30
    bg-white/20 backdrop-blur-6xl
    shadow-lg text-[#27445D]
  "
      >
        <Toast ref={toast} />
        <h2 className="text-2xl font-bold mb-6 text-center text-[#227B73]">
          {getTitle()}
        </h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">নাম *</label>
          <InputText
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="আপনার পূর্ণ নাম"
            className="w-full"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">ইমেইল</label>
          <InputText
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="example@email.com"
            className="w-full"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">ফোন নাম্বার *</label>
          <InputText
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="০১XXXXXXXXX"
            className="w-full"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">ঠিকানা</label>
          <InputText
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="বর্তমান ঠিকানা"
            className="w-full"
          />
        </div>

        {/* Vehicle Type */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">যানবাহনের ধরন</label>
          <Dropdown
            value={formData.vehicleType}
            onChange={(e) => handleChange("vehicleType", e.value)}
            options={vehicleOptions}
            placeholder="ধরন নির্বাচন করুন"
            className="w-full"
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">সার্ভিস তারিখ</label>
          <Calendar
            value={formData.date}
            onChange={(e) => handleChange("date", e.value)}
            showIcon
            className="w-full"
          />
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">
            প্রয়োজনে ফাইল আপলোড
          </label>
          <FileUpload
            mode="basic"
            name="demo[]"
            url="/api/upload"
            accept="image/*,application/pdf"
            chooseOptions={{
              label: "ফাইল নির্বাচন",
              className:
                "!bg-[#71BBB2] border-none hover:!bg-[#27445D] hover:!text-white " +
                "!text-white font-medium",
            }}
            maxFileSize={1000000}
            className="w-full"
            customUpload
            auto={false}
          />
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">অতিরিক্ত তথ্য</label>
          <InputTextarea
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            rows={3}
            placeholder="যদি কোনো বিশেষ নির্দেশনা থাকে"
            className="w-full"
          />
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2 mb-6">
          <Checkbox
            inputId="agree"
            checked={formData.agree}
            onChange={(e) => handleChange("agree", e.checked)}
          />
          <label htmlFor="agree" className="text-sm">
            আমি শর্তাবলী পড়েছি এবং সম্মত আছি।
          </label>
        </div>

        {/* Submit */}
        <Button
          label="জমা দিন"
          icon="pi pi-check"
          className="w-full !bg-[#71BBB2] hover:!bg-[#27445D]"
          onClick={handleSubmit}
        />
      </div>
    </section>
  );
};

export default ServiceApplication;
