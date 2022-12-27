const express = require('express');
const Connection = require('./database/db');
const Routes = require('./routes/route');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const UserRoutes = require("./routes/userRoute");
const AdminRoutes = require("./routes/adminRoute");
const InviteRoutes = require("./routes/inviteRoute");
require('dotenv').config();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); //to resolve port issue
app.use('/', Routes);
app.use("/api", UserRoutes);
app.use("/api", AdminRoutes);
app.use("/api", InviteRoutes);


const PORT = 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
Connection(username, password);

app.get("/", (req, res) => {
    res.send('ok')
})
app.listen(PORT, () => {
    console.log(`Server Ruunning at ${PORT}`);
})