
export default class FreeMusicArchiveService {
  constructor($http, AppConstants) {
    this.$http = $http;
    this.appConstants = AppConstants;
  }

  static get domain() {
    return this.appConstants.domain || 'freemusicarchive.org';
  }

  static get apiUrl() {
    return this.appConstants.apiUrl || 'freemusicarchive.org';
  }

  static get protocol() {
    return this.appConstants.protocol || 'freemusicarchive.org';
  }

  getTracks(limit = 10) {
    return this.get('recent.json', {limit: limit});
  }

  get(path, params) {

    const { protocol, domain, apiUrl } = this.appConstants.freeMusicUrl;

    return this
    .$http
    .get(`${protocol}://${domain}/${path}`, {
      params: Object.assign({ 'api_key': this.appConstants.freeMusicApiKey }, params),
      responseType: 'json'
    })
    .then(response => response.data)
  }
}
