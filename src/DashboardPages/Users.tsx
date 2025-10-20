import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";

interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  //  Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res: AxiosResponse<User[]> = await axios.get(
        `${import.meta.env.VITE_API_URL}/users`
      );
      setUsers(res.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  //  Make Moderator
  const makeModerator = async (email: string) => {
    try {
      setUpdating(email);
      const res: AxiosResponse<any> = await axios.put(
        `${import.meta.env.VITE_API_URL}/usersRole/${encodeURIComponent(email)}`,
        { role: "moderator" }
      );

      // //  Response check — backend should send { success: true, role: "moderator" }
      // if (res.data?.success || res.data?.role === "moderator") {
      //   toast.success(" User promoted to Moderator!");
      // } else if (res.data?.message === "User not found") {
      //   toast.error(" User not found in database!");
      // } else {
      //   toast.info("ℹ User is already a Moderator or update not needed.");
      // }

      // Refetch user list
      await fetchUsers();
    } catch (err: any) {
      console.error("Error updating user:", err);
    } finally {
      setUpdating(null);
    }
  };

  //  Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <Loading />;

  if (error)
    return (
      <p className="text-center text-red-500 mt-10 text-lg">
        Error: {error}
      </p>
    );

  // Role column
  const roleBodyTemplate = (rowData: User) => (
    <Tag
      value={rowData.role || "User"}
      severity={
        rowData.role === "admin"
          ? "success"
          : rowData.role === "moderator"
          ? "warning"
          : "info"
      }
    />
  );

  //  Action column
  const actionBodyTemplate = (rowData: User) => {
    if (rowData.role === "admin") {
      return <Tag value="Admin" severity="success" />;
    }

    if (rowData.role === "moderator") {
      return <Tag value="Moderator" severity="warning" />;
    }

    return (
      <Button
        label="Make Moderator"
        icon="pi pi-user-edit"
        className="p-button-sm p-button-success"
        onClick={() => makeModerator(rowData.email)}
        loading={updating === rowData.email}
      />
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        All Users
      </h1>

      <div className="card shadow-2xl rounded-2xl p-4 bg-white">
        <DataTable
          value={users}
          paginator
          rows={5}
          stripedRows
          showGridlines
          removableSort
          tableStyle={{ minWidth: "55rem" }}
          emptyMessage="No users found."
          responsiveLayout="scroll"
        >
          <Column field="name" header="Name" sortable style={{ width: "25%" }} />
          <Column field="email" header="Email" sortable style={{ width: "35%" }} />
          <Column
            field="role"
            header="Role"
            body={roleBodyTemplate}
            sortable
            style={{ width: "20%" }}
          />
          <Column
            header="Action"
            body={actionBodyTemplate}
            style={{ width: "20%" }}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default Users;
