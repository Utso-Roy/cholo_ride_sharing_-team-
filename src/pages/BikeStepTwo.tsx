import React from "react";
import { useRef, useMemo, useEffect, useState } from "react";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { useNavigate } from "react-router";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { Gender, useBikeApply } from "../context/bike";

import { FaUserCheck, FaMotorcycle, FaClipboardCheck } from "react-icons/fa";

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

const BikeStepTwo = () => {
  const { driver, setDriver, vehicle, setVehicle, reset } = useBikeApply();
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();
  const fileRef = useRef<FileUpload | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // রোবাস্ট রিসেটের জন্য (ফলব্যাক): FileUpload রিমাউন্ট করাতে key ব্যবহার
  const [fileKey, setFileKey] = useState(0);

  const modelOptions = useMemo(() => {
    if (!vehicle.brand) return [];
    return (BRAND_MODELS[vehicle.brand] || []).map((m) => ({
      label: m,
      value: m,
    }));
  }, [vehicle.brand]);

  const onPhoto = (e: FileUploadSelectEvent) => {
    const file = (e.files?.[0] as File | undefined) ?? null;
    if (!file) return;

    // context file
    setDriver({ ...driver, photo: file });

    // Preview URL
    const nextUrl = URL.createObjectURL(file);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev); // আগের URL ক্লিনআপ
      return nextUrl;
    });
    // clear the state after remove preview
    fileRef.current?.clear?.();
  };

  const removePhoto = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setDriver({ ...driver, photo: null });

    // ইনপুট ক্লিয়ার
    fileRef.current?.clear?.();

    // ফলব্যাক: কিছু সেটাপে clear() যথেষ্ট না হলে রিমাউন্ট 
    setFileKey((k) => k + 1);
  };

  // আনমাউন্ট হলে/URL বদলালে প্রিভিউ URL ক্লিনআপ
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

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
      !vehicle.taxTokenNo?.trim();

    if (invalid) {
      toast.current?.show({
        severity: "warn",
        summary: "ফর্ম অসম্পূর্ণ",
        detail: "সবগুলো প্রয়োজনীয় ঘর পূরণ করুন।",
      });
      return;
    }

    const payload = { driver, vehicle };
    console.log("SUBMIT_PAYLOAD", payload);

    toast.current?.show({
      severity: "success",
      summary: "সফল",
      detail: "আবেদন জমা হয়েছে!",
    });
    reset();
    navigate("/");
  };

  return (
    <main className="px-4 md:px-10 py-10 bg-white">
      <Toast ref={toast} />

      {/* টপে Steps (ভিজুয়াল)
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <Steps model={stepItems} activeIndex={1} readOnly />
      </div> */}

      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Driver Details */}
        <section className="bg-[#e6fcf9] rounded-lg shadow p-5 md:p-6 text-[#27445D]">
          <header className="flex items-center gap-2 mb-4">
            <FaUserCheck />
            <h2 className="text-xl font-bold text-gray-700">নিজের তথ্য</h2>
          </header>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label>নামের প্রথম অংশ*</label>
              <InputText
                value={driver.firstName}
                onChange={(e) =>
                  setDriver({ ...driver, firstName: e.target.value })
                }
                className={classNames({
                  "p-invalid": !driver.firstName?.trim(),
                })}
                placeholder="যেমন: রহিম"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>নামের শেষ অংশ*</label>
              <InputText
                value={driver.lastName}
                onChange={(e) =>
                  setDriver({ ...driver, lastName: e.target.value })
                }
                className={classNames({
                  "p-invalid": !driver.lastName?.trim(),
                })}
                placeholder="যেমন: উদ্দিন"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>
                মোবাইল নম্বর* <span className="opacity-70">(01XXXXXXXXX)</span>
              </label>
              <InputText
                keyfilter="int"
                value={driver.phone}
                onChange={(e) =>
                  setDriver({ ...driver, phone: e.target.value })
                }
                className={classNames({
                  "p-invalid": !/^01[0-9]{9}$/.test(driver.phone || ""),
                })}
                placeholder="01XXXXXXXXX"
              />
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
                className={classNames({ "p-invalid": !driver.city })}
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label>লিঙ্গ*</label>
              <div className="flex items-center gap-6">
                {(["male", "female", "other"] as Gender[]).map((g) => (
                  <label
                    key={g}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="gender"
                      checked={driver.gender === g}
                      onChange={() => setDriver({ ...driver, gender: g })}
                    />
                    <span>
                      {g === "male"
                        ? "পুরুষ"
                        : g === "female"
                        ? "নারী"
                        : "অন্যান্য"}
                    </span>
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
                className={classNames({ "p-invalid": !driver.dob })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>ন্যাশনাল আইডি নম্বর*</label>
              <InputText
                value={driver.nid}
                onChange={(e) => setDriver({ ...driver, nid: e.target.value })}
                className={classNames({
                  "p-invalid": !(driver.nid && driver.nid.trim().length >= 10),
                })}
                placeholder="কমপক্ষে ১০ সংখ্যা"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>ড্রাইভিং লাইসেন্স নম্বর*</label>
              <InputText
                value={driver.license}
                onChange={(e) =>
                  setDriver({ ...driver, license: e.target.value })
                }
                className={classNames({
                  "p-invalid": !(
                    driver.license && driver.license.trim().length >= 6
                  ),
                })}
                placeholder="কমপক্ষে ৬ অক্ষর"
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label>ছবি আপলোড করুন (jpg/png)*</label>
              
              <FileUpload
                key={fileKey}
                ref={fileRef}
                mode="basic"
                name="photo"
                chooseLabel="ছবি নির্বাচন"
                accept="image/*"
                maxFileSize={2 * 1024 * 1024}
                customUpload
                onSelect={onPhoto}
                pt={{
                  chooseButton: {
                    className:
                      "!bg-[#71BBB2] !border-none hover:!bg-[#5AA29F] " +
                      "focus:!ring-2 focus:!ring-[#71BBB2]/40 !text-[#27445D] font-medium",
                  },
                }}
                /* 🔹 বিকল্প: কিছু ভার্সনে chooseOptions ও কাজ করে */
                chooseOptions={{
                  label: "ছবি নির্বাচন",
                  className:
                    "!bg-[#71BBB2] !border-none hover:!bg-[#5AA29F] " +
                    "!text-[#27445D] font-medium",
                }}
              />
              {/* নির্বাচিত ফাইলের নাম */}
              {driver.photo && !previewUrl && (
                <small className="text-gray-700">
                  নির্বাচিত: {driver.photo.name}
                </small>
              )}

              {/* প্রিভিউ */}
              {previewUrl && (
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={previewUrl}
                    alt="প্রিভিউ"
                    className="h-20 w-20 rounded object-cover ring-1 ring-[#27445D]/20"
                  />
                  <div className="flex items-center gap-2">
                    <small className="text-gray-700">
                      {driver.photo?.name} (
                      {Math.round((driver.photo?.size ?? 0) / 1024)} KB)
                    </small>
                    <Button
                      label="রিমুভ"
                      icon="pi pi-times"
                      className="p-button-text text-[#27445D]"
                      onClick={removePhoto}
                    />
                  </div>
                </div>
              )}

              <small className="opacity-70">
                সমর্থিত: JPG/PNG • সর্বোচ্চ 2MB • পরিষ্কার মুখের ছবি দিন
              </small>
            </div>
          </div>
        </section>

        {/* Vehicle Details */}
        <section className="bg-[#e6fcf9] text-[#27445D] rounded-lg shadow p-5 md:p-6">
          <header className="flex items-center gap-2 mb-4 text-[#27445D]">
            <FaMotorcycle />
            <h2 className="text-xl font-bold">গাড়ির তথ্য</h2>
          </header>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label>ব্র্যান্ড সিলেক্ট করুন*</label>
              <Dropdown
                value={vehicle.brand}
                onChange={(e) =>
                  setVehicle({ ...vehicle, brand: e.value, model: null })
                }
                options={Object.keys(BRAND_MODELS).map((b) => ({
                  label: b,
                  value: b,
                }))}
                placeholder="ব্র্যান্ড নির্বাচন"
                className={classNames({ "p-invalid": !vehicle.brand })}
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
                className={classNames({ "p-invalid": !vehicle.model })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>রেজিস্ট্রেশন নাম্বার*</label>
              <InputText
                value={vehicle.regNo}
                onChange={(e) =>
                  setVehicle({ ...vehicle, regNo: e.target.value })
                }
                placeholder="যেমন: DHA-XX-1234"
                className={classNames({ "p-invalid": !vehicle.regNo?.trim() })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>বছর*</label>
              <InputText
                keyfilter="int"
                value={vehicle.year}
                onChange={(e) =>
                  setVehicle({ ...vehicle, year: e.target.value })
                }
                placeholder="যেমন: 2019"
                className={classNames({ "p-invalid": !vehicle.year?.trim() })}
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label>ফিটনেস নাম্বার*</label>
              <InputText
                value={vehicle.fitnessNo}
                onChange={(e) =>
                  setVehicle({ ...vehicle, fitnessNo: e.target.value })
                }
                placeholder="যেমন: FT-458921"
                className={classNames({
                  "p-invalid": !vehicle.fitnessNo?.trim(),
                })}
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label>ট্যাক্স টোকেন নাম্বার*</label>
              <InputText
                value={vehicle.taxTokenNo}
                onChange={(e) =>
                  setVehicle({ ...vehicle, taxTokenNo: e.target.value })
                }
                placeholder="যেমন: TT-2025-XXXX"
                className={classNames({
                  "p-invalid": !vehicle.taxTokenNo?.trim(),
                })}
              />
            </div>
          </div>

          <div className="flex justify-between md:justify-end gap-3 pt-4">
            <Button
              label="পিছনে"
              icon="pi pi-arrow-left"
              className="p-button-text  text-[#27445D]"
              onClick={() => navigate(-1)}
            />
            <Button
              label="সাবমিট"
              icon="pi pi-check"
              className="!bg-[#71BBB2] !border-none hover:!bg-[#5AA29F]"
              onClick={submitAll}
            />
          </div>
        </section>

        {/* Small note / checklist */}
        <section className="rounded-lg border border-[#27445D]/10 p-4 text-sm text-[#27445D] bg-[#e6fcf9]">
          <div className="flex items-center gap-2 font-semibold mb-1">
            <FaClipboardCheck />
            <span>চেকলিস্ট</span>
          </div>
          <ul className="list-disc ml-5 space-y-1">
            <li>সঠিক মোবাইল ফরম্যাট (01XXXXXXXXX)</li>
            <li>NID ≥ ১০ সংখ্যা, লাইসেন্স ≥ ৬ অক্ষর</li>
            <li>পরিষ্কার মুখের ছবি (jpg/png ≤ 2MB)</li>
            <li>গাড়ির ব্র্যান্ড, মডেল, রেজিস্ট্রেশন/ফিটনেস স্পষ্টভাবে দিন</li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default BikeStepTwo;
