/* @refresh reload */

import Home from './core/Home';
import Library from './core/Library';
import Upcoming from './core/Upcoming';
import './stylesheets/global.css';
import { render } from 'solid-js/web';



addEventListener('i18nLoaded', () => {
  render(() => {
    let dlog!: HTMLDialogElement;

    return (<>
      <main>
        <Upcoming />
        <Home />
        <Library />
      </main>

      <footer>
        <progress
          value="35"
          max="100"
          onclick={() => {
            if (dlog.open)
              dlog.close();
            else
              dlog.showModal();
          }}
        ></progress>
        <img src="https://wsrv.nl/?url=https://i.ytimg.com/vi_webp/OKRfeAOkbsw/maxresdefault.webp&w=180&h=180&fit=cover"
          crossorigin="anonymous" id="miniThumbnail" alt="mini player thumbnail" />
        <div class="info">
          <p class="title">Really Blue</p>
          <p class="artist">Shallou</p>
        </div>
        <button
          class="ri-pause-circle-fill"
          id="playButton"
          data-playbackstate="none"
          aria-label="Play"
          onclick={() => console.log(false)}
        ></button>
        <button class="ri-skip-forward-line" id="skipButton" data-playbackstate="none" aria-label="Play"></button>
      </footer>

      <audio></audio>

      <dialog
        ref={dlog}
        onclick={() => {
          dlog.close();
        }}
      >
        test dialog
      </dialog>
    </>)
  },
    document.body);
});




/*
import './scripts/router';
import './scripts/audioEvents';
import './scripts/list';
import './scripts/search';
import './scripts/library';
import { render } from 'solid-js/web';
import { actionsMenu, superCollectionList } from './lib/dom';

addEventListener('DOMContentLoaded', async () => {

  const settingsContainer = document.getElementById('settings') as HTMLDivElement;
  const stngs = await import('./components/Settings');
  render(stngs.default, settingsContainer);
  settingsContainer.appendChild(document.getElementById('actionsContainer')!);

  const start = await import('./modules/start')
  start.default();

  const amenu = await import('./components/ActionsMenu');
  render(amenu.default, actionsMenu);

  const sclist = await import('./components/SuperCollectionList.tsx');
  render(sclist.default, superCollectionList);

  if (import.meta.env.PROD)
    await import('virtual:pwa-register').then(pwa => {
      const handleUpdate = pwa.registerSW({
        onNeedRefresh() {
          import('./components/UpdatePrompt').then(mod =>
            render(() => mod.default(handleUpdate),
              document.body
            ));
        }
      });
    });

})
*/
