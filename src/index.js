require("dotenv").config();
const { beatTime } = require("./beatTime");
const { iHaveJob } = require("./getInfoDay");
const { notifyMe } = require("./notification");

const init = async () => {
  const message = {
    success: "Your point has been hit!! 😜",
    failure: "An error occurred, I couldn't register the point 🥲",
    dayOff: "This is day off, doesn't need to beat point!! 😁",
  };

  //State of company
  const ufCompany = "SP";

  //Get date today
  const today = new Date();
  // const tomorrow = new Date(today.setDate(today.getDate() + 0));

  let status = "dayOff";

  if (iHaveJob(today, ufCompany)) {
    console.log(`I have a job!!`);
    status = await beatTime();
  }

  console.log(message[status]);
  notifyMe(message[status]);
};

init();
