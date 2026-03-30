import { eq } from "drizzle-orm";
import { db, } from "../db";

export const quest = {
    testGet: async (req: Request) => {
        const url = new URL(req.url)
        const id = url.searchParams.get("id")
        
        
    }
}