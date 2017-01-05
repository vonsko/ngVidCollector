(function () {
  function topBarController(UtilsService) {
    let ctrl = this;

    ctrl.toggleSearchPanel = () => ctrl.actions.togglePanels();
    ctrl.openMenu = ($mdOpenMenu, e) => $mdOpenMenu(e);
    ctrl.clearDB = () => {
      ctrl.actions.hideAll();
      UtilsService.clearStorage().then(() => {
        ctrl.actions.showPanel("videos");
      });
    };
    ctrl.fillTestData = () => ctrl.actions.reloadVideosPanel(() => UtilsService.fillTestData());
  }

  angular.module("common")
    .controller("topBarController", topBarController);
}());