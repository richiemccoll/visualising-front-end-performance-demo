import React, { useRef, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { Masonry } from "masonic";
import { Button } from "@project-zero/components";

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
        <Button
          variant="light"
          onClick={() => {
            performance.mark("changingOrder-start");
            setOrder();
          }}
        >
          Click to view {order} launches
        </Button>
      </div>
      <div className="flex flex-wrap -m-4">
        <Masonry
          items={launches}
          render={({ data: launch }) => {
            return (
              <Card
                name={launch.name}
                details={launch.details}
                image={launch.imgUrl}
                url={launch.url}
                date={launch.date}
              />
            );
          }}
          columnWidth={400}
        />
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
