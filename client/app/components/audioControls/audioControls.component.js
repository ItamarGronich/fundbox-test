import controller from './audioControls.controller'
import './audioControls.scss'


export default {
    template: `
    <button class='{{type}}' ng-click="ctrl.click()">
      {{ctrl.type}}
    </button>
    `,
    controller: controller.UID,
    controllerAs: "ctrl",
    bindings: {
      type: '<'
    }
}
