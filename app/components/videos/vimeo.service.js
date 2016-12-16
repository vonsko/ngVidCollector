(function () {
  let VimeoService = function ($http) {
    function search (query) {
      return $http.get("https://api.vimeo.com/videos", {
        headers: {
          Authorization: "Bearer ebdd3d19744003399e0f4c6fbad533e8"
        },
        params: {
          query: query.text
        }
      });
    }
    function getId (uri) {
      // "/videos/25168137"
      let uriArray = uri.split("/");
      return uriArray[uriArray.length - 1];
    }

    function getEmbed (id, size) {
      return `<iframe 
        src="//player.vimeo.com/video/${ id }" 
        width="${ size.width }" 
        height="${ size.height }" 
        frameborder="0" 
        webkitallowfullscreen 
        mozallowfullscreen 
        allowfullscreen></iframe>`;
    }

    function normalizeObject (item) {
      let defaultPictureIndex = 1;
      let highPictureIndex = 3;

      return {
        type: "vimeo",
        id: getId(item.uri),
        name: item.name,
        thumbnails: {
          default: {
            height: item.pictures.sizes[defaultPictureIndex].height,
            width: item.pictures.sizes[defaultPictureIndex].width,
            url: item.pictures.sizes[defaultPictureIndex].link
          },
          high: {
            height: item.pictures.sizes[highPictureIndex].height,
            width: item.pictures.sizes[highPictureIndex].width,
            url: item.pictures.sizes[highPictureIndex].link
          }
        },
        description: item.description
      };
    }

    function getNormalizedResults (results) {
      let newResults = [];
      results.data.data.forEach((item) => {
        newResults.push(normalizeObject(item));
      });
      console.log("results Vimeo", results, newResults);
      return newResults;
    }
    return {
      search,
      normalizeObject,
      getEmbed,
      getNormalizedResults
    };
  };

  angular.module("videos")
    .factory("VimeoService", VimeoService);
}());