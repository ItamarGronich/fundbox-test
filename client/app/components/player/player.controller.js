export default class playerController {
  static get UID(){
    return "playerController"
  }

  /* @ngInject */
  constructor(PlayerService) {

    PlayerService.getSongs()
      .then(response => this.songs = response.dataset)
  }
}
