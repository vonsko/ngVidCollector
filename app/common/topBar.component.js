(function () {
  let topBar = {
    bindings: {
      actions: "<",
      states: "<"
    },
    templateUrl: "./app/common/topBar.html",
    controller: "topBarController"
  };

  angular.module("common")
    .component("topBar", topBar);
}());