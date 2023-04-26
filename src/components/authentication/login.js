import { useState } from "react";
import axios from 'axios';
import { InternalApi } from "../../utils/app";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(InternalApi+'auth/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      window.location.assign("/profile")
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

          <p className="mt-4 text-gray-500">
            Log in into your account to starting using the app and see latest features
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mt-8 mb-0 max-w-md space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>

            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Enter email"
              />

              <span
                className="absolute inset-y-0 right-0 grid place-content-center px-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Password</label>

            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Enter password"/>
            </div>
            </div>
            <div class="flex items-center justify-between">
            <p class="text-sm text-gray-500">
              No account?
              <a class="underline" href="/register">Sign up</a>
            </p>
    
            <button
              type="submit"
              class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    
      <div class="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Welcome"
          src="https://barefootsworld.net/wp-content/uploads/2020/11/rsc-224565-5f028c13a7ad7.jpeg"
          class="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <ToastContainer
        position="top-right"
        pauseOnFocusLoss={false}
        delay={200}
      />
      </section>
)}
