import controller from './trackStatus.controller'
import './trackStatus.scss'


export default {
    template: `
    <section class="TrackStatus">
      <header class="TrackStatus-header">
        <span class="TrackStatus-trackTitle"> {{ctrl.track.track_title}} </span>
        <span class="TrackStatus-artistName"> {{ctrl.track.artist_name}} </span>
      </header>

      <p class="TrackStatus-progressWrapper">
        <input
        class="TrackStatus-progress"
        type="range"
        min="0"
        max="100"
        ng-model="ctrl.progressPercentage"
        ng-mouseup="ctrl.seek()"/>
      </p>
      
      <p class="TrackStatus-timeWrapper">
        <span class="TrackStatus-currentTime"> {{ctrl.currentHumanTime || '--:--'}} </span>
        <span class="TrackStatus-totalTime"> {{ctrl.track.track_duration || '--:--'}} </span>
      </p>
    </section>

    `,
    controller: controller.UID,
    controllerAs: "ctrl",
    bindings: {
      progressPercentage: '<',
      totalTime: '<',
      currentTime: '<',
      track: '<'
    }
}
