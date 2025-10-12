import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";


interface Partner {
  _id: string;
  name: string;
  logo: string;
}

export default function ManagePartners() {
  const queryClient = useQueryClient();

  const [newPartner, setNewPartner] = useState({ name: "", logo: "" });
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch Partners
  const { data: partners = [], isLoading } = useQuery<Partner[]>({
    queryKey: ["partners-admin"],
    queryFn: async () => {
      const res = await axios.get<Partner[]>("http://localhost:3000/partners");
      return res.data;
    },
  });


  const addPartner = useMutation({
    mutationFn: async () => {
      setLoading(true);
      const res = await axios.post<Partner>("http://localhost:3000/partners", newPartner);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire(" Success!", "New partner added successfully!", "success");
      setNewPartner({ name: "", logo: "" });

      queryClient.invalidateQueries({ queryKey: ["partners-admin"] });
    },
    onError: () => {
      Swal.fire(" Error", "Failed to add partner!", "error");
    },
    onSettled: () => setLoading(false),
  });

  
  const deletePartner = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`http://localhost:3000/partners/${id}`);
    },
    onSuccess: () => {
      Swal.fire("🗑 Deleted!", "Partner has been removed.", "success");
      queryClient.invalidateQueries({ queryKey: ["partners-admin"] });
    },
    onError: () => {
      Swal.fire(" Error", "Failed to delete partner!", "error");
    },
  });

  if (isLoading)
    return <p className="text-center mt-10 text-lg font-medium">Loading partners...</p>;

  return (
    <div className="w-full mx-auto p-6">
      <h2 className="text-3xl font-bold text-[#27445D] mb-6">Manage Partners</h2>

      {/*  Add Partner Form */}
      <div className="bg-[#f4fdfa] p-5 rounded-lg shadow mb-8">
        <h3 className="text-xl font-semibold mb-3">Add New Partner</h3>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Partner Name"
            value={newPartner.name}
            onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Logo URL"
            value={newPartner.logo}
            onChange={(e) => setNewPartner({ ...newPartner, logo: e.target.value })}
            className="input input-bordered w-full"
          />
          <button
            className="btn bg-[#71BBB2] text-white hover:bg-[#27445D]"
            onClick={() => {
              if (!newPartner.name || !newPartner.logo) {
                Swal.fire("⚠️ Warning", "Please fill out all fields", "warning");
                return;
              }
              addPartner.mutate();
            }}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Partner"}
          </button>
        </div>
      </div>

      {/*  Partners Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr className="bg-[#71BBB2]/20 text-[#27445D]">
              <th className="text-left px-4 py-2">Logo</th>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-center px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.length > 0 ? (
              partners.map((p) => (
                <tr key={p._id} className="hover:bg-[#f4fdfa]">
                  <td className="px-4 py-3">
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="h-10 w-auto rounded shadow-sm"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="text-center px-4 py-3">
                    <button
                      className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                      onClick={() =>
                        Swal.fire({
                          title: "Delete this partner?",
                          text: "This action cannot be undone!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#d33",
                          cancelButtonColor: "#3085d6",
                          confirmButtonText: "Yes, delete it!",
                        }).then((r) => {
                          if (r.isConfirmed) deletePartner.mutate(p._id);
                        })
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No partners found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
