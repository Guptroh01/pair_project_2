import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-item-name',
  templateUrl: './item-name.component.html',
  styleUrls: ['./item-name.component.css'],

  providers:[GetDataService]
})
export class ItemNameComponent implements OnInit {

  data !:any;

  arr:any = []
  newArr :any[] =[]

  @Output() newItem = new EventEmitter();

  constructor(private dataService:GetDataService){}

  ngOnInit(): void {
    
  }


 





}
