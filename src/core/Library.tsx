import { For } from "solid-js";
import { i18n } from "../scripts/i18n";

export default () => (
  <section id="library">

    <header>
      <p>Library</p>

      <details>
        <summary><i class="ri-more-2-fill"></i></summary>

        <ul id="libraryActions">
          <li>
            <label id="importBtn" for="upload">
              <i class="ri-import-line"></i>
              &nbsp;{i18n('library_import')}
            </label>
            <input type="file" id="upload" />
          </li>
          <li id="exportBtn">
            <i class="ri-export-line"></i>&nbsp;{i18n('library_export')}
          </li>
          <li id="cleanLibraryBtn">
            <i class="ri-delete-bin-2-line"></i>&nbsp;{i18n('library_clean')}
          </li>
          <li id="importPipedBtn">
            <i class="ri-import-line"></i>&nbsp;{i18n('settings_import_from_piped')}
          </li>
        </ul>

      </details>

    </header>

    <nav id="superCollectionSelector">
      <input type="radio" id="r.collections" name="superCollectionChips" value="collections" checked />
      <label for="r.collections">{i18n('library_collections')}</label>
      <input type="radio" id="r.playlists" name="superCollectionChips" value="playlists" />
      <label for="r.playlists">{i18n('library_playlists')}</label>
      <input type="radio" id="r.albums" name="superCollectionChips" value="albums" />
      <label for="r.albums">{i18n('library_albums')}</label>
      <input type="radio" id="r.artists" name="superCollectionChips" value="artists" />
      <label for="r.artists">{i18n('library_artists')}</label>
      <input type="radio" id="r.channels" name="superCollectionChips" value="channels" />
      <label for="r.channels">{i18n('library_channels')}</label>
      <input type="radio" id="r.feed" name="superCollectionChips" value="feed" />
      <label for="r.feed">{i18n('library_feed')}</label>
      <input type="radio" id="r.for_you" name="superCollectionChips" value="for_you" />
      <label for="r.for_you">{i18n('library_for_you')}</label>
    </nav>

    <div id="superCollectionList">
      <a class="collectionItem" id="discover" href="/list?collection=discover">
        <i class="ri-compass-3-line"></i>&nbsp;{i18n('library_discover')}
      </a>
      <a class="collectionItem" id="history" href="/list?collection=history">
        <i class="ri-memories-line"></i>&nbsp;{i18n('library_history')}
      </a>
      <a class="collectionItem" id="favorites" href="/list?collection=favorites">
        <i class="ri-heart-fill"></i>&nbsp;{i18n('library_favorites')}
      </a>
      <a class="collectionItem" id="listenLater" href="/list?collection=listenLater">
        <i class="ri-calendar-schedule-line"></i>&nbsp;{i18n('library_listen_later')}
      </a>
      <For each={Array(5).fill(null)}>
        {(_, i) => (
          <a class="collectionItem" id={'test' + i()} href={"/list?collection=test" + i()}>
            <i class="ri-play-list-2-fill"></i>&nbsp;{i()}
          </a>
        )}
      </For>
    </div>
  </section>
);
