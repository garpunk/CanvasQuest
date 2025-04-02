export function filterArtworksById(data, validIds) {
  return data.filter((artwork) => validIds.includes(artwork.id));
}

export function getArtworkById(data, id) {
  return data.find((artwork) => artwork.id === parseInt(id));
}
