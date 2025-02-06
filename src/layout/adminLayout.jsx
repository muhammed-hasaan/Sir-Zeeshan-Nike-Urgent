import { useState } from "react";
import AdminHeader from "../components/admin/header/Header";
import AdminSidebar from "../components/admin/sidebar/Sidebar";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AdminHeader open={open} setOpen={setOpen} />
      <AdminSidebar open={open} setOpen={setOpen} />
    </>
  );
};

export default AdminLayout;
