export default () => {
  return (
    <>
      <div id="upperLayer">
        <div id="meta">
          <div id="upperButtonLayer">
            <span id="volumeContainer">
              <label data-translation-aria-label="player_volume" for="volumeChanger" class="ri-volume-up-fill"></label>
              <input type="range" min="0" max="100" value="100" id="volumeChanger" />
            </span>
            <i data-translation-aria-label="player_loop" class="ri-repeat-line" id="loopButton"></i>
            <input type="checkbox" id="favButton" />
            <label data-translation-aria-label="player_like" for="favButton" class="ri-heart-line"></label>
            <i data-translation-aria-label="player_more" class="ri-more-2-fill" id="moreBtn"></i>
          </div>
        </div>
      </div>

      <span id="trackline">
        <input type="range" value="0" id="progress" />
        <div>
          <p id="currentDuration">00:00</p>
          <p id="fullDuration">00:00</p>
        </div>
      </span>

      <div id="playerControls">
        <button data-translation-aria-label="player_play_previous" class="ri-skip-back-line"
          id="playPrevButton"></button>
        <button data-translation-aria-label="player_seek_backward" class="ri-replay-15-line"
          id="seekBwdButton"></button>


        <button data-translation-aria-label="player_seek_forward" class="ri-forward-15-line"
          id="seekFwdButton"></button>
        <button data-translation-aria-label="player_play_next" class="ri-skip-forward-line"
          id="playNextButton"></button>

      </div>

      <div id="playerSelectors">

        <select id="playSpeed">
          <option value="0.25">0.25x</option>
          <option value="0.50">0.50x</option>
          <option value="0.75">0.75x</option>
          <option value="1.00" selected>1.00x</option>
          <option value="1.25">1.25x</option>
          <option value="1.50">1.50x</option>
          <option value="1.75">1.75x</option>
          <option value="2.00">2.00x</option>
          <option value="2.50">2.50x</option>
          <option value="3.00">3.00x</option>
          <option value="3.50">3.50x</option>
          <option value="4.00">4.00x</option>
        </select>
        <select id="bitrateSelector">
          <option>Bitrate</option>
        </select>
        <svg id="ytifyIcon" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 4172 4172" width="1.5rem"
          height="1.5rem" style="transform: scale(1.5);overflow:hidden;">

          <path fill="var(--text)"
            d="m1368 3037-55-10-23-6a369 369 0 0 1-57-19 552 552 0 0 1-266-246 437 437 0 0 1-31-74 590 590 0 0 1-18-245l5-25c7-35 21-77 35-105l9-19a522 522 0 0 1 679-236c1 5-1 77-3 91a1059 1059 0 0 1-24 119 274 274 0 0 1-19 53c-1 0-7-5-14-13-40-46-95-77-160-91a290 290 0 0 0-186 542 287 287 0 0 0 202 23c61-15 120-54 159-105a1108 1108 0 0 0 149-360 1296 1296 0 0 0 27-274 1164 1164 0 0 0-226-667 146 146 0 0 1-21-39l-4-9-4-11c-8-16-18-53-24-84-5-27-5-72 0-95 10-49 32-84 69-115 24-20 50-34 87-47a740 740 0 0 1 79-19c23-4 134-6 167-3a1364 1364 0 0 1 446 118l20 8 20 8 18 8a2232 2232 0 0 1 652 439 1008 1008 0 0 1 234 338c4 5 16 57 20 83 2 17 1 63-3 79-18 83-71 135-171 167-34 11-106 20-130 16-43-7-194-7-249 0-67 9-142 23-179 34l-34 10a974 974 0 0 0-94 33 1245 1245 0 0 0-170 84 1182 1182 0 0 0-405 414 529 529 0 0 1-347 244c-40 9-112 11-160 6zm1441-892 14-2c21-2 58-13 76-22 34-17 54-37 67-69 6-16 7-19 7-44 1-26 1-28-6-54-32-125-167-280-368-420-80-56-200-124-282-159l-26-12a1286 1286 0 0 0-124-47c-39-14-128-36-170-42l-18-3c-19-3-41-4-87-4-56 0-71 2-105 13-68 23-101 65-101 130a201 201 0 0 0 17 82c3 9 21 46 31 64 68 112 187 227 351 338a1827 1827 0 0 0 446 214 1084 1084 0 0 0 219 39c1 1 50-1 59-2z" />
        </svg>
      </div>
    </>
  );
}
