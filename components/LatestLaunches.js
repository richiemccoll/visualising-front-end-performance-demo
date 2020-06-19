import React, { memo } from "react";
import { inject, observer } from "mobx-react";

import Card from "./Card";

function LatestLaunchList({ launches }) {
  return (
    <div className="container px-5 py-24 mx-auto">
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
  };
}
export default inject(mapStateToProps)(observer(LatestLaunchList));
