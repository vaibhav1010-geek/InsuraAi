// src/App.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Bell, BarChart, Clock, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import insuranceImg from "./assets/20943832.jpg";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar (responsive) */}
      <header className="fixed w-full bg-white shadow-sm z-50">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Left - Brand */}
          <h1 className="text-2xl font-bold text-indigo-600">InsuraAI</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 px-2 font-medium items-center">
            <a href="#features" className="hover:text-indigo-600">
              Features
            </a>
            <a href="#how" className="hover:text-indigo-600">
              How It Works
            </a>
            <a href="#testimonials" className="hover:text-indigo-600">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-indigo-600">
              Contact
            </a>

            {/* SPA Links */}
            <Link
              to="/login"
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 transition"
            >
              Signup
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-indigo-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="md:hidden bg-white border-t shadow-md"
          >
            <div className="flex flex-col items-center space-y-3 py-4 font-medium">
              <a
                href="#features"
                className="hover:text-indigo-600"
                onClick={() => setMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how"
                className="hover:text-indigo-600"
                onClick={() => setMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="hover:text-indigo-600"
                onClick={() => setMenuOpen(false)}
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="hover:text-indigo-600"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </a>

              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition w-32 text-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 transition w-32 text-center"
              >
                Signup
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Background floating gradient shapes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-10 left-[-100px] w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.8, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-10 right-[-120px] w-[500px] h-[500px] bg-purple-300 rounded-full blur-3xl opacity-30"
        />

        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-center md:text-left"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Never miss
              </span>{" "}
              your insurance renewal again.
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              InsuraAI helps you track, manage, and auto-renew your policies with 
              smart reminders, AI-powered extraction, and real-time analytics.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              {/* Converted to Link but kept the animation via wrapper */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/signup"
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium shadow-lg hover:bg-indigo-700 transition"
                >
                  Get Started Free
                </Link>
              </motion.div>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#features"
                className="px-8 py-3 border border-indigo-600 text-indigo-600 rounded-xl font-medium hover:bg-indigo-50 transition"
              >
                Learn More
              </motion.a>
            </div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="md:w-1/2 mt-12 md:mt-0 flex justify-center"
          >
            {/* Image left commented in your previous version; you can uncomment to display a local image */}
            {/* <img
              src={insuranceImg}
              alt="Insurance illustration"
              className="w-[90%] max-w-md"
            /> */}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20 px-6">
        <div className="container mx-auto text-center mb-12">
          <h3 className="text-3xl font-bold">Features</h3>
          <p className="text-gray-600 mt-2">
            Everything you need to stay on top of your policies.
          </p>
        </div>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<ShieldCheck className="w-10 h-10 text-indigo-600" />}
            title="Secure Policies"
            desc="Store and manage all your policies in one safe place."
          />
          <FeatureCard
            icon={<Bell className="w-10 h-10 text-indigo-600" />}
            title="Smart Reminders"
            desc="Get notified before your policy expires—never miss a deadline."
          />
          <FeatureCard
            icon={<Clock className="w-10 h-10 text-indigo-600" />}
            title="Auto Renewals"
            desc="Easily extend your coverage with one click."
          />
          <FeatureCard
            icon={<BarChart className="w-10 h-10 text-indigo-600" />}
            title="Analytics"
            desc="Visualize premiums, renewals, and policy history."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-20 px-6">
        <div className="container mx-auto text-center mb-12">
          <h3 className="text-3xl font-bold">How It Works</h3>
        </div>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <StepCard step="1" title="Signup" desc="Create your free InsuraAI account." />
          <StepCard step="2" title="Add Policies" desc="Upload details of your existing policies." />
          <StepCard step="3" title="Relax" desc="We’ll remind you and auto-extend when needed." />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-indigo-50 py-20 px-6">
        <div className="container mx-auto text-center mb-12">
          <h3 className="text-3xl font-bold text-indigo-700">What Our Users Say</h3>
          <p className="text-gray-600 mt-2">Real feedback from our happy customers</p>
        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            feedback="I love how everything is organized. I never miss a warranty expiry now."
            name="Sneha Nair"
            role="Designer, Kochi"
            delay={0.2}
          />
          <TestimonialCard
            feedback="InsuraAI makes managing policies effortless. The reminders save me every time!"
            name="Rahul Mehta"
            role="Engineer, Mumbai"
            delay={0.4}
          />
          <TestimonialCard
            feedback="The AI extraction is a game changer. Uploading a document and auto-filling details is pure magic."
            name="Ananya Verma"
            role="Entrepreneur, Delhi"
            delay={0.6}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-14 px-6" id="contact">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">InsuraAI</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Simplifying insurance management with AI-powered tracking, reminders, and auto-renewals.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-indigo-400">Features</a></li>
              <li><a href="#how" className="hover:text-indigo-400">How It Works</a></li>
              <li><a href="#testimonials" className="hover:text-indigo-400">Testimonials</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-indigo-400">Documentation</a></li>
              <li><a href="#" className="hover:text-indigo-400">Blog</a></li>
              <li><a href="#" className="hover:text-indigo-400">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:support@insuraai.com" className="hover:text-indigo-400">support@insuraai.com</a></li>
              <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400">Terms of Service</a></li>
            </ul>
            {/* Social icons */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-indigo-400">🐦</a>
              <a href="#" className="hover:text-indigo-400">💼</a>
              <a href="#" className="hover:text-indigo-400">📸</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="container mx-auto mt-12 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} InsuraAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

/* ---------- Helper Components ---------- */
function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow-md rounded-2xl p-6 text-center"
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </motion.div>
  );
}

function StepCard({ step, title, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-50 rounded-2xl shadow-md p-6 text-center"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-600 text-white text-xl font-bold mx-auto mb-4">
        {step}
      </div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </motion.div>
  );
}

function TestimonialCard({ feedback, name, role, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 text-left transition-all cursor-pointer"
    >
      <p className="text-gray-700 italic mb-4">“{feedback}”</p>
      <h4 className="font-semibold text-indigo-700">{name}</h4>
      <p className="text-gray-500 text-sm">{role}</p>
    </motion.div>
  );
}
