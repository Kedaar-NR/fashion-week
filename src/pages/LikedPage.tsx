
import Sidebar from "@/components/Sidebar";

const LikedPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-[80px] md:ml-[240px] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Your Liked Items</h1>
        <p className="text-gray-500">Your favorites will appear here</p>
      </div>
    </div>
  );
};

export default LikedPage;
