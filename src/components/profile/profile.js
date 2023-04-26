import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { InternalApi } from '../../utils/app';
import loader from '../../Assets/loading.gif'
export default function Profile(){
    const [user, setUser]= useState('');
    const { userId } = useParams();
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
      axios.get(InternalApi+'users/'+userId, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    }, []);
    const [numOfPosts, setNumOfPosts] = useState(0);
    const [numOfLikes, setNumOfLikes] = useState(0);
    const [posts, setPosts]= useState(null);
    const [loading, setLoading]=useState(true);
  
    useEffect(() => {
      async function fetchPosts() {
        try {
          const response = await axios.get(InternalApi+`posts/author/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
    
          console.log('response ', response.data);
          setPosts(response.data);
          setLoading(false);
    
          let likesCount = 0;
          response.data.forEach((post) => {
            likesCount += post.likes;
          });
      
          setNumOfPosts(response.data.length);
          setNumOfLikes(likesCount);
        } catch (error) {
          console.error(error);
        }
      }
    
      fetchPosts();
    }, [userId]);
    
console.log(currentUser);
const date = new Date("2023-04-18T16:08:46.042Z");
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = date.toLocaleDateString('en-US', options);
    return (
        <div class="p-16 bg-gradient-to-r from-indigo-200 via-gray-200 to-green-100">
          {loading && <div className='my-12'>
            <img src={loader} className='mx-auto'/>
            </div>}
          {!loading && 
<div class="p-8 bg-white shadow mt-24">
  <div class="grid grid-cols-1 md:grid-cols-3">
    <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
      <div>
      {!loading && <p class="font-bold text-gray-700 text-xl">{numOfPosts}</p>}
        <p class="text-gray-400">Posts</p>
      </div>
      <div>
      {!loading && <p class="font-bold text-gray-700 text-xl">{numOfPosts}</p>}
        <p class="text-gray-400">likes</p>
      </div>
    </div>
    <div class="relative">
      <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
      <img class="object-center object-cover w-full h-full rounded-full" src={user.image} alt="photo"/>
      </div>
    </div>

    <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
    <p class="mt-2 text-gray-500">Joined on {new Date(user.createdAt).toLocaleDateString('en-US', options)}</p>
    </div>
  </div>

  <div class="mt-20 text-center border-b pb-12">
    <h1 class="text-4xl font-medium text-gray-700">{user.fullName}</h1>
    <p class="font-light text-gray-600 mt-3">{user.email}</p>
    <p class="mt-2 text-gray-500">{user.role}</p>
  </div>
</div>
}
</div>
)
}