const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
const port = 8000;

const {configureDB} = require('./config/mongoose.config');
configureDB();

const {oAuthRouter} = require("./routes/oauthRouter.routes");
app.use("/", oAuthRouter);

const {productRouter} = require('./routes/productRouter.routes');
app.use("/productos/", productRouter);

app.listen(port, () => {console.log(`Listening at Port: ${port}`)});