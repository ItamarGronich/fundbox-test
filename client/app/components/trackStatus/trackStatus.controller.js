export default class TrackStatusController {
  static get UID(){
    return "trackStatusController"
  }

  /* @ngInject */
  constructor($rootScope, $scope) {
    this.$rootScope = $rootScope;


    // Calculate time related numbers.
    $scope.$watch(
      () => this.currentTime,
      (currentTime) => {
        this.progressPercentage = this.calcPercetage(currentTime);
        this.currentHumanTime = this.secondsToHumanTime(currentTime);
      }
    );
  }

  seek() {
    this.$rootScope.$broadcast('seek', this.progressPercentage)
  }

  calcPercetage(currentTime) {
    return this.track ? (currentTime * 100) / this.track.totalSeconds : 0;
  }


secondsToHumanTime(currentTime) {
  if (currentTime || currentTime === 0) {
    const
      toZeroBased = number => number >= 10 ? number.toString() : '0' + number.toString(),
      mins = Math.floor(currentTime / 60),
      secs = currentTime % 60,
      humanMins = toZeroBased(mins),
      humanSecs = toZeroBased(secs);

    return `${humanMins}:${humanSecs}`;
  }
}


}
