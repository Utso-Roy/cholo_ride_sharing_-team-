import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';


export type Blog = {
    _id?: string;
    title: string;
    thumbnail?: string;
    short_description: string;
    content: string;
    category: string;
    author: string;
    date: string;
    status: 'draft' | 'published';
};

const isAdmin = () => typeof window !== 'undefined' && localStorage.getItem('role') === 'admin';

export default function ContentManagement() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState<'all' | 'draft' | 'published'>('all');
    const [q, setQ] = useState('');
    const [page, setPage] = useState(1);
    const perPage = 9;

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filter !== 'all') params.set('status', filter);
            params.set('page', String(page));
            params.set('limit', String(perPage));
            if (q) params.set('q', q);
            const res = await fetch(`/ api / blogs ? ${params.toString()} `);
            const data = await res.json();
            setBlogs(data.blogs || data);
        } catch (err) {
            console.error(err);
        } finally { setLoading(false); }
    };

    useEffect(() => { fetchBlogs(); }, [filter, page]);

    const counts = useMemo(() => ({
        draft: blogs.filter(b => b.status === 'draft').length,
        published: blogs.filter(b => b.status === 'published').length
    }), [blogs]);

    const toggleStatus = async (id?: string, current?: 'draft' | 'published') => {
        if (!isAdmin()) return alert('Only admins can change status');
        if (!id) return;
        try {
            const ns = current === 'draft' ? 'published' : 'draft';
            await fetch(`/ api / blogs / ${id} /status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: ns }) });
            fetchBlogs();
        } catch (err) { console.error(err); alert('Failed to change status'); }
    };

    const remove = async (id?: string) => {
        if (!isAdmin()) return alert('Only admins can delete');
        if (!id) return;
        if (!confirm('Delete this blog?')) return;
        try { await fetch(`/api/blogs/${id}`, { method: 'DELETE' }); fetchBlogs(); }
        catch (err) { console.error(err); alert('Delete failed'); }
    };

    return (
        <div className="p-6 min-h-screen bg-[#EFE9D5]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#274450]">Content Management</h1>
                    <p className="text-sm text-gray-700">Manage blog drafts and published posts</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="flex items-center gap-2 flex-1 md:flex-none border rounded px-2 py-1 bg-white">
                        <input className="outline-none flex-1" placeholder="Search title or author..." value={q} onChange={e => setQ(e.target.value)} />
                        <button onClick={() => fetchBlogs()} className="text-sm px-3 py-1">Search</button>
                    </div>

                    <select value={filter} onChange={e => { setFilter(e.target.value as any); setPage(1); }} className="px-3 py-1 rounded border bg-white">
                        <option value="all">All ({blogs.length})</option>
                        <option value="draft">Draft ({counts.draft})</option>
                        <option value="published">Published ({counts.published})</option>
                    </select>

                    <button onClick={() => navigate('/dashboard/ContentManagement/add-blog')} className="bg-[#274450] text-white px-4 py-2 rounded">+ Add Blog</button>
                </div>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {loading && <div className="col-span-full">Loading...</div>}
                {!loading && blogs.length === 0 && <div className="col-span-full text-center py-10">No blogs yet.</div>}

                {blogs.map(blog => (
                    <motion.div key={blog._id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.01 }} className="bg-white rounded-2xl shadow overflow-hidden flex flex-col">
                        <div className="h-44 w-full bg-gray-100">
                            {blog.thumbnail ? <img src={blog.thumbnail} alt={blog.title} className="w-full h-full object-cover" /> : <div className="h-full flex items-center justify-center text-gray-400">No image</div>}
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="text-lg font-semibold text-[#274450]">{blog.title}</h3>
                            <p className="text-sm text-gray-600 mt-2 flex-1">{blog.short_description}</p>

                            <div className="mt-3 flex items-center justify-between gap-2">
                                <div className="text-xs text-gray-500">
                                    <div>{blog.author}</div>
                                    <div>{new Date(blog.date).toLocaleDateString()}</div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded-full text-xs ${blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{blog.status}</span>

                                    <button onClick={() => navigate(`/dashboard/content-management/edit/${blog._id}`)} className="px-2 py-1 border rounded">Edit</button>

                                    {blog.status === 'draft' ? (
                                        <button onClick={() => toggleStatus(blog._id, blog.status)} className="px-2 py-1 rounded bg-[#71BBB2] text-white">Publish</button>
                                    ) : (
                                        <button onClick={() => toggleStatus(blog._id, blog.status)} className="px-2 py-1 border rounded">Unpublish</button>
                                    )}

                                    <button onClick={() => remove(blog._id)} className="px-2 py-1 border rounded text-red-600">Delete</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-700">Page {page}</div>
                <div className="flex gap-2">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded">Prev</button>
                    <button onClick={() => setPage(p => p + 1)} className="px-3 py-1 border rounded">Next</button>
                </div>
            </div>
        </div>
    );
}