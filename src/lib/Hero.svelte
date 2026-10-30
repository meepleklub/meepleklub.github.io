<script>
  import { club } from './data.js';
</script>

<section id="top" class="container narrow">
  <img class="logo-placeholder" src="/logo.png" alt="{club.name} logó" width="160" height="160" />
  <h1>{club.name}</h1>
  <h2>{club.subtitle}</h2>
  <p class="slogan">{club.slogan}</p>
  <div class="features">
    {#each club.features as feature}
      <span>{feature}</span>
    {/each}
  </div>
  <p class="description">{club.intro[0]}</p>
</section>
