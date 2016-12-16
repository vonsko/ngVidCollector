(function () {
  let SearchController = function (VideosService, StorageService, $mdToast) {

    let ctrl = this;
    ctrl.query = {
      text: "GCp2vSNdWBA",
      engine: "youtube"
    };

    this.search = (query) => VideosService.searchByQuery(ctrl.query).then((res) => ctrl.searchResults = res.data.items);

    this.addVideo = (video) => {
      StorageService.addVideo(video);
      $mdToast.show(
        $mdToast.simple()
          .textContent(`Video ${ video.snippet.title } added to collection`)
          .position("top right")
          .hideDelay(3000)
      );
    };

    this.inStorage = (id) => StorageService.isInStorage(id);
  };

  angular.module("search")
    .controller("SearchController", SearchController);
}());
