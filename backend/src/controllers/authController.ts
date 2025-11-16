import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import User, { type UserDocument } from '../models/User';
import env from '../config/env';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    name?: string;
  };
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
      return;
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'Email đã được sử dụng' });
      return;
    }

    // Create user
    const user = new User({
      email,
      password,
      name,
      role: email === 'admin@cometring.com' ? 'admin' : 'user'
    });

    await user.save();

    // Generate token
    const userId = (user as any)._id?.toString() || (user as any).id || '';
    const token = (sign as unknown as any)(
      { id: userId, email: user.email, role: user.role },
      env.jwtSecret as unknown as any,
      { expiresIn: env.jwtExpiresIn }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Lỗi đăng ký. Vui lòng thử lại.' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Vui lòng nhập email và mật khẩu' });
      return;
    }

    // Find user
    const user = (await User.findOne({ email })) as UserDocument | null;
    if (!user) {
      res.status(401).json({ error: 'Email hoặc mật khẩu không đúng' });
      return;
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ error: 'Email hoặc mật khẩu không đúng' });
      return;
    }

    // Generate token
    const userId = (user as any)._id?.toString() || (user as any).id || '';
    const token = (sign as unknown as any)(
      { id: userId, email: user.email, role: user.role },
      env.jwtSecret as unknown as any,
      { expiresIn: env.jwtExpiresIn }
    );

    res.json({
      token,
      user: {
        id: userId,
        email: user.email,
        name: (user as UserDocument).name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Lỗi đăng nhập. Vui lòng thử lại.' });
  }
};

export const verifyToken = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Chưa xác thực' });
      return;
    }

    res.json({
      user: {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name ?? '',
        role: req.user.role
      }
    });
  } catch (error) {
    console.error('Verify token error:', error);
    res.status(401).json({ error: 'Token không hợp lệ' });
  }
};

