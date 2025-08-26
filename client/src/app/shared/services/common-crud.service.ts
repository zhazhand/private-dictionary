import { Injectable } from "@angular/core";
import { ListItem } from "@interfaces/list-item.interface";
import { Message } from "@interfaces/message.interface";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { GroupeOption } from "@interfaces/groupe-option.interface";

@Injectable({ providedIn: "root" })
export class CommonCRUDService {
  constructor(private http: HttpClient) {}

  fetch(category: string): Observable<ListItem[]> {
    return this.http.get<ListItem[]>(`/api/${category}`);
  }

  getById(id: string, category: string): Observable<ListItem> {
    return this.http.get<ListItem>(`/api/${category}/${id}`);
  }

  create(category: string, formData: FormData): Observable<Message> {
    return this.http.post<Message>(`/api/${category}`, formData);
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
    formData: FormData,
  ): Observable<Message> {
    return this.http.patch<Message>(`/api/${category}/${id}`, formData);
  }

  updateGroupe(category: string, option: GroupeOption[]): Observable<Message> {
    return this.http.patch<Message>(`/api/${category}/`, option);
  }

  delete(category: string, id?: string): Observable<Message> {
    const httpParams = new HttpParams();
    let params;
    if (id) {
      params = httpParams.set("id", id);
    }

    return this.http.delete<Message>(`/api/${category}`, { params });
  }
}
