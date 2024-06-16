import Sidebar from "../components/common/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
    <Sidebar />
    {/* <div className="flex flex-col flex-1">
      <Navbar />
      <MainContent>{children}</MainContent>
    </div> */}
  </div>
  );
};

export default Dashboard;
