import LaunchStore from "./launch.store";

const launchService = {
  getPastLaunches: async function getPastLaunches() {
    const res = await fetch("https://api.spacexdata.com/v4/launches/past");
    const json = await res.json();
    return json;
  },
};

const launchStore = LaunchStore.create({}, { launchService });

export default {
  launchStore,
};