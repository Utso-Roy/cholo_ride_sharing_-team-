import React, { useCallback } from 'react';
import { useUsers } from '../hooks/useUsers';
import { SortKey } from '../api/users';
import UsersTable from '../components/UsersTable';

const Users = () => {
    const {
    page, setPage,
    limit, setLimit,
    search, setSearch,
    sort, setSort,
    order, setOrder,
    data, loading, error, totalPages,
  } = useUsers();

  const handleSort = useCallback((key: SortKey) => {
    if (sort === key) setOrder(order === 'asc' ? 'desc' : 'asc');
    else { setSort(key); setOrder('asc'); }
  }, [sort, order, setSort, setOrder]);
    return (
        <div className="p-4 md:p-6 space-y-4">
      <header className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
        <h1 className="text-xl font-semibold">Users</h1>
        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email…"
            className="border rounded px-3 py-2 w-64"
          />
          <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="border rounded px-2 py-2">
            {[10, 20, 50, 100].map(n => <option key={n} value={n}>{n}/page</option>)}
          </select>
        </div>
      </header>

      {/* {error && <div className="border border-red-200 bg-red-50 text-red-700 rounded p-3">{error}
        </div>} */}

      <UsersTable
        rows={data?.data ?? []}
        loading={loading}
        sort={sort}
        order={order}
        onSort={handleSort}
      />

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages} {data ? `— ${data.total} total` : ''}
        </span>
        <div className="flex gap-2">
          <button className="border rounded px-3 py-2 disabled:opacity-50" onClick={() => setPage(1)} disabled={page <= 1 || loading}>« First</button>
          <button className="border rounded px-3 py-2 disabled:opacity-50" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1 || loading}>‹ Prev</button>
          <button className="border rounded px-3 py-2 disabled:opacity-50" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages || loading}>Next ›</button>
          <button className="border rounded px-3 py-2 disabled:opacity-50" onClick={() => setPage(totalPages)} disabled={page >= totalPages || loading}>Last »</button>
        </div>
      </div>
    </div>
  );
}

export default Users;