import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class DisplayDataService {

  constructor() { }

  private tableData = new BehaviorSubject<any>({})
  currentData = this.tableData.asObservable();
  updateTableData(data:any){
   this.tableData.next(data)    
  }
  
}
