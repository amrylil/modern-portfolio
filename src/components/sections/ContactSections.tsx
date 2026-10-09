"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ContactSections = () => {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setResponseMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setResponseMsg(data.message || "Thank you! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setResponseMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (!mounted) return null;

  return (
    <div
      id="contact"
      className="text-neutral-900 dark:text-slate-50 flex px-4 sm:px-8 md:px-12 lg:px-20 items-center justify-between md:mb-20 mb-5"
    >
      <div className="max-w-7xl md:mx-auto w-full">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-1/2">
            <h1 className="md:text-6xl text-3xl mb-8 font-bold text-neutral-900 dark:text-white">
              Contact Us<span className="text-blue-600 dark:text-blue-400">.</span>
            </h1>

            <div className="flex flex-row pl-2">
              <div className="flex gap-4">
                <motion.div
                  initial={{ height: 30 }}
                  animate={{ height: 260 }}
                  transition={{ duration: 1 }}
                  className="md:w-1 bg-neutral-300 dark:bg-neutral-200 md:block hidden mt-6"
                />

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="p-8 rounded-lg shadow-sm dark:shadow-lg border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-transparent backdrop-blur-xs"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="md:text-xl text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
                      My Address
                    </h2>
                    <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-300">
                      Jl. Perintis Kemerdekaan 7, Tamalanrea Indah,
                    </p>
                    <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-300">
                      Tamalanrea District, Makassar City, South Sulawesi,
                      Indonesia
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <h2 className="md:text-xl text-lg font-semibold mb-4 mt-7 text-neutral-900 dark:text-white">
                      Contact
                    </h2>
                    <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-300">ulilamry432@gmail.com</p>
                    <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-300">+62 823 7839 8419</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[50%] md:px-10 px-2 py-2">
            <div className="relative md:p-10 p-6">
              <div className="p-10 shadow-lg rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white/90 dark:bg-neutral-950/60 backdrop-blur-xs">
                {status === "success" && (
                  <div className="mb-4 p-3 rounded-md bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-sm">
                    {responseMsg}
                  </div>
                )}
                {status === "error" && (
                  <div className="mb-4 p-3 rounded-md bg-red-950/80 border border-red-500/50 text-red-300 text-sm">
                    {responseMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col">
                  <label htmlFor="name" className="block text-sm mb-2 text-neutral-700 dark:text-neutral-300 font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-neutral-900 dark:text-white p-2.5 mb-4 rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                    placeholder="Your name"
                    required
                  />

                  <label htmlFor="email" className="block text-sm mb-2 text-neutral-700 dark:text-neutral-300 font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-neutral-900 dark:text-white p-2.5 mb-4 rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                    placeholder="Email"
                    required
                  />

                  <label htmlFor="message" className="block text-sm mb-2 text-neutral-700 dark:text-neutral-300 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-neutral-900 dark:text-white p-2.5 mb-4 rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                    placeholder="Message"
                    required
                  />

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-800 dark:hover:bg-neutral-300 font-semibold py-2.5 rounded-md disabled:opacity-50 transition cursor-pointer shadow-sm"
                  >
                    {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
                  </button>
                </form>
              </div>

              <div className="h-20 w-20 border-t-4 border-l-4 absolute rounded-tl top-0 start-0 border-neutral-400 dark:border-neutral-200"></div>
              <div className="h-20 w-20 border-t-4 border-r-4 absolute rounded-tl top-0 end-0 border-neutral-400 dark:border-neutral-200"></div>
              <div className="h-20 w-20 border-b-4 border-l-4 absolute rounded-tl bottom-0 start-0 border-neutral-400 dark:border-neutral-200"></div>
              <div className="h-20 w-20 border-b-4 border-r-4 absolute rounded-tl bottom-0 end-0 border-neutral-400 dark:border-neutral-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSections;
