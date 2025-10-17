import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { toast } from "react-toastify";

interface ActivityForm {
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  volunteers: number;
  badge: string;
}

export default function ManageSocialActivities() {
  const queryClient = useQueryClient();

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState<ActivityForm>({
    title: "",
    description: "",
    image: "",
    date: "",
    location: "",
    volunteers: 0,
    badge: "",
  });

  // ✅ Fetch all activities
  const { data: activities = [] } = useQuery({
    queryKey: ["socialActivities"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/activities`);
      return res.data;
    },
  });

  // ✅ Add new activity
  const addActivity = useMutation({
    mutationFn: (newActivity: ActivityForm) =>
      axios.post(`${import.meta.env.VITE_API_URL}/activities`, newActivity),
    onSuccess: () => {
      toast.success("নতুন কার্যক্রম সফলভাবে যুক্ত হয়েছে ✅");
      queryClient.invalidateQueries({ queryKey: ["socialActivities"] });
      setShowAddModal(false);
      setFormData({
        title: "",
        description: "",
        image: "",
        date: "",
        location: "",
        volunteers: 0,
        badge: "",
      });
    },
    onError: () => toast.error("কার্যক্রম যুক্ত করতে সমস্যা হয়েছে ❌"),
  });

  // ✅ Delete activity
  const deleteActivity = useMutation({
    mutationFn: (id: string) =>
      axios.delete(`${import.meta.env.VITE_API_URL}/activities/${id}`),
    onSuccess: () => {
      toast.success("কার্যক্রম মুছে ফেলা হয়েছে 🗑️");
      queryClient.invalidateQueries({ queryKey: ["socialActivities"] });
    },
    onError: () => toast.error("মুছতে সমস্যা হয়েছে ❌"),
  });

  // ✅ Handle Add Form Submit
  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error("সব তথ্য পূরণ করুন ⚠️");
      return;
    }
    addActivity.mutate(formData);
  };

  return (
    <div className="p-6 bg-[#e6fcf9] min-h-screen">
   
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-4xl font-bold text-[#27445D]">
          সামাজিক কার্যক্রম পরিচালনা
        </h1>
        <Button
          label="কার্যক্রম যোগ করুন"
          icon="pi pi-plus"
          className="bg-[#71BBB2] border-none  text-white"
          onClick={() => setShowAddModal(true)}
        />
      </div>

      {/* Activities List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity: any) => (
          <div
            key={activity._id}
            className="bg-white rounded-xl shadow-md p-4 border border-[#71BBB2]/30 hover:shadow-lg transition"
          >
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold text-[#27445D] mb-1">
              {activity.title}
            </h3>
            <p className="text-gray-600 text-sm mb-1">
              📍 {activity.location} | 🗓️ {activity.date}
            </p>
            <p className="text-gray-600 text-sm mb-2">
              👥 স্বেচ্ছাসেবক: {activity.volunteers}
            </p>
            <span className="inline-block bg-[#71BBB2] text-white text-xs px-3 py-1 rounded-full mb-3">
              {activity.badge}
            </span>
            <p className="text-gray-700 text-sm line-clamp-3 mb-3">
              {activity.description}
            </p>

            <div className="flex gap-2">
              <Button
                label="মুছুন"
                className="p-button-danger text-white"
                onClick={() => deleteActivity.mutate(activity._id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Activity Modal */}
      <Dialog
        visible={showAddModal}
        header="নতুন কার্যক্রম যুক্ত করুন"
        onHide={() => setShowAddModal(false)}
        style={{ width: "500px" }}
      >
        <form onSubmit={handleAddActivity} className="flex flex-col gap-3">
          <InputText
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <InputText
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
          <InputText
            placeholder="Date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <InputText
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
          <InputText
            placeholder="Volunteers"
            type="number"
            value={formData.volunteers}
            onChange={(e) =>
              setFormData({ ...formData, volunteers: Number(e.target.value) })
            }
          />
          <InputText
            placeholder="Badge (e.g. পরিবেশ সচেতনতা)"
            value={formData.badge}
            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
          />
          <InputTextarea
            placeholder="Description"
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <Button
            type="submit"
            label="Add Activity"
            className="bg-[#27445D] text-white border-none"
          />
        </form>
      </Dialog>
    </div>
  );
}
