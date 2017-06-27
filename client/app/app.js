// Import Style
import './app.scss';

import angular from 'angular';

// Import base modules
import appConstants from 'appConstants';

// Components.
import PlayerComponent from './components/player/player.component';
import PlayerController from './components/player/player.controller';

// Services.
import FreeMusicArchiveService from './services/FreeMusicArchive.service';
import PlayerService from './components/player/player.service';

export default angular.module('fundbox-test', [])
  .constant("AppConstants", appConstants)

  // Platyer component.
  .controller(PlayerController.UID, PlayerController)
  .component('player', PlayerComponent)

  .service('FreeMusicArchiveService', FreeMusicArchiveService)
  .service('PlayerService', PlayerService)

  .name;
