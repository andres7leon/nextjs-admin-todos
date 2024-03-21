// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import { CiBellOn, CiBookmarkCheck, CiChat1, CiLogout, CiMenuBurger, CiSearch } from 'react-icons/ci';
import { Sidebar, TopMenu } from '../../components';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* TODO: src/components <Sidebar /> */}

      <Sidebar />

      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen bg-slate-300">
        
        <TopMenu />

        <div className="px-6 pt-6">

          {children}

        </div>
      </div>
    </>
  );
}