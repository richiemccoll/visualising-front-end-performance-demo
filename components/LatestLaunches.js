import React, { memo, useRef, useEffect } from "react";
import { inject, observer } from "mobx-react";

import Card from "./Card";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function LatestLaunchList({ launches, setOrder, order = "older" }) {
  const prevOrder = usePrevious(order);
  useEffect(() => {
    if (prevOrder) {
      if (prevOrder !== order) {
        performance.mark("changingOrder-end");
        performance.measure(
          "changingOrder-measure",
          "changingOrder-start",
          "changingOrder-end"
        );
      }
    }
  }, [order, prevOrder]);
  return (
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-wrap mb-4">
        <button
          onClick={() => {
            performance.mark("changingOrder-start");
            setOrder();
          }}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Click to view {order} launches
        </button>
      </div>
      <div className="flex flex-wrap -m-4">
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
