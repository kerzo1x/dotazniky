import {db, usersTable} from "./db"
import { authorization, } from './auth';
import { quest } from './questionnaire';
import { eq } from 'drizzle-orm';


async function getAuthenticatedUser(req:Request) {
  const authHeader = req.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Authorisation header is missing or is invalid")
  }
  const token = authHeader.substring(7)

  const [user] = await db 
  .select()
  .from(usersTable)
  .where(eq(usersTable.token , token))
  .limit(1)

  if (!user) {
    throw new Error("Unauthorized")
  }

  return user
}

const server = Bun.serve({
  port:3000,
  maxRequestBodySize: 1024 * 1024,
  routes: {

    // test route
    "/register": {
      POST: (req) => authorization.registerPost(req),
    },
  },

  fetch(req) {
      return new Response("Not Found", { status: 404 });
  }
});

console.log(`>> Server running at: ${server.url}`);