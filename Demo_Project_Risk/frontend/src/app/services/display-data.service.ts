import { Injectable,ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Risk } from '../Risk';
import { BehaviorSubject } from 'rxjs'
import { MatTableDataSource } from '@angular/material/table';
@Injectable({
  providedIn: 'root'
})
export class DisplayDataService {

  constructor() { }

  @ViewChild(MatSort, { static: true }) sort !: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  private tableData = new BehaviorSubject<any>({});
  currentData = this.tableData.asObservable();
  dataSource!: MatTableDataSource<Risk> 

  updateTableData(data:any){
  console.log(data)

  this.dataSource = new MatTableDataSource<Risk>(data);

  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;

   this.tableData.next(this.dataSource);

  
  }
  
}
