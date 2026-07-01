import { motion } from "framer-motion";

function StatCard({ title, value, growth, color, icon: Icon }) {
  const displayValue =
    typeof value === "number" && value >= 100000
      ? `₹${(value / 100000).toFixed(1)}L`
      : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl shadow-md hover:shadow-xl p-6 border border-slate-200"
    >
      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-3">
            {displayValue}
          </h2>

          <span className="inline-block mt-4 px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm font-semibold">
            {growth}
          </span>

        </div>

        <div
          className={`${color} h-16 w-16 rounded-2xl flex items-center justify-center text-white`}
        >
          <Icon size={30} />
        </div>

      </div>
    </motion.div>
  );
}

export default StatCard;