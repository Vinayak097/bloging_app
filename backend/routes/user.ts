import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
//import {signupInput} from '../../common/dist/'

import { object } from "zod";
import zod from 'zod'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();
const  zodsignupInput=zod.object({
    email:zod.string().email(),
    name:zod.string().nonempty(),
    password:zod.string().min(6)

})
const zodsignininput=zod.object({
    email:zod.string().email(),
    password:zod.string().min(6)
})
userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    
    const access =zodsignupInput.safeParse(body);
    console.log("acceses :" ,access)
    if(access.success){
       
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    

    const exist=await prisma.user.findFirst({
        where:{
            email:body.email
        }
    })  
    if(exist){
        return c.json({msg:"user email alerady exist"})
    }
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name:body.username
      }
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({
      jwt: token
    })
}
c.status(411)
return c.json("invlaid inputs")
})
  
userRouter.post('/signin', async (c) => {
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
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
    password: body.password
        }
    });  
    if (!user) {
        c.status(411);
       return c.json({msg:"usser not found"})
    }


    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });

})
