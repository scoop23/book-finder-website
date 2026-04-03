import { motion } from "framer-motion";

const Recommendations = ({ recommendationData }) => {
  console.log(recommendationData);

  if (!recommendationData || recommendationData.length === 0) {
    return (
      <motion.div layout className="flex gap-2 max-w-[700px]">
        {[1, 2].map((n) => (
          <motion.div
            layout
            key={n}
            className="h-[250px] w-[350px] bg-white rounded-2xl animate-pulse"
          >
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full">
    </div>
  );
};

export default Recommendations;
