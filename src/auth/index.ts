import { eq } from "drizzle-orm";
import {db, usersTable} from "../db"
import { randomBytes } from "node:crypto"
import { isMarkedAsUntransferable } from "node:worker_threads";
import z from "zod";
import { error } from "node:console";

const registerSchema = z.object({
  username: z.string().min(3, "Username is too short").max(20, "Username is too long"),
  password: z.string().min(6, "Password is too short").max(256, "Password is to long")
})
export const authorization = {
  registerPost: async (req: Request) => {
    try{
      const body = await req.json()

      const validation = registerSchema.safeParse(body)
      if (!validation.success) {
        return Response.json({
          status: "error",
          errors: z.treeifyError(validation.error)
        }, {status: 400})
      }
    

    const { username, password } = validation.data;
    const [user] = await db 
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .limit(1)

    if (user) {
      return Response.json({status: "error", message: "This user already exists"})
    }

    const token = randomBytes(32).toString('hex');
    const hashedToken = await Bun.password.hash(password, {
      algorithm: "argon2id",
      memoryCost: 65536,
      timeCost: 2
    })
    const hashedPassword = await Bun.password.hash(password, {
      algorithm: "argon2id",
      memoryCost: 65536,
      timeCost: 2
    })
    try {
      const [newUser] = await db
      .insert(usersTable)
      .values({
        username: username, 
        password: hashedPassword,
        token: hashedToken
      })
      .returning({
        id: usersTable.id,
        username: usersTable.username,
        token: usersTable.token
        
      })
      return Response.json(newUser)
    } catch (dbError: any) {
      if (dbError.code === "23505") {
        return Response.json({
          status: "error",
          message: "This username is already taken. Choose the another one"
        }, {status: 409}) //database duplicate conflict status
      }
    }

    // const {password, updatedAt, ...response} = newUser
  } catch (error){
    console.error("Fatal error due registration process");
    return Response.json({
      status: "error",
      message: "something went wrong on our side"
    }, {status: 500})
  }
  },
  testPost: async (req: Request) => {
    return Response.json({success: "that was post method"})
  }
}