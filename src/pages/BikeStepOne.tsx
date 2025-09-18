import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useBikeApply } from "../context/bike";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";


const CITY_OPTIONS = [
  { label: "ঢাকা", value: "Dhaka" },
  { label: "চট্টগ্রাম", value: "Chattogram" },
  { label: "সিলেট", value: "Sylhet" },
  { label: "খুলনা", value: "Khulna" },
  { label: "কক্সবাজার", value: "CoxsBazar" },
  { label: "রাজশাহী", value: "Rajshahi" },
];

export default function BikeStepOne() {
  const { driver, setDriver } = useBikeApply();
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const errs = {
    firstName: !driver.firstName?.trim(),
    lastName: !driver.lastName?.trim(),
    phone: !/^01[0-9]{9}$/.test(driver.phone || ""),
    city: !driver.city,
  };
  const isValid = !(errs.firstName || errs.lastName || errs.phone || errs.city);
  const markTouched = (k: string) => setTouched(t => ({ ...t, [k]: true }));

  const gotoNext = () => {
    ["firstName", "lastName", "phone", "city"].forEach(markTouched);
    if (!isValid) {
      toast.current?.show({ severity: "warn", summary: "ফর্ম অসম্পূর্ণ", detail: "ধাপ ১-এর প্রয়োজনীয় ঘরগুলো পূরণ করুন।" });
      return;
    }
    navigate("/earn/bike/details");
  };

  return (
    <main className="px-4 bg-white md:px-10 py-10">
      <Toast ref={toast} />
        <h1 className="text-4xl font-bold text-[#27445D] mt-8 mb-6 text-center">বাইক রাইড দিয়ে আয় করুন</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start max-w-7xl mx-auto">
        {/* LEFT: ফর্ম */}
        <div className="bg-[#27445D] rounded-lg shadow p-5 md:p-6">
          <h1 className="text-2xl font-bold text-white mb-8 text-center">রেজিষ্ট্রেশন করুন</h1>

          <div className="flex flex-col gap-3">
            <label>নামের প্রথম অংশ*</label>
            <InputText
              value={driver.firstName}
              onChange={(e) => setDriver({ ...driver, firstName: e.target.value })}
              onBlur={() => markTouched("firstName")}
              className={classNames({ "p-invalid": touched.firstName && errs.firstName })}
              placeholder="যেমন: রহিম"
            />
            {touched.firstName && errs.firstName && <small className="p-error">প্রথম অংশ আবশ্যক</small>}

            <label className="mt-2">নামের শেষ অংশ*</label>
            <InputText
              value={driver.lastName}
              onChange={(e) => setDriver({ ...driver, lastName: e.target.value })}
              onBlur={() => markTouched("lastName")}
              className={classNames({ "p-invalid": touched.lastName && errs.lastName })}
              placeholder="যেমন: উদ্দিন"
            />
            {touched.lastName && errs.lastName && <small className="p-error">শেষ অংশ আবশ্যক</small>}

            <label className="mt-2">মোবাইল নম্বর* <span className="opacity-70">(01XXXXXXXXX)</span></label>
            <InputText
              keyfilter="int"
              value={driver.phone}
              onChange={(e) => setDriver({ ...driver, phone: e.target.value })}
              onBlur={() => markTouched("phone")}
              className={classNames({ "p-invalid": touched.phone && errs.phone })}
              placeholder="01XXXXXXXXX"
            />
            {touched.phone && errs.phone && <small className="p-error">সঠিক মোবাইল নম্বর দিন</small>}

            <label className="mt-2">শহর*</label>
            <Dropdown
              value={driver.city}
              onChange={(e) => setDriver({ ...driver, city: e.value })}
              onBlur={() => markTouched("city")}
              options={CITY_OPTIONS}
              optionLabel="label"
              optionValue="value"
              placeholder="শহর নির্বাচন করুন"
              className={classNames({ "p-invalid": touched.city && errs.city })}
            />
            {touched.city && errs.city && <small className="p-error">শহর নির্বাচন করুন</small>}

            <div className="flex justify-end pt-3">
              <Button label="পরবর্তী ধাপ" icon="pi pi-arrow-right"
              className="!bg-[#71BBB2] !border-none hover:!bg-[#5AA29F]" onClick={gotoNext} />
            </div>
          </div>
        </div>

        {/* RIGHT: আর্টিকেল/বর্ণনা */}
        <article className="bg-[#27445D] rounded-lg shadow p-5 md:p-6 text-white">
          <h2 className="text-xl font-bold mb-3">কিভাবে বাইক রাইড দিয়ে আয় করবেন</h2>
          <ol className="list-decimal ml-5 space-y-2">
            <li>অ্যাপে ড্রাইভার হিসেবে সাইন আপ করুন।</li>
            <li>প্রয়োজনীয় ডকুমেন্ট (NID, লাইসেন্স, রেজিস্ট্রেশন) যাচাই করুন।</li>
            <li>পছন্দের সময় অনুযায়ী অনলাইনে এসে রাইড নিন।</li>
            <li>সেফটি গাইডলাইন ফলো করুন এবং ৫-স্টার সার্ভিস দিন।</li>
            <li>সাপ্তাহিক পেআউটে আয় গ্রহণ করুন।</li>
          </ol>
          <p className="mt-4 text-sm">নোট: যথাযথ কাগজপত্র না থাকলে অ্যাকাউন্ট ভেরিফাই নাও হতে পারে।</p>
        </article>
      </section>
    </main>
  );
}
