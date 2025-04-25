
import Sidebar from '@/components/Sidebar';

const DropTracker = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-14 md:ml-48 pt-8 px-4 md:px-8 flex flex-col items-center">
        <div className="w-full max-w-7xl">
          <h1 className="text-3xl font-bold mb-6 text-center">Drop Tracker</h1>
          <div className="flex justify-center items-center h-[60vh]">
            <p className="text-gray-500 text-lg">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropTracker;
