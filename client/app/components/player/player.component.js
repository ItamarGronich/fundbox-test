import controller from './player.controller'
import './player.scss'

export default {
    template: `
    <main class='Player'>
      <div ng-repeat="song in ctrl.songs"> {{song.track_title}}</div>
    </main>
    `,
    controller: controller.UID,
    controllerAs: "ctrl"
}
