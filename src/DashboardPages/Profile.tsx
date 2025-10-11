import React, { useContext, useEffect, useState, ChangeEvent, FormEvent } from "react";
import {
  FaUserEdit,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaCrown,
  FaUsers,
  FaCarSide,
  FaChartPie,
} from "react-icons/fa";
import Loading from "../Loading/Loading";
import { AuthContext } from "../Auth/AuthProvider";
import { toast } from "react-toastify";

interface User {
  name: string;
  displayName?: string;
  email: string;
  photo?: string;
  role?: string;
  phone?: string;
  address?: string;
}

const Profile: React.FC = () => {
  const { user } = useContext(AuthContext) as { user: { email: string } };
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<User>({ name: "", email: "", photo: "" });

  // Fetch user data
  useEffect(() => {
    if (!user?.email) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/users/${user.email}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data: User[] = await res.json();
        setUsers(data);

        if (data[0]) {
          setFormData({
            name: data[0].name || "",
            email: data[0].email,
            photo: data[0].photo || "",
          });
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit updated profile
 const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  if (!formData.name || !formData.email) {
    toast.error("Name and email are required!");
    return;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/users/${user.email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.status === 404) {
      toast.error("User not found!");
      return;
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to update profile");
    }

    const updatedUser: User | null = await res.json().catch(() => null);

    if (!updatedUser) {
      toast.error("User not found!");
      return;
    }

    setUsers([updatedUser]); // update state
    setIsModalOpen(false);
    toast.success("Profile updated successfully!");
  } catch (err: any) {
    toast.error(err.message || "Something went wrong!");
  }
};

  if (loading) return <Loading />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );

  if (!users.length)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-red-500">No users found!</p>
      </div>
    );

  const userData = users[0];
  const { name, displayName, email, photo, role, phone, address } = userData;

  const driversCount = users.filter(u => u.role === "driver").length || 8;
  const ridersCount = users.filter(u => u.role === "rider").length || 10;
  const usersCount = users.filter(u => u.role === "report").length || 15;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      {/* Profile Card */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="px-8 py-6 bg-gradient-to-r from-[#71BBB2] to-[#4ca89d] text-white rounded-t-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold">
            <span className="text-gray-800">{name || displayName}</span> 👋
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/90">
            Here's your profile overview and recent stats.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <img
              src={photo || "https://i.ibb.co/5GzXkwq/user.png"}
              alt="Profile"
              className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
        </div>

        <div className="pt-24 pb-8 px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">{name || displayName}</h2>
          <div className="flex justify-center items-center gap-2 mt-3">
            <FaCrown className="text-yellow-500" />
            <span className="bg-[#71BBB2]/10 text-[#4ca89d] px-4 py-1 text-sm sm:text-base font-medium rounded-full">{role || "Member"}</span>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-6 text-gray-700 text-sm sm:text-base">
            <div className="flex items-center gap-2"><FaEnvelope className="text-[#71BBB2]" /><span>{email}</span></div>
            <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-[#71BBB2]" /><span>{address || "Dhaka, Bangladesh"}</span></div>
            <div className="flex items-center gap-2"><FaPhoneAlt className="text-[#71BBB2]" /><span>{phone || "+880 123-456-789"}</span></div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 px-8 py-2 bg-[#71BBB2] text-white rounded-full flex items-center gap-2 mx-auto hover:bg-[#5ea49a] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <FaUserEdit /> Edit Profile
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="w-full max-w-6xl mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <FaUsers className="text-[#71BBB2] text-4xl mb-3" />
          <h3 className="text-2xl font-bold text-gray-800">{driversCount}</h3>
          <p className="text-gray-500 mt-1">Drivers</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <FaCarSide className="text-[#71BBB2] text-4xl mb-3" />
          <h3 className="text-2xl font-bold text-gray-800">{ridersCount}</h3>
          <p className="text-gray-500 mt-1">Riders</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <FaChartPie className="text-[#71BBB2] text-4xl mb-3" />
          <h3 className="text-2xl font-bold text-gray-800">{usersCount}</h3>
          <p className="text-gray-500 mt-1">Report</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-11/12 sm:w-96 relative">
            <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border p-2 rounded-md w-full" />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 rounded-md w-full" />
              <input type="text" name="photo" placeholder="Photo URL" value={formData.photo} onChange={handleChange} className="border p-2 rounded-md w-full" />
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#71BBB2] text-white rounded-md hover:bg-[#5ea49a]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
