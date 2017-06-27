export default class playerController {
  static get UID(){
    return "playerController"
  }

  /* @ngInject */
  constructor(PlayerService, $element, $scope) {

    this.player = new Audio();

    PlayerService.getSongs()
      .then(response => this.songs = response.aTracks);

    $scope.$on('audioControl', (event, type) => this.handleControl(type))
  }

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

  play() {
    if (this.songs && this.songs.length > 0) {
      if (!this.player.src) {
        this.player.src = this.songs[0].track_listen_url;
        this.play();
      } else {
        this.player.play().then(playing => console.dir('playing'), e => console.log(e));
      }
    }
  }

  pause() {
    this.player.pause();
  }

  next() {

  }

  previous() {

  }
}
