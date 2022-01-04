// users controllers
import { Request, Response } from "express"
import { User, ErrorAndResponse } from "../types";
import { pool } from "../databaseConfigs";

// creating users table
function createUsersTable () {
   pool.query(`
   CREATE TABLE IF NOT EXISTS 
   users (
      user_id SERIAL PRIMARY KEY NOT NULL, 
      firstname VARCHAR (50), 
      lastname VARCHAR (50), 
      email VARCHAR (355) UNIQUE NOT NULL, 
      phone VARCHAR (15) UNIQUE NOT NULL,
      password VARCHAR (15) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   )`)
}
createUsersTable();

// get all users
export const getAllUsers = (req: Request, res: Response) => {
   pool.query('SELECT * FROM users ORDER BY user_id ASC', (error: ErrorAndResponse, results: ErrorAndResponse) => {
      !error ?
      res.status(200).json({
         status: 'success',
         message: 'Retrieved ALL users',
         data: results.rows
      })
      : res.json(error);
  })
};

// get a user by ID
export const getUserByID = (req: Request, res: Response) => {
   const userID = parseInt(req.params.id);

   pool.query('SELECT * FROM users WHERE user_id = $1', [userID], (error: ErrorAndResponse, results: ErrorAndResponse) => {
      !error ?
      res.status(200).json({
         status: 'success',
         message: results.rows <1 ? `user with id: ${userID} not found` :`retrieved user with id: ${userID}`,
         data: results.rows
      })
      : res.json(error); 
  })
};

// add a user
export const addNewUser = (req: Request, res: Response) => {
   const { firstname, lastname, email, phone, password }: User = req.body;

   pool.query(`
   INSERT INTO 
   users (
      user_id, 
      firstname, 
      lastname, 
      email, 
      phone, 
      password, 
      created_at, 
      updated_at
   ) 
   VALUES (DEFAULT, $1, $2, $3, $4, $5, DEFAULT, DEFAULT)`, 
   [ firstname, lastname, email, phone, password ], (error:ErrorAndResponse, results: ErrorAndResponse) => {
      !error ?
      res.status(201).json({
         status: 'success',
         message: `Inserted a user with email: ${email}`,
      })
      : res.json({
         error
         // message: error.detail
      });
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
         !error ?
         res.status(200).json({
            status: 'success',
            message: results.rowCount === 0 ? `unable to modify user with id ${id}` : `MODIFIED a user with ID: ${id}`
         })
         : res.json(error);
      }
  )

};

// delete user by ID
export const deleteUserByID = (req: Request, res: Response) => {
   const id = parseInt(req.params.id);

   pool.query('DELETE FROM users WHERE user_id = $1', [id], (error: ErrorAndResponse, results: ErrorAndResponse) => {
      !error ?
      res.status(200).json({
         status: 'success',
         message: results.rowCount === 0 ? `unable to delete user with id: ${id}` : `DELETED a user with ID: ${id}`,
      })
      : res.json(error);
  })
};