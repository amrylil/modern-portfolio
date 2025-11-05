"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ContactSections = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className=" text-slate-50 flex md:px-24 px-5 items-center justify-between md:mb-20 mb-5">
      <div className="container md:mx-auto">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-1/2">
            <h1 className="md:text-6xl  text-3xl mb-8">
              Contact Us<span className="text-neutral-200">.</span>
            </h1>

            <div className="flex flex-row pl-2">
              <div className="flex gap-4">
                <motion.div
                  initial={{ height: 30 }}
                  animate={{ height: 260 }}
                  transition={{ duration: 1 }}
                  className="md:w-1 bg-neutral-200 md:block hidden mt-6"
                />

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="p-8 rounded-lg shadow-lg   "
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="md:text-xl text-lg font-semibold mb-4">
                      My Address
                    </h2>
                    <p className="mb-2 text-sm">
                      Jl. Perintis Kemerdekaan 7, Tamalanrea Indah,
                    </p>
                    <p className="mb-2 text-sm">
                      Tamalanrea District, Makassar City, South Sulawesi,
                      Indonesia
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <h2 className="md:text-xl text-lg font-semibold mb-4 mt-7">
                      Contact
                    </h2>
                    <p className="mb-2 text-sm">ulilamry432@gmail.com</p>
                    <p className="mb-2 text-sm">+62 823 7839 8419</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[50%] md:px-10 px-2 py-2">
            <div className="relative md:p-10 p-6">
              {/* <h2 className="text-2xl font-semibold mb-4 -translate-y-4 absolute start-1/2 -translate-x-1/2">
                Contact Form
              </h2> */}
              <div className="p-10  shadow-lg rounded-lg border border-neutral-700">
                <form className="flex flex-col">
                  <label htmlFor="name" className="block text-sm mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="w-full  text-white p-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-200"
                    placeholder="Your name"
                    required
                  />

                  <label htmlFor="email" className="block text-sm mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full  text-white p-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-200"
                    placeholder="Email"
                    required
                  />

                  <label htmlFor="message" className="block text-sm mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full  text-white p-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-200"
                    placeholder="Message"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full bg-neutral-200 text-neutral-800 py-2 rounded-md hover:bg-neural-300 transition"
                  >
                    SEND MESSAGE
                  </button>
                </form>
              </div>

              <div className="h-20 w-20 border-t-4 border-l-4 absolute rounded-tl top-0 start-0 border-neutral-200"></div>
              <div className="h-20 w-20 border-t-4 border-r-4 absolute rounded-tl top-0 end-0 border-neutral-200"></div>
              <div className="h-20 w-20 border-b-4 border-l-4 absolute rounded-tl bottom-0 start-0 border-neutral-200"></div>
              <div className="h-20 w-20 border-b-4 border-r-4 absolute  rounded-tl bottom-0 end-0 border-neutral-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSections;
