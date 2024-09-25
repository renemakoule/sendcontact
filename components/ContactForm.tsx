"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Component() {
  const [contact, setContact] = useState("");
  const [isPhone, setIsPhone] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      // Randomly decide if the submission was successful
      const success = Math.random() > 0.5;
      setIsSuccess(success);
      setShowMessage(true);
      if (success) {
        setContact("");
      }
    }, 1000);
  };

  const closeMessage = () => {
    setShowMessage(false);
  };

  const handleContactChange = (value: string) => {
    setContact(value);
  };

  const toggleInputType = () => {
    setIsPhone(!isPhone);
    setContact(""); // Reset input when toggling
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-2xl shadow-lg mb-14"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-90" />
          <div className="relative p-8">
            <h2 className="text-3xl font-semibold text-white mb-6">Contact</h2>
            <div className="mb-4">
              <label
                className="text-white mb-2 block"
                htmlFor={isPhone ? "phone" : "email"}
              >
                {isPhone ? "Phone Number" : "Email address"}
              </label>

              {isPhone ? (
                <PhoneInput
                  country={"us"}
                  value={contact}
                  onChange={handleContactChange}
                  inputProps={{
                    id: "phone",
                    required: true,
                    className:
                      "w-[90%] px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 ml-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-200",
                  }}
                  containerClass="w-full rounded-lg"
                  buttonClass="bg-opacity-20 bg-white rounded-lg hover:bg-opacity-30 transition-colors duration-200"
                  dropdownClass="bg-white text-gray-800 rounded-lg"
                />
              ) : (
                <input
                  type="email"
                  id="email"
                  value={contact}
                  onChange={(e) => handleContactChange(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-200"
                  required
                />
              )}

              <button
                type="button"
                onClick={toggleInputType}
                className="mt-4 text-sm text-blue-100 underline cursor-pointer hover:text-blue-200 transition-colors duration-200"
              >
                {isPhone ? "Use an email instead" : "Use a phone number"}
              </button>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex w-full bg-white text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 items-center justify-center"
              type="submit"
            >
              Send
              <motion.div
                className=""
                whileHover={{
                  y: [0, -5, 0], // Makes the icon bounce
                  transition: {
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "loop",
                  }, // Smooth bounce loop
                }}
              >
                <ArrowRight className="mt-1 w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>
        </form>
      </motion.div>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={closeMessage}
          >
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {isSuccess ? (
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    Submission Successful!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    Submission Failed
                  </h3>
                  <p className="text-gray-600">
                    Oops! Something went wrong. Please try again later.
                  </p>
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-200"
                onClick={closeMessage}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
