(function () {
  let VideosService = function (StorageService, $http, $injector) {
    let currentResults = {all: [], page: [], info: {}};

    function getPageCount (length, perPage) {
      let total = Math.ceil(length / perPage);
      return {
        allItemsLength: length,
        total,
        pages: _.times(total, (i) => i + 1)
      };
    }

    function getVideosList (paramObj) {
      currentResults = {all: [], page: [], info: {}};
      if (_.isEmpty(paramObj)) return;
      let videosList = StorageService.getVideoList();

      if (paramObj.filters === "fav") {
        videosList = videosList.filter(v => v.fav);
      }

      if (paramObj.sorts === "newest") {
        videosList = videosList.sort((a,b) => {return b.dateAdd - a.dateAdd;});
      } else if(paramObj.sorts === "oldest") {
        videosList = videosList.sort((a,b) => {return a.dateAdd - b.dateAdd;});
      }

      currentResults.all = videosList;
      currentResults.page = getPageResult(0, paramObj.videosCount).results;
      currentResults.info = getPageCount(videosList.length, paramObj.videosCount);

      return {
        results: currentResults.page,
        info: currentResults.info
      };
    }

    function getPageResult (page, pageSize) {
      let cursor = page * pageSize;
      currentResults.page = currentResults.all.slice(cursor, cursor + pageSize);
      return {
        results: currentResults.page,
        info: currentResults.info
      };
    }

    function getApiService (name) {
      return name.toLowerCase().charAt(0).toUpperCase()+name.slice(1).toLowerCase() + "Service";
    }

    function getAdditionalInfo (video) {
      let Service = $injector.get(getApiService(video.type));
      return Service.additionalInfo(video);
    }

    function makeStatistics (type, stats) {
      let Service = $injector.get(getApiService(type));
      return Service.makeStatistics(stats);
    }

    function searchByQuery(query) {
      let Service = $injector.get(getApiService(query.engine));
      return Service.search(query);
    }

    function getEmbedCode (api, id, sizes) {
      let Service = $injector.get(getApiService(api));
      return Service.getEmbed(id, sizes);
    }

    function normalizeObject (video) {
      let Service = $injector.get(getApiService(video.type));
      return Service.normalizeObject(video);
    }

    function getNormalizedResults (type, results) {
      let Service = $injector.get(getApiService(type));
      return Service.getNormalizedResults(results);
    }

    return {
      getPageCount,
      getVideosList,
      getPageResult,
      searchByQuery,
      getApiService,
      getEmbedCode,
      makeStatistics,
      getAdditionalInfo,
      normalizeObject,
      getNormalizedResults
    };
  };

  angular.module("videos")
    .factory("VideosService", VideosService);
}());