import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
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

  // Fetch all activities
  const { data: activities = [] } = useQuery({
    queryKey: ["socialActivities"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/activities`);
      return res.data;
    },
  });

  // Add new activity
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

  // Delete activity
  const deleteActivity = useMutation({
    mutationFn: (id: string) =>
      axios.delete(`${import.meta.env.VITE_API_URL}/activities/${id}`),
    onSuccess: () => {
      toast.success("কার্যক্রম মুছে ফেলা হয়েছে 🗑️");
      queryClient.invalidateQueries({ queryKey: ["socialActivities"] });
    },
    onError: () => toast.error("মুছতে সমস্যা হয়েছে ❌"),
  });

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error("সব তথ্য পূরণ করুন ⚠️");
      return;
    }
    addActivity.mutate(formData);
  };

  // Badge/volunteer/status template
  const badgeBody = (rowData: any) => (
    <Tag value={rowData.badge} severity="info" />
  );

  const volunteersBody = (rowData: any) => (
    <span className="text-gray-700">{rowData.volunteers}</span>
  );

  return (
    <div className="p-6 bg-[#e6fcf9] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-4xl font-bold text-[#27445D]">
          সামাজিক কার্যক্রম পরিচালনা
        </h1>
        <Button
          label="কার্যক্রম যোগ করুন"
          icon="pi pi-plus"
          className="bg-[#71BBB2] border-none text-white"
          onClick={() => setShowAddModal(true)}
        />
      </div>

      {/* DataTable */}
      <div className="overflow-x-auto rounded-xl shadow-lg bg-white p-4">
        <DataTable
          value={activities}
          paginator
          rows={5}
          responsiveLayout="scroll"
          stripedRows
          className="p-datatable-sm w-full"
          rowHover
          emptyMessage="কোনো কার্যক্রম পাওয়া যায়নি।"
          tableStyle={{ minWidth: "900px", backgroundColor: "transparent" }}
          rowClassName={() => "hover:bg-gray-100 transition-colors rounded-lg"}
        >
          <Column field="title" header="Title" style={{ minWidth: "180px", color: "#4B5563" }} />
          <Column field="date" header="Date" style={{ minWidth: "140px", color: "#4B5563" }} />
          <Column field="location" header="Location" style={{ minWidth: "160px", color: "#4B5563" }} />
          <Column field="volunteers" header="Volunteers" body={volunteersBody} style={{ minWidth: "120px" }} />
          <Column field="badge" header="Badge" body={badgeBody} style={{ minWidth: "140px" }} />
          <Column
            field="description"
            header="Description"
            style={{ minWidth: "250px", color: "#4B5563" }}
            body={(rowData) => <span className="line-clamp-3">{rowData.description}</span>}
          />
          <Column
            header="Actions"
            body={(rowData) => (
              <Button
                label="মুছুন"
                className="p-button-danger text-white"
                onClick={() => deleteActivity.mutate(rowData._id)}
              />
            )}
            style={{ minWidth: "120px" }}
          />
        </DataTable>
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
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
          <InputText
            placeholder="Volunteers"
            type="number"
            value={formData.volunteers}
            onChange={(e) => setFormData({ ...formData, volunteers: Number(e.target.value) })}
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
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
