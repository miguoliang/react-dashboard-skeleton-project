type Item = Record<string, any>;

export default function wildCardSearch(
  list: Item[],
  input: string,
  specifyKey?: string
): Item[] {
  const searchText = (item: Item): boolean => {
    for (const key in item) {
      if (item[specifyKey ? specifyKey : key] == null) {
        continue;
      }
      if (
        item[specifyKey ? specifyKey : key]
          .toString()
          .toUpperCase()
          .indexOf(input.toString().toUpperCase()) !== -1
      ) {
        return true;
      }
    }
    return false;
  };
  return list.filter((value) => searchText(value));
}
