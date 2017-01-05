(function () {
  let VideosController = function (VideosService, StorageService, $mdToast, $mdDialog) {
    let ctrl = this;
    ctrl.$onInit = function () {
      ctrl.getVideos(ctrl.viewSettings);
    };
    ctrl.videosList = [];
    ctrl.viewSettings = {
      layout: "list",
      videosCount: 10,
      sorts: "newest",
      filters: null,
      page: 0
    };
    ctrl.openSelectVideosNumber = ($mdOpenMenu, e) => $mdOpenMenu(e);
    ctrl.changeViewSettings = (paramObj) => {
      Object.assign(ctrl.viewSettings, paramObj);
      ctrl.getVideos(ctrl.viewSettings);
    };
    ctrl.favToggle = (video) => {
      video.fav = !video.fav;
      StorageService.updateVideo(video);
      $mdToast.show(
        $mdToast.simple()
          .textContent(`Video ${ video.name } ${ video.fav ? "added to fav" : "removed from fav"} `)
          .position("top right")
          .hideDelay(3000)
      );
    };

    ctrl.deleteVideo = (video) => {
      StorageService.deleteElement(video);
      ctrl.getVideos(ctrl.viewSettings);
      $mdToast.show(
        $mdToast.simple()
          .textContent(`Video ${ video.name } deleted `)
          .position("top right")
          .hideDelay(3000)
      );
    };

    ctrl.getVideos = (paramObject, reset) => {
      if(reset) ctrl.viewSettings.page = 0;
      console.log("videosList", ctrl.videosList);
      ctrl.videosList = VideosService.getVideosList(paramObject);
    };

    ctrl.getPage = (page) => {
      if(!_.isUndefined(page)) { ctrl.viewSettings.page = page; }
      ctrl.videosList = VideosService.getPageResult(ctrl.viewSettings.page, ctrl.viewSettings.videosCount);
    };

    ctrl.getNextPage = () => {
      if((ctrl.viewSettings.page + 1) >= ctrl.videosList.info.total) {
        $mdToast.show(
          $mdToast.simple()
            .textContent("You've reached the end")
            .position("top right")
            .hideDelay(3000)
        );
      } else {
        ctrl.viewSettings.page++;
      }
      ctrl.getPage();
    };

    ctrl.getPrevPage = () => {
      if((ctrl.viewSettings.page - 1) < 0) {
        $mdToast.show(
          $mdToast.simple()
            .textContent("You've reached the beginning")
            .position("top right")
            .hideDelay(3000)
        );
      } else {
        ctrl.viewSettings.page--;
      }
      ctrl.getPage();
    };

    ctrl.showDialog = function (ev, video) {
      $mdDialog.show({
        controller: DialogPlayerController,
        controllerAs: "$ctrl",
        templateUrl: "./app/components/videos/videoPlayer/videoPlayer.html",
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {
          video
        }
      });
    };

    function DialogPlayerController ($mdDialog, video) {
      this.video = video;
      this.hide = () => {$mdDialog.hide();};
    }
  };

  angular.module("videos")
    .controller("VideosController", VideosController);
}());