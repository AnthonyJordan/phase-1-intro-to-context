// Your code here

function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
    const employeeArray = []

    array.forEach(employee => { employeeArray.push(createEmployeeRecord(employee)) });
    return employeeArray
}

function createTimeInEvent(employee, time) {

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time.split(" ")[1]),
        date: time.split(" ")[0]
    })
    return employee
}

function createTimeOutEvent(employee, time) {

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time.split(" ")[1]),
        date: time.split(" ")[0]
    })
    return employee
}


function hoursWorkedOnDate(employee, date) {
    const timeOut = employee.timeOutEvents.find(event => event.date === date).hour
    const timeIn = employee.timeInEvents.find(event => event.date === date).hour
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
    let wages = 0
    for (let i = 0; i < employee.timeInEvents.length; i++) {
        wages += wagesEarnedOnDate(employee, employee.timeInEvents[i].date)
    }

    return wages
}

function calculatePayroll(employeeArray) {
    let wages = 0
    for (let i = 0; i < employeeArray.length; i++) {
        wages += allWagesFor(employeeArray[i])
    }

    return wages
}