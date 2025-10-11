import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchUsers, SortKey } from '../api/users';
import { UsersResponse } from '../types/User';

export function useUsers() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortKey>('createdAt');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const [data, setData] = useState<UsersResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // debounce search (300ms)
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);

    fetchUsers({ page, limit, search: debouncedSearch, sort, order, signal: ac.signal })
      .then(setData)
      .catch((e) => {
        if (e.name !== 'AbortError') setError(e.message || 'Failed to load users');
      })
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, [page, limit, debouncedSearch, sort, order]);

  // Reset to page 1 whenever filters change (except page itself)
  useEffect(() => { setPage(1); }, [limit, debouncedSearch, sort, order]);

  return {
    page, setPage,
    limit, setLimit,
    search, setSearch,
    sort, setSort,
    order, setOrder,
    data,
    loading,
    error,
    totalPages: useMemo(() => (data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1), [data]),
  };
}

function useDebounce<T>(value: T, delay = 300): T {
  const [v, setV] = useState(value);
  const t = useRef<number | null>(null);

  useEffect(() => {
    if (t.current) window.clearTimeout(t.current);
    // @ts-ignore - window.setTimeout returns number in browser
    t.current = window.setTimeout(() => setV(value), delay);
    return () => { if (t.current) window.clearTimeout(t.current); };
  }, [value, delay]);

  return v;
}
