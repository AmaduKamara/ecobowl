import {
  SideNav,
  SmallCard,
  LatestIntsCard,
  LatestProjectsCard,
} from "../components";
import {
  SmallCardsData,
  LatestInstitutionsData,
  LatestProjectsData,
} from "../data";

export const Dashboard = () => {
  return (
    <div className="">
      <div className="h-24 flex items-center bg-white shadow-md">
        <h3 className="w-1/6 text-center font-semibold text-lg">Eco Bowl</h3>
        <h4 className="w-1/6 font-semibold text-lg">Dashboard</h4>
      </div>
      <div className="flex w-full h-screen">
        <SideNav />
        <div className="w-full bg-red-200">
          <SmallCard contentsArray={SmallCardsData} />
        </div>
        <div className="w-1/4 p-4">
          <div className="my-5 border rounded-md">
            <LatestIntsCard contentsArray={LatestInstitutionsData} />
          </div>
          <div className="my-5 border rounded-md">
            <LatestProjectsCard contentsArray={LatestProjectsData} />
          </div>
        </div>
      </div>
    </div>
  );
};
