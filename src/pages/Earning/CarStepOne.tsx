import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useCarApply } from "../../context/car";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import CarEarnArticle from "../../components/EarningArticle/CarEarnArticle";

const CITY_OPTIONS = [
  { label: "ঢাকা", value: "Dhaka" },
  { label: "চট্টগ্রাম", value: "Chattogram" },
  { label: "সিলেট", value: "Sylhet" },
  { label: "খুলনা", value: "Khulna" },
  { label: "রাজশাহী", value: "Rajshahi" },
];

export default function CarStepOne() {
  const { driver, setDriver } = useCarApply();
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
    navigate("/earn/car/details");
  };

  return (
    <main>
      <Toast ref={toast} />
      <h1 className="text-4xl font-bold text-[#27445D] mt-8 mb-6 text-center">কার রাইড দিয়ে আয় করুন</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start max-w-7xl mx-auto">
        {/* LEFT: ফর্ম */}
        <div className="border-white/30
    bg-white/20 backdrop-blur-6xl
    shadow-lg rounded-lg p-5 md:p-6 text-[#27445D]">
          <h1 className="text-2xl font-bold text-gray-700 mb-8 text-center">রেজিষ্ট্রেশন করুন</h1>

          <div className="flex flex-col gap-3">
            <label>নামের প্রথম অংশ*</label>
            <InputText
              value={driver.firstName}
              onChange={(e) => setDriver({ ...driver, firstName: e.target.value })}
              onBlur={() => markTouched("firstName")}
              className={classNames({ "p-invalid": touched.firstName && errs.firstName })}
              placeholder="যেমন: মোহাম্মদ"
            />
            {touched.firstName && errs.firstName && <small className="p-error">প্রথম অংশ আবশ্যক</small>}

            <label className="mt-2">নামের শেষ অংশ*</label>
            <InputText
              value={driver.lastName}
              onChange={(e) => setDriver({ ...driver, lastName: e.target.value })}
              onBlur={() => markTouched("lastName")}
              className={classNames({ "p-invalid": touched.lastName && errs.lastName })}
              placeholder="যেমন: হাসান"
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

        {/* RIGHT: আর্টিকেল */}
        <CarEarnArticle/>
      </section>
    </main>
  );
}
