
export default class PlayerService {

  constructor(FreeMusicArchiveService) {
    this.fm = FreeMusicArchiveService;
  }

  getSongs() {
    return this.fm.getTracks();
  }
}
