import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { Hono } from "hono";
import { sign } from "hono/jwt";
//import {signupInput} from '../../common/dist/'


import zod from 'zod'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();
const  zodsignupInput=zod.object({
    email:zod.string().email('mail not valid'),
    name:zod.string().min(1),
    password:zod.string().min(6,"invalide length")

})
const zodsignininput=zod.object({
    email:zod.string().email("email not valide"),
    password:zod.string().min(6)
})

userRouter.post('/signup', async (c) => {
    const body= await c.req.json();
    const access=zodsignupInput.safeParse(body)
    if(!body.email||!body.name||!body.password){
        c.status(411);
        return c.json({msg:"please fill credentials"})
    }
    console.log("access g: ")
    if(!access.success){
        c.status(411)
        return c.json({msg:"invalid inputs "})
    }
    try{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      const usert=await prisma.user.findFirst({
        where:{
            email:body.email
        }
      })
      if(usert){
        c.status(403)
        return c.json({msg:"user alerady exist"})
      }
      const user=await prisma.user.create({
        data:{
            email:body.email,
            name:body.username,
            password:body.password
        }
      })
      const jwt= await sign({id:user.id},c.env.JWT_SECRET);
      c.status(200)
      return c.json({jwt})
  
    }
    catch(e){
    c.status(411)
    return c.json({msg:e})
    }
})
  
userRouter.post('/signin', async (c) => {
    console.log("enter in signin")
    const prisma = new PrismaClient({
    
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const success=zodsignininput.safeParse(body);
    console.log(success)
if(!success.success){
    c.status(411)
    return c.json({msg:"invlid inputs"})
}
const user=await prisma.user.findFirst({
    where:{
        email:body.email,
        
    }
  })
    if (!user) {
        c.status(404);
       return c.json({msg:"usser not found"})
    }
    if(user.password!=body.password){
        c.status(411);
        return c.json({msg:"incorrect password"})
    }


    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });

})
