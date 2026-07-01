const mongoose = require('mongoose');
const Employee = require('./src/models/Employee');

(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/EmployeeManagementSystem');
  const created = await Employee.create({
    employeeId: 'CRUD-TEST',
    name: 'CRUD Test User',
    email: 'crud@test.com',
    phone: '1234567890',
    department: 'Engineering',
    designation: 'Developer',
    salary: 50000,
    joiningDate: '2024-01-01',
    address: 'Test Address',
    status: 'Active'
  });
  console.log('created', created._id.toString());
  const found = await Employee.findById(created._id);
  console.log('found', found && found.name);
  const updated = await Employee.findByIdAndUpdate(created._id, { status: 'Inactive' }, { new: true });
  console.log('updated', updated && updated.status);
  await Employee.findByIdAndDelete(created._id);
  console.log('deleted');
  process.exit(0);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
