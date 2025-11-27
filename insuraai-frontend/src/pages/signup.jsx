import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
// ADD sendEmailVerification HERE
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // 1. Create User in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // 2. Update Display Name
      await updateProfile(user, { displayName: formData.name });

      // 3. SEND VERIFICATION EMAIL (Crucial Step)
      await sendEmailVerification(user);

      // 4. Sync with MongoDB Backend
      const token = await user.getIdToken();
      const API_URL = import.meta.env.VITE_API_URL;
      
      const res = await fetch(`${API_URL}/api/auth/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, name: formData.name }),
      });

      if (res.ok) {
        // Update message to inform user about email
        setMessage("verification_sent");
        // Optional: Redirect to login after a longer delay
        setTimeout(() => {
          window.location.href = "/login";
        }, 5000);
      } else {
        const data = await res.json();
        throw new Error(data.error || "Backend sync failed");
      }

    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        setMessage("error: Email already exists");
      } else {
        setMessage("error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden pt-20">
        {/* ... Background divs ... */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative w-full max-w-md px-6">
          <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-8 md:p-10">
            
            {/* ... Header and Inputs remain the same ... */}
            <form onSubmit={handleSubmit} className="space-y-5">
               {/* Keep your inputs for Name, Email, Password here exactly as they were */}
               <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
                  <input type="text" name="name" required className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg" placeholder="John Doe" value={formData.name} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div>
                   <input type="email" name="email" required className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg" placeholder="name@company.com" value={formData.email} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400" /></div>
                   <input type="password" name="password" required className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg" placeholder="••••••••" value={formData.password} onChange={handleChange} />
                </div>
              </div>

              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} disabled={loading} type="submit" className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg ${loading ? "opacity-80 cursor-not-allowed" : ""}`}>
                {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Creating account...</> : <>Sign Up <ArrowRight className="ml-2 w-4 h-4" /></>}
              </motion.button>
            </form>

            {/* Custom Success Message for Email Verification */}
            {message && (
               <div className={`mt-4 p-3 rounded-lg text-sm text-center font-medium ${
                 message === "verification_sent"
                   ? "bg-green-50 text-green-700 border border-green-200"
                   : "bg-red-50 text-red-700 border border-red-200"
               }`}>
                 {message === "verification_sent" 
                    ? "Account created! Please check your email to verify before logging in." 
                    : message}
               </div>
            )}
            
            <div className="mt-8 text-center"><p className="text-sm text-gray-600">Already have an account? <a href="/login" className="font-semibold text-indigo-600">Log in</a></p></div>
          </div>
        </motion.div>
      </div>
    </>
  );
}