import { Injectable } from "@angular/core";
import { ListItem } from "@interfaces/list-item.interface";
import { Message } from "@interfaces/message.interface";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class CommonCRUDService {
  constructor(private http: HttpClient) {}

  //To get all list
  fetch(category: string): Observable<ListItem[]> {
    return this.http.get<ListItem[]>(`/api/${category}`);
  }

  //To get just one item (for editing or removing)
  getById(id: string, category: string): Observable<ListItem> {
    return this.http.get<ListItem>(`/api/${category}/${id}`);
  }

  create(
    category: string,
    name?: string,
    transcription?: string,
    translation?: string,
  ): Observable<ListItem> {
    const fd = { name, transcription, translation };

    return this.http.post<ListItem>(`/api/${category}`, fd);
  }

  createCollection(
    category: string,
    collection: ListItem[],
  ): Observable<ListItem[]> {
    return this.http.post<ListItem[]>(`/api/${category}`, collection);
  }

  update(
    category: string,
    id: string,
    name: string,
    translation: string,
    transcription?: string,
    removable?: boolean,
  ): Observable<ListItem> {
    const fd = { name, transcription, translation, removable };

    return this.http.patch<ListItem>(`/api/${category}/${id}`, fd);
  }

  delete(category: string, id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/${category}/${id}`);
  }
}
