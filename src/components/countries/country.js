import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { externalApi, InternalApi } from '../../utils/app';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export default function Country() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const url = window.location.href; // get current URL
  const parts = url.split('/'); // split URL by '/'
  const lastPart = parts.pop(); // get last part of URL
  useEffect(() => {
    fetch(externalApi+'alpha/'+lastPart)
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
      setIsLoading(false);
  }, []);
  const [posts, setPosts] = useState([]);

  async function likePost(postId) {
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.put(InternalApi+`posts/${postId}/like/${localStorage.getItem('i_d')}`);
      toast.success("ok");
      setTimeout(() => {
        window.location.reload();
      }, 200);
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("You've already liked it");
      throw error;
    }
  }
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(InternalApi+'posts/'+lastPart, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        setPosts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
 return (
     <div class="px-12 pt-40 pb-20 bg-gradient-to-r from-indigo-200 via-gray-200 to-green-100">
      {
        data.length &&
      <div>
<div>
   <h2 class="text-xl mt-10 mb-2">Official name: {data[0].name.official}</h2>
   <h2 class="text-sm"> Population: {data[0].population}</h2>
   <h2 class="text-sm">Currencies: {Object.keys(data[0].currencies)[0]}</h2>
   <h2 class="text-sm">Capital city: {data[0].capital}</h2>
   <h2 class="text-sm pb-4">Continent: {data[0].continents}</h2>
   <p></p>
  </div>
<article class="overflow-hidden bg-white h-full rounded-lg border border-gray-100 shadow-sm">
  {/* ARTICLE */}
  <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        touch 
   breakpoints={{
      // when window width is >= 640px
      640: {
         slidesPerView: 1,
         spaceBetween: 10
      },
      // when window width is >= 768px
      768: {
         slidesPerView: 1,
         spaceBetween: 20
      },
      // when window width is >= 1024px
      1024: {
         slidesPerView: 1,
         spaceBetween: 30
      }
   }}
   style={{ width: "100%", height: "100%" }}
>
   <SwiperSlide>
  <img
    alt="Office"
    src={data[0].flags.png}
    class="h-screen w-full object-cover"
  />
  <div class="px-4 sm:px-6">
  <a href="#">
      {/* <h3 class="text-sm text-right font-medium text-gray-900 pt-2 pb-2">
      Dany Bailey
      </h3> */}
    </a>
    <a href="#" class="py-4 sm:py-6">
      <h3 class="text-lg font-medium text-gray-900">
      {data[0].name.official}
      </h3>
    </a>

    <p class="mt-2 mb-4 text-sm leading-relaxed text-gray-500 line-clamp-3">
      {data[0].flags.alt}
    </p>
    <p className='flex my-4'>
    <Icon icon="icon-park-outline:like" class="mr-8" color="blue" width="36" /> 
    <span class="text-lg ml-2 mt-1">0</span>
    </p>
  </div>
    </SwiperSlide>
    {posts && posts.map((post) => {
      console.log(post);
      return(
    <SwiperSlide>
      <img
    alt="Office"
    src={post.postImageUrl}
    class="h-screen w-full object-cover"
  />
  <div class="px-4 sm:px-6">
  <a href="#">
      <h3 class="text-sm text-right font-medium text-gray-900 pt-2 pb-2">
      {post.authorName}
      </h3>
    </a>
    <a href="#" class="py-4 sm:py-6">
      <h3 class="text-lg font-medium text-gray-900">
      {post.title}
      </h3>
    </a>

    <p class="mt-2 mb-4 text-sm leading-relaxed text-gray-500 line-clamp-3">
      {post.description}
    </p>
    <p className='flex my-4'>
    <Icon icon="icon-park-outline:like" class="mr-8" color="blue" width="36" onClick={()=>likePost(`${post._id}`)}/> 
    <span class="text-lg ml-2 mt-1 ">{post.likes}</span>
    </p>
  </div> 
      </SwiperSlide>)})}
</Swiper>
</article>
{/* END ARTICLE */}
<ToastContainer
        position="top-right"
        pauseOnFocusLoss={false}
        delay={200}
      />
</div>
}
</div>
    )}