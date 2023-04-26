import axios from 'axios';
import { useState } from 'react';
import { InternalApi } from '../../utils/app';
export default function Register() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [picture, setPicture] =useState("")
  const [role, setRole] = useState("");
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleNameChange = (event) => setFullName(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handlePassword1Change = (event) => setPassword1(event.target.value);
  const handlePictureChange = (event) => setPicture(event.target.value);
  const handleRadioChange = (event) => {
    setRole(event.target.value);
  };
  function signup() {
    const data = {
      email,
      fullName,
      password,
      image: picture,
      role,
    };
  
    axios.post(InternalApi+'auth/register', data)
      .then(response => {
        const token = response.data.token;
      localStorage.setItem('token', token);
      window.location.assign("/profile")
      })
      .catch(error => {
        console.error(error); // Handle error response
      });
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(email==="" || password==="" || picture==='null' || role==='null'){
     console.log("all inputs must be filled!!!");
     console.log("email: ",email, " password: ",password, " picture: ",picture)
    }else{
      if(password!==password1){
        console.log("password should match");
      }else{
        signup();
      }
    }
  };
    return (
<section class="relative flex flex-wrap lg:h-screen lg:items-center">
  <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
    <div class="mx-auto max-w-lg text-center">
      <h1 class="text-2xl font-bold sm:text-3xl">Get started today!</h1>

      <p class="mt-4 text-gray-500">
        Register to discover the world with us! Our website offers a window into different cultures and countries around the globe. From fascinating historical sites to delicious cuisine and breathtaking landscapes, we bring you closer to the world's diverse people and places. Join us on a journey of discovery and broaden your horizons today.
      </p>
    </div>

    <form onSubmit={handleSubmit} class="mx-auto mt-8 mb-0 max-w-md space-y-4">
      <div>
        <label for="email" class="sr-only">Email</label>

        <div class="relative">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm border border-blue-300"
            placeholder="Enter email"
          />
          <input
            type="text"
            value={fullName}
            onChange={handleNameChange}
            class="w-full rounded-lg border-gray-200 mt-4 p-4 pr-12 text-sm shadow-sm border border-blue-300"
            placeholder="Enter full name"
          />
        </div>
      </div>

      <div>
        <label for="password" class="sr-only">Password</label>

        <div class="relative">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm border border-blue-300"
            placeholder="Enter password"
          />
<input
            type="password"
            value={password1}
            onChange={handlePassword1Change}
            class="w-full rounded-lg border-gray-200 p-4 mt-4 mb-4 pr-12 text-sm shadow-sm border border-blue-300"
            placeholder="Retype password"
          />
        </div>
        <label for="uploadFile">Enter link to your image</label>
        <input
            type="text"
            value={picture}
            onChange={handlePictureChange}
            class="w-full rounded-lg border-gray-200 p-4 mt-2 pr-12 text-sm shadow-sm border border-blue-300"
        />
        <div class="flex justify-between items-center my-4">
  <div class="flex items-center">
    <input type="radio" id="userRole" onChange={handleRadioChange} name="role" value="User" class="form-radio h-5 w-5 text-gray-600"/>
    <label for="user" class="ml-2 text-gray-700">User</label>
  </div>

  <div class="flex items-center">
    <input type="radio" id="contributor" onChange={handleRadioChange} name="role" value="Contributor" class="form-radio h-5 w-5 text-gray-600"/>
    <label for="contributor" class="ml-2 text-gray-700">Contributor</label>
  </div>
</div>

        
      </div>

      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-500">
         Have account?
          <a class="underline" href="/login"> Sign in</a>
        </p>

        <button
          type="submit"
          class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        >
          Signup
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
</section>
    )}