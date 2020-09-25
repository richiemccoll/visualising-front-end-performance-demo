import React from 'react';

export default function Header() {
  return (
    <header className="text-gray-700 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center pb-0">
        <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center md:mb-0">
          <img
          className="rounded-full h-16 w-16"
            src="https://pbs.twimg.com/profile_images/1082744382585856001/rH_k3PtQ_400x400.jpg"
          />
          <span className="ml-3 text-xl">SpaceX Launches</span>
        </a>
      </div>
    </header>
  );
}