import { ListItem } from "@interfaces/list-item.interface";

export function searchSubstringMatches(
  list: ListItem[],
  searchString: string,
  fieldName: string,
): ListItem[] {
  if (!list.length || !searchString) {
    return list;
  }

  const altString: string = `(to) ${searchString}`;

  return list.filter(
    (word: ListItem) =>
      !(word[fieldName]! as string)
        .toLowerCase()
        .indexOf(searchString.toLowerCase()) ||
      (word[fieldName]! as string)
        .toLowerCase()
        .indexOf(altString.toLowerCase()) !== -1,
  );
}

export function getClearWord(val: string): string {
  const regex = /^\(to\)\s|^to\s|^a\s/i;
  return val.replace(regex, "");
}
