(function () {
  let VimeoService = function ($http) {
    let search = function (query) {
      return $http.get("http://api.vimeo.com/videos", {
        headers: {
          Authorization: "bearer a73a7ebba14402f4daec2c4aad266972"
        },
        params: {
          query: query.text
        }
      });
    };
    return {
      search
    };
  };

  angular.module("videos")
    .factory("VimeoService", VimeoService);
}());