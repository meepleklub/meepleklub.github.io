// Each subdirectory is an album, and every image inside it belongs to that album.
const imageFiles = import.meta.glob('/src/assets/gallery/*/*.{avif,gif,jpg,jpeg,png,svg,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
});

const albums = new Map();

for (const [path, src] of Object.entries(imageFiles).sort(([a], [b]) => a.localeCompare(b, 'hu'))) {
  const [, title, filename] = path.match(/\/gallery\/([^/]+)\/([^/]+)$/) ?? [];
  if (!title || !filename) continue;

  if (!albums.has(title)) albums.set(title, { title, photos: [] });
  albums.get(title).photos.push({
    src,
    alt: filename.replace(/\.[^.]+$/, ''),
  });
}

export const galleryAlbums = [...albums.values()];
