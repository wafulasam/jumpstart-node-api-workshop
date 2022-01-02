import express, { Request, Response } from "express";

const app = express(); // create instance of express app
const port = process.env.port || 3000; // define port

// default home route
app.get('/', (req: Request, res: Response) => res.send('Welcome to jumpstart api Data'));

// Start a TCP server listening for connections on the given port and host
app.listen(port, ()=> {
   console.log(`Jumpstart api running on port ${port}`)
});