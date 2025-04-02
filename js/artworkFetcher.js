export function fetchArtworkData(url) {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error loading artwork data:', error);
      return null;
    });
}
