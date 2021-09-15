const notifier = require('node-notifier');
const path = require('path');

const notifyMe = (message) => {

  const iconPath = path.resolve(__dirname, 'assets', 'icon1.jpg');

  notifier.notify(
    {
      message,
      icon: iconPath, // Absolute path (doesn't work on balloons)
      title: `${process.env.NAME_APPLICATION}`,
      sound: true, // Only Notification Center or Windows Toasters
      wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
    },
    function (err, response, metadata) {
      // Response is response from notification
      // Metadata contains activationType, activationAt, deliveredAt
    }
  );

  notifier.on('click', function (notifierObject, options, event) {
    // Triggers if `wait: true` and user clicks notification
  });

  notifier.on('timeout', function (notifierObject, options) {
    // Triggers if `wait: true` and notification closes
  });

}

module.exports = {
  notifyMe,
}