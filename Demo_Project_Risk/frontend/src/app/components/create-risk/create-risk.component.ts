import { Component,ElementRef,OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule,ReactiveFormsModule,FormGroup,FormControl, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import {GetDataService} from '../../services/get-data.service' 
import {MatIconModule } from '@angular/material/icon';
import { Risk } from 'src/app/Risk';
import {DisplayDataService} from '../../services/display-data.service'
import { forkJoin } from 'rxjs';

import { MatChipGrid, MatChipsModule, MatChipInputEvent,MatChipEvent } from '@angular/material/chips';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {LiveAnnouncer} from '@angular/cdk/a11y';


interface Mitigation_Risk_Score{
  value: number;
  viewValue: string;
}

interface Mitigation_Status{
  value: boolean,
  viewValue: string
}

@Component({
  selector: 'app-create-risk',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,HttpClientModule,MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule, 
    CommonModule,
    MatChipsModule,
    MatAutocompleteModule,
  ],

  templateUrl: './create-risk.component.html',
  styleUrls: ['./create-risk.component.css'],
  providers:[]
})
export class CreateRiskComponent implements OnInit{
  isEditMode:boolean = false;
  recordId:any;
  createRiskForm!:FormGroup;

  trackByFn(index: number, item: any){
    return item;
  }

  // new MatChips for Hazards Array

  separatorKeysCodes: number[] = [ENTER, COMMA];
  hazardCtrl = new FormControl('');
  filteredHazards: Observable<string[]>;
  hazards: string[] = [];
  allHazards: string[] = [];

  @ViewChild('hazardInput') hazardInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.hazards.push(value);
    }

    event.chipInput!.clear();
    this.hazardCtrl.setValue(null);
  }

  remove(hazard: string): void {
    const index = this.hazards.indexOf(hazard);
    if (index >= 0) {
      this.hazards.splice(index, 1);
      this.announcer.announce(`Removed ${hazard}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.hazards.push(event.option.viewValue);
    this.hazardInput.nativeElement.value = '';
    this.hazardCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allHazards.filter(hazard => hazard.toLowerCase().includes(filterValue));
  }

  mitigation_risk_scores: Mitigation_Risk_Score[] = [
    {value: 0, viewValue: 'Low'},
    {value: 1, viewValue: 'Medium'},
    {value: 2, viewValue: 'High'}
  ];

  mitigation_status: Mitigation_Status[] = [
    {value: true, viewValue: 'Open'},
    {value: false, viewValue: 'Closed'}
  ]

  changeEvent(event: any){
    console.log(event.value);
  }

 constructor(public dialogRef: MatDialogRef<CreateRiskComponent> ,private GetDataService :GetDataService,private DisplayDataService:DisplayDataService) {
            this.filteredHazards = this.hazardCtrl.valueChanges.pipe(
            startWith(null),
            map((hazard: string | null) => (hazard ? this._filter(hazard): this.allHazards.slice())),
          )
            }

  ngOnInit(): void {
    this.recordId = this.GetDataService.risk_id;
    console.log(this.recordId,'in create form');   
      this.isEditMode = this.GetDataService.editData;
      console.log(this.isEditMode)

      // sharing data between componenets through GetDataService
    
    this.initialiseForm();
  }
  
  ngOnDestroy(){
    this.isEditMode =false;
    this.GetDataService.editData = false;
  }
  initialiseForm():void{

    this.createRiskForm = new FormGroup({
      risk_category: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
      hazards: new FormControl( "", [Validators.required, Validators.pattern(/^[a-zA-Z, \n]+$/)]),
      risks: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z, \n]+$/)]),
      mitigation_status: new FormControl('',Validators.required),
      pre_mitigation_risk_score : new FormControl('',Validators.required),
      post_mitigation_risk_score: new FormControl('',Validators.required),
      barriers: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z, \n]+$/)])
    });
    // defining the form



    if(this.isEditMode){
      console.log('in edit mode',this.recordId)
      this.GetDataService.getRiskById(this.recordId).subscribe((res:any)=>{
        console.log(res,'vmdsk')
        this.createRiskForm.patchValue(res);
        
      })
  }
}
  closeDialog(): void{
    this.dialogRef.close();
    this.GetDataService.editData = false;
    
  }
  
  submitForm(): void {

    const formData = this.createRiskForm.value;
    console.log(formData);
    if(this.createRiskForm.valid){
      if(this.isEditMode){
        console.log(formData.barriers,formData.risks,formData.hazards);
        this.GetDataService.updateRisk(this.recordId,formData).subscribe((res)=>{
          console.log('data updated successfully')
          this.GetDataService.getAllRisks().subscribe((res)=>{
            this.DisplayDataService.updateTableData(res);
           
            console.log("res in update ",res);
                    
           
          })  
        },err=>{
          console.log(err);
        })
        this.dialogRef.close(this.closeDialog);
      }
    

    else{
      // create new risk

      this.GetDataService.createRisk(formData).subscribe((res)=>{
        console.log('Risk created successfully');
        console.log(formData);
        this.GetDataService.getAllRisks().subscribe((res)=>{
          
          this.DisplayDataService.updateTableData(res);
          console.log("res in create ",res); 
        })  
      },err=>{
        console.log(err)
      })
    }
   
    this.dialogRef.close(this.createRiskForm.value);
    // this.closeDialog()
  }

  }
}
