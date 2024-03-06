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

  constructor(public dialogRef: MatDialogRef<CreateRiskComponent> ,private GetDataService :GetDataService) {}

  ngOnInit(): void {
    
  }

  createRiskForm = new FormGroup({
    risk_category: new FormControl('',Validators.required),
    hazards: new FormControl( '',Validators.required),
    risks: new FormControl('',Validators.required),
    mitigation_status: new FormControl('',Validators.required),
    pre_mitigation_risk_score : new FormControl('',Validators.required),
    post_mitigation_risk_score: new FormControl('',Validators.required),
    barriers: new FormControl('',Validators.required)
  });


  closeDialog(): void{
    this.dialogRef.close();
  }


  submitForm(): void {
    console.log("Form Created!!!!!");
    console.log(this.createRiskForm.value);
    this.GetDataService.createRisk(this.createRiskForm.value).subscribe((res:any)=>{
      console.log(`Data submitted ${res}`)
    },err=>{
      console.log(err);
    })
    this.dialogRef.close(this.createRiskForm.value);
  }

  createRisk() {
    console.log("Create Risk Called!",this.createRiskForm);
  }
}
