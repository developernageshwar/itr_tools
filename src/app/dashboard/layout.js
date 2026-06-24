import DashboardNavbar from "@/components/layout/DashboardNavbar";
import HelpSupportChat from "@/components/layout/HelpSupportChat";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen  bg-white">
      <DashboardNavbar />
      <div className="pt-[100px]">
        {children}
      </div>
      <HelpSupportChat />
    </div>
  );
}
