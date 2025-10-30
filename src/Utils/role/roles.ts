// export const isAnyRider = (user?: { role?: string; roles?: string[] }) => {
//   const role = user?.role ?? "";
  
//   const primary = role.endsWith("-rider");
//   const multi = Array.isArray(user?.roles)
//     ? user!.roles!.some(r => r.endsWith("-rider"))
//     : false;
//   return primary || multi;
// };
