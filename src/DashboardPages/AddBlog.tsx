import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function AddBlog() {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [data, setData] = useState({
        title: "",
        thumbnail: "",
        short_description: "",
        content: "",
        category: "",
        author: localStorage.getItem("name") || "Admin",
        date: new Date(),
        status: "draft",
    });

    // 🔹 ImgBB Upload
    const uploadImg = async (file: File) => {
        const KEY =
            import.meta.env.VITE_IMGBB_API_KEY ||
            (window as any).VITE_IMGBB_API_KEY ||
            "";
        if (!KEY) throw new Error("ImgBB key missing");
        const form = new FormData();
        form.append("image", file);
        const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${KEY}`,
            { method: "POST", body: form }
        );
        const json = await res.json();
        if (!json.success) throw new Error("Upload failed");
        return json.data.url as string;
    };

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSubmitting(true);
        try {
            const url = await uploadImg(file);
            setData((prev) => ({ ...prev, thumbnail: url }));
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        } finally {
            setSubmitting(false);
        }
    };

    const createBlog = async () => {
        setSubmitting(true);
        try {
            const res = await fetch("http://localhost:5000/api/blogs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Failed");
            alert("✅ Blog created successfully as draft!");
            navigate("/dashboard/content-management");
        } catch (err) {
            console.error(err);
            alert("❌ Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <motion.div
            className="min-h-screen flex justify-center items-start md:items-center bg-[#EFE9D5] p-4 pt-16 md:pt-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <Card className="w-full md:w-3/4 lg:w-2/3 shadow-2xl bg-white rounded-3xl border-t-8 border-[#71BBB2]">
                <h2 className="text-2xl md:text-3xl font-bold text-[#274450] text-center mb-6">
                    ✍️ Add New Blog
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-6 pb-6">
                    {/* Title */}
                    <span className="p-float-label">
                        <InputText
                            id="title"
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            className="w-full"
                        />
                        <label htmlFor="title">Blog Title</label>
                    </span>

                    {/* Category */}
                    <span className="p-float-label">
                        <InputText
                            id="category"
                            value={data.category}
                            onChange={(e) => setData({ ...data, category: e.target.value })}
                            className="w-full"
                        />
                        <label htmlFor="category">Category</label>
                    </span>

                    {/* Author */}
                    <span className="p-float-label">
                        <InputText
                            id="author"
                            value={data.author}
                            onChange={(e) => setData({ ...data, author: e.target.value })}
                            className="w-full"
                        />
                        <label htmlFor="author">Author</label>
                    </span>

                    {/* Date */}
                    <span className="p-float-label">
                        <Calendar
                            id="date"
                            value={new Date(data.date)}
                            onChange={(e) =>
                                setData({ ...data, date: e.value as Date })
                            }
                            className="w-full"
                            dateFormat="yy-mm-dd"
                            showIcon
                        />
                        <label htmlFor="date">Date</label>
                    </span>

                    {/* Short Description */}
                    <div className="md:col-span-2">
                        <span className="p-float-label">
                            <InputTextarea
                                id="short"
                                value={data.short_description}
                                onChange={(e) =>
                                    setData({ ...data, short_description: e.target.value })
                                }
                                rows={3}
                                className="w-full"
                            />
                            <label htmlFor="short">Short Description</label>
                        </span>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2">
                        <span className="p-float-label">
                            <InputTextarea
                                id="content"
                                value={data.content}
                                onChange={(e) =>
                                    setData({ ...data, content: e.target.value })
                                }
                                rows={6}
                                className="w-full"
                            />
                            <label htmlFor="content">Content</label>
                        </span>
                    </div>

                    {/* Thumbnail Upload */}
                    <div className="md:col-span-2 flex flex-col gap-3">
                        <label className="text-[#274450] font-semibold">
                            Thumbnail Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFile}
                            className="border border-gray-300 p-2 rounded-md"
                        />
                        {submitting && (
                            <p className="text-sm text-[#497D74] animate-pulse">Uploading...</p>
                        )}
                        {data.thumbnail && (
                            <img
                                src={data.thumbnail}
                                alt="thumbnail"
                                className="w-32 h-24 object-cover rounded-md shadow"
                            />
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 mt-4">
                        <Button
                            label="Cancel"
                            severity="secondary"
                            onClick={() => navigate(-1)}
                            className="p-button-outlined text-[#274450] w-full sm:w-auto"
                        />
                        <Button
                            label={submitting ? "Creating..." : "Create Blog"}
                            onClick={createBlog}
                            disabled={submitting}
                            className="bg-[#71BBB2] border-none hover:bg-[#497D74] text-white w-full sm:w-auto"
                        />
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
