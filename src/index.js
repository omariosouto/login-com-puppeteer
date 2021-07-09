require('dotenv').config();
const { beatTime } = require('./beatTime');
const { iHaveJob } = require('./getInfoDay');
const { notifyMe } = require('./notification');

//State of company
const ufCompany = 'SP';

//Get date today
const today = new Date();
// const tomorrow = new Date(today.setDate(today.getDate() + 0));

let message;

if(iHaveJob(today, ufCompany)){
  console.log(`I have a job!!`)
  beatTime();
  message = 'Your point has been hit!! :D' 
}else{
   message = `Today not need to beat time!! :D`; 
}

console.log(message);
notifyMe(message);


