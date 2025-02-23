import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { verifyToken } from '../utils/jwt.js';


const prisma = new PrismaClient();



export const authMiddleware = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
  
      const decoded = verifyToken(token);
  
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true
        }
      });
  
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
  
 export const adminMiddleware = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
  
      const decoded = verifyToken(token);
  
      const user = await prisma.user.findUnique({
        where: { 
          id: decoded.userId,
          role: 'ADMIN'
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true
        }
      });
  
      if (!user) {
        return res.status(403).json({ message: 'Access denied: Admin only' });
      }
  
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
