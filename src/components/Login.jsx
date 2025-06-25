import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {BeatLoader} from "react-spinners";
import Error from "./Error"
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useFetch from "../hooks/useFetch"
import { login } from "../db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "../context";

function Login() {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  
  
  const {data, error, loading, fn: fnLogin} = useFetch(login);
  const {fetchUser} = UrlState();

  useEffect(()=>{
    if (error === null && data){
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [data, error])

  const handleLogin = async () =>{
    setErrors([])
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      })
      await schema.validate({ email, password }, { abortEarly: false });
      
      // Pass the email and password as arguments to fnLogin
      await fnLogin({ email, password });
    } catch (e) {
      const newErrors = {}
      if (e.inner) {
        // Yup validation errors
        e.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Login error:", e);
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>to your account if you already have one</CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <Error message={errors.email} />}
        </div>

        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <Error message={errors.password} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin} disabled={loading} className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 sm:px-6 py-2.5 text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25">
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Login