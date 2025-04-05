import Search from "../plugins/Search";
import { createSignal, Match, onMount, Switch } from "solid-js";

export default () => {

  const [currentPlugin, setCurrentPlugin] = createSignal('search');
  let container!: HTMLDivElement;

  onMount(() => {
    if (matchMedia('(orientation: portrait)').matches)
      container.scrollIntoView();
  });

  return (
    <section id="home" ref={container}>
      <header>
        <p>Home</p>
        <details>
          <summary><i class="ri-more-2-fill"></i></summary>
          <ul>
            <li>Settings</li>
            <li>About</li>
          </ul>
        </details>

      </header>

      <nav
        id="pluginSelector"
        oninput={e => {
          setCurrentPlugin((e.target as HTMLInputElement).value);
        }}
      >
        <input type="radio" id="r.search" name="pluginChips" value="search" checked />
        <label for="r.search">Search</label>
        <input type="radio" id="r.featured" name="pluginChips" value="featured" />
        <label for="r.featured">Featured</label>
        <input type="radio" id="r.trending" name="pluginChips" value="trending" />
        <label for="r.trending">Trending</label>
        <input type="radio" id="r.jiosaavn" name="pluginChips" value="jiosaavn" />
        <label for="r.jiosaavn">JioSaavn</label>
      </nav>
      {/* Plugin Interface */}
      <Switch fallback={<EmptyStateComponent />}>
        <Match when={currentPlugin() === 'search'}>
          <Search />
        </Match>
      </Switch>

    </section>
  );
}


const EmptyStateComponent = () =>
  <div class="emptyStateComponent">
    <i class="ri-t-shirt-2-line"></i>
    <p>Nothing but Shirts here...</p>
  </div >
