import { Injectable } from "@angular/core";
import { ListItem } from "@interfaces/list-item.interface";
import { Message } from "@interfaces/message.interface";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { GroupeOption } from "@interfaces/groupe-option.interface";

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
  ): Observable<Message> {
    return this.http.post<Message>(`/api/${category}`, collection);
  }

  update(
    category: string,
    id: string,
    removable: boolean,
    name: string,
    translation: string,
    transcription?: string,
  ): Observable<ListItem> {
    const fd = { name, transcription, translation, removable };

    return this.http.patch<ListItem>(`/api/${category}/${id}`, fd);
  }

  updateGroupe(category: string, option: GroupeOption[]): Observable<Message> {
    return this.http.patch<Message>(`/api/${category}/`, option);
  }

  delete(category: string, id?: string): Observable<Message> {
    let params = new HttpParams();
    if (id) {
      params.set("id", id);
    }

    return this.http.delete<Message>(`/api/${category}`, { params });
  }
}
