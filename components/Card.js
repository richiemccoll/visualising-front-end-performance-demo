import React, { memo } from "react";

import { Card as CardComponent, Link } from "@project-zero/components";

function Card({ image, name, details, date, url }) {
  return (
    <div className="p-4">
      <CardComponent
        title={name}
        image={image}
        description={details}
        actions={
          <div className="flex items-center flex-wrap mt-2">
            <Link
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </Link>
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
        }
      />
    </div>
  );
}

export default memo(Card);
