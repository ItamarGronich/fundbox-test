import { each } from 'lodash';

export default class playerController {

  // Controller name is set here.
  static get UID() {
    return "playerController"
  }

  // DI.
  constructor(PlayerService, $scope) {

    // Make accessible to prototype functions.
    this.PlayerService = PlayerService;
    this.$scope = $scope;

    this.playerStates = {
      PLAYING: 1,
      PAUSED: 2,
      LOADING: 3
    };

    this.loading = false;
    this.playerState = this.playerStates.PAUSED;

    // The player Node.
    const player = PlayerService.player;

    // Assign handlers to each player event.
    each([
      { event: 'timeupdate', handler:  this.onTimeUpdate },
      { event: 'playing', handler: this.onPlaying },
      { event: 'pause', handler:  this.onPause },
      { event: 'loadstart', handler: this.onLoadStart },
      { event: 'ended', handler: this.onEnded },
      { event: 'waiting', handler: this.onWaiting }
                                               // Bind to controller instance.
    ], el => player.addEventListener(el.event, el.handler.bind(this)) );

    // Get tracks. Store them in tracks on PLayerService.
    PlayerService.getTracks()
      .then(response => PlayerService.storeTracks(response.aTracks));

    // Listen to an audio ctrl events and fire the handler.
    $scope.$on('audioControl', (event, type) => this.handleControl(type));

    // Listen to an audio seek events and fire the handler.
    $scope.$on('seek', (event, progressNumber) => this.seek(progressNumber));
  }

  /*
   * =========================
   *        Handlers.
   * =========================
   *
   * Note: all handlers have their `this` bound to the controller instance.
   * So `this` will never be the target element the event is fired on.
   */

  // Dev util. Logs the event type to the console.
  loggingHadler(event) {
    console.log(event.type);
  }

  // Track ended handler
  onEnded () {
    this.next().play();
  }

  // Every player time change (even on manual change) update local data.
  onTimeUpdate () {
    this.updateLocalData();
  }

  // When loading a new track change to loading state;
  onLoadStart() {
    this.playerState = this.playerStates.LOADING;
    this.updateLocalData();
  }

  // When finished loading and starting to play change load status.
  onPlaying() {
    this.playerState = this.playerStates.PLAYING;
    this.updateLocalData();
  }

  onPause() {
    this.playerState = this.playerStates.PAUSED;
    this.updateLocalData();
  }

  onWaiting() {
    this.playerState = this.playerStates.LOADING;
    this.updateLocalData();
  }

  // Gets updated data about the track from the PlayerService.
  updateLocalData() {
    this.currentTime = Math.floor(this.PlayerService.currentTime());
    this.tracks      = this.PlayerService.tracks;
    this.track       = this.PlayerService.track;
    this.$scope.$digest();
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
    return this;
  }

  /**
   * Go to specific time in track based on percentage.
   *
   * @param {Number} progressPercentage - the percentages of time to go to in
   * the currently loaded track.
   */
  seek(progressNumber = 0) {
    console.log('seek');

    this.PlayerService.seek(progressNumber);
    return this;
  }

  // Pause the track.
  pause() {
    this.PlayerService.pause();
    return this;
  }

  /**
   * Move to a designated track.
   *
   * @param {Number} number - the number of tracks to move.
   */
  skipTrack(number = 1) {
    this.PlayerService.skipTrack(number);
    return this;
  }

  // Skip one track ahead.
  next() {
    this.skipTrack(1);
    return this;
  }

  // Skip to the previous track.
  previous() {
    this.skipTrack(-1);
    return this;
  }
}
