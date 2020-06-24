import React, { memo } from "react";

function Card({ image, name, price, details, date, url }) {
  return (
    <div className="p-4 md:w-1/3">
      <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
        <img
          className="w-full object-cover object-center"
          width="400"
          height="200"
          style={{
            width: "100%",
            height: "auto",
            minHeight: 200,
            maxHeight: 200,
            backgroundColor: "#DDD",
          }}
          loading="lazy"
          src={image}
          alt={name}
        />
        <div className="p-6">
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {name}
          </h1>
          <p className="leading-relaxed mb-6 fade">{details}</p>
          <div className="flex items-center flex-wrap ">
            <a
              className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
              href={url}
              rel="no-opener"
              target="_blank"
            >
              Learn More
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <span className="text-gray-600 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-300">
              <svg
                className="w-4 h-4 mr-1"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              {date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
