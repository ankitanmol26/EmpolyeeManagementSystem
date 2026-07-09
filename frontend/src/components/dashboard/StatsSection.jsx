import StatCard from "./StatCard";
import { stats } from "../../data/dashboardData";

function StatsSection({ items = stats }) {
  return (
    <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <StatCard
          key={item.id}
          title={item.title}
          value={item.value}
          growth={item.growth}
          color={item.color}
          icon={item.icon}
        />
      ))}
    </section>
  );
}

export default StatsSection;
