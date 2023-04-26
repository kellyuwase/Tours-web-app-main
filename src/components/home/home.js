/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "login", href: "/login" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function Home() {
  return (
    <div class="bg-gradient-to-r from-indigo-200 via-gray-200 to-green-100">
    <div class="relative px-6 pt-0 lg:px-8">
      <div class="" aria-hidden="true">
        <div class="relative"></div>
      </div>
      <div class="mx-auto max-w-2xl py-2 sm:pt-38 lg:pt-36 pb-0">
         <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"></h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">Discover the world with us! Our website offers a window into different cultures and countries around the globe. From fascinating historical sites to delicious cuisine and breathtaking landscapes, we bring you closer to the world's diverse people and places. Join us on a journey of discovery and broaden your horizons today.</p>
        </div>
      </div>
      <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div class="relative"></div>
      </div>
    </div>
  </div>  
  );
}