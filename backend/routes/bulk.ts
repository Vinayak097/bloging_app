import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";


export const bulkRouter   =new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables:{
        userId:string,
		name:string |"hello"  ,
		payload:object      
    }
}>()
bulkRouter.get('/bulk',async(c)=>{
    const prisma =new PrismaClient({
		datasourceUrl:c.env.DATABASE_URL,
	}).$extends(withAccelerate())

    const blogs=await prisma.post.findMany({
        select:{
			title:true,
			content:true,
			id:true,
			author:{
				select:{
					name:true
				}
			}
		}
    })

    return c.json(blogs)
    
})
bulkRouter.get('/',(c)=>{
    return c.json("home bulk")
})




	// const userWithPosts = await prisma.user.findUnique({
	//   where: { id: userId },
	//   include: {
	// 	posts: true,
	//   },
	// });
  







