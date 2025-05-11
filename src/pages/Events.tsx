import Sidebar from "@/components/Sidebar";

const Events = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center ml-48">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <span
            className="text-4xl md:text-5xl font-black text-black text-center mb-4"
            style={{ fontFamily: "Arial Black, sans-serif" }}
          >
            Coming Soon{" "}
            <span role="img" aria-label="calendar">
              📅
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Events;
