const Recommendations = ({ recommendationData }) => {
  console.log(recommendationData);

  if (!recommendationData || recommendationData.length === 0) {
    return (
      <div className="flex flex-col gap-2 w-full">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="w-full h-[96px] bg-white rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full">
    </div>
  );
};

export default Recommendations;
