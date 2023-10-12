function createEmployeeRecord(employeeData) {
  return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
  };
}

function createEmployeeRecords(employeesData) {
  return employeesData.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(' ');
  employee.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
  });
  return employee;
}

function createTimeOutEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(' ');
  employee.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
  });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(event => event.date === date);
  const timeOut = employee.timeOutEvents.find(event => event.date === date);

  if (!timeIn || !timeOut) {
      console.log(`TimeIn or TimeOut not found for date: ${date}`);
      return 0;
  }

  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}

function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map(event => event.date);
  const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
  return totalWages;
}

function calculatePayroll(employees) {
  return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}

describe("The payroll system", function () {
  // Add your test cases here
});

