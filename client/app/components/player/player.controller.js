export default class playerController {

  // Controller name is set here.
  static get UID() {
    return "playerController"
  }

  // DI.
  constructor(PlayerService, $scope) {

    // Make accessible to prototype functions.
    this.PlayerService = PlayerService;

    // The player Node.
    const player = PlayerService.player;

    player.onplay       = () => null;
    player.onplaying    = () => null;
    player.onpause      = () => null;
    player.onploadstart = () => null;
    player.oncanplay    = () => null;

    // Every player time change (even on manual change) update local data.
    player.ontimeupdate = () => {
      this.updateLocalData();
      $scope.$digest();
    };

    // Get tracks. Store them in tracks on PLayerSerivce.
    PlayerService.getTracks()
      .then(response => PlayerService.storeTracks(response.aTracks));

    // Listen to an audio ctrl events and fire the handler.
    $scope.$on('audioControl', (event, type) => this.handleControl(type))

    // Listen to an audio seek events and fire the handler.
    $scope.$on('seek', (event, progressPercentage) => this.seek(progressPercentage))
  }

  // Gets updated data about the track from the PlayerService.
  updateLocalData() {
    this.currentTime = Math.floor(this.PlayerService.currentTime());
    this.tracks      = this.PlayerService.tracks;
    this.track       = this.PlayerService.track;
  }

  /**
   * Fire the correct handlers respective to their type.
   *
   * @param {String} type - the type of the controller who fired the event.
   */
  handleControl(type) {
    switch (type) {
      case 'play':
        this.play();
        break;
      case 'pause':
        this.pause();
        break;
      case 'next':
        this.next();
        break;
      case 'prev':
        this.previous();
        break;
    }
  }

  /**
   *  Play audio. Play first track if no track loaded already.
   *
   * @param {Number} index - the current track index to play.
   */
  play(index = 0) {
    this.PlayerService.play(index);
  }

  /**
   * Go to specific time in track based on percentage.
   *
   * @param {Number} progressPercentage - the percenages of time to go to in
   * the currently loaded track.
   */
  seek(progressPercentage = 0) {
    this.PlayerService.seek(progressPercentage)
  }

  // Pause the track.
  pause() {
    this.PlayerService.pause();
  }

  /**
   * Move to a designated track.
   *
   * @param {Number} number - the number of tracks to move.
   */
  skipTrack(number = 1) {
    this.PlayerService.skipTrack(number);
  }

  // Skip one track ahead.
  next() {
    this.skipTrack(1);
  }

  // Skip to the previous track.
  previous() {
    this.skipTrack(-1)
  }
}
