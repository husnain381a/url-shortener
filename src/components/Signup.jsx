import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import * as Yup from "yup";
import useFetch from "../hooks/useFetch";
import { signup } from "../db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "../context";

function Signup() {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const { data, error, loading, fn: fnSignup } = useFetch(signup);

  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [error, data]);

  const handleSignup = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profilepic: Yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(
        { name, email, password, profilepic: img },
        { abortEarly: false }
      );

      // Pass the signup data as arguments to fnSignup
      await fnSignup({
        email,
        password,
        name,
        profilepic: img,
      });
    } catch (e) {
      if (e.inner) {
        const newErrors = {};
        e.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Signup error:", e);
      }
    }
  };

  // Image Preview
const handleImageChange = (e) => {
  const file = e.target.files[0];
  setImg(file);
  if (file) {
    setImgPreview(URL.createObjectURL(file));
  } else {
    setImgPreview(null);
  }
};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Create a new account if you haven&rsquo;t already
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <Error message={errors.name} />}
        </div>

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

        <div className="space-y-1">
           <p className="text-sm font-medium text-gray-300">Add your profile pic</p>
          <Input
            name="profilepic"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {errors.profilepic && <Error message={errors.profilepic} />}
          {imgPreview && (
            <img
              src={imgPreview}
              alt="Preview"
              className="w-20 h-20 rounded-lg object-cover border mt-2"
            />
          )}
        </div>

      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup} disabled={loading} className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 sm:px-6 py-2.5 text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25">
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Create Account"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Signup;