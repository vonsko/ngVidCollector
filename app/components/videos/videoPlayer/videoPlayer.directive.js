(function () {
  let videoPlayer = function (VideosService) {
    return {
      restrict: "E",
      scope: {
        height:   "@",
        width:    "@",
        videoid:  "@",
        type:     "@"
      },
      template: "<div></div>",
      link: function(scope, element, attr) {
        let prepStr = VideosService.getEmbedCode(attr.type, attr.videoid, {width: attr.width, height: attr.height});
        element.html(prepStr);
      }
    };
  };

  angular.module("videos")
    .directive("videoPlayer", videoPlayer);
}());