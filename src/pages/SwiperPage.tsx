
import Sidebar from '@/components/Sidebar';

const SwiperPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-14 md:ml-48 pt-8">
        <div className="mx-8 lg:mx-12 xl:mx-16">
          <h1 className="text-3xl font-bold mb-6 text-center">Swiper</h1>
          <div className="flex justify-center items-center h-[60vh]">
            <p className="text-gray-500 text-lg">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiperPage;
