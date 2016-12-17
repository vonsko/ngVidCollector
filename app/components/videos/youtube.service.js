(function () {
  let YoutubeService = function ($http) {
    function search (query) {
      return $http.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          key: "AIzaSyDjMxSP8blKtpsjZ_C6Yk5Eu-u-bugif3M",
          type: "video",
          maxResults: "10",
          pageToken: "",
          part: "id,snippet",
          q: query.text
        }
      });
    }

    function additionalInfo (video) {
      return $http.get("https://www.googleapis.com/youtube/v3/videos", {
        params: {
          key: "AIzaSyDjMxSP8blKtpsjZ_C6Yk5Eu-u-bugif3M",
          part: "statistics",
          id: video.id
        }
      });
    }

    function makeStatistics (stats) {
      let sstats = stats.data.items[0].statistics;
      return {
        viewCount: sstats.viewCount,
        likeCount: sstats.likeCount,
        commentCount: sstats.commentCount
      };
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
      makeStatistics,
      additionalInfo,
      normalizeObject,
      getNormalizedResults
    };
  };

  angular.module("videos")
    .factory("YoutubeService", YoutubeService);
}());