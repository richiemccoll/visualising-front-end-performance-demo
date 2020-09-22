import { types, getEnv, addDisposer, flow, applySnapshot, applyPatch } from "mobx-state-tree";
import { autorun } from "mobx";
import format from "date-fns/format/index";

function resizeImage(url) {
  const originalImageSize = '_o.jpg';
  const smallerImageSize = '_n.jpg';
  if (url) {
    return url.replace(originalImageSize, smallerImageSize);
  }
}
function normaliseLaunches(launches) {
  return launches.map((launch) => ({
    imgUrl: resizeImage(launch.links.flickr.original[0]) || launch.links.patch.small,
    name: launch.name,
    details: launch.details,
    id: launch.id,
    url: launch.links.article,
    date: format(new Date(launch.date_utc), "dd/MM/yyyy"),
  }));
}

const Launch = types.model("Launch", {
  id: types.identifier,
  imgUrl: types.maybeNull(types.string),
  name: types.string,
  details: types.maybeNull(types.string),
  url: types.maybeNull(types.string),
  date: types.maybeNull(types.string),
});

const launchModel = {
  allLaunches: types.array(Launch),
  order: types.optional(types.string, 'newest')
};

const launchViews = (self) => ({
  get launchService() {
    return getEnv(self).launchService;
  },
  get launches() {
    const type = {
      oldest: self.allLaunches,
      newest: self.allLaunches.slice().reverse()
    }
    return type[self.order];
  },
  get oppositeOrder() {
    const type = {
      oldest: 'new',
      newest: 'old'
    }
    return type[self.order];
  }
});

const launchActions = (self) => {
  return {
    afterCreate() {
      const disposer = autorun(() => {
        self.getPastLaunches();
      });
      addDisposer(self, disposer);
    },
    getPastLaunches: flow(function* getPastLaunches() {
      const launches = yield self.launchService.getPastLaunches();
      const normalised = normaliseLaunches(launches);
      self.allLaunches = normalised;
    }),
    setOrder() {
      if (self.order === 'newest') {
        self.order = 'oldest';
      } else {
        self.order = 'newest';
      }
    }
  };
};

const Launchs = types
  .model("Launchs", launchModel)
  .views(launchViews)
  .actions(launchActions);

export default Launchs;
