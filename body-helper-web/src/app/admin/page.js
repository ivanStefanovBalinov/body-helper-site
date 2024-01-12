"use client";
import HighOrderComponent from "@/components/User Panel/HighOrderComponent";
import AdminScreen from "@/screens/Admin/AdminScreen";

const AdminPage = () => {
  return (
    <>
      <AdminScreen />
    </>
  );
};

export default HighOrderComponent(AdminPage);
