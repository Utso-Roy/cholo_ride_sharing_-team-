import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";

interface Job {
  _id: string;
  title: string;
  type: string;
  location: string;
  deadline: string;
  description: string;
  status?: string;
}

interface Application {
  _id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  resume: string;
  status: string;
  appliedAt: string;
}

interface JobForm {
  title: string;
  type: string;
  location: string;
  deadline: string;
  description: string;
}

const fetchJobs = async (): Promise<Job[]> => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`);
  return Array.isArray(res.data) ? res.data : [];
};

const fetchApplications = async (): Promise<Application[]> => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/applications`);
  return Array.isArray(res.data) ? res.data : [];
};

const ManageJobsApplications: React.FC = () => {
  const queryClient = useQueryClient();
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState<JobForm>({
    title: "",
    type: "",
    location: "",
    deadline: "",
    description: "",
  });

  const {
    data: jobs = [],
    isLoading: jobsLoading,
  } = useQuery({ queryKey: ["jobs"], queryFn: fetchJobs });

  const {
    data: applications = [],
    isLoading: appsLoading,
  } = useQuery({ queryKey: ["applications"], queryFn: fetchApplications });

   // ✅ Add job mutation with toast
  const addJob = useMutation({
    mutationFn: (newJob: JobForm) => axios.post(`${import.meta.env.VITE_API_URL}/jobs`, newJob),
    onSuccess: () => {
      toast.success("নতুন জব সফলভাবে যুক্ত হয়েছে ✅");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setShowAddModal(false);
      setFormData({
        title: "",
        type: "",
        location: "",
        deadline: "",
        description: "",
      });
    },
    onError: () => toast.error("জব যুক্ত করতে সমস্যা হয়েছে ❌"),
  });

   const removeJob = useMutation({
    mutationFn: (id: string) => axios.delete(`${import.meta.env.VITE_API_URL}/jobs/${id}`),
    onSuccess: () => {
      toast.success("জব সফলভাবে মুছে ফেলা হয়েছে 🗑️");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: () => toast.error("জব মুছতে সমস্যা হয়েছে ❌"),
  });

 const approveApplication = useMutation({
    mutationFn: (id: string) =>
      axios.patch(`${import.meta.env.VITE_API_URL}/applications/${id}/status`, {
        status: "approved",
      }),
    onSuccess: () => {
      toast.success("আবেদন অনুমোদিত হয়েছে ✅");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: () => toast.error("অনুমোদনে সমস্যা হয়েছে ❌"),
  });

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error("সব তথ্য পূরণ করুন ⚠️");
      return;
    }
    addJob.mutate(formData);
  };

  return (
    <div className="p-8 bg-[#e6fcf9] min-h-screen text-[#27445D] space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold">চলো - চাকরির ব্যবস্থাপনা</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#71BBB2] hover:bg-[#5FA7A1] text-white px-5 py-2 rounded-lg shadow-md transition-all duration-200"
        >
          <FaPlus /> নতুন চাকরি যোগ করুন
        </button>
      </div>

      {/* Jobs Table */}
      <section>
        <h3 className="text-xl font-semibold mb-4 border-b border-[#71BBB2] pb-2">চাকরির তালিকা</h3>
        {jobsLoading ? (
          <p>চাকরির তথ্য লোড হচ্ছে...</p>
        ) : jobs.length === 0 ? (
          <p>কোনো চাকরি যোগ করা হয়নি।</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-[#d3f4f1]">
            <table className="w-full text-left">
              <thead className="bg-[#c9f1eb] text-[#27445D]">
                <tr>
                  <th className="px-4 py-3 border-r border-[#e6fcf9]">পদবী</th>
                  <th className="px-4 py-3 border-r border-[#e6fcf9]">ধরন</th>
                  <th className="px-4 py-3 border-r border-[#e6fcf9]">অবস্থান</th>
                  <th className="px-4 py-3 border-r border-[#e6fcf9]">শেষ তারিখ</th>
                  <th className="px-4 py-3">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr
                    key={job._id}
                    className="hover:bg-[#f5fffd] transition-all duration-200 border-t border-[#eaf9f7]"
                  >
                    <td className="px-4 py-3">{job.title}</td>
                    <td className="px-4 py-3">{job.type}</td>
                    <td className="px-4 py-3">{job.location}</td>
                    <td className="px-4 py-3">{job.deadline}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => removeJob.mutate(job._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-all duration-200 flex items-center gap-1"
                      >
                        <FaTrash /> মুছুন
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Applications Table */}
      <section>
        <h3 className="text-xl font-semibold mb-4 border-b border-[#71BBB2] pb-2">আবেদনসমূহ</h3>
        {appsLoading ? (
          <Loading/>
        ) : applications.length === 0 ? (
          <p>এখনও কোনো আবেদন পাওয়া যায়নি।</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-[#d3f4f1]">
            <table className="w-full text-left">
              <thead className="bg-[#c9f1eb] text-[#27445D]">
                <tr>
                  <th className="px-4 py-3 border-r border-[#e6fcf9]">নাম</th>
                  <th className="px-4 py-3 border-r border-[#e6fcf9]">ইমেইল</th>
                  <th className="px-4 py-3 border-r border-[#e6fcf9]">ফোন</th>
                  <th className="px-4 py-3 border-r border-[#e6fcf9]">চাকরির আইডি</th>
                  <th className="px-4 py-3 border-r border-[#e6fcf9]">স্ট্যাটাস</th>
                  <th className="px-4 py-3">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-[#f5fffd] transition-all duration-200 border-t border-[#eaf9f7]"
                  >
                    <td className="px-4 py-3">{app.name}</td>
                    <td className="px-4 py-3">{app.email}</td>
                    <td className="px-4 py-3">{app.phone}</td>
                    <td className="px-4 py-3">{app.jobId}</td>
                    <td className="px-4 py-3 capitalize">
                      {app.status === "approved" ? (
                        <span className="text-green-600 font-semibold">অনুমোদিত</span>
                      ) : (
                        <span className="text-yellow-600 font-semibold">অপেক্ষমাণ</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {app.status !== "approved" && (
                        <button
                          onClick={() => approveApplication.mutate(app._id)}
                          className="bg-[#71BBB2] hover:bg-[#5FA7A1] text-white px-3 py-1 rounded transition-all duration-200 flex items-center gap-1"
                        >
                          <FaCheck /> অনুমোদন দিন
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Add Job Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-[#27445D]">নতুন চাকরি যোগ করুন</h3>
            <form onSubmit={handleAddJob} className="space-y-4">
              <input
                type="text"
                placeholder="পদবী"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 border border-[#71BBB2] rounded focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="চাকরির ধরন"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full p-2 border border-[#71BBB2] rounded focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="অবস্থান"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-2 border border-[#71BBB2] rounded focus:outline-none"
                required
              />
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full p-2 border border-[#71BBB2] rounded focus:outline-none"
                required
              />
              <textarea
                placeholder="বিস্তারিত বিবরণ"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border border-[#71BBB2] rounded focus:outline-none"
                required
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#71BBB2] hover:bg-[#5FA7A1] text-white rounded"
                >
                  যোগ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobsApplications;
