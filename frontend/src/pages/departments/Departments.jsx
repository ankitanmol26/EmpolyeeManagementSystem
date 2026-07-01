const departments = [
  { name: "Engineering", head: "Ava Patel", staff: 42, focus: "Platform & APIs" },
  { name: "HR", head: "Daniel Ross", staff: 8, focus: "Recruitment & Culture" },
  { name: "Finance", head: "Mina Shah", staff: 6, focus: "Payroll & Reporting" },
  { name: "Sales", head: "Chris Lewis", staff: 15, focus: "Growth & Retention" },
];

function Departments() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">Departments</h1>
        <p className="mt-2 text-gray-500">Overview of the departments and their current priorities.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {departments.map((department) => (
          <div key={department.name} className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{department.name}</h2>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                {department.staff} staff
              </span>
            </div>
            <p className="mt-3 text-gray-500">Head: {department.head}</p>
            <p className="mt-2 text-sm text-gray-600">Current focus: {department.focus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Departments;
