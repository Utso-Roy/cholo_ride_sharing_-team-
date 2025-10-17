import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

export type Blog = {
    _id?: string;
    title: string;
    thumbnail?: string;
    short_description?: string;
    content?: string;
    category?: string;
    status: "draft" | "published";
};

export default function EditBlog() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [blog, setBlog] = useState<Blog>({
        title: "",
        thumbnail: "",
        short_description: "",
        content: "",
        category: "",
        status: "draft",
    });

    // Fetch blog details
    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetch(`http://localhost:3000/api/blogs/${id}`)
            .then((res) => res.json())
            .then((data) => setBlog(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    // Handle input change
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    // Handle submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(blog),
            });

            if (res.ok) {
                Swal.fire("Success", "Blog updated successfully!", "success");
                navigate("/dashboard/content-Management");
                // navigate("/dashboard/content-management");
            } else {
                Swal.fire("Error", "Failed to update blog", "error");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Something went wrong", "error");
        }
    };

    if (loading) return <div><Loading></Loading> </div>;

    return (
        <div className="p-6 bg-white max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-[#274450]">Edit Blog</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Title */}
                <div>
                    <label className="block mb-1 text-[#274450] font-semibold">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={blog.title}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Thumbnail */}
                <div>
                    <label className="block mb-1 text-[#274450] font-semibold">Thumbnail URL</label>
                    <input
                        type="text"
                        name="thumbnail"
                        value={blog.thumbnail}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Short Description */}
                <div>
                    <label className="block mb-1 text-[#274450] font-semibold">Short Description</label>
                    <textarea
                        name="short_description"
                        value={blog.short_description}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        rows={3}
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="block mb-1 text-[#274450] font-semibold">Content</label>
                    <textarea
                        name="content"
                        value={blog.content}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        rows={8}
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block mb-1 text-[#274450] font-semibold">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={blog.category}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block mb-1 text-[#274450] font-semibold">Status</label>
                    <select
                        name="status"
                        value={blog.status}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-[#497D74] text-white px-4 py-2 rounded hover:bg-[#274450] transition-colors"
                >
                    Update Blog
                </button>
            </form>
        </div>
    );
}
