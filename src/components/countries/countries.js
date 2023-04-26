import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { externalApi } from '../../utils/app';
import loader from '../../Assets/loading.gif'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export default function Countries() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading]=useState(true);
  useEffect(() => {
    fetch(externalApi+'all')
      .then(response => response.json())
      .then(json =>{
        setData(json)
        setIsLoading(false)
      })
      .catch(error => console.error(error));
  }, []);
    return (
     <div class="px-12 pt-12 pb-20 bg-gradient-to-r from-indigo-200 via-gray-200 to-green-100">
       {isLoading && <div className='my-12'>
            <img src={loader} className='mx-auto'/>
            </div>}
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
  {/* ARTICLE */}
  {!isLoading &&
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
         slidesPerView: 2,
         spaceBetween: 20
      },
      // when window width is >= 1024px
      1024: {
         slidesPerView: 3,
         spaceBetween: 30
      }
   }}
   style={{ width: "100%", height: "100%" }}
>

{ data && data.filter((country) => country.name.official.toLowerCase().includes(searchTerm.toLowerCase())).map((country) => {
  console.log(country);
  const url=`countries/${country.fifa}`
  const countryDescription=country.name.official+' is a country which is part of '+country.continents+ ' with a total population around '+country.population+', its capital city is '+country.capital
  console.log(countryDescription)
  return(
  <SwiperSlide>
   <article class="overflow-hidden bg-white rounded-lg border border-gray-100 shadow-sm">
  <img
    alt="Office"
    src={country.flags.png}
    class="h-56 w-full object-cover"
  />

  <div class="p-4 sm:p-6">
    <a href="#">
      <h3 class="text-lg font-medium text-gray-900">
        {country.name.official}
      </h3>
    </a>

    <p class="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3">
     {countryDescription}
    </p>

    <a
      href={url}
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
   </SwiperSlide>
   )
})}
</Swiper>
}
{/* END ARTICLE */}
</div>
    );
  }