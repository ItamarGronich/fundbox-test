import controller from './audioControls.controller'
import './audioControls.scss'


export default {
    template: `
    <button ng-class='ctrl.type' ng-click="ctrl.click()">
    </button>
    `,
    controller: controller.UID,
    controllerAs: "ctrl",
    bindings: {
      type: '<'
    }
}
