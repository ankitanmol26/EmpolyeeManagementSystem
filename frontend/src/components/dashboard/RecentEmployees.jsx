const employees = [
  {
    id: 1,
    name: "John Doe",
    department: "IT"
  },
  {
    id: 2,
    name: "Alex Smith",
    department: "HR"
  },
  {
    id: 3,
    name: "Emma Wilson",
    department: "Finance"
  },
];

function RecentEmployees() {
  return (
    <div className="bg-white rounded-3xl mt-8 p-6 shadow-sm">

      <h2 className="text-xl font-bold mb-5">

        Recent Employees

      </h2>

      <div className="space-y-4">

        {employees.map((employee) => (
          <div
            key={employee.id}
            className="flex justify-between items-center border-b pb-3"
          >
            <div>

              <h3 className="font-semibold">

                {employee.name}

              </h3>

              <p className="text-gray-500">

                {employee.department}

              </p>

            </div>

            <button className="text-indigo-600">

              View

            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default RecentEmployees;