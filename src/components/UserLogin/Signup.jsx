import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import ImageUploader from "../../components/ImageUploader";

const API_URL = "http://localhost:5005";

export default function Signup() {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const signupBody = {
      email: newUser.email,
      password: newUser.password,
      username: newUser.username,
      imageUrl: imageUrl,
    };

    console.log("signupBody is: ", signupBody);
    axios
      .post(`${API_URL}/signup`, signupBody)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  // Store all UI classes into a reusable class variable
  const fixedInputClass =
    "rounded-md appearance-none relative block w-full px-3 py-2 my-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";

  return (
    <div className="my-3">
      <form onSubmit={handleSignupSubmit}>
        {/* Username input */}
        <input
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleChange}
          id="name"
          className={fixedInputClass}
          placeholder="Username"
        />

        {/* Email input */}
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          id="email"
          className={fixedInputClass}
          placeholder="Email address"
        />

        {/* Password input */}
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
          id="password"
          className={fixedInputClass}
          placeholder="Password"
        />

        <ImageUploader
          setImageUrl={setImageUrl}
          message={"Upload a profile picture"}
        />

        <Button variant="contained" type="submit">
          Sign Up
        </Button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
