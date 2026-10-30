<script>
  import { galleryAlbums } from "./gallery.js";

  let activeAlbum = $state(null);
  let selected = $state(null);
  let closeBtn = $state();
  let opener = null;

  const album = $derived(
    activeAlbum === null ? null : galleryAlbums[activeAlbum],
  );
  const photos = $derived(album?.photos ?? []);
  const count = $derived(photos.length);

  function open(i, e) {
    opener = e.currentTarget;
    selected = i;
  }

  function close() {
    selected = null;
    opener?.focus();
  }

  function step(d) {
    selected = (selected + d + count) % count;
  }

  function onKey(e) {
    if (selected === null) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  }

  // Move focus to the close button when opened and prevent the background from scrolling.
  $effect(() => {
    if (selected !== null) {
      closeBtn?.focus();
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  });
</script>

<svelte:window onkeydown={onKey} />

<section id="galeria" class="container wide">
  <h2>Galéria</h2>
  {#if album}
    <button
      class="gallery-back"
      type="button"
      onclick={() => (activeAlbum = null)}>← Összes album</button
    >
    <h3 class="gallery-album-title">{album.title}</h3>
    <div class="gallery-grid">
      {#each photos as photo, i}
        <button
          class="thumb"
          type="button"
          aria-label="Kép megnyitása: {photo.alt}"
          onclick={(e) => open(i, e)}
        >
          <img src={photo.src} alt={photo.alt} loading="lazy" />
        </button>
      {/each}
    </div>
  {:else}
    <div class="gallery-albums">
      {#each galleryAlbums as item, i}
        <button
          class="gallery-album"
          type="button"
          onclick={() => (activeAlbum = i)}
        >
          <span class="gallery-album-cover">
            <img src={item.photos[0].src} alt="" loading="lazy" />
            <span class="gallery-folder-icon" aria-hidden="true">📁</span>
          </span>
          <span class="gallery-album-info">
            <strong>{item.title}</strong>
            <span>{item.photos.length} kép</span>
          </span>
        </button>
      {/each}
    </div>
  {/if}
</section>

{#if selected !== null}
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
  <div
    class="lightbox"
    role="dialog"
    tabindex="-1"
    aria-modal="true"
    aria-label="Képnézegető"
    onclick={(e) => {
      if (e.target === e.currentTarget) close();
    }}
  >
    <button
      class="lb-btn lb-close"
      type="button"
      aria-label="Bezárás"
      bind:this={closeBtn}
      onclick={close}>×</button
    >
    <button
      class="lb-btn lb-prev"
      type="button"
      aria-label="Előző kép"
      onclick={() => step(-1)}>‹</button
    >
    <figure>
      <img src={photos[selected].src} alt={photos[selected].alt} />
      <figcaption>{photos[selected].alt} ({selected + 1}/{count})</figcaption>
    </figure>
    <button
      class="lb-btn lb-next"
      type="button"
      aria-label="Következő kép"
      onclick={() => step(1)}>›</button
    >
  </div>
{/if}
