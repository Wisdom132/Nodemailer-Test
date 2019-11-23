const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const PORT = process.env.PORT || 3000;
const path = require("path");

const app = express();

//view engine setup
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// static folder
app.use("/public", express.static(path.join(__dirname, "public")));
//body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("contact");
});

app.post("/send", (req, res) => {
  //   res.json(req.body);
  const output = `
    <p>You have a new Notification</p>
    <h3>Contct Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Company: ${req.body.company}</li>
        <li>Phone: ${req.body.phone}</li>
        <li>Message: ${req.body.message}</li>
    </ul>
`;
  res.send(output);

  //   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // host: "mail.google.com",
    service: "gmail",
    // port: 587,
    secure: false,
    auth: {
      user: "ekpotwisdom@gmail.com", // generated ethereal user
      pass: "spinosky" // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: '"Wisdom Ekpot 👻" <ekpotwisdom@gmail.com>', // sender address
    to: req.body.email, // list of receivers
    subject: "Testing Dynamic", // Subject line
    text: "If You Recieve This Then You Are A Strong Man", // plain text body
    html: output // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // res.render("contact", { msg: "Email Send!!!" });
});

app.listen(PORT, () => {
  console.log(`app is listerning to port ${PORT}`);
});
