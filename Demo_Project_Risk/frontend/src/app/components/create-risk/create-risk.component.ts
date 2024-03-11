import { Component,OnInit } from '@angular/core';
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
// import { MatTableDataSource } from '@angular/material/table'

// const risksData: Risk[] = [];

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
    CommonModule],
  templateUrl: './create-risk.component.html',
  styleUrls: ['./create-risk.component.css'],
  providers:[]
})
export class CreateRiskComponent implements OnInit{
  isEditMode:boolean = false;
  recordId:any;
  createRiskForm!:FormGroup;


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

  constructor(public dialogRef: MatDialogRef<CreateRiskComponent> ,private GetDataService :GetDataService,private DisplayDataService:DisplayDataService) {}
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
      risk_category: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z, ]+$/)]),
      hazards: new FormControl( "", [Validators.required, Validators.pattern(/^[a-zA-Z, ]+$/)]),
      risks: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z, ]+$/)]),
      mitigation_status: new FormControl('',Validators.required),
      pre_mitigation_risk_score : new FormControl('',Validators.required),
      post_mitigation_risk_score: new FormControl('',Validators.required),
      barriers: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z, ]+$/)])
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
        console.log('Risk created successfully')
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


  createRisk() {
    console.log("Create Risk Called!",this.createRiskForm);
  }

}
