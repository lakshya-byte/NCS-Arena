import { Link } from "react-router-dom";

export const AdminNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#020617] border-b border-slate-800 p-4 flex gap-6">
      <Link to="/admin/dashboard">Dashboard</Link>
      <Link to="/admin/create-contest">Create Contest</Link>
      <Link to="/admin/login">Logout</Link>
    </nav>
  );
};
