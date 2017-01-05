(function () {
  let AppController = function () {
    let ctrl = this;
    ctrl.states = {
      currentPanel: "videosPanel"
    };

    ctrl.actions = {
      hideAll () {
        ctrl.states.currentPanel = "";
      },
      showPanel (which) {
        ctrl.states.currentPanel = `${which}Panel`;
      },
      reloadVideosPanel (innerCallback) {
        ctrl.states.currentPanel = "";
        if (typeof innerCallback === "function") innerCallback();
        ctrl.states.currentPanel = "videosPanel";
      },
      togglePanels () {
        ctrl.states.currentPanel = (ctrl.states.currentPanel === "searchPanel") ? "videosPanel" : "searchPanel";
      }
    };
  };

  angular.module("common")
    .controller("AppController", AppController);
}());