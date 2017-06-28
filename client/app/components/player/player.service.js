import { nth, findIndex } from 'lodash';

export default class PlayerService {

  // DI.
  constructor(FreeMusicArchiveService) {

    // Make FreeMusicArchiveService available to prototype methods.
    this.fm     = FreeMusicArchiveService;

    // Create an <audio> player Node.
    this.player = new Audio();
  }

  // The <audio> Node.
  static get player() {
    return this.player;
  }

  /**
   * @return {Number|undefined} the current time the audio is in.
   */
  currentTime() {
    return this.player.currentTime;
  }

  // Tracks array.
  static get tracks() {
    return this.tracks || [];
  }

  // Tracl object.
  static get track() {
    return this.track || {};
  }

  /**
   * Store the retrieved playlist on the service.
   *
   * @param {Tracks[]} tracks - an array of track objects.
   */
  storeTracks(tracks) {
    this.tracks = tracks;
  }

  /**
   * @return {Promise} Resolved with the recent tracks data.
   */
  getTracks() {
    return this.fm.getTracks();
  }

  /**
   *  Load track in player and store metadata.
   *
   * @param {Number} index - the index of the current track in the tracks array.
   */
  loadTrack(index = 0) {

    const tracks = this.tracks;

    if (tracks && tracks.length) {

      // Get a track by it's index. Negative will select from the end.
      const track = nth(tracks, index);

      // Load the url.
      this.player.src = track.track_listen_url;

      // Store metadata.
      this.track = Object.assign(
        track, {
          index,
          totalSeconds: this.timeToSeconds(track.track_duration)
        }
      );
    }

  }

  /**
   * Transfer human readable time to seconds integer.
   *
   * @param {string} time - the human readale string that will be
   * transferred to seconds.
   *
   * @return {Number} integer representing the total number a seconds a
   * track lasts.
   */
  timeToSeconds(time) {
    return time.split(':')
      .reduce(
        (acc, time, i) => {
          return i === 0 ? time * 60 : parseInt(acc) + parseInt(time);
        },
        0
      );
  }

  /**
   * Play audio. Play first track if no track loaded already.
   *
   * @param {Number} index - the current track index to play.
   */
  play(index = 0) {

    const
      tracks = this.tracks,
      numberOftracks = tracks ? this.tracks.length : 0;

    if (index < (-1 * numberOftracks) || index > numberOftracks) {
      throw new Error('Play index can not be negative/positive greater than numberOftracks');
    }

    if (tracks && numberOftracks) {
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
        goToTime = Math.floor((totalTime * progressPercentage) / 100);

      this.player.currentTime = goToTime;
    }
  }

  /**
   * Skip tracks from current position by number specified.
   *
   * @param {Number} number - the number of tracks to move.
   */
  skipTrack(number = 1) {

    const
      tracks = this.tracks,
      numberOftracks = tracks ? this.tracks.length : 0;

    if (tracks && numberOftracks) {

      const
        paused = this.player.paused,

        // track.index if exists, 0 if negative and -1 if positive.
        currIdx = this.track ? this.track.index : number < 0 ? 0 : -1,

        // Loop functionality.
        nextIdx = currIdx < (numberOftracks - 1) ? currIdx + number : number - 1;

      // Load track. Negative will play from the end.
      this.loadTrack(nextIdx);

      if (!paused) {
        this.play();
      }
    }
  }

  // Pause the track.
  pause() {
    this.player.pause();
  }
}
