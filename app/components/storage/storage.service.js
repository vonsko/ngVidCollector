(function () {
  let StorageService = function (localStorageService, $q, $timeout) {
    function getVideoList() {
      return localStorageService.get("videosList") || [];
    }

    function updateVideoList(videoList) {
      localStorageService.set("videosList", videoList);
    }

    function clearStorage() {
      let defer = $q.defer();
      defer.resolve(localStorageService.clearAll());
      return defer.promise;
    }

    function fillStorage(data) {
      localStorageService.set("videosList", data);
    }

    function isInStorage(id) {
      let videos = localStorageService.get("videosList");
      let video = _.find(videos, (v) => v.id === id);
      return (video) ? video.dateAdd : false;
    }

    function addItem (video) {
      let defer = $q.defer();
      let videoList = getVideoList();
      let baseFields = {
        dateAdd: moment().toDate().getTime(),
        fav: false
      };

      // @todo pass thru checkfordupes func
      videoList.push(Object.assign(video, baseFields));
      defer.resolve(updateVideoList(videoList));

      return defer.promise;
    }

    function deleteElement(video) {
      let videoList = getVideoList();
      _.remove(videoList, (i) => i.id === video.id);
      updateVideoList(videoList);
    }

    function updateVideo(updateObj) {
      if (!updateObj.id) return;

      let videosList = getVideoList();
      let video = _.find(videosList, (v) => v.id === updateObj.id);

      Object.assign(video, updateObj);
      updateVideoList(videosList);
    }

    return {
      getVideoList,
      addItem,
      clearStorage,
      fillStorage,
      isInStorage,
      updateVideo,
      deleteElement
    };
  };

  angular.module("storage")
    .factory("StorageService", StorageService);
}());