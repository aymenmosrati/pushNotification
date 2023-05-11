var express = require("express");
var FCM = require("fcm-node");
const SERVER_KEY =
  "AAAA-s0xX98:APA91bGVFLYweQ60_W8BlnzMyR-gV4NUxokclkcQJ8Z_hrcFmyZGzlTwKggSuFFA9jXGeNNZXoN1-Dih4cEZnAnPTDYPbwPm1CWyOt5Qlp7dfdADZPy-Mv046SROTHdf4Z-j3IWdkZvn";

var app = express();

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`srever runing in port ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// fcm end point
app.post("/fcm", (req, res, next) => {
  try {
    let fcm = new FCM(SERVER_KEY);

    let message = {
      to: "/topics/" + req.body.topic,
      notification: {
        title: req.body.title,
        body: req.body.body,
        sound: "default",
        click_action: "FCM_PLUGIN_ACTIVITY",
        icon: "fcm_push_icon",
      },
      data: req.body.data,
    };
    console.log("message", message);

    fcm.send(message, (err, response) => {
      if (err) {
        next(err);
      } else {
        res.json(response);
      }
    });
  } catch (error) {
    next(error);
  }
});
