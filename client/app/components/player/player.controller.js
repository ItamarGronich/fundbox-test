import { nth, findIndex } from 'lodash';

export default class playerController {
  static get UID(){
    return "playerController"
  }

  /* @ngInject */
  constructor(PlayerService, $element, $scope) {

    this.player = new Audio();

    this.player.onplay = () => null;
    this.player.onplaying = () => null;
    this.player.onpause = () => null;
    this.player.onploadstart = () => null;
    this.player.oncanplay = () => null;
    this.player.ontimeupdate = () => {
      this.currentTime = Math.floor( this.player.currentTime );
      $scope.$digest();
    };

    // Get songs. Store them in songs on ctrl.
    PlayerService.getSongs()
      .then(response => this.songs = response.aTracks);

    // Listen to an audio ctrl event and fire the handler.
    $scope.$on('audioControl', (event, type) => this.handleControl(type))
    $scope.$on('seek', (event, progressPercentage) => this.seek(progressPercentage))
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
   *  Load track in player and store metadata.
   *
   * @param {Number} index - the index of the current track in the songs array.
   */
  loadTrack(index = 0) {

    const songs = this.songs;

    if (songs && songs.length) {

      const track = nth(songs, index);

      // Load the url.
      this.player.src = track.track_listen_url;

      // Store metadata.
      this.track = Object.assign(
        track,
        { index, totalSeconds: this.timeToSeconds(track.track_duration) }
      );
    }

  }

  /**
   *  Get the total time of the currently loaded song.
   *
   * @param {string} time - the human readale string that will be transferred
   * to seconds.
   *
   * @return {Number} integer representing the total nu,mber a seconds a track
   * lasts.
   */
  timeToSeconds(time) {
    return time.split(':')
      .reduce(
        (acc,time,i) => {
          return i === 0 ? time * 60 : parseInt(acc) + parseInt(time);
        },
        0
      );
  }

  /**
   *  Play audio. Play first song if no song loaded already.
   *
   * @param {Number} index - the current song index to play.
   */
  play(index = 0) {

    const
      songs = this.songs,
      numberOfSongs = songs ? this.songs.length : 0;

    if (index < 0 || index > numberOfSongs) {
      throw new Error('Play index can not be negative or greater than numberOfSongs');
    }

    if (songs && numberOfSongs) {
      if (!this.player.src || index) {
        this.loadTrack(index)
        this.play();
      } else {
        this.player.play()
        .then(e => null, e => null);
      }
    }
  }

  /**
   * Go to specific time in track based on percentage.
   *
   * @param {Number} progressPercentage - the percenages of time to go to in
   * the currently loaded track.
   */
  seek(progressPercentage = 0) {

    if (this.track) {
      const
        totalTime = this.track.totalSeconds,
        goToTime = Math.floor( (totalTime * progressPercentage) / 100 );

        this.player.currentTime = goToTime;
    }
  }

  // Pause the track.
  pause() {
    this.player.pause();
  }

 /**
  * Move to a designated song.
  *
  * @param {Number} number - the number of songs to move.
  */
  skipTrack(number = 1) {

    const
      songs = this.songs,
      numberOfSongs = songs ? this.songs.length : 0;

    if (songs && numberOfSongs) {

      const
        paused  = this.player.paused,

        // track.index if exists, 0 if negative and -1 if positive.
        currIdx = this.track ? this.track.index : number < 0 ? 0 : -1,

        // Loop functionality.
        nextIdx = currIdx < (numberOfSongs - 1) ? currIdx + number : number - 1 ;

      // Load song. Negative will play from the end.
      this.loadTrack(nextIdx);

      if (!paused) {
        this.play();
      }
    }
  }

  next() {
    this.skipTrack(1);
  }

  previous() {
    this.skipTrack(-1)
  }
}
