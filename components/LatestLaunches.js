import React, { useRef, useEffect } from "react";

import { inject, observer } from "mobx-react";

import Card from "./Card";

function LatestLaunchList({ launches, setOrder, order = "older" }) {
  return (
    <div className="container px-5 py-10 mx-auto max-w-4xl">
      <div className="flex flex-wrap mb-4 justify-center">
        <button
          onClick={() => {
            setOrder();
          }}
          className="bg-gray-200 hover:bg-gray-400 text-black font-bold py-2 px-4 mb-4 rounded"
        >
          Click to view {order} launches
        </button>
      </div>
      <div className="flex flex-col items-center">
        {launches.map((launch) => (
          <Card
            key={launch.id}
            name={launch.name}
            details={launch.details}
            image={launch.imgUrl}
            url={launch.url}
            date={launch.date}
          />
        ))}
      </div>
    </div>
  );
}

function mapStateToProps({ stores }) {
  const { launchStore } = stores;
  return {
    launches: launchStore.launches,
    setOrder: launchStore.setOrder,
    order: launchStore.oppositeOrder,
  };
}
export default inject(mapStateToProps)(observer(LatestLaunchList));
