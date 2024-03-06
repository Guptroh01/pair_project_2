import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService implements OnInit {

  constructor(private http:HttpClient) { }

  url:any = 'http://localhost:3000/risks';

  ngOnInit(): void {
   
  }

  // getAllRisks(data: any){}

  createRisk(data: any): Observable<any>{
    const hazardsArray = Array.isArray(data.hazards) ? data.hazards : [data.hazards];
    const risksArray = Array.isArray(data.risks) ? data.risks : [data.risks];
    const barriersArray = Array.isArray(data.barriers) ? data.barriers : [data.barriers];

    const postdata= {
      ...data,
      hazards: hazardsArray,
      risks: risksArray,
      barriers: barriersArray
    };

    return this.http.post(this.url, postdata);
  }


  }

