
import Sidebar from '@/components/Sidebar';

const SwiperPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-14 md:ml-48 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Swiper</h1>
          <p className="text-gray-500 text-lg">Coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default SwiperPage;
