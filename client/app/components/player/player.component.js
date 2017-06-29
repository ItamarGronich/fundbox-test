import controller from './player.controller'
import './player.scss'

export default {
    template: `
    <section class='Player'>

      <album-art img-url="ctrl.track.track_image_file"> </album-art>

      <footer class="Controls">
        <section class="Controls-buttons">
            <audio-controls type="'prev'"></audio-controls>
            <audio-controls ng-if="ctrl.playerState === ctrl.playerStates.PAUSED" type="'play'"></audio-controls>
            <audio-controls ng-if="ctrl.playerState === ctrl.playerStates.LOADING" type="'loading'"></audio-controls>
            <audio-controls ng-if="ctrl.playerState === ctrl.playerStates.PLAYING" type="'pause'"></audio-controls>
            <audio-controls type="'next'"></audio-controls>
        </section>
        

        <section class="Controls-status">
            <track-status track="ctrl.track" current-time="ctrl.currentTime"></track-status>
        </section>
      </footer>
    </section>
    `,
    controller: controller.UID,
    controllerAs: "ctrl"
}
