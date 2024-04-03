import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
interface postobj{
	id :string,
	title:string,
	names:string,
	content:string,
	published:boolean,
	authorId:string
}
export const blogRouter=new Hono<{
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
blogRouter.use('/*',async(c,next)=>{
    const jwt=c.req.header("Authorization")|| "";
    const payload= await verify(jwt,c.env.JWT_SECRET)
	c.set("payload",payload)
    if(!payload){
        c.status(403)
        return c.json({error:"unathorization"})
    }
    c.set("userId" ,payload.id)
	c.set("name",payload? payload.name: "hello")
    await next()
})
blogRouter.get('/', async (c) => {
	const body= await c.req.json()
	const userId=c.get('userId')
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	try{
	const post = await prisma.post.findFirst({
		where: {	
			id:body.id
		}
	});

	const name=c.get("name")

	return c.json({post});
}

catch(e){
	c.status(411);
	return c.json({eorr: " blog not fond   "})
}
})

blogRouter.post('/', async(c) => {
    const userId=c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
    const body = await c.req.json();
	try{
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
}
catch(e){
	
	return c.json({error :"error whiel posting  "+e})


}
 
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
	
	const blogs = await prisma.post.findMany({
		select:{
			content:true,
			title:true,
			id:true,
			author:{
				select:{
					name:true
				}
			}
		}
	});

	return c.json({blogs});
})
