<script>
  import { contact } from "./data.js";

  const mapUrl =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(contact.address);
</script>

<section id="elerhetoseg" class="container wide contact-card">
  <h2>Elérhetőség</h2>

  <div class="cards flush">
    <article class="card">
      <h3>Helyszín</h3>
      <p>{contact.venue}</p>
      <p>{contact.address}</p>
    </article>
    <article class="card">
      <h3>E-mail</h3>
      <p><a href="mailto:{contact.email}">{contact.email}</a></p>
    </article>
    <article class="card">
      <h3>Közösségi média</h3>
      <div class="links">
        {#each contact.social as s}
          <a href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>
        {/each}
      </div>
    </article>
  </div>

  <a class="btn" href={mapUrl} target="_blank" rel="noopener noreferrer"
    >Megnyitás a térképen</a
  >
</section>
