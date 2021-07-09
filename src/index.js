require('dotenv').config();
const { beatTime } = require('./beatTime');
const { iHaveJob } = require('./getInfoDay');

//State of company
const ufCompany = 'SP';

//Get date today
const today = new Date();
// const tomorrow = new Date(today.setDate(today.getDate() + 0));

if(iHaveJob(today, ufCompany)){
  console.log(`I have a job!!`)
  beatTime();
}else{
console.log(`Today not need to beat time!! :D`);
}




