<script>
  import { onMount } from 'svelte';

  let schedule = [];
  let events = [];
  let loadError = '';
  let now = new Date();

  const fmtDate = new Intl.DateTimeFormat('hu-HU', {
    weekday: 'long', month: 'long', day: 'numeric',
  });
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let field = '';
    let quoted = false;
    for (let i = 0; i < text.length; i += 1) {
      const char = text[i];
      if (char === '"' && quoted && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        quoted = !quoted;
      } else if (char === ',' && !quoted) {
        row.push(field);
        field = '';
      } else if ((char === '\n' || char === '\r') && !quoted) {
        if (char === '\r' && text[i + 1] === '\n') i += 1;
        row.push(field);
        if (row.some((cell) => cell.trim())) rows.push(row);
        row = [];
        field = '';
      } else {
        field += char;
      }
    }
    row.push(field);
    if (row.some((cell) => cell.trim())) rows.push(row);

    const headers = rows.shift()?.map((header) => header.trim()) ?? [];
    return rows.map((cells) => Object.fromEntries(
      headers.map((header, index) => [header, (cells[index] ?? '').trim()]),
    ));
  }

  function localDate(isoDate) {
    const [year, month, day] = isoDate.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  function eventEnd(date, time) {
    const end = new Date(date);
    if (time) {
      const [hours, minutes] = time.split(':').map(Number);
      end.setHours(hours, minutes, 0, 0);
    } else {
      end.setHours(23, 59, 59, 999);
    }
    return end;
  }

  function nextWeekly(item) {
    const date = new Date(now);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + ((Number(item.weekday) - date.getDay() + 7) % 7));
    if (eventEnd(date, item.to) < now) date.setDate(date.getDate() + 7);
    return date;
  }

  $: upcoming = [
    ...schedule.map((item) => ({ ...item, date: nextWeekly(item) })),
    ...events.map((item) => ({ ...item, date: localDate(item.date) })),
  ]
    .filter((item) => eventEnd(item.date, item.to) >= now)
    .sort((a, b) => a.date - b.date);
  $: next = upcoming[0];
  $: specials = upcoming.filter((item) => item.type === 'special');

  onMount(async () => {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}klubnapok.csv`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const records = parseCsv(await response.text());
      schedule = records.filter((item) => item.type === 'weekly');
      events = records.filter((item) => item.type === 'special' && item.date);
    } catch (error) {
      loadError = 'A klubnapok listája most nem tölthető be.';
      console.error('A klubnapok CSV betöltése sikertelen:', error);
    }
  });
</script>

<section id="klubnapok" class="container wide">
  <h2>Klubnapok</h2>

  {#if loadError}
    <p role="status">{loadError}</p>
  {:else if next}
    <a class="next-up" href={next.url} target="_blank" rel="noopener noreferrer">
      <span class="label">Következő alkalom</span>
      <strong>{cap(fmtDate.format(next.date))}</strong>
      <span>{[next.from && next.to ? `${next.from}–${next.to}` : '', next.title].filter(Boolean).join(', ')}</span>
    </a>
  {/if}

  <h3 class="sub-title">Minden héten</h3>
  <div class="cards flush">
    {#each schedule as item}
      <article class="card">
        <h3>{item.day}</h3>
        {#if item.from && item.to}<p class="time">{item.from}–{item.to}</p>{/if}
        <p class="card-title">{item.title}</p>
        <p>{item.note}</p>
      </article>
    {/each}
  </div>

  {#if specials.length}
    <h3 class="sub-title">Különleges alkalmak</h3>
    <div class="cards flush">
      {#each specials as item}
        <a class="card special-event-link" href={item.url} target="_blank" rel="noopener noreferrer">
          <p class="card-date">{cap(fmtDate.format(item.date))}</p>
          {#if item.from && item.to}<p class="time">{item.from}–{item.to}</p>{/if}
          <p class="card-title">{item.title}</p>
          <p>{item.note}</p>
        </a>
      {/each}
    </div>
  {/if}
</section>
