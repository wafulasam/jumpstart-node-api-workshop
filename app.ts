import express, { Request, Response } from "express";
import cors from "cors";
const app = express(); // create instance of express app
const port = process.env.port || 3000; // define port
app.use(cors);
const usersRoutes = require("./routes/usersRoutes");

// routes
app.get('/', (req: Request, res: Response) => res.send('Welcome to jumpstart api Data'));
app.use("/api/", usersRoutes);

// Start a TCP server listening for connections on the given port and host
app.listen(port, ()=> {
   console.log(`Jumpstart api running on port ${port}`)
});