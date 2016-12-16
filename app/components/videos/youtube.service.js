(function () {
  let YoutubeService = function ($http) {
    let search = function (query) {
      return $http.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          key: "AIzaSyDjMxSP8blKtpsjZ_C6Yk5Eu-u-bugif3M",
          type: "video",
          maxResults: "10",
          pageToken: "",
          // part: "id,snippet,contentDetails", @todo: api youtube'a nie pobiera wszystkich informacji - trzeba to dodać w drugim requeście
          part: "id,snippet",
          q: query.text
        }
      });
    };
    return {
      search
    };
  };

  angular.module("videos")
    .factory("YoutubeService", YoutubeService);
}());