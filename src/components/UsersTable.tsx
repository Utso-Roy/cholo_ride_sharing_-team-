// import React from 'react';
// import { User } from '../types/User';
// import { SortKey } from '../api/users';

// type Props = {
//   rows: User[];
//   loading: boolean;
//   sort: SortKey;
//   order: 'asc' | 'desc';
//   onSort: (key: SortKey) => void;
//   onChangeRole: (userId: string, newRole: 'moderator' | 'admin') => void;
// };

// const headers: { key: SortKey |'actions'; label: string; className?: string }[] = [
//   { key: 'name', label: 'User' },
//   { key: 'email', label: 'Email' },
//   { key: 'role', label: 'Role' },
//   { key: 'createdAt', label: 'Joined', className: 'whitespace-nowrap' },
//   { key: 'actions', label: 'Actions', className: 'text-right' },
// ];

// export default function UsersTable({ rows, loading, sort, order, onSort, onChangeRole }: Props) {
//   return (
//     <div className="overflow-x-auto rounded border border-gray-200">
//       <table className="min-w-[720px] w-full text-sm">
//         <thead className="bg-gray-50 sticky top-0">
//           <tr>
//             {headers.map(h =>
//               h.key === 'actions' ? (
//                 <th key={h.key} className={`px-4 py-3 text-xs font-semibold ${h.className ?? ''}`}>{h.label}</th>
//               ) : (
//                 <Th key={h.key} active={sort === h.key} dir={order} onClick={() => onSort(h.key as SortKey)} className={h.className}>
//                   {h.label}
//                 </Th>
//               )
//             )}
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             [...Array(8)].map((_, i) => (
//               <tr key={i} className="animate-pulse">
//                 {headers.map((h) => (
//                   <td key={h.key} className="px-4 py-3 border-t">
//                     <div className="h-4 w-24 bg-gray-200 rounded" />
//                   </td>
//                 ))}
//               </tr>
//             ))
//           ) : rows.length === 0 ? (
//             <tr>
//               <td colSpan={headers.length} className="px-4 py-10 text-center text-gray-500">No users found.</td>
//             </tr>
//           ) : (
//             rows.map(u => (
//               <tr key={u._id} className="hover:bg-gray-50">
//                 <td className="px-4 py-3 border-t">
//                   <div className="flex items-center gap-3">
//                     <Avatar src={u.photo} name={u.name} />
//                     <div className="font-medium">{u.name || '—'}</div>
//                   </div>
//                 </td>
//                 <td className="px-4 py-3 border-t">{u.email || '—'}</td>
//                 <td className="px-4 py-3 border-t capitalize">{u.role ?? 'user'}</td>
//                 <td className="px-4 py-3 border-t whitespace-nowrap">
//                   {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
//                 </td>
//                 <td className="px-4 py-3 border-t">
//                   <div className="flex justify-end gap-2">
//                     <button
//                       className="px-2 py-1 border rounded text-xs"
//                       onClick={() => onChangeRole(u._id, 'moderator')}
//                       disabled={u.role === 'moderator'}
//                       title="Make Moderator"
//                     >
//                       Make Moderator
//                     </button>
//                     <button
//                       className="px-2 py-1 border rounded text-xs"
//                       onClick={() => onChangeRole(u._id, 'admin')}
//                       disabled={u.role === 'admin'}
//                       title="Make Admin"
//                     >
//                       Make Admin
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function Th({
//   children, active, dir, onClick, className,
// }: { children: React.ReactNode; active: boolean; dir: 'asc' | 'desc'; onClick: () => void; className?: string; }) {
//   return (
//     <th onClick={onClick} className={`px-4 py-3 text-left text-xs font-semibold select-none cursor-pointer ${className ?? ''}`} title="Sort">
//       <span className="inline-flex items-center gap-1">
//         {children}
//         <span className={`text-gray-400 ${active ? 'opacity-100' : 'opacity-0'}`}>{dir === 'asc' ? '▲' : '▼'}</span>
//       </span>
//     </th>
//   );
// }

// function Avatar({ src, name }: { src?: string; name?: string }) {
//   const initials = (name ?? '')
//     .split(' ')
//     .filter(Boolean)
//     .slice(0, 2)
//     .map(s => s[0]?.toUpperCase())
//     .join('') || '?';

//   return src ? (
//     <img src={src} alt={name ?? 'avatar'} className="h-8 w-8 rounded-full object-cover border" />
//   ) : (
//     <div className="h-8 w-8 rounded-full border bg-gray-100 flex items-center justify-center text-xs font-semibold">
//       {initials}
//     </div>
//   );
// }
