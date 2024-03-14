const express = require("express");
const { exec } = require("child_process"); // For server-side command execution (security note below)
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// To process incoming request bodies, making it easier to handle POST and PUT requests.
// Body-parser middleware
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", "./views");

// index page
app.get("/", (req, res) => {
  res.render("index");
});

// about page
app.get("/about", function (req, res) {
  res.render("about");
});

app.post("/execute", (req, res) => {
  const commandtxt = req.body.command;
  console.log("The command to be executed is: " + commandtxt);
  // **Security Note:** Never execute untrusted user input or commands from the client-side.
  // This example is for demonstration purposes only. In a real application, implement proper sanitization and validation.
  exec(commandtxt, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return res.send({ error: error.message });
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return res.send({ error: stderr });
    }
    console.log(`stdout: ${stdout}`);
    return res.status(200).send({ output: stdout });
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
