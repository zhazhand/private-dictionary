import { Pipe, PipeTransform } from "@angular/core";
import { ListItem } from "@interfaces/list-item.interface";
import { getClearWord } from "app/shared/utils";

@Pipe({
  name: "OrderBy",
})
export class OrderByPipe implements PipeTransform {
  transform(array: ListItem[], args: string): ListItem[] {
    let flag = true,
      arg: string = args;

    if (arg === "date") {
      flag = false;
    }
    array.sort((a: ListItem, b: ListItem) => {
      if (getClearWord(a[arg] as string) < getClearWord(b[arg] as string)) {
        return -1;
      } else if (
        getClearWord(a[arg] as string) > getClearWord(b[arg] as string)
      ) {
        return 1;
      } else {
        return 0;
      }
    });
    if (flag) {
      return array;
    } else {
      return array.reverse();
    }
  }
}
