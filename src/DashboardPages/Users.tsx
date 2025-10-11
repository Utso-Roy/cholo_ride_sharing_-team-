import React, { useCallback } from "react";
import { useUsers } from "../hooks/useUsers";
import { SortKey, updateUserRole } from "../api/users";
import UsersTable from "../components/UsersTable";


const Users = () => {
  const {
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
    sort,
    setSort,
    order,
    setOrder,
    data,
    loading,
    error,
    totalPages,
  } = useUsers();

  const handleSort = useCallback(
    (key: SortKey) => {
      if (sort === key) setOrder(order === "asc" ? "desc" : "asc");
      else {
        setSort(key);
        setOrder("asc");
      }
    },
    [sort, order, setSort, setOrder]
  );

  // optimistic update helper (optional)
  const replaceRowRole = (userId: string, role: "moderator" | "admin") => {
    if (!data) return;
    const next = {
      ...data,
      data: data.data.map((u) => (u._id === userId ? { ...u, role } : u)),
    };
    // NOTE: useUsers owns the state; a simple way is to force refetch by tweaking a key.
    // If you want to set it directly, lift state up or add a setter in the hook.
  };

  const handleChangeRole = async (
    userId: string,
    role: "moderator" | "admin"
  ) => {
    const sure = window.confirm(
      `Are you sure you want to make this user ${role}?`
    );
    if (!sure) return;

    try {
      await updateUserRole(userId, role);
      // simplest: trigger a soft refresh by nudging the page state
      // (setPage(page) won't trigger; do a tiny toggle)
      setPage((p) => p); // cause effect to refetch if your hook reacts—if not, do:
      // Alternative: change search to same value to trigger useEffect:
      // setSearch(s => s + '');
    } catch (e: any) {
      alert(e?.response?.data?.error || e.message || "Failed to update role");
    }
  };

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
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border rounded px-2 py-2"
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}/page
              </option>
            ))}
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
         onChangeRole={handleChangeRole}
      />

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages} {data ? `— ${data.total} total` : ""}
        </span>
        <div className="flex gap-2">
          <button
            className="border rounded px-3 py-2 disabled:opacity-50"
            onClick={() => setPage(1)}
            disabled={page <= 1 || loading}
          >
            « First
          </button>
          <button
            className="border rounded px-3 py-2 disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || loading}
          >
            ‹ Prev
          </button>
          <button
            className="border rounded px-3 py-2 disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages || loading}
          >
            Next ›
          </button>
          <button
            className="border rounded px-3 py-2 disabled:opacity-50"
            onClick={() => setPage(totalPages)}
            disabled={page >= totalPages || loading}
          >
            Last »
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
