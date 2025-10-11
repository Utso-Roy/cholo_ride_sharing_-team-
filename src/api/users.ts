import { UsersResponse } from '../types/User';

export type SortKey = 'name' | 'email' | 'role' | 'createdAt';

export async function fetchUsers(params: {
  page?: number;
  limit?: number;
  search?: string;
  sort?: SortKey;
  order?: 'asc' | 'desc';
  signal?: AbortSignal;
}): Promise<UsersResponse> {
  const { page = 1, limit = 10, search = '', sort = 'createdAt', order = 'desc', signal } = params;
  const qs = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search,
    sort,
    order,
  });
  const res = await fetch(`/api/users?${qs}`, { signal, credentials: 'include' });
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
  return res.json();
}
