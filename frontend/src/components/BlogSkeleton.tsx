export const BlogSkeleton = () => {
    return (
      <div role="status" className="animate-pulse">
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
          {/* Header and Sort Button */}
          <div className="flex justify-between items-center mb-4">
            <div className="h-2 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="w-24 h-8 bg-gray-200 rounded-lg mb-4"></div>
          </div>
  
          {/* Main Content (Blog) */}
          <div className="grid grid-cols-12 gap-4">
            {/* Main blog section (10 columns) */}
            <div className="flex flex-col justify-center mt-8 col-span-10">
              <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
  
            {/* Sidebar section (2 columns) */}
            <div className="col-span-2">
              <div className="h-2 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full mb-4"></div>
            </div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  };
  