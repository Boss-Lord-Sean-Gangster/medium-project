import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign, verify} from 'hono/jwt'
import { signinInput, signupInput } from '@niks-sharma/medium-project-common';

export const UserRouter = new Hono<{
    Bindings:{
      DATABASE_URL: string,
      JWT_SECRET: string,
    }
  }>();

UserRouter.post('/signup', async (c) => {
    const body = await c.req.json()
    const {success} = signupInput.safeParse(body);
    if(!success){
        c.status(403);
        return c.json({
            error:"Invalid input"
        })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name
        }
      });
    const token = await sign({id:user.id}, c.env.JWT_SECRET)
    
    return c.text(token);
    }catch(e) {
      c.status(403);
      return c.json({ error: "error while signing up" });
    }
    })
    
    UserRouter.post('/signin', async(c) => {
        const body = await c.req.json();
        const {success} = signinInput.safeParse(body);
        if(!success){
            c.status(403);
            return c.json({
                error:"Invalid input"
            })
        }
      const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate())
      const user = await prisma.user.findUnique({
        where:{
          email: body.email,
          password:body.password
        }
      });
      if(!user){
        c.status(403);
        return c.json({
          error:"User not found"
        })
      }
      const jwt = await sign({id:user.id}, c.env.JWT_SECRET);
      return c.text(jwt);
      
    })