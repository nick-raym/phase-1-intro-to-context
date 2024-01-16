// Your code here
function createEmployeeRecord([firstName,lastName,title,payRate]){
    let employeeRecord = {
        firstName : firstName,
        familyName : lastName,
        title: title,
        payPerHour: payRate,
        timeInEvents: [],
        timeOutEvents: []

    }
    return employeeRecord
}
console.log(createEmployeeRecord(["nick","ray","se","200"])) 

function createEmployeeRecords(arrays){
    let newObjArray = arrays.map(array => {
        return createEmployeeRecord(array)
    });
    return newObjArray
}

const employees = [["nick","Rayman", "Software Engineer","25"],["Barack","Obama","president","100"]]

console.log(createEmployeeRecords(employees))

function createTimeInEvent(record,date){
    const dateArray =  date.split(" ")
    const timeStamp = parseInt(dateArray[1])
    record.timeInEvents.push({
        type:"TimeIn",
        hour: timeStamp,
        date: dateArray[0]
    })
    return record
}

function createTimeOutEvent(record,date){
    const dateArray =  date.split(" ")
    const timeStamp = parseInt(dateArray[1])
    record.timeOutEvents.push({
        type:"TimeOut",
        hour: timeStamp,
        date: dateArray[0]
    })
    return record
}
function hoursWorkedOnDate(record,date){
    let timeIn;
    let timeOut
    record.timeInEvents.forEach(element => {
        if(element.date === date){
            timeIn = element.hour
        }
    });
    record.timeOutEvents.forEach(element => {
        if(element.date === date){
            timeOut = element.hour
            
        }
    });
    let hoursWorked = (timeOut - timeIn)/100;
    return hoursWorked
}

function wagesEarnedOnDate(record,date){
    const pay = record.payPerHour;
    const hoursWorked = hoursWorkedOnDate(record,date)
    return parseInt(pay * hoursWorked)
}

function allWagesFor(record){
         let payArray = [];
         record.timeInEvents.forEach(element=>{
            let payOwed = wagesEarnedOnDate(record,element.date)
            payArray.push(payOwed)
         })
         const final = payArray.reduce((result,current)=> result+current,0)
         return parseInt(final)
}

function calculatePayroll(employeeRecords){
    let finalPayroll = employeeRecords.reduce((result,current) => result + allWagesFor(current),0)
    return finalPayroll
}

