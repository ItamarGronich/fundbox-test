export default class AudioControlsController {
  static get UID(){
    return "AudioControlsController"
  }

  /* @ngInject */
  constructor($rootScope) {
    this.$rootScope = $rootScope;
  }

  click() {
    this.$rootScope.$broadcast('audioControl', this.type);
  }

}
