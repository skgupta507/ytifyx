import { createResource, createSignal, For, Match, Show, Switch } from "solid-js";
import { i18n } from "../scripts/i18n";
import StreamItem from "../components/StreamItem";


const getSearch = async (query: string) =>
  query ?
    fetch('https://pipedapi.leptons.xyz/' + query)
      .then(res => res.json())
    :
    undefined;

export default () => {

  const [getSuggestionIndex, setSuggestionIndex] = createSignal(0);
  const [getSuggestionData, setSuggestionData] = createSignal(undefined);
  const [getQuery, setQuery] = createSignal('');
  const [searchResults] = createResource(getQuery, getSearch);
  let superInput!: HTMLInputElement;
  let suggestions!: HTMLUListElement;
  let filters!: HTMLSelectElement;

  function searchLoader() {
    const searchQuery = '?q=' + superInput.value;
    const filterQuery = '&filter=' + filters.value;
    const query = 'search' + searchQuery + filterQuery;
    // const useInvidious = filters.selectedIndex > 8;

    //store.searchQuery = searchQuery + (filterQuery.includes('all') ? '' : filterQuery);
    setQuery(query);

    if (!superInput.value) {
      history.replaceState({}, '', location.origin + location.pathname);
      return
    }
    /*
      getSearchResults(
        useInvidious ?
          superInput.value : query,
        filters.value
      )
        .catch(err => {
          if (useInvidious && store.api.index >= store.api.invidious.length)
            store.api.index = -1;
    
          if (err.message === 'nextpage error') return;
    
          errorHandler(err.message, searchLoader);
        })
        .finally(() => loadingScreen.close());
    */

    //  history.replaceState({}, '', location.origin + location.pathname + store.searchQuery.replace('filter', 'f'));
    suggestions.style.display = 'none';

  }

  function SuperInput() {

    return <input
      ref={superInput}
      placeholder={i18n("search_placeholder")}
      type="search"
      id="superInput"
      autocomplete="off"
      oninput={async e => {

        const text = e.target.value;
        /*
                const id = idFromURL(text);
                if (id !== prevID) {
                  // player(id);
                  prevID = id;
                  return;
                }
                if (getSaved('search_suggestions')) return;
        */
        setSuggestionData(undefined);
        suggestions.style.display = 'none';

        if (text.length < 3) return;
        suggestions.style.display = 'block';


        const fetchSuggestions = async () => fetch('https://pipedapi.orangenet.cc' + '/opensearch/suggestions/?query=' + text)
          .then(res => res.json())
          .catch(console.error);

        const data = (await fetchSuggestions())[1];

        if (!data.length) return;

        setSuggestionData(data);
        setSuggestionIndex(0);
      }}

      onkeydown={e => {

        if (e.key === 'Enter') {
          searchLoader();
        }
        if (e.key === 'Backspace' ||
          /* getSaved('search_suggestions') ||*/
          !suggestions.hasChildNodes()
        ) return;

        suggestions.childNodes.forEach((node) => {
          if ((node as HTMLLIElement).classList.contains('hover'))
            (node as HTMLLIElement).classList.remove('hover');
        });

        let index = getSuggestionIndex();
        if (e.key === 'ArrowUp') {
          if (index === 0)
            index = suggestions.childElementCount;
          index--;

          const li = suggestions.children[index] as HTMLLIElement;
          superInput.value = li.textContent as string;
          li.classList.add('hover');
        }

        if (e.key === 'ArrowDown') {
          const li = suggestions.children[index] as HTMLLIElement;
          superInput.value = li.textContent as string;
          li.classList.add('hover');
          index++;
          if (index === suggestions.childElementCount) index = 0;
        }

        setSuggestionIndex(index);

      }}
    />

  }

  return <>
    <form
      id="superInputContainer"
      onsubmit={e => { e.preventDefault() }}
    >
      <SuperInput />
      <select
        id="searchFilters"
        ref={filters}
      >
        <optgroup label="YouTube">
          <option value="all">{i18n('search_filter_all')}</option>
          <option value="videos">{i18n('search_filter_videos')}</option>
          <option value="channels">{i18n('search_filter_channels')}</option>
          <option value="playlists">{i18n('search_filter_playlists')}</option>
        </optgroup>
        <optgroup label="YouTube Music">
          <option value="music_songs">{i18n('search_filter_music_songs')}</option>
          <option value="music_artists">{i18n('search_filter_music_artists')}</option>
          <option value="music_videos">{i18n('search_filter_music_videos')}</option>
          <option value="music_albums">{i18n('search_filter_music_albums')}</option>
          <option value="music_playlists">{i18n('search_filter_music_playlists')}</option>
        </optgroup>
        <optgroup label={i18n('search_filter_sort_by')}>
          <option value="date">{i18n('search_filter_date')}</option>
          <option value="views">{i18n('search_filter_views')}</option>
        </optgroup>
      </select>
    </form>
    <ul
      id="suggestions"
      ref={suggestions}
    >
      <For each={getSuggestionData()}>
        {(item) => (
          <li
            onclick={() => {
              superInput.value = item;

            }}
          >{item}</li>
        )}
      </For>
    </ul>
    <div id="searchlist">
      <Show when={getQuery()} fallback={<EmptyStateComponent />}>

        <Switch>
          <Match when={searchResults.loading}>
            <div class="loadingStateComponent">
              <i class="ri-loader-3-line"></i>
            </div >
          </Match>
          <Match when={searchResults.error}>
            <div class="loadingStateComponent">
              <p>Oh No there was an error!</p>
            </div >
          </Match>
          <Match when={searchResults()}>
            <For each={searchResults().items}>
              {(item) => (
                <StreamItem
                  id={item.videoId || item.url.substring(9)}
                  title={item.title}
                  author={(item.uploaderName || item.author) + (location.search.endsWith('music_songs') ? ' - Topic' : '')}
                  uploaded={item.uploadedDate || item.publishedText}
                  channelUrl={item.uploaderUrl || item.authorUrl}
                  duration='1:00'
                />
              )}
            </For>
          </Match>
        </Switch>
      </Show>
    </div>
  </>
}



const EmptyStateComponent = () =>
  <div class="emptyStateComponent">
    <i class="ri-search-2-line"></i>
    <p>Dive into the world of listening</p>
  </div >

