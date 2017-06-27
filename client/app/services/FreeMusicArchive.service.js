
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

  getTracks(limit = 10, genre = 'Folk') {
    return this.get('tracks.json', {limit: limit, genreHandle: genre});
  }

  get(path, params) {

    const { protocol, domain, apiUrl } = this.appConstants.freeMusicUrl;

    return this
    .$http
    .get(`${protocol}://${domain}/${apiUrl}/${path}`, {
      params: Object.assign({ 'api_key': this.appConstants.freeMusicApiKey }, params),
      responseType: 'json'
    })
    .then(response => response.data)
  }
}
