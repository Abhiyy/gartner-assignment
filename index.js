'use strict';
// Get Data from Json
const fs = require('fs')
let clicksData = require('./clicks.json');

// variables declaration
let time = -1;
let subArray = [];
let mostExpensiveClicksByHours = [];
let mostExpensiveClicksByHoursFirstofSame = [];
let ip = '';
let ipCount = 0;
let lessThanTenIpClicks = [];
let iptoExclude = [];

// sorted click data by IP address
let clickByIp = clicksData.map(x => {
    return { ip: x.ip, timestamp: x.timestamp, hours: new Date(x.timestamp).getHours(), amount: parseFloat(x.amount) };
}).sort((x, y) => {
    if (x.ip > y.ip)
        return 1;

    if (x.ip < y.ip)
        return -1;

    return 0;
});

// method that will pick the eligible click
const clickSelector = (d) =>{
    mostExpensiveClicksByHours.push(subArray.reduce((prev, current) => (prev.amount > current.amount) ? prev : current))
    mostExpensiveClicksByHoursFirstofSame.push(subArray.reduce((prev,current)=>  (prev.amount == current.amount)? prev :  (prev.amount > current.amount) ? prev : current))
    subArray.splice(0, subArray.length);
    subArray.push({ ip: d.ip, timestamp: d.timestamp, amount: d.amount });
}


// iterating over the click arrray 
clickByIp.forEach((d, i) => {
 
    if (ip == d.ip || i == 0) {
        if (time == d.hours || i == 0) {
            subArray.push({ ip: d.ip, timestamp: d.timestamp, amount: d.amount });
        }
        else {
           clickSelector(d);
        }
    }
    else {
        if(i== clickByIp.length -1)
        {
            subArray.push({ ip: d.ip, timestamp: d.timestamp, amount: d.amount });
        }
        clickSelector(d);
    }
    ip = d.ip;
    time = d.hours;
})

subArray = [];
// iterating over click array to find ip address having more than 10 entries
clickByIp.forEach((d, i) => {
    if(ip == d.ip || i == 0){
        subArray.push(d);
        ipCount++;
    }else{
       
       if(ipCount > 10){
        iptoExclude.push(subArray[subArray.length - 1].ip);
       }
       subArray.splice(0,subArray.length);
       subArray.push(d);
        ipCount = 0;
    }
    ip = d.ip;
})

lessThanTenIpClicks = mostExpensiveClicksByHours.filter(x=> !iptoExclude.includes(x.ip));

console.log(mostExpensiveClicksByHours);
console.log("===============");
console.log(mostExpensiveClicksByHoursFirstofSame);
console.log("===============");
console.log(lessThanTenIpClicks);


// fs.writeFileSync('./resultset.json',  JSON.stringify(mostExpensiveClicksByHours))
// fs.writeFileSync('./resultset.json',  JSON.stringify(mostExpensiveClicksByHoursFirstofSame))
fs.writeFile('./resultset.json', '', function(){console.log('done')})
fs.appendFile("./resultset.json", JSON.stringify( {'mostexpensiveclickbyhours' : mostExpensiveClicksByHours}) , function (err) {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
 });
 fs.appendFile("./resultset.json", JSON.stringify( {'mostexpensiveclickbyhoursoccruredfirst' : mostExpensiveClicksByHoursFirstofSame}) , function (err) {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
 });
 fs.appendFile("./resultset.json", JSON.stringify({'mostexpensiveclickbyhourexcgttenentries' : lessThanTenIpClicks }) , function (err) {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
 });