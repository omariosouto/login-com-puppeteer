require("dotenv").config();
const { punchAClock } = require("./beatTime");
const { iHaveJob } = require("./getInfoDay");
const { notifyMe } = require("./notification");

const init = async () => {
  const messages = {
    success: "Your point has been hit!! 😜\n",
    failure: "I couldn't register the point 🥲\n",
    dayOff: "This is day off, doesn't need to beat point!! 😁\n",
  };

  //State of company
  const ufCompany = "SP";

  //Get date today
  const today = new Date();
  // const tomorrow = new Date(today.setDate(today.getDate() + 0));

  let fullMessage = messages.dayOff;

  if (iHaveJob(today, ufCompany)) {
    console.log(`I have a job!!`);
    const { status, message } = await punchAClock();

    fullMessage = `${messages[status]}${message}`;
  }

  console.log(fullMessage);
  notifyMe(fullMessage);
};

init();
