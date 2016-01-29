import { tntflurl } from './tntfl-config'

export function getSeasons(resolve, reject) {
  var request = new XMLHttpRequest();
  request.open('GET', tntflurl, true);
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
