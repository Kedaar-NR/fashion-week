
import Sidebar from "@/components/Sidebar";

const LikedPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col p-8">
        <h1 className="text-3xl font-bold mb-4">Your Liked Items</h1>
        <p className="text-gray-500">Your favorites will appear here</p>
      </div>
    </div>
  );
};

export default LikedPage;
