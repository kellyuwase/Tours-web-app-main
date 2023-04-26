import { useState, useEffect } from "react";
import axios from 'axios';
import { InternalApi } from "../../utils/app";
import loader from '../../Assets/loading.gif'
export default function Users(){
    const [users, setUsers] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading]=useState(true);
    useEffect(() => {
        axios.get(InternalApi+'users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
          setUsers(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
        });
      }, []);
    return(
        <div>
           {isLoading && <div className='my-12'>
            <img src={loader} className='mx-auto'/>
            </div>}
            {!isLoading && 
        <section class="px-4 sm:px-6 lg:px-10 py-12 bg-gradient-to-r from-indigo-200 via-gray-200 to-green-100">
    <div class="text-center pb-12">
    <div class="hidden sm:mb-8 sm:flex sm:justify-center">
 <div class="mb-3 mt-20 xl:w-96">
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
        <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900">
            Our Current users that we rely on
        </h1>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {users && users.filter((user) => user.fullName.toLowerCase().includes(searchTerm.toLowerCase())).map((user) => {
            const url='/profile/'+user._id;
            return(
        <a href={url}>
        <div class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col md:flex-row">
            <div class="w-full md:w-2/5 h-60">
                <img class="object-center object-cover w-full h-full" src={user.image} alt="photo"/>
            </div>
            <div class="w-full md:w-3/5 text-left p-6 md:p-4 space-y-2">
                <p class="text-xl text-gray-700 font-bold">{user.fullName}</p>
                <p class="text-sm text-gray-400 font-bold">{user.email}</p>
                <p class="text-base text-gray-400 font-normal">{user.role}</p>
                <p class="text-base leading-relaxed text-gray-500 font-normal">Joined Friday, April 8, 2023.</p>
            </div>
        </div>
        </a>
            )
        })}
    </div>
</section>
}
</div>
    )
}