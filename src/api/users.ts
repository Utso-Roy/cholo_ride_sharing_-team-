import api from '../lib/api';
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
  const { data } = await api.get<UsersResponse>("/api/users", {
    params: {
      page,
      limit,
      search: search.trim() || undefined,
      sort,
      order,
    },
    signal,
  });

  return data;
}
