export function filterImages(content) {
  const filteredItem = [];

  for (const item of content) {
    item.poster_path == null ? 0 : filteredItem.push(item);
  }
  return filteredItem;
}
