import controller from './player.controller'
import './player.scss'

export default {
    template: `
    <section class='Player'>

      <album-art img-url="ctrl.track.track_image_file"> </album-art>

      <footer class="Controls">
        <audio-controls type="'play'"></audio-controls>
        <audio-controls type="'pause'"></audio-controls>
        <audio-controls type="'next'"></audio-controls>
        <audio-controls type="'prev'"></audio-controls>

        <track-status track="ctrl.track" current-time="ctrl.currentTime"></track-status>
      </footer>
    </section>
    `,
    controller: controller.UID,
    controllerAs: "ctrl"
}
