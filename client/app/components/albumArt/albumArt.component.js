import controller from './albumArt.controller'
import './albumArt.scss'


export default {
    template: `
    <img ng-src="ctrl.imgUrl"/>
    `,
    controller: controller.UID,
    controllerAs: "ctrl",
    bindings: {
      imgUrl: '<'
    }
}
