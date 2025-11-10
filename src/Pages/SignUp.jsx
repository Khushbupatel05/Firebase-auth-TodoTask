import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { signUpUser } from "../newfeature/todos/todoSlice";

const SignUp = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (input.email.trim() === "" || input.password.trim() === "") {
            toast.error("Enter all details...");
            setInput({ email: "", password: "" });
            return;
        }

        try {
            await dispatch(signUpUser({ email: input.email, password: input.password }));
            toast.success("Account created successfully!");
            setInput({ email: "", password: "" });
            navigate("/");
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            setInput({ email: "", password: "" });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-200 px-4">
            <form onSubmit={handleSubmit} className="relative w-full max-w-lg bg-white/40 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-10 sm:p-12">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
                    Create Account
                </div>

                <div className="mt-8 mb-6">
                    <label htmlFor="email" className="block mb-2 text-base font-semibold text-gray-800 uppercase">
                        Email
                    </label>
                    <input  type="email" onChange={handleChange}  value={input.email}  id="email"   className="bg-white/70 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3 shadow-sm placeholder-gray-500"  placeholder="Enter your email"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-base font-semibold text-gray-800 uppercase">
                        Password
                    </label>
                    <input  type="password" onChange={handleChange}  value={input.password} id="password"   className="bg-white/70 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3 shadow-sm placeholder-gray-500"     placeholder="Create a password" />
                </div>

                <button type="submit"    className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-semibold rounded-lg text-base px-5 py-3 transition-all duration-300 shadow-md" >
                    Sign Up
                </button>

                <p className="text-md text-center text-gray-700 mt-6">
                    Already have an account?{" "}
                    <a
                        href="/sign-in"
                        className="font-semibold text-indigo-600 hover:underline" >
                        Sign In
                    </a>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
