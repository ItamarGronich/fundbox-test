// Import Style
import './app.scss';

import angular from 'angular';

// Import base modules
import config from './app.config';
import appConstants from 'appConstants';


export default angular.module('fundbox-test', [])
  .config(config)
  .constant("AppConstants", appConstants)
  .name;
