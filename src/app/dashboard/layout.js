import DashboardNavbar from "@/components/layout/DashboardNavbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen  bg-white">
      <DashboardNavbar />
      <div className="pt-[140px]">
        {children}
      </div>
    </div>
  );
}
