import { audio, img, searchFilters } from "../lib/dom";
import { getSaved, removeSaved, save } from "../lib/utils";
import player from "../lib/player";
import { blankImage } from "../lib/imageUtils";
import { getDB, saveDB } from "../lib/libraryUtils";

const startupTabSwitch = <HTMLElement>document.getElementById('startupTab');
const defaultFilterSongs = <HTMLElement>document.getElementById('defaultFilterSongs');
const qualitySwitch = <HTMLElement>document.getElementById('qualitySwitch');
const thumbnailSwitch = <HTMLElement>document.getElementById('thumbnailSwitch');
const lazyLoadSwitch = <HTMLElement>document.getElementById('lazyThumbSwitch');
const discoverSwitch = <HTMLSelectElement>document.getElementById('discoverSwitch');
const discoverContainer = <HTMLDetailsElement>document.getElementById('discover');
const historySwitch = <HTMLElement>document.getElementById('historySwitch');
const historyContainer = <HTMLDetailsElement>document.getElementById('history');
const reverseNavSwitch = <HTMLElement>document.getElementById('reverseNavSwitch');
const fullscreenSwitch = <HTMLElement>document.getElementById('fullscreenSwitch');
const clearCacheBtn = <HTMLButtonElement>document.getElementById('clearCacheBtn');
const restoreSettingsBtn = <HTMLButtonElement>document.getElementById('restoreSettingsBtn');


/////////////////////////////////////////////////////////////

startupTabSwitch.addEventListener('click', () => {
  getSaved('startupTab') ?
    removeSaved('startupTab') :
    save('startupTab', 'search');
});

if (getSaved('startupTab'))
  startupTabSwitch.toggleAttribute('checked');


/////////////////////////////////////////////////////////////

defaultFilterSongs.addEventListener('click', () => {
  getSaved('defaultFilter') ?
    removeSaved('defaultFilter') :
    save('defaultFilter', 'songs');
  location.assign('/search');
});

if (getSaved('defaultFilter')) {
  defaultFilterSongs.toggleAttribute('checked');
  searchFilters.value = 'music_songs';
}

/////////////////////////////////////////////////////////////

qualitySwitch.addEventListener('click', async () => {
  getSaved('hq') ?
    removeSaved('hq') :
    save('hq', 'true');

  const timeOfSwitch = audio.currentTime;
  await player(audio.dataset.id);
  audio.currentTime = timeOfSwitch;
});

if (getSaved('hq') == 'true')
  qualitySwitch.toggleAttribute('checked');

/////////////////////////////////////////////////////////////

thumbnailSwitch.addEventListener('click', () => {
  getSaved('img') ?
    removeSaved('img') :
    save('img', 'off');
  location.reload();
});

if (getSaved('img')) {
  thumbnailSwitch.removeAttribute('checked');
  img.src = blankImage;
  img.classList.toggle('hide');
}

/////////////////////////////////////////////////////////////

lazyLoadSwitch.addEventListener('click', () => {
  getSaved('lazyImg') ?
    removeSaved('lazyImg') :
    save('lazyImg', 'true');
});

if (getSaved('lazyImg'))
  lazyLoadSwitch.toggleAttribute('checked');

/////////////////////////////////////////////////////////////

discoverSwitch.addEventListener('click', (e) => {
  if (discoverSwitch.hasAttribute('checked')) {
    const db = getDB();
    if (!confirm(`This will clear your existing ${Object.keys(db.discover).length || 0} discoveries, continue?`)) {
      e.stopImmediatePropagation();
      return;
    }
    delete db.discover;
    saveDB(db);
    discoverContainer.classList.add('hide');
    save('discover', 'off');

  } else {
    discoverContainer.classList.remove('hide');
    removeSaved('discover');
  }
});

if (getSaved('discover')) {
  discoverSwitch.removeAttribute('checked');
  discoverContainer.classList.add('hide');
}

/////////////////////////////////////////////////////////////

historySwitch.addEventListener('click', (e) => {
  if (historySwitch.hasAttribute('checked')) {
    const db = getDB();
    if (!confirm(`This will clear ${Object.keys(db.history).length || 0} items from your history, continue?`)) {
      e.stopImmediatePropagation()
      return;
    }
    historySwitch.toggleAttribute('checked');
    delete db.history;
    saveDB(db);
    historyContainer.classList.add('hide');
    save('history', 'off')
  }
  else {
    historyContainer.classList.remove('hide');
    removeSaved('history');
  }
});

if (getSaved('history')) {
  historySwitch.removeAttribute('checked');
  historyContainer.classList.add('hide')
}


/////////////////////////////////////////////////////////////

const nav = document.querySelector('nav') as HTMLDivElement;

reverseNavSwitch.addEventListener('click', () => {
  getSaved('reverseNav') ?
    removeSaved('reverseNav') :
    save('reverseNav', 'true');

  document.body.classList.toggle('reverseNav');
  nav.classList.toggle('reverseNav');
});

if (getSaved('reverseNav')) {
  reverseNavSwitch.toggleAttribute('checked');
  document.body.classList.toggle('reverseNav');
  nav.classList.add('reverseNav');
}

/////////////////////////////////////////////////////////////

fullscreenSwitch.addEventListener('click', () => {
  document.fullscreenElement ?
    document.exitFullscreen() :
    document.documentElement.requestFullscreen();
});

/////////////////////////////////////////////////////////////

clearCacheBtn.addEventListener('click', () => {
  self.caches.keys().then(s => { s.forEach(k => { self.caches.delete(k) }) });
  navigator.serviceWorker.getRegistrations().then(s => { s.forEach(r => { r.unregister() }) });
  location.reload();
});

restoreSettingsBtn.addEventListener('click', () => {
  const temp = getSaved('library');
  localStorage.clear();

  if (temp)
    save('library', temp);

  location.reload();
});

// emergency use
if (location.search === '?reset') {
  history.replaceState({}, '', location.pathname);
  clearCacheBtn.click();
  restoreSettingsBtn.click();
}
