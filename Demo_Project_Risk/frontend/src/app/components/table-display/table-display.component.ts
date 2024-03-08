

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


const risksData: Risk[] = [

  {
    risk_id: 1,
    risk_category: 'Reserviour damage',
    hazards: ['abc'],
    risks: ['shutdown', 'leak'],
    mitigation_status: false,
    pre_mitigation_risk_score: 0,
    post_mitigation_risk_score: 1,
    barriers: ['water']

  },


  {
    risk_id: 2,
    risk_category: 'Reserviour damage',
    hazards: ['abc'],
    risks: ['shutdown', 'leak'],
    mitigation_status: false,
    pre_mitigation_risk_score: 1,
    post_mitigation_risk_score: 1,
    barriers: ['water']

  },

  {
    risk_id: 3,
    risk_category: 'Reserviour damage',
    hazards: ['abc'],
    risks: ['shutdown', 'leak'],
    mitigation_status: false,
    pre_mitigation_risk_score: 2,
    post_mitigation_risk_score: 1,
    barriers: ['water']

  },

  {
    risk_id: 4,
    risk_category: 'Reserviour damage',
    hazards: ['abcabcabcabcabcabcabcabcabcabcabc'],
    risks: ['shutdown', 'leak'],
    mitigation_status: false,
    pre_mitigation_risk_score: 0,
    post_mitigation_risk_score: 1,
    barriers: ['water']

  },

  {
    risk_id: 5,
    risk_category: 'Reserviour damage',
    hazards: ['abc'],
    risks: ['shutdown', 'leak'],
    mitigation_status: false,
    pre_mitigation_risk_score: 0,
    post_mitigation_risk_score: 1,
    barriers: ['water']

  },

   {
    risk_id: 6,
    risk_category: 'Reserviour damage',
    hazards: ['abc'],
    risks: ['shutdown', 'leak'],
    mitigation_status: false,
    pre_mitigation_risk_score: 2,
    post_mitigation_risk_score: 1,
    barriers: ['waterjhgfddf', 'wa', 'water2']

  },
]

@Component({
  selector: 'app-table-display',
  templateUrl: './table-display.component.html',
  styleUrls: ['./table-display.component.css'],
})

export class TableDisplayComponent implements OnInit, AfterViewInit {


  dataSource!: MatTableDataSource<Risk> 
  riskId:any;

  constructor(public dialog: MatDialog, private elementRef: ElementRef,private GetDataService:GetDataService ){
    

    this.displayTable()

    
  }

  displayTable(){
    this.GetDataService.getAllRisks().subscribe((res)=>{
      console.log(res,'in constructor');
      this.dataSource = new MatTableDataSource<Risk>(res);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
    
  }

  ngOnChanges(){
    this.displayTable()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;



    this.displayTable()


    

  }

  displayedColumns: string[] = ['risk_id', 'risk_category', 'hazards', 'risks', 'mitigation_status', 'pre_mitigation_risk_score', 'post_mitigation_risk_score', 'barriers', 'update'];
  
  editRisk(){
    // this.GetDataService.editData = true;
    
    const dialogRef = this.dialog.open(CreateRiskComponent, {
      width: '500px'
    });

    this.displayTable()
  }

  deleteRisk(){
    this.riskId = this.GetDataService.risk_id
    
    console.log("Delete was clicked!",this.riskId)
    this.GetDataService.deleteRisk(this.riskId).subscribe(()=>{
      console.log(`risk with ${this.riskId} deleted successfully`);

    })

    this.displayTable()
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