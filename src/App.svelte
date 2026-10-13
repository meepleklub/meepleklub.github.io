<script>
  import Nav from './lib/Nav.svelte';
  import Hero from './lib/Hero.svelte';
  import About from './lib/About.svelte';
  import Schedule from './lib/Schedule.svelte';
  import Gallery from './lib/Gallery.svelte';
  import Contact from './lib/Contact.svelte';
  import { club } from './lib/data.js';

  const year = new Date().getFullYear();
  const page = window.location.pathname.split('/').pop()?.replace(/\.html$/, '') || 'index';
</script>

<Nav />

<main>
  {#if page === 'index' || page === ''}
    <Hero />
  {:else if page === 'rolunk'}
    <About />
  {:else if page === 'klubnapok'}
    <Schedule />
  {:else if page === 'galeria'}
    <Gallery />
  {:else if page === 'elerhetoseg'}
    <Contact />
  {:else}
    <Hero />
  {/if}
</main>

<footer>© {year} {club.name}</footer>
