export const LatestProjectsCard = ({ contentsArray }) => (
  <div className="w-full bg-white rounded-lg p-5">
    <h5 className="text-sm font-semibold text-gray-500">Latest Projects</h5>
    {contentsArray?.map((content) => (
      <div className="flex space-x-3 items-center my-4 border-b pb-2">
        <p className="h-10 w-10 rounded-full bg-gray-200 text-gray-500 p-2 text-center font-semibold text-sm">
          {content?.name?.slice(0, 2).toUpperCase()}
        </p>
        <h5 className="w-full">
          {content?.name.length <= 9 ? content?.name : `${content?.name}...`}
        </h5>
      </div>
    ))}
  </div>
);
