// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    const record = {};
    Object.assign(record, { firstName, familyName, title, payPerHour });

    record.timeInEvents = [];
    record.timeOutEvents = [];
    return record;
}

function createEmployeeRecords(records) {
    return records.map(record => createEmployeeRecord(record));
}

function createTimeEvent(employee, date, type) {
    const dateRegex = /^\d{4}-\d{2}-\d{2} \d{4}$/;
    if (date.match(dateRegex) === null) {
        throw new Error('Invalid date format');
    }
    let entry = {
        type: type,
        date: date.split(' ')[0],
        hour: parseInt(date.split(' ')[1]),
    };
    type === "TimeIn" ?
        employee.timeInEvents.push(entry) :
        employee.timeOutEvents.push(entry);
    return employee;
}

function createTimeInEvent(employee, date) {
    return createTimeEvent(employee, date, 'TimeIn');
}

function createTimeOutEvent(employee, date) {
    return createTimeEvent(employee, date, 'TimeOut');
}

function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.filter(log => log.date === date)[0].hour / 100;
    let timeOut = employee.timeOutEvents.filter(log => log.date === date)[0].hour / 100;
    let hoursWorkedOnDate = timeOut - timeIn;
    return hoursWorkedOnDate;
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
    if (employee.timeInEvents.length !== employee.timeOutEvents.length) {
        throw new Error("Employee has unequal time in/out events");
    }
    let dates = employee.timeInEvents.map(log => log.date);
    return dates.reduce((acc, date) => acc + wagesEarnedOnDate(employee, date), 0);
}

function calculatePayroll(employees) {
    let payroll = employees.reduce((acc, employee) => acc + allWagesFor(employee), 0);
    return payroll;
}