import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { blogInput} from "@vinay100xdev/blog-common"
export const blogRouter=new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables:{
        userId:string        
    }
}>()
blogRouter.use('/*',async(c,next)=>{
    const jwt=c.req.header("Authorization")|| "";
    const payload= await verify(jwt,c.env.JWT_SECRET)
    if(!payload){
        c.status(403)
        return c.json({error:"unathorization"})
    }
            
    
    c.set("userId" ,payload.id)
    await next()
})
blogRouter.get('/', async (c) => {
	const body= await c.req.json()
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findFirst({
		where: {
			id:body.id
		}
	});
    

	return c.json({post});
})

blogRouter.post('/', async(c) => {
    const userId=c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
    const body = await c.req.json();
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
    return c.json({
        id:post.id
        
    })
})

blogRouter.put('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    const userId=c.get('userId')
    const body= await c.req.json()
    await prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post')
})
blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const blogs = await prisma.post.findMany({});

	return c.json({blogs});
})
