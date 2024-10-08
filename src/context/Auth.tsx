import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from "axios"

interface User {
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (tokens: Tokens) => void;
  logout: () => Promise<void>;
}

interface Tokens {
  accessToken: string ;
  refreshToken: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

  const localStorageToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      return JSON.parse(atob(token.split(".")[1]))
    }

    return null
  }

  const token = localStorageToken();
  
  const [user, setUser] = useState<User | null>(token);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken: any = JSON.parse(atob(token.split(".")[1]));
      setUser(decodedToken);
    }
  }, []);

  const login = (tokens: Tokens) => {
    const decodedToken: any = JSON.parse(atob(tokens.accessToken.split('.')[1]));
    setUser(decodedToken);
    localStorage.setItem('token', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken)
  };

  const logout = async () => {
    setUser(null);
    const accessToken = localStorage.getItem("token")
    await axios.post(`http://65.18.112.78:44010/rems/api/v1/SignOut?accessToken=${accessToken}`, {accessToken})
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider 
      value={{
        user, login, logout
        }}
      >
        {children}

    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context;
}
