<script>
  import { club } from './data.js';
</script>

<section id="rolunk" class="container wide">
  <h2>Rólunk</h2>
  {#each club.intro as paragraph}
    <p class="description">{paragraph}</p>
  {/each}

  <div class="cards">
    {#each club.highlights as item}
      <article class="card">
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </article>
    {/each}
  </div>
</section>
