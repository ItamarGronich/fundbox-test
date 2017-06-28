// Import Style
import './app.scss';

import angular from 'angular';

// Import base modules
import appConstants from 'appConstants';

// Components.
import PlayerComponent from './components/player/player.component';
import PlayerController from './components/player/player.controller';
import AudioControlsComponent from './components/audioControls/audioControls.component';
import AudioControlsController from './components/audioControls/audioControls.controller';
import TrackStatusComponent from './components/trackStatus/trackStatus.component';
import TrackStatusController from './components/trackStatus/trackStatus.controller';

// Services.
import FreeMusicArchiveService from './services/FreeMusicArchive.service';
import PlayerService from './components/player/player.service';

export default angular.module('fundbox-test', [])
  .constant("AppConstants", appConstants)

  // Player component.
  .controller(PlayerController.UID, PlayerController)
  .component('player', PlayerComponent)

  // Audio controls component.
  .controller(AudioControlsController.UID, AudioControlsController)
  .component('audioControls', AudioControlsComponent)

  // Track status component.
  .controller(TrackStatusController.UID, TrackStatusController)
  .component('trackStatus', TrackStatusComponent)

  .service('FreeMusicArchiveService', FreeMusicArchiveService)
  .service('PlayerService', PlayerService)

  .name;
