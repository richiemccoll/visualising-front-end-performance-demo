import { types, getEnv, addDisposer, flow } from "mobx-state-tree";
import { autorun } from "mobx";
import format from "date-fns/format/index";

function normaliseLaunches(launches) {
  return launches.map((launch) => ({
    imgUrl: launch.links.flickr.original[0] || launch.links.patch.large,
    name: launch.name,
    details: launch.details,
    id: launch.id,
    url: launch.links.article,
    date: format(new Date(launch.date_utc), "dd/MM/yyyy"),
  }));
}

const Launch = types.model("Launch", {
  id: types.identifier,
  imgUrl: types.string,
  name: types.string,
  details: types.maybeNull(types.string),
  url: types.string,
  date: types.maybeNull(types.string),
});

const launchModel = {
  allLaunches: types.array(Launch),
  refreshId: types.maybeNull(types.number),
};

const launchViews = (self) => ({
  get launchService() {
    return getEnv(self).launchService;
  },
  get launches() {
    return self.allLaunches.reverse().slice(0, 25);
  },
});

const launchActions = (self) => {
  return {
    afterCreate() {
      const disposer = autorun(() => {
        self.getPastLaunches();
      });
      addDisposer(self, disposer);
    },
    getLatestLaunchs() {
      if (self.refreshId) {
        clearInterval(self.refreshId);
      }
      self.refreshId = setInterval(() => self.getPastLaunches(), 6000);
    },
    getPastLaunches: flow(function* getPastLaunches() {
      const launches = yield self.launchService.getPastLaunches();
      const normalised = normaliseLaunches(launches);
      self.allLaunches = normalised;
      self.getLatestLaunchs();
    }),
  };
};

const Launchs = types
  .model("Launchs", launchModel)
  .views(launchViews)
  .actions(launchActions);

export default Launchs;
