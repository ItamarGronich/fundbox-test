import { nth, findIndex } from 'lodash';

export default class playerController {
  static get UID(){
    return "playerController"
  }

  /* @ngInject */
  constructor(PlayerService, $element, $scope) {

    this.player = new Audio();

    // Get songs. Store them in songs on ctrl.
    PlayerService.getSongs()
      .then(response => this.songs = response.aTracks);

    // Listen to an audio ctrl event and fire the handler.
    $scope.$on('audioControl', (event, type) => this.handleControl(type))
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
        this.player.src = songs[index].track_listen_url;
        this.play();
      } else {
        this.player.play()
        .then(e => console.info(`playing`), e => console.info(e));
      }
    }
  }

  // Pause the track.
  pause() {
    this.player.pause();
  }

  // Returns the index of the currently playing/loaded track.
  // -1 if no track loaded.
  currentSongIndex() {
    return findIndex(
      this.songs,
      track => track.track_listen_url === this.player.src
    );
  }

 /**
  * Move to a designated song.
  *
  * @param {Number} number - the number of songs to move.
  */
  moveToSong(number = 1) {

    const
      songs = this.songs,
      numberOfSongs = songs ? this.songs.length : 0;

    if (songs && numberOfSongs) {

      const
        paused  = this.player.paused,
        currIdx = this.currentSongIndex(),

        // Loop functionality.
        nextIdx = currIdx < (numberOfSongs - 1) ? currIdx + number : number - 1 ;

      // Load song. Negative will play from the end.
      this.player.src = nth(songs, nextIdx).track_listen_url;

      if (!paused) {
        this.play();
      }
    }
  }

  next() {
    this.moveToSong(1);
  }

  previous() {
    this.moveToSong(-1)
  }
}
