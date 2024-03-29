

import { Component, ViewChild, AfterViewInit, Injectable, OnInit, ElementRef, OnChanges, inject } from '@angular/core';
import { Risk } from 'src/app/Risk';
import { MatSort, Sort } from '@angular/material/sort';
import { CdkDrag, CdkDragMove, CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';


import { Input } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { MatChipsModule } from '@angular/material/chips';
import { GetDataService } from 'src/app/services/get-data.service';
import { MatChipInput } from '@angular/material/chips';
import { CreateRiskComponent } from '../create-risk/create-risk.component';
import {DisplayDataService} from '../../services/display-data.service'
import { MatTable } from '@angular/material/table';
import { DeleteAlertComponent } from '../delete-alert/delete-alert.component';


@Component({
  selector: 'app-table-display',
  templateUrl: './table-display.component.html',
  styleUrls: ['./table-display.component.css'],
})

export class TableDisplayComponent implements OnInit, AfterViewInit {


  dataSource!: MatTableDataSource<Risk> 
  riskId:any;

  constructor(public dialog: MatDialog, private elementRef: ElementRef,private GetDataService:GetDataService,private DisplayDataService:DisplayDataService ){
    

    this.displayTable()

    
  }

  findLength(){
    return this.dataSource.data.length;
  }

  displayTable(){
    this.GetDataService.getAllRisks().subscribe((res)=>{
      console.log(res,'in display table');
      this.dataSource = new MatTableDataSource<Risk>(res);
      console.log(this.dataSource);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource,"in table");
    })    
  }

  logRow(row: any){
    
    console.log(row.risk_id);
    this.riskId= row.risk_id;
    this.GetDataService.risk_id = row.risk_id;
  }
 
   
   risksArr: Array<Risk> = [];

  @ViewChild(MatSort, { static: true }) sort !: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;


    this.displayTable()
    this.DisplayDataService.currentData.subscribe((data)=>{
      this.dataSource = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
    
  }

  ngOnChanges(){
    this.displayTable()
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
   


    this.displayTable()   

  }

  displayedColumns: string[] = ['risk_id', 'risk_category', 'hazards', 'risks', 'mitigation_status', 'pre_mitigation_risk_score', 'post_mitigation_risk_score', 'barriers', 'update'];
  
  editRisk(){
    //edit risk
    this.GetDataService.editData = true;
    
    const dialogRef = this.dialog.open(CreateRiskComponent, {
      width: '500px'
    });

  }

  deleteRisk(){
    //delete risk
    this.riskId = this.GetDataService.risk_id

    let deleteConfirm = this.dialog.open(DeleteAlertComponent, {
      width: '400px',
    });
    
    deleteConfirm.afterClosed().subscribe((res)=>{
      if(res){

        this.GetDataService.deleteRisk(this.riskId).subscribe(()=>{
          console.log(`risk with ${this.riskId} deleted successfully`);
          this.displayTable()
    
        })

      }

      
    })

    console.log("Delete was clicked!",this.riskId)
  

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.currentIndex === 0 || event.currentIndex === 1) {
      moveItemInArray(this.displayedColumns, event.previousIndex, event.previousIndex)
    }    
    else {
      moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);

      console.log(`item from index ${event.previousIndex} to index ${event.currentIndex}`)
    }
  }

}