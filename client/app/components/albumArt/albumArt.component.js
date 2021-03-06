import controller from './albumArt.controller'
import './albumArt.scss';
import '../../../assets/images/play.svg';


export default {
    template: `
        <div>
            <img class="AlbumArt" onerror="this.src = '/play.svg';" ng-style="ctrl.dimensions" ng-src="{{ctrl.imgUrl || '/play.svg'}}"/>
        </div>
    `,
    controller: controller.UID,
    controllerAs: "ctrl",
    bindings: {
      imgUrl: '<'
    }
}
