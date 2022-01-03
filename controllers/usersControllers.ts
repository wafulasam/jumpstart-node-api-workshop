// users controllers
import { Request, Response } from "express"
import { User, ErrorAndResponse } from "../types";

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
   pool.query('CREATE TABLE IF NOT EXISTS users (user_id int NOT NULL AUTO_INCREMENT,, firstname VARCHAR (50) UNIQUE NOT NULL,lastname VARCHAR (50) UNIQUE NOT NULL, email VARCHAR (355) UNIQUE NOT NULL, phone VARCHAR (15) UNIQUE NOT NULL, PRIMARY KEY (user_id))')
}
// createUsersTable();

// get all users
export const getAllUsers = (req: Request, res: Response) => {
   pool.query('SELECT * FROM users ORDER BY user_id ASC', (error: ErrorAndResponse, results: ErrorAndResponse) => {
      if (error) {
         throw error
      }
      res.status(200).json({
         status: 'success',
         message: 'Retrieved ALL users',
         data: results.rows
      })
  })
};

// get a user by ID
export const getUserByID = (req: Request, res: Response) => {
   const userID = parseInt(req.params.id);

   pool.query('SELECT * FROM users WHERE user_id = $1', [userID], (error: ErrorAndResponse, results: ErrorAndResponse) => {
      if (error) {
         throw error
      }
      res.status(200).json({
         status: 'success',
         message: `Retrieved ONE user with ID: ${userID}`,
         data: results.rows
      })
  })
};

// add a user
export const addNewUser = (req: Request, res: Response) => {
   const { firstname, lastname, email, phone }: User = req.body;
   pool.query('INSERT INTO users (user_id, firstname, lastname, email, phone) VALUES ($1, $2, $3, $4, $5)', [ firstname, lastname, email, phone ], (error:ErrorAndResponse, results: ErrorAndResponse) => {
      if (error) {
         throw error;
      }
      res.status(201).json({
         status: 'success',
         message: `Inserted a user`,
      })
  })
   
};

// update a user by ID
export const updateUserByID = (req: Request, res: Response) => {
   const id = parseInt(req.params.id)
   const { firstname, lastname, email, phone } = req.body;

   pool.query(
      'UPDATE users SET firstname = $1, lastname = $2, email = $3, phone = $4 WHERE user_id = $5',
      [firstname, lastname, email, phone, id],
      (error: ErrorAndResponse, results: ErrorAndResponse) => {
         if (error) {
            throw error
         }
         res.status(200).json({
            status: 'success',
            message: `MODIFIED a user with ID: ${id}`,
         })
      }
  )

};

// delete user by ID
export const deleteUserByID = (req: Request, res: Response) => {
   
};