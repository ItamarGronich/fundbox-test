export default class TrackStatusController {
  static get UID() {
    return "trackStatusController"
  }

  /* @ngInject */
  constructor($rootScope, $scope) {
    this.$rootScope = $rootScope;


    // Calculate time related numbers.
    $scope.$watch(
      () => this.currentTime,
      (currentTime) => {
        this.progressNumber = this.calcProgressNumber(currentTime);
        this.currentHumanTime = this.secondsToHumanTime(currentTime);
        this.barWidthStyle = this.calcProgressBarWidth(this.progressNumber);
      }
    );
  }

  seek() {
    this.$rootScope.$broadcast('seek', this.progressNumber)
  }

  /**
   * Returns the percentage of time passed on the loaded track.
   *
   * @param {Number} progressPercentage - Representing the current progress
   * percentage.
   *
   * @return {String} 'with : <calculated-number>;' style rule.
   */
  calcProgressBarWidth(progressPercentage) {
    return {'width': `${(progressPercentage / 10)}%`}
  }

  /**
   * Returns the percentage of time passed on the loaded track.
   *
   * @param {Number} currentTime - time the track is on.
   *
   * @return {Number} The percentage of time passed on loaded track.
   */
  calcProgressNumber(currentTime) {
    return this.track ? Math.floor( (currentTime * 1000) / this.track.totalSeconds ) : 0;
  }

  /**
   * Returns returns a humnan readable string formatted as mm:ss
   * representing the time passed on the song.
   *
   * @param {Number} currentTime - time the track is on.
   *
   * @return {String} A human readable time stirng formatted mm:ss .
   */
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
