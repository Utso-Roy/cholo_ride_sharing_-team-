// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router';

// export type Blog = {
//     _id?: string;
//     title: string;
//     thumbnail?: string;
//     status: 'draft' | 'published';
// };

// const isAdmin = () => typeof window !== 'undefined' && localStorage.getItem('role') === 'admin';

// export default function ContentManagement() {
//     const navigate = useNavigate();
//     const [blogs, setBlogs] = useState<Blog[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [filter, setFilter] = useState<'all' | 'draft' | 'published'>('all');

//     const fetchBlogs = async () => {
//         setLoading(true);
//         try {
//             const params = new URLSearchParams();
//             if (filter !== 'all') params.set('status', filter);
//             const res = await fetch(`http://localhost:3000/api/blogs?${params.toString()}`);
//             const data = await res.json();
//             setBlogs(data);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => { fetchBlogs(); }, [filter]);

//     const toggleStatus = async (id?: string, current?: 'draft' | 'published') => {
//         if (!isAdmin() || !id || !current) return;
//         try {
//             const newStatus = current === 'draft' ? 'published' : 'draft';
//             await fetch(`http://localhost:3000/api/blogs/${id}/status`, {
//                 method: 'PATCH',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ status: newStatus }),
//             });
//             fetchBlogs();
//         } catch (err) { console.error(err); }
//     };

//     const remove = async (id?: string) => {
//         if (!isAdmin() || !id) return;
//         if (!confirm('Delete this blog?')) return;
//         try {
//             await fetch(`http://localhost:3000/api/blogs/${id}`, { method: 'DELETE' });
//             fetchBlogs();
//         } catch (err) { console.error(err); }
//     };

//     return (
//         <div className="p-6 bg-white">
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//                 <h1 className="text-2xl md:text-4xl font-bold text-[#274450]">Content Management</h1>
//                 <button
//                     onClick={() => navigate('/dashboard/ContentManagement/add-blog')}
//                     className="bg-[#497D74] text-white px-4 py-2 rounded hover:bg-[#274450] transition-colors"
//                 >
//                     Add Blog
//                 </button>
//             </div>

//             {/* Filter */}
//             <div className="mb-4">
//                 <select
//                     value={filter}
//                     onChange={e => setFilter(e.target.value as any)}
//                     className="px-3 py-2 border rounded text-[#71BBB2]"
//                 >
//                     <option value="all">All</option>
//                     <option value="draft">Draft</option>
//                     <option value="published">Published</option>
//                 </select>
//             </div>

//             {/* Blog Cards */}
//             <div className="flex flex-col gap-4">
//                 {loading && <div>Loading...</div>}
//                 {!loading && blogs.length === 0 && <div>No blogs yet.</div>}

//                 {blogs.map(blog => (
//                     <div
//                         key={blog._id}
//                         className="flex items-center justify-between border border-[#71BBB2] rounded-xl p-4 shadow-md hover:shadow-md transition-shadow"
//                     >
//                         <div className="flex items-center gap-4">
//                             {blog.thumbnail ? (
//                                 <img src={blog.thumbnail} alt={blog.title} className="w-20 h-20 object-cover rounded" />
//                             ) : (
//                                 <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-gray-500 rounded">No Image</div>
//                             )}
//                             <div>
//                                 <h3 className="text-[#274450] font-semibold">{blog.title}</h3>
//                                 <span className={`text-sm ${blog.status === 'published' ? 'text-green-600' : 'text-yellow-600'}`}>
//                                     {blog.status === 'published' ? 'Published' : 'Draft'}
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="grid md:grid-cols-3  items-center gap-2">
//                             <button
//                                 onClick={() => toggleStatus(blog._id, blog.status)}
//                                 className={`px-3 py-1 rounded ${blog.status === 'draft' ? 'bg-[#497D74] text-white hover:bg-[#274450]' : 'bg-yellow-400 text-white hover:bg-yellow-500'} transition-colors`}
//                             >
//                                 {blog.status === 'draft' ? 'Publish' : 'Unpublish'}
//                             </button>
//                             <button
//                                 onClick={() => navigate(`/dashboard/content-management/edit/${blog._id}`)}
//                                 className="px-3 py-1 bg-[#274450] text-white rounded hover:bg-[#497D74] transition-colors"
//                             >
//                                 Edit
//                             </button>
//                             <button
//                                 onClick={() => remove(blog._id)}
//                                 className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }


//==================


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

