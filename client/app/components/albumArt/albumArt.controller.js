export default class AlbumArtController {
  static get UID(){
    return "albumArtController"
  }

  /* @ngInject */
  constructor($scope) {

    this.$scope = $scope;

    window.onresize = () => {
      this.calculateDimensions();
      $scope.$digest();
    };

    this.playerWrapper = document.querySelector('.Player-wrapper');

    this.calculateDimensions();
  }

  calculateDimensions() {
    const
      w = this.playerWrapper.clientWidth,
      h = this.playerWrapper.clientHeight;

    this.dimensions = {
      'width': w > h ? '100%' : 'auto',
      'height': h > w ? '100%' : 'auto'
    };

  }

}
