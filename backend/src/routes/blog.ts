import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign, verify} from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@niks-sharma/medium-project-common';

export const BlogRouter = new Hono<{
    Bindings:{
      DATABASE_URL: string,
      JWT_SECRET: string,
    },
    Variables:{
      userId: string
    }
  }>();

  BlogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", String(user.id));
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch(e) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
});
  
  
  
  BlogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success){
       c.status(403);
       return c.json({
           "error":"Invalid input"
       }) 
    }
    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate())

     const post= await prisma.post.create({
        data: {
          title: body.title,
          content: body.content,
          authorId: userId,
          publishedDate: new Date(),
        }
      }) 
    return c.json({
        id:post.id
    })
  })
  
  BlogRouter.put('/', async(c) => {
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
        c.status(403);
        return c.json({
            "error":"Invalid input"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate())

     const post =  await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
          title: body.title,
          content: body.content,
        }
      })
      
    return c.json({
        id:post.id
    })
  })

  //   SHOULD ADD PAGINATION 
  BlogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate())
      const posts = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });
      return c.json({
          posts
      })
  })

  
  BlogRouter.get('/:id', async(c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate())

      try {
        
        const post = await prisma.post.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
               author: {
                    select: {
                        name: true
                    }
               }
            }
        })
           
         return c.json({
             post
         })
         console.log(post)
      } catch (error) {
        c.status(411);
        return c.json({
          error:"Post not found"
        })
      }

  })
  

  