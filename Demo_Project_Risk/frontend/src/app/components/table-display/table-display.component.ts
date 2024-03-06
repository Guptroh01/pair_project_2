
import { Component, ViewChild, AfterViewInit, Injectable, OnInit, ElementRef } from '@angular/core';
import { Risk } from 'src/app/Risk';
import { MatSort, Sort } from '@angular/material/sort';
import { CdkDrag, CdkDragMove, CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';


import { Input } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { EditDeleteComponent } from '../edit-delete/edit-delete.component';
import { MatChipsModule } from '@angular/material/chips';
import { GetDataService } from 'src/app/services/get-data.service';

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

  constructor(public dialog: MatDialog, private elementRef: ElementRef,private GetDataService:GetDataService ){}

  openDialog(): void{
    const dialogRef = this.dialog.open(EditDeleteComponent, {
      width: 'auto',
      position: {
        top: `${this.elementRef.nativeElement.offsetTop}px`,
        right: `${this.elementRef.nativeElement.offsetRight}px`
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed!!');
    })
  }

  logRow(row: any){
    console.log(row.hazards);
  }
  // dataSource = new MatTableDataSource(risks);
  risksArr !: Risk[]
  dataSource!: MatTableDataSource < Risk[] > ;

  // constructor(private ApiService:ApiServiceService){

  //   this.ApiService.getAllData().subscribe((res)=>{
  //     this.risksArr = res;
  //     console.log(res);
  //     this.dataSource = new MatTableDataSource<Risk>(this.risksArr)

  //   })
  // }

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    console.log(this.dataSource);
    this.GetDataService.getAllRisks().subscribe((res)=>{
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
    })
    // this.dataSource.sort= this.sort;
    // this.dataSource.paginator= this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.GetDataService.getAllRisks().subscribe((res)=>{
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
    })

  }

  displayedColumns: string[] = ['risk_id', 'risk_category', 'hazards', 'risks', 'mitigation_status', 'pre_mitigation_risk_score', 'post_mitigation_risk_score', 'barriers', 'update'];


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