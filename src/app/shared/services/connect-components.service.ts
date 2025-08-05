import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectComponentsService {

  constructor() { }
  onClick:EventEmitter<any> = new EventEmitter();

  public doClick(model?:any){

    this.onClick.emit(model);
  }
}