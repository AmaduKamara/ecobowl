export const SideNav = () => {
  return (
    <div className="w-1/4 bg-white border-r px-5">
      <div className="flex flex-col space-y-3">
        <div className="hover:bg-blue-400 h-10 flex items-center rounded-md pl-5 text-lg cursor-pointer hover:text-white">
          <a href="/dashboard">Dashboard</a>
        </div>
        <div className="hover:bg-blue-400 h-10 flex items-center rounded-md pl-5 text-lg cursor-pointer hover:text-white">
          <a href="/projects">Projects</a>
        </div>
        <div className="hover:bg-blue-400 h-10 flex items-center rounded-md pl-5 text-lg cursor-pointer hover:text-white">
          <a href="/institution">Institutions</a>
        </div>
        <div className="hover:bg-blue-400 h-10 flex items-center rounded-md pl-5 text-lg cursor-pointer hover:text-white">
          <a href="/trainees">Trainees</a>
        </div>
      </div>
    </div>
  );
};
