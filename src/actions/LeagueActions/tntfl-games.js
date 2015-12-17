import { tntflurl } from './tntfl-config'

export function getGames(resolve, reject, from, to) {
  var url = tntflurl + '?view=json';
  url += from ? '&from=' + from : '';
  url += to ? '&to=' + to : '';
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      resolve(JSON.parse(request.responseText));
    }
    else {
      reject();
    }
  };
  request.onerror = () => {
    reject();
  };
  request.send();
}
