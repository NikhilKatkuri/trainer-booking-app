import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { LoginData, SignUpData } from "../types/auth.type";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserDataType {
  token: string;
  name: string;
  email: string;
  password: string;
  userId: string;
  role: string;
  maxAge: number;
}

interface AuthContextType {
  isAuthenticated: undefined | boolean;
  setIsAuthenticated: (val: boolean | undefined) => void;
  waiter: boolean;
  setWaiter: React.Dispatch<React.SetStateAction<boolean>>;
  loginData: LoginData;
  setLoginData: React.Dispatch<React.SetStateAction<LoginData>>;
  SignUPData: SignUpData;
  setSignUPData: React.Dispatch<React.SetStateAction<SignUpData>>;
  handleSignUp: () => Promise<void>;
  handleLogin: () => Promise<void>;
  userData: UserDataType | null; 
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const backendUrl: string = `${process.env.EXPO_PUBLIC_BACKEND_BASEURL}/api`;
const StorageKey = "__Data__User";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );
  const [waiter, setWaiter] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [SignUPData, setSignUPData] = useState<SignUpData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [userData, setUserData] = useState<UserDataType | null>(null);
  useEffect(() => {
    async function update() {
      const userData = await AsyncStorage.getItem(StorageKey);
      if (userData === null || userData === undefined) {
        setIsAuthenticated(false);
        return;
      }
      if (userData) {
        try {
          setUserData(JSON.parse(userData));
          const now = new Date().getTime();
          const exp = JSON.parse(userData).maxAge;
          if (now >= exp) {
            setIsAuthenticated(false);
            AsyncStorage.removeItem(StorageKey);
          } else {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.log(error);
          setIsAuthenticated(false);
        }
      }
    }
    update();
  }, []);

  const handleSignUp = async () => {
    setWaiter(true);
    try {
      if (
        !SignUPData.email ||
        !SignUPData.name ||
        !SignUPData.password ||
        !SignUPData.confirmPassword
      ) {
        alert("Please fill all the fields");
        setWaiter(false);
        return;
      }
      if (SignUPData.password !== SignUPData.confirmPassword) {
        alert("Passwords do not match");
        setWaiter(false);
        return;
      }
      if (SignUPData.password.length < 6) {
        alert("Password must be at least 6 characters");
        setWaiter(false);
        return;
      }

      if (
        !SignUPData.email.includes("@") ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(SignUPData.email)
      ) {
        alert("Please enter a valid email");
        setWaiter(false);
        return;
      }
      const url = `${backendUrl}/auth/register`;
      const data = {
        name: SignUPData.name,
        email: SignUPData.email,
        password: SignUPData.password,
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        setIsAuthenticated(false);
        alert(result.message);
        setWaiter(false);
        return;
      }
      try {
        await AsyncStorage.setItem(StorageKey, JSON.stringify(result));
        alert("User registered successfully");
        setUserData(result);
        setIsAuthenticated(true);
        setLoginData({ email: "", password: "" });
        setSignUPData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        setWaiter(false);
        console.log(error);
      }
    } catch (error) {
      setWaiter(false);
      console.log(error);
    } finally {
      setWaiter(false);
    }
  };

  const handleLogin = async () => {
    setWaiter(true);
    try {
      if (!loginData.email || !loginData.password) {
        alert("Please fill all the fields");
        setWaiter(false);
        return;
      }
      if (
        !loginData.email.includes("@") ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)
      ) {
        alert("Please enter a valid email");
        setWaiter(false);
        return;
      }
      if (loginData.password.length < 6) {
        alert("Password must be at least 6 characters");
        setWaiter(false);
        return;
      }
      const url = `${backendUrl}/auth/login`;
      const data = {
        email: loginData.email,
        password: loginData.password,
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        try {
          AsyncStorage.setItem(StorageKey, JSON.stringify(result));
          alert("Login successful");
        } catch (error) {
          console.log(error);
        }
        setIsAuthenticated(true);
        setUserData(result);
        setLoginData({ email: "", password: "" });
        setSignUPData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setWaiter(false);
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setWaiter(false);
    }
  };

  const handleLogout=async ()=>{
    try {
      await AsyncStorage.removeItem(StorageKey);
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loginData,
        setLoginData,
        SignUPData,
        setSignUPData,
        handleSignUp,
        waiter,
        setWaiter,
        handleLogin,
        userData,
        handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
