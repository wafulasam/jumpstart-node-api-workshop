// users controllers
import { Request, Response } from "express"
import { User } from "../types/users"
const Pool = require('pg').Pool;
const pool = new Pool({
   user: '',
   password: '',
   database: 'jump-start',
   host: 'localhost',
   port: 5432
})

// creating users table
function createUsersTable () {
   pool.query('CREATE TABLE IF NOT EXISTS users (user_id serial PRIMARY KEY, firstname VARCHAR (50) UNIQUE NOT NULL,lastname VARCHAR (50) UNIQUE NOT NULL, email VARCHAR (355) UNIQUE NOT NULL, phone VARCHAR (15) UNIQUE NOT NULL)')
}
// createUsersTable();

// add a user
export const addNewUser = (req: Request, res: Response) => {
   const { firstname, lastname, email, phone }: User = req.body;
   pool.query('INSERT INTO users (user_id, firstname, lastname, email, phone) VALUES ($1, $2, $3, $4, $5)', [identity, firstname, lastname, email, phone ], (error, results) => {
      if (error) {
         // throw error
         console.log(error)
      }
      res.status(201).json({
          status: 'success',
          message: `Inserted a user`,
      })
  })
   
};

// get all users
export const getAllUsers = (req: Request, res: Response) => {

};

// get a user by ID
export const getUserByID = (req: Request, res: Response) => {

};

// update a user by ID
export const updateUserByID = (req: Request, res: Response) => {

};

// delete user by ID
export const deleteUserByID = (req: Request, res: Response) => {
   
};