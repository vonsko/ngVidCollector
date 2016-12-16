(function () {
  let VideosService = function (StorageService, $http, YoutubeService, VimeoService, $injector) {
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

    function searchByQuery(query) {
      let svcName = query.engine.toLowerCase().charAt(0).toUpperCase()+query.engine.slice(1).toLowerCase() + "Service";
      let Service = $injector.get(svcName);
      return Service.search(query);
    }

    return {
      getPageCount,
      getVideosList,
      getPageResult,
      searchByQuery
    };
  };

  angular.module("videos")
    .factory("VideosService", VideosService);
}());