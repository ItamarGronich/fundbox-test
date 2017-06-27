// Import Style
import './app.scss';

import angular from 'angular';

// Import base modules
import appConstants from 'appConstants';


export default angular.module('fundbox-test', [])
  .constant("AppConstants", appConstants)
  .name;
