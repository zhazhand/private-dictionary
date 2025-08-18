import { Pipe, PipeTransform } from "@angular/core";
import { searchSubstringMatches } from "app/shared/utils";
import { ListItem } from "@interfaces/list-item.interface";

@Pipe({
  name: "listFilter",
})
export class ListFilterPipe implements PipeTransform {
  transform(
    list: ListItem[],
    searchString: string,
    fieldName: string,
  ): ListItem[] {
    return searchSubstringMatches(list, searchString, fieldName);
  }
}
