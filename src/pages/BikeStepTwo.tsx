import { useRef, useMemo } from "react";
import { useNavigate } from "react-router";

import { Steps } from "primereact/steps";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { RadioButton } from "primereact/radiobutton";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { Gender, useBikeApply } from "../context/bike";

const CITY_OPTIONS = [
  { label: "ঢাকা", value: "Dhaka" },
  { label: "চট্টগ্রাম", value: "Chattogram" },
  { label: "সিলেট", value: "Sylhet" },
  { label: "খুলনা", value: "Khulna" },
  { label: "কক্সবাজার", value: "CoxsBazar" },
  { label: "রাজশাহী", value: "Rajshahi" },
];

const BRAND_MODELS: Record<string, string[]> = {
  Honda: ["CB Hornet", "Livo", "Shine", "Dream Neo"],
  Yamaha: ["FZ", "FZS", "Saluto", "SZR"],
  TVS: ["Apache", "Metro", "Stryker"],
  Bajaj: ["Pulsar", "Discover", "Platina"],
  Hero: ["Glamour", "Hunk", "Ignitor"],
};

export default function BikeStepTwo() {
  const { driver, setDriver, vehicle, setVehicle, reset } = useBikeApply();
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const stepItems = [{ label: "ধাপ ১" }, { label: "ধাপ ২" }];

  const modelOptions = useMemo(() => {
    if (!vehicle.brand) return [];
    return (BRAND_MODELS[vehicle.brand] || []).map(m => ({ label: m, value: m }));
  }, [vehicle.brand]);

  const submitAll = () => {
    // ধাপ–২ ভ্যালিডেশন (ড্রাইভার + ভেহিকল)
    const invalid =
      !driver.firstName?.trim() ||
      !driver.lastName?.trim() ||
      !/^01[0-9]{9}$/.test(driver.phone || "") ||
      !driver.city ||
      !driver.gender ||
      !driver.dob ||
      !(driver.nid && driver.nid.trim().length >= 10) ||
      !(driver.license && driver.license.trim().length >= 6) ||
      !driver.photo ||
      !vehicle.brand ||
      !vehicle.model ||
      !vehicle.regNo?.trim() ||
      !vehicle.year?.trim() ||
      !vehicle.fitnessNo?.trim();

    if (invalid) {
      toast.current?.show({ severity: "warn", summary: "ফর্ম অসম্পূর্ণ", detail: "সবগুলো প্রয়োজনীয় ঘর পূরণ করুন।" });
      return;
    }

    // Payload প্রস্তুত
    const payload = { driver, vehicle };
    console.log("SUBMIT_PAYLOAD", payload);

    // TODO: API কল (উদাহরণ):
    // const fd = new FormData();
    // Object.entries(driver).forEach(([k, v]) => {
    //   if (k === "photo" && v) fd.append("photo", v as File);
    //   else if (v !== undefined && v !== null) fd.append(k, String(v));
    // });
    // Object.entries(vehicle).forEach(([k, v]) => fd.append(`vehicle_${k}`, String(v)));
    // await fetch("/api/driver-apply", { method: "POST", body: fd });

    toast.current?.show({ severity: "success", summary: "সফল", detail: "আবেদন জমা হয়েছে!" });
    reset(); // সব ফর্ম রিসেট
    navigate("/"); // হোমে ফিরিয়ে দেই (ইচ্ছে হলে অন্য পেজে)
  };

  const onPhoto = (e: FileUploadSelectEvent) => {
    const file = e.files?.[0] as File | undefined;
    setDriver({ ...driver, photo: file ?? null });
  };

  return (
    <main className="px-4 md:px-10 py-10">
      <Toast ref={toast} />

      {/* টপে Steps (ভিজুয়াল) */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <Steps model={stepItems} activeIndex={1} readOnly />
      </div>

      {/* সেন্টারে দুই ফর্ম */}
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        {/* Form 1: Driver Details */}
        <section className="bg-white rounded-lg shadow p-5 md:p-6">
          <h2 className="text-xl font-bold text-[#27445D] mb-4">ড্রাইভার তথ্য</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label>নামের প্রথম অংশ*</label>
              <InputText value={driver.firstName} onChange={(e) => setDriver({ ...driver, firstName: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
              <label>নামের শেষ অংশ*</label>
              <InputText value={driver.lastName} onChange={(e) => setDriver({ ...driver, lastName: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
              <label>মোবাইল নম্বর*</label>
              <InputText keyfilter="int" value={driver.phone} onChange={(e) => setDriver({ ...driver, phone: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
              <label>শহর*</label>
              <Dropdown
                value={driver.city}
                onChange={(e) => setDriver({ ...driver, city: e.value })}
                options={CITY_OPTIONS}
                optionLabel="label"
                optionValue="value"
                placeholder="শহর নির্বাচন করুন"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>লিঙ্গ*</label>
              <div className="flex items-center gap-4">
                {(["male", "female", "other"] as Gender[]).map((g) => (
                  <label key={g} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      checked={driver.gender === g}
                      onChange={() => setDriver({ ...driver, gender: g })}
                    />
                    <span>{g === "male" ? "পুরুষ" : g === "female" ? "নারী" : "অন্যান্য"}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label>জন্ম তারিখ*</label>
              <Calendar
                value={driver.dob ?? null}
                onChange={(e) => setDriver({ ...driver, dob: e.value as Date })}
                dateFormat="dd/mm/yy"
                showIcon
                maxDate={new Date()}
                placeholder="জন্ম তারিখ নির্বাচন করুন"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>ন্যাশনাল আইডি নম্বর*</label>
              <InputText value={driver.nid} onChange={(e) => setDriver({ ...driver, nid: e.target.value })} placeholder="কমপক্ষে ১০ সংখ্যা" />
            </div>

            <div className="flex flex-col gap-2">
              <label>ড্রাইভিং লাইসেন্স নম্বর*</label>
              <InputText value={driver.license} onChange={(e) => setDriver({ ...driver, license: e.target.value })} placeholder="কমপক্ষে ৬ অক্ষর" />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label>ছবি আপলোড করুন (jpg/png)*</label>
              <FileUpload mode="basic" name="photo" chooseLabel="ছবি নির্বাচন" accept="image/*" maxFileSize={2 * 1024 * 1024} customUpload onSelect={onPhoto} />
              {driver.photo && <small className="text-green-700 ">নির্বাচিত: {driver.photo.name}</small>}
            </div>
          </div>
        </section>

        {/* Form 2: Vehicle Details */}
        <section className="bg-white rounded-lg shadow p-5 md:p-6">
          <h2 className="text-xl font-bold text-[#27445D] mb-4">গাড়ির তথ্য</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label>ব্র্যান্ড সিলেক্ট করুন*</label>
              <Dropdown
                value={vehicle.brand}
                onChange={(e) => setVehicle({ ...vehicle, brand: e.value, model: null })}
                options={Object.keys(BRAND_MODELS).map(b => ({ label: b, value: b }))}
                placeholder="ব্র্যান্ড নির্বাচন"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>মডেল সিলেক্ট করুন*</label>
              <Dropdown
                value={vehicle.model}
                onChange={(e) => setVehicle({ ...vehicle, model: e.value })}
                options={modelOptions}
                placeholder="মডেল নির্বাচন"
                disabled={!vehicle.brand}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>রেজিস্ট্রেশন নাম্বার*</label>
              <InputText value={vehicle.regNo} onChange={(e) => setVehicle({ ...vehicle, regNo: e.target.value })} placeholder="যেমন: DHA-XX-1234" />
            </div>

            <div className="flex flex-col gap-2">
              <label>বছর*</label>
              <InputText keyfilter="int" value={vehicle.year} onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })} placeholder="যেমন: 2019" />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label>ফিটনেস নাম্বার*</label>
              <InputText value={vehicle.fitnessNo} onChange={(e) => setVehicle({ ...vehicle, fitnessNo: e.target.value })} />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button label="সাবমিট" icon="pi pi-check" onClick={submitAll} />
          </div>
        </section>
      </div>
    </main>
  );
}
