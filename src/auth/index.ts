import { eq } from "drizzle-orm";
import {db, usersTable} from "../db"

// async function main() {
//   const user: typeof usersTable.$inferInsert = {
//     name: 'John',
//     age: 30,
//     email: 'john@example.com',
//   };

//   await db.insert(usersTable).values(user);
//   console.log('New user created!')

//   const users = await db.select().from(usersTable);
//   console.log('Getting all users from the database: ', users)
//   /*
//   const users: {
//     id: number;
//     name: string;
//     age: number;
//     email: string;
//   }[]
//   */

//   await db
//     .update(usersTable)
//     .set({
//       age: 31,
//     })
//     .where(eq(usersTable.email, user.email));
//   console.log('User info updated!')

//   await db.delete(usersTable).where(eq(usersTable.email, user.email));
//   console.log('User deleted!')
// }

// main();



export const authorisation = {
  registerPost: async (req: Request) => {
    const body = await req.json()
    const [newUser] = await db
    .insert(usersTable)
    .values({
      username: body.username, 
      password: body.password
    })
    .returning()

    const {password, updatedAt, ...response} = newUser
    return Response.json(response)
  },
  testPost: async (req: Request) => {
    return Response.json({success: "that was post method"})
  }
}