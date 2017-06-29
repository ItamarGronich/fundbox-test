import controller from './trackStatus.controller'
import './trackStatus.scss'


export default {
    template: `
    <section class="TrackStatus">
      <header class="TrackStatus-header">
        <span class="TrackStatus-trackTitle"> {{ctrl.track.track_title}} </span>
        <span class="TrackStatus-artistName"> {{ctrl.track.artist_name}} </span>
      </header>

      <div class="TrackStatus-progressWrapper">
        <div class="TrackStatus-progressBar" ng-style="ctrl.barWidthStyle"></div>
        <input
        class="TrackStatus-progress"
        type="range"
        min="0"
        max="1000"
        ng-model="ctrl.progressNumber"
        ng-mouseup="ctrl.seek()"/>
      </div>
      
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
