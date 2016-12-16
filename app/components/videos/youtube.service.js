(function () {
  let YoutubeService = function ($http) {
    function search (query) {
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
    }

    function getEmbed (id, size) {
      return `<iframe id="player" type="text/html" width="${ size.width }" height="${ size.height }"
				 		src="http://www.youtube.com/embed/${ id }?enablejsapi=1"
				 		frameborder="0">
				</iframe>`;
    }

    function normalizeObject (item) {
      return {
        type: "youtube",
        id: item.id.videoId,
        name: item.snippet.title,
        thumbnails: item.snippet.thumbnails,
        description: item.snippet.description
      };
    }

    function getNormalizedResults (results) {
      let newResults = [];
      results.data.items.forEach((item) => {
        newResults.push(normalizeObject(item));
      });
      console.log("results YT", results, newResults);
      return newResults;
    }

    return {
      search,
      getEmbed,
      normalizeObject,
      getNormalizedResults
    };
  };

  angular.module("videos")
    .factory("YoutubeService", YoutubeService);
}());