export type Blog = {
    _id?: string;
    title: string;
    thumbnail?: string;
    status: 'draft' | 'published';
};

// ✅ Role Checker Function
const hasAccess = () => {
    if (typeof window === 'undefined') return false;
    const role = localStorage.getItem('role');
    return role === 'admin' || role === 'moderator';
};

export default function ContentManagement() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState<'all' | 'draft' | 'published'>('all');

    // Fetch blogs from API
    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filter !== 'all') params.set('status', filter);
            const res = await fetch(`http://localhost:3000/api/blogs?${params.toString()}`);
            const data = await res.json();
            setBlogs(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBlogs(); }, [filter]);

    // Toggle blog status
    const toggleStatus = async (id?: string, current?: 'draft' | 'published') => {
        if (!hasAccess() || !id || !current) {
            Swal.fire('Error', 'You do not have permission!', 'error');
            return;
        }
        try {
            const newStatus = current === 'draft' ? 'published' : 'draft';
            await fetch(`http://localhost:3000/api/blogs/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            Swal.fire('Success', `Blog is now ${newStatus}`, 'success');
            fetchBlogs();
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Failed to update status', 'error');
        }
    };

    // Delete blog
    const remove = async (id?: string) => {
        if (!hasAccess() || !id) {
            Swal.fire('Error', 'You do not have permission!', 'error');
            return;
        }

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this blog?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await fetch(`http://localhost:3000/api/blogs/${id}`, { method: 'DELETE' });
                Swal.fire('Deleted!', 'Blog has been deleted.', 'success');
                fetchBlogs();
            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'Failed to delete blog', 'error');
            }
        }
    };

    // Edit blog
    // const editBlog = (id?: string) => {
    //     if (!hasAccess() || !id) {
    //         Swal.fire('Error', 'You do not have permission!', 'error');
    //         return;
    //     }
    //     // navigate(`ContentManagement/edit/${id}`);
    //     navigate(`/dashboard/content-Management/edit/${id}`);
    // };


    const editBlog = (id?: string) => {
        if (!hasAccess() || !id) return Swal.fire('Error', 'No permission', 'error');
        navigate(`/dashboard/content-management/edit/${id}`);
    };


    return (
        <div className="p-6 bg-white">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <h1 className="text-2xl md:text-4xl font-bold text-[#274450]">Content Management</h1>
                <button
                    onClick={() => navigate('/dashboard/content-Management/add-blog')}
                    className="bg-[#497D74] text-white px-4 py-2 rounded hover:bg-[#274450] transition-colors"
                >
                    Add Blog
                </button>

            </div>

            {/* Filter */}
            <div className="mb-4">
                <select
                    value={filter}
                    onChange={e => setFilter(e.target.value as any)}
                    className="px-3 py-2 border rounded text-[#71BBB2]"
                >
                    <option value="all">All</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>

            {/* Blog Cards */}
            <div className="flex flex-col gap-4">
                {loading && <div>Loading...</div>}
                {!loading && blogs.length === 0 && <div>No blogs yet.</div>}

                {blogs.map(blog => (
                    <div
                        key={blog._id}
                        className="flex items-center justify-between border border-[#71BBB2] rounded-xl p-4 shadow-md hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-4">
                            {blog.thumbnail ? (
                                <img src={blog.thumbnail} alt={blog.title} className="w-20 h-20 object-cover rounded" />
                            ) : (
                                <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-gray-500 rounded">No Image</div>
                            )}
                            <div>
                                <h3 className="text-[#274450] font-semibold">{blog.title}</h3>
                                <span className={`text-sm ${blog.status === 'published' ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {blog.status}
                                </span>
                            </div>
                        </div>

                        {/* Buttons only for Admin & Moderator */}
                        {hasAccess() && (
                            <div className="grid md:grid-cols-3 items-center gap-2">
                                <button
                                    onClick={() => toggleStatus(blog._id, blog.status)}
                                    className={`px-3 py-1 rounded ${blog.status === 'draft'
                                        ? 'bg-[#497D74] text-white hover:bg-[#274450]'
                                        : 'bg-yellow-400 text-white hover:bg-yellow-500'
                                        } transition-colors`}
                                >
                                    {blog.status === 'draft' ? 'Publish' : 'Unpublish'}
                                </button>
                                <button
                                    onClick={() => editBlog(blog._id)}
                                    className="px-3 py-1 bg-[#274450] text-white rounded hover:bg-[#497D74] transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => remove(blog._id)}
                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}



