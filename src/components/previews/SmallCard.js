export const SmallCard = ({ contentsArray }) => (
  <div className="flex space-x-5 m-10">
    {contentsArray?.map((content) => (
      <div key={content?.id} className="w-1/4 bg-white rounded-lg p-5 border">
        <h5>{content?.count}</h5>
        <p>{content?.label}</p>
      </div>
    ))}
  </div>
);
