import { motion } from "framer-motion";

function WelcomeBanner() {

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
      relative
      overflow-hidden
      rounded-3xl
      bg-gradient-to-r
      from-indigo-600
      via-violet-600
      to-sky-500
      p-8
      text-white
      shadow-xl
      "
    >
      {/* Background Glow */}

      <div
        className="
        absolute
        -right-20
        -top-20
        h-60
        w-60
        rounded-full
        bg-white/10
        blur-3xl
        "
      />

      <div className="relative z-10">

        <p className="text-sm opacity-90">

          {today}

        </p>

        <h1 className="mt-3 text-4xl font-bold">

          {greeting}, Anmol 👋

        </h1>

        <p className="mt-4 max-w-xl text-indigo-100">

          Welcome back! Here's an overview of your workforce today.

        </p>

      </div>

    </motion.section>
  );
}

export default WelcomeBanner;