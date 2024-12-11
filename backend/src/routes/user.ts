import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign, verify} from 'hono/jwt'
import { signinInput, signupInput } from '@niks-sharma/medium-project-common';
import cloudinary from '../cloudinaryConfig';
import formidable from 'formidable';

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

    UserRouter.get('/me', async (c) => {
        const authHeader = c.req.header("authorization") || "";
        
        if (!authHeader.startsWith("Bearer ")) {
            c.status(403);
            return c.json({ message: "Missing or invalid authorization header" });
        }
    
        const token = authHeader.split(" ")[1];
    
        try {
            const decoded = await verify(token, c.env.JWT_SECRET);
    
            if (!decoded?.id) {
                c.status(403);
                return c.json({ message: "Invalid token payload" });
            }
    
            const prisma = new PrismaClient({
                datasourceUrl: c.env?.DATABASE_URL,
            }).$extends(withAccelerate());
    
            const user = await prisma.user.findUnique({
                where: { id: String(decoded.id) },
            });
    
            if (!user) {
                c.status(404);
                return c.json({ message: "User not found" });
            }
    
            // Fetch the blogs written by the user
            const posts = await prisma.post.findMany({
                where: { authorId: user.id },
            });
    
            return c.json({
                id: user.id,
                name: user.name,
                email: user.email,
                posts: posts.map(post => ({
                    id: post.id,
                    title: post.title,
                    content: post.content,
                })),
            });
        } catch (e) {
            c.status(403);
            return c.json({ message: "Invalid or expired token" });
        }
    });

    UserRouter.put('/edit', async (c) => {
      const authHeader = c.req.header("authorization") || "";
    
      if (!authHeader.startsWith("Bearer ")) {
        c.status(403);
        return c.json({ message: "Missing or invalid authorization header" });
      }
    
      const token = authHeader.split(" ")[1];
    
      try {
        const decoded = await verify(token, c.env.JWT_SECRET);
    
        if (!decoded?.id) {
          c.status(403);
          return c.json({ message: "Invalid token payload" });
        }
    
        const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
    
        const user = await prisma.user.findUnique({
          where: { id: String(decoded.id) },
        });
    
        if (!user) {
          c.status(404);
          return c.json({ message: "User not found" });
        }
    
        // Parse the form data using parseBody
        const body = await c.req.parseBody();
        const { name, username } = body;
        let imageUrl = user.userImageUrl; // Retain existing image if not changed
    
        // If an image file is uploaded
        if (body['image']) {
          const file = Array.isArray(body['image']) ? body['image'][0] : body['image'];

          
          try {
            const uploadResponse = await cloudinary.uploader.upload(file.filepath, {
              folder: 'user_avatars',
            });
            imageUrl = uploadResponse.secure_url; // Update image URL
          } catch (uploadError) {
            c.status(500);
            return c.json({ message: "Failed to upload image to Cloudinary" });
          }
        }
    
        const normalizeField = (field: string | string[] | null | File): string | null => {
            if (field instanceof File) {
        return field.name || ""; // You may want to store the filepath of the file
      }
          if (Array.isArray(field)) return field[0]; // Use the first value if it's an array
          return field; // Return as-is if it's a string or null
        };
    
        const nameNormalized = normalizeField(name || '');
    
        // Update user details in the database
        const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: {
            name: nameNormalized || user.name,
            // username: username || user.username, // Uncomment if username is part of the update
            userImageUrl: imageUrl,
          },
        });
    
        return c.json({
          id: updatedUser.id,
          name: updatedUser.name,
          // username: updatedUser.username, // Uncomment if you update the username
          image: updatedUser.userImageUrl,
          message: "User profile updated successfully",
        });
      } catch (e) {
        c.status(403);
        return c.json({ message: "Invalid or expired token" });
      }
    });
    
    
    