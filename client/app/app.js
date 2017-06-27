// Import Style
import './app.scss';

import angular from 'angular';

// Import base modules
import appConstants from 'appConstants';

// Components.
import PlayerComponent from './components/player/player.component';
import PlayerController from './components/player/player.controller';

export default angular.module('fundbox-test', [])
  .constant("AppConstants", appConstants)

  // Platyer component.
  .controller(PlayerController.UID, PlayerController)
  .component('player', PlayerComponent)

  .name;
