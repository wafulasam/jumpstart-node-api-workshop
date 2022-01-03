import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express(); // create instance of express app
const port = process.env.port || 3000; // define port
const usersRoutes = require("./routes/usersRoutes");

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true, }))

// routes
app.get('/', (req: Request, res: Response) => res.send('Welcome to jumpstart api Data'));
app.use("/api/", usersRoutes);

// Start a TCP server listening for connections on the given port and host
app.listen(port, ()=> {
   console.log(`Jumpstart api running on port ${port}`)
});