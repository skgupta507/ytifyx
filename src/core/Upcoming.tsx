import { For } from "solid-js";
import { i18n } from "../scripts/i18n";

export default () => {

  return (
    <section id="upcoming">
      <header>
        <p>Upcoming</p>
        <details>
          <summary><i class="ri-more-2-fill"></i></summary>
          <ul id="queuetools">

            <li>
              <i class="ri-shuffle-line"></i>&nbsp;{i18n('upcoming_shuffle')}
            </li>

            <li onclick={e => {
              e.target.classList.toggle('on');
            }}>
              <i class="ri-subtract-line"></i>&nbsp;{i18n('upcoming_remove')}
            </li>

            <li onclick={e => {
              e.target.classList.toggle('on');
            }}>
              <i class="ri-filter-2-line"></i>&nbsp;{i18n('upcoming_filter_lt10')}
            </li>

            <li onclick={e => {
              e.target.classList.toggle('on');
            }}>
              <i class="ri-file-copy-line"></i>&nbsp;{i18n('upcoming_allow_duplicates')}
            </li>

            <li onclick={e => {
              e.target.classList.toggle('on');
            }}>
              <i class="ri-list-check-2"></i>&nbsp;{i18n('upcoming_enqueue_related')}
            </li>

            <li>
              <i class="ri-close-line"></i>&nbsp;{i18n('upcoming_clear')}
            </li>

          </ul>
        </details>
      </header>

      <div id="queuelist">
        <For each={Array(0).fill(null)} fallback={<EmptyStateComponent />} >
          {() => (
            <a>
              <h1>test</h1>
            </a>
          )}
        </For>
      </div>
    </section>
  );
};

const EmptyStateComponent = () =>
  <div class="emptyStateComponent">
    <i class="ri-skip-forward-line"></i>
    <p>An empty queue</p>
  </div >
