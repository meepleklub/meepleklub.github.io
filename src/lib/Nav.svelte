<script>
  import { club } from "./data.js";
  import { galleryAlbums } from "./gallery.js";

  let menuOpen = $state(false);

  function onKeydown(event) {
    if (event.key === "Escape") menuOpen = false;
  }
</script>

<svelte:window onkeydown={onKeydown} />

<header class="nav">
  <nav class="nav-inner" aria-label="Fő navigáció">
    <a class="nav-brand" href="/index.html">
      <img src="/logo.png" alt="" width="36" height="36" />
      <span>{club.name}</span>
    </a>
    <button
      class="nav-toggle"
      type="button"
      aria-label={menuOpen ? "Menü bezárása" : "Menü megnyitása"}
      aria-expanded={menuOpen}
      aria-controls="primary-links"
      onclick={() => (menuOpen = !menuOpen)}
    >
      <span class="nav-toggle-icon" aria-hidden="true"
        ><i></i><i></i><i></i></span
      >
    </button>
    <ul id="primary-links" class="nav-links" class:open={menuOpen}>
      <li><a href="/pages/rolunk.html">Rólunk</a></li>
      <li><a href="/pages/klubnapok.html">Klubnapok</a></li>
      {#if galleryAlbums.length > 0}
        <li><a href="/pages/galeria.html">Galéria</a></li>
      {/if}
      <li><a href="/pages/elerhetoseg.html">Elérhetőség</a></li>
    </ul>
  </nav>
</header>
