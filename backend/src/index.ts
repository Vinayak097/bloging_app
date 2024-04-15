import { Hono } from 'hono'
import { userRouter } from '../routes/user';
import { cors } from 'hono/cors';
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
app.use('/*',cors())
app.route('/api/v1/user', userRouter)
app.route('api/v1/blog',blogRouter)


export default app



