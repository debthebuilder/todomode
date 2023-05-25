require("dotenv").config();
const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");

const sq = require("./src/models");
const corsOptions = require("./src/configs/cors.config");
const verifyJWT = require("./src/middlewares/verifyJWT");
const credentials = require("./src/middlewares/credentials");
const task = require("./src/routes/task.routes");
const user = require("./src/routes/user.routes");

const PORT = process.env.APP_PORT;
const app = express();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


sq.sequelize.sync().then(()=>{
    console.log("sync successful");
})

// app.use(verifyJWT.verifyJWT);
app.use('/user', user);
app.use('/task', task);

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`))