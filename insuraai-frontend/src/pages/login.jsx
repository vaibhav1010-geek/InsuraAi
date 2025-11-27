import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
// ADD signOut here
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const API_URL = import.meta.env.VITE_API_URL;

    try {
      // 1. Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // 2. CHECK EMAIL VERIFICATION
      if (!user.emailVerified) {
        await signOut(auth); // Log them out immediately
        throw new Error("Please verify your email address before logging in. Check your inbox.");
      }

      // 3. Get Token (Only if verified)
      const token = await user.getIdToken();

      // 4. Sync with Backend
      const res = await fetch(`${API_URL}/api/auth/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (res.ok) {
        localStorage.setItem("token", token);
        setMessage("success");
        setTimeout(() => {
          navigate("/Dashboard");
        }, 800);
      } else {
        setMessage("error: Backend sync failed");
      }
    } catch (error) {
      console.error(error);
      // Clean up error message
      let msg = error.message;
      if(msg.includes("auth/invalid-credential")) msg = "Invalid email or password.";
      setMessage("error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden pt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative w-full max-w-md px-6">
          <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-8 md:p-10">
            {/* ... Header ... */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black text-white mb-4 shadow-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome back</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div>
                  <input type="email" name="email" required className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg" value={formData.email} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400" /></div>
                  <input type="password" name="password" required className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg" value={formData.password} onChange={handleChange} />
                </div>
              </div>
              
              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} disabled={loading} type="submit" className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg ${loading ? "opacity-80" : ""}`}>
                {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Signing in...</> : <>Sign in <ArrowRight className="ml-2 w-4 h-4" /></>}
              </motion.button>
            </form>

            {/* Error / Success Message */}
            {message && (
              <div className={`mt-4 p-3 rounded-lg text-sm text-center font-medium ${message === "success" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                {message.replace("error: ", "")}
              </div>
            )}
            
            <div className="mt-8 text-center"><p className="text-sm text-gray-600">Don’t have an account? <a href="/signup" className="font-semibold text-indigo-600">Sign up for free</a></p></div>
          </div>
        </motion.div>
      </div>
    </>
  );
}