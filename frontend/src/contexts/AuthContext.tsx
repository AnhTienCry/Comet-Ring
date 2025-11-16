import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Set token in axios headers
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      verifyToken();
    } else {
      setLoading(false);
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      const response = await api.get('/auth/verify');
      // Backend may not mark the seeded admin user as 'admin'. If the email
      // matches our admin address, force the role locally so ProtectedRoute
      // allows access. Prefer fixing this on the backend for production.
      const serverUser = response.data.user;
      const resolvedUser = {
        ...serverUser,
        role: serverUser?.role === 'admin' || serverUser?.email === 'admin@cometring.com' ? 'admin' : serverUser?.role
      };
      setUser(resolvedUser);
    } catch (error) {
      console.error('Token verification failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token: newToken, user: userData } = response.data;
      
      setToken(newToken);
      const resolvedUser = {
        ...userData,
        role: userData?.role === 'admin' || email === 'admin@cometring.com' ? 'admin' : userData?.role
      };
      setUser(resolvedUser);
      localStorage.setItem('token', newToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

      // Redirect based on role
      // If backend marks user as admin OR the login email is the admin email,
      // send them to the admin dashboard.
      if (userData.role === 'admin' || email === 'admin@cometring.com') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Đăng nhập thất bại');
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await api.post('/auth/register', { email, password, name });
      const { token: newToken, user: userData } = response.data;
      
      setToken(newToken);
      const resolvedUser = {
        ...userData,
        role: userData?.role === 'admin' || email === 'admin@cometring.com' ? 'admin' : userData?.role
      };
      setUser(resolvedUser);
      localStorage.setItem('token', newToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

      // Redirect based on role
      if (userData.role === 'admin' || email === 'admin@cometring.com') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Đăng ký thất bại');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

