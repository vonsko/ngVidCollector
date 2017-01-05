(function () {
  let SearchController = function (VideosService, StorageService, $mdToast) {

    let ctrl = this;

    ctrl.query = {
      text: "Deus Ex Machina",
      engine: "youtube"
    };

    ctrl.loading = false;

    ctrl.search = () => {
      ctrl.loading = true;
      VideosService.searchByQuery(ctrl.query).then((res) => {
        ctrl.searchResults = VideosService.getNormalizedResults(ctrl.query.engine, res);
        ctrl.loading = false;
      });
    };

    ctrl.addVideo = (video) => {
      VideosService.getAdditionalInfo(video).then((res) => {
        video.statistics = VideosService.makeStatistics(video.type, res);
        StorageService.addItem(video).then(() => {
          console.log("addVideo", video, res);
          $mdToast.show(
            $mdToast.simple()
              .textContent(`Video ${ video.name } added to collection`)
              .position("top right")
              .hideDelay(3000)
          );
        });
      });
    };

    ctrl.inStorage = (id) => StorageService.isInStorage(id);
  };

  angular.module("search")
    .controller("SearchController", SearchController);
}());
