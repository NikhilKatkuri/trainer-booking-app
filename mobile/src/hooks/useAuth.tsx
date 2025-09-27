"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { LoginData, SignUpData } from "../types/auth.type";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  isAuthenticated: undefined | boolean;
  setIsAuthenticated: (val: boolean | undefined) => void;
  loginData: LoginData;
  setLoginData: React.Dispatch<React.SetStateAction<LoginData>>;
  SignUPData: SignUpData;
  setSignUPData: React.Dispatch<React.SetStateAction<SignUpData>>;
  handleSignUp: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const backendUrl: string = `${process.env.EXPO_PUBLIC_BACKEND_BASEURL}/api`;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );
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
  useEffect(() => {
    async function update() {
      const token = await AsyncStorage.getItem("token");
      if (token === null || token === undefined) {
        setIsAuthenticated(false);
      }
      if (token) {
        setIsAuthenticated(true);
      }
    }
    (async () => {
      await update();
    })();
  }, [isAuthenticated]);

  const handleSignUp = async () => {
    try {
      if (
        !SignUPData.email ||
        !SignUPData.name ||
        !SignUPData.password ||
        !SignUPData.confirmPassword
      ) {
        alert("Please fill all the fields");
        return;
      }
      if (SignUPData.password !== SignUPData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      if (SignUPData.password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }

      if (
        !SignUPData.email.includes("@") &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(SignUPData.email)
      ) {
        alert("Please enter a valid email");
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
      AsyncStorage.setItem("token", result.token);
      alert("User registered successfully");
      setIsAuthenticated(true);
      setLoginData({ email: "", password: "" });
      setSignUPData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      console.log(error);
    }
  };

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
