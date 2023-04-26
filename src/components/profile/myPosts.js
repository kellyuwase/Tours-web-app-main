import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { InternalApi } from '../../utils/app';
export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    async function fetchPosts() {
      try {
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        };
        const response = await axios.get(InternalApi+`posts/author/${localStorage.getItem('i_d')}`, config);
        setPosts(response.data);
        console.log('t==',response.data)
      } catch (error) {
        console.error(error);
      }
    }

    fetchPosts();
  }, []);
    return (
     <div class="px-12 pb-20 bg-gradient-to-r from-indigo-200 via-gray-200 to-green-100">
      <p class="text-gray-600 text-center text-lg font-meduim lg:px-16 mb-20">Here is all posts you contributed on</p>
    <div class="hidden sm:mb-8 sm:flex sm:justify-center">
 <div class="mb-3 mt-0 xl:w-96">
  <div class="relative mb-4 flex w-full flex-wrap items-stretch">
    <input
      type="search"
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
      class="relative m-0 bg-white block w-[1%] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
      placeholder="Search"
      aria-label="Search"
      aria-describedby="button-addon2" />
    <span
      class="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
      id="basic-addon2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="h-5 w-5">
        <path
          fill-rule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clip-rule="evenodd" />
      </svg>
    </span>
  </div>
  </div>
</div>
<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  { posts && posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase())).map((post) => {
  console.log(post);
  return(
<article class="overflow-hidden rounded-lg border border-gray-100 shadow-sm bg-white">
  <img
    alt="Office"
    src={post.postImageUrl}
    class="h-56 w-full object-cover"
  />

  <div class="p-4 sm:p-6">
    <a href="#">
      <h3 class="text-lg font-medium text-gray-900">
       {post.title}
      </h3>
    </a>

    <p class="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3">
     {post.description}
    </p>

    <a
      href="#"
      class="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
    >
      Find out more

      <span
        aria-hidden="true"
        class="block transition group-hover:translate-x-0.5"
      >
        &rarr;
      </span>
    </a>
  </div>
</article>
 )
})}
</div>
</div>
    );
  }