import { Hono } from 'hono'
import { userRouter } from '../routes/user';
import signupInput from '@vinay100xdev/blog-common';
import { blogRouter } from '../routes/blog';

export const app = new Hono<{
  Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
	  
  }
  Variables:{
	userId:string
  }
}>();

app.route('/api/v1/user', userRouter)
app.route('api/v1/blog',blogRouter)
// app.route('/api/v1/blog/*', async (c, next) => {
	
// 	const jwt = c.req.header('Authorization');
// 	if (!jwt) {
// 		c.status(401);
// 		return c.json({ error: "unauthorized" });
// 	}
// 	const token = jwt.split(' ')[1];
// 	const payload = await verify(token, c.env.JWT_SECRET);
// 	if (!payload) {
// 		c.status(401);
// 		return c.json({ error: "unauthorized" });
// 	}
// 	c.set('userId', payload.id);
// 	 next()
// })


export default app



