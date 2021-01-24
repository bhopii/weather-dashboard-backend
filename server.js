const express = require("express");


const PORT = process.env.PORT || 8080;

const app = express();

// Serve static content for the app from the "public" directory in the application directory.
// app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("./routes/api-routes")(app);

app.listen(PORT, ()=> {
    console.log("App is running on port 8080");
})