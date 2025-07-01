'use client'

import { useState } from "react";
import { Mail,Lock } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider,GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

import { auth } from "../../../lib/firebase";

export default function LoginPage() {
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        router.push('dashboard');
    };

     const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth,provider );
            const user = result.user;
            console.log("Success",user.displayName,user.email);
            router.push('/dashboard');
        } catch (error: any ) {
            console.error("Failed",error.message);
            alert(error.message);
        }
    }

    const handleGitHubLogin = async () => {
        const provider = new GithubAuthProvider();
        try {
            const result = await signInWithPopup(auth,provider);
            const user = result.user;
            console.log("Success",user);
            router.push('/dashboard')
        } catch (error){
            console.error("Github login failer",error);
        }
    }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <form 
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
        >
            <div className="flex justify-center mb-4">
                <div className="size-12 rounded-full bg-radial from-red-400 from-40% to-red-700 flex items-center justify-center">
                  
                  G

                </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome to Gighub</h1>
            <p className="text-sm text-gray-500">Please enter your details to sign in.</p>

                <div className="flex items-center gap-2 border rounded-md bg-white px-3 py-2 mb-4">
                <Mail className="text-gray-400 " size={20} />  
                    <input
                    type="email"
                     placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 text-gray-500 placeholder-gray-400 bg-transparent outline-none"
                    required
                     />
                </div>
                <div className="flex items-center gap-2 border rounded-md bg-white px-3 py-2 mb-4">
                <Lock className="text-gray-400 " size={20} />
                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 text-gray-500 placeholder-gray-400 bg-transparent outline-none"
                    required
                    />
            </div>

            <div className="flex justiy-end mb-4">
                <a href="#" className="text-sm text-blue-600 hover:underline">

                    Forgot Password?
                </a>
            </div>

             
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition mb-6"  
            >
                Login
            </button> 




            <div className="flex items-center justify-center mb-6">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="px-4 text-sm text-gray-500">or</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
            </div>



            <div className="flex flex-wrap justify-center gap-3 mb-6">
                        <button 
                        type="button"
                        onClick={handleGitHubLogin}
                        className="p-2 border rounded-lg hover:bg-gray-100 transition">
                        <img src="https://cdn.simpleicons.org/github" alt="Github" className="h-5 w-5" />
                        </button>
                        <button 
                        type="button"
                        onClick={handleGoogleLogin}
                        className="p-2 border rounded-lg hover:bg-gray-100 transition"
                        
                        >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
                        </button>
                </div>

            <p className="text-center text-sm text-gray-500 mt-6">
                Don't have an account? {" "}
                <a href ="/register" className="text-blue-600 hover:underline" title="register">
                Sign Up
                
                </a>


            </p> 
        </form>
    </main>
  );
}
