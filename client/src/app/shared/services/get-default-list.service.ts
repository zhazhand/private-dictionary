import { Injectable } from "@angular/core";
import { ListItem } from "@interfaces/list-item.interface";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DefaultListService {
  public apiHost = "./assets/default-lists/";

  constructor(private http: HttpClient) {}

  getList(fileName: string): Observable<ListItem[]> {
    return this.http.get<ListItem[]>(`${this.apiHost}${fileName}.json`);
  }
}
