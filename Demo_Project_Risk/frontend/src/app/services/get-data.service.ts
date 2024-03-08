import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetDataService implements OnInit {

  constructor(private http:HttpClient) { }
  public risk_id:any

  url:any = 'http://localhost:3000/risks';

  ngOnInit(): void {
   
  }




  getAllRisks():Observable<any>{
    return this.http.get(this.url);

  }

  getRiskById(id:any):Observable<any>{
    return this.http.get(this.url+'/'+id)

  }
  updateRisk(id:any,data:any): Observable<any>{
    const hazardsArray = Array.isArray(data.hazards) ? data.hazards.map((hazard: string) => `"${hazard.trim()}"`):[`"${data.hazards.trim()}"`];
    const risksArray = Array.isArray(data.risks) ? data.risks.map((risk: string) => `"${risk.trim()}"`):[`"${data.risks.trim()}"`];
    const barriersArray = Array.isArray(data.barriers) ? data.barriers.map((barrier: string) => `"${barrier.trim()}"`):[`"${data.barriers.trim()}"`];

    const postdata= {
      ...data,
      hazards: hazardsArray,
      risks: risksArray,
      barriers: barriersArray
    };
    return this.http.put(`${this.url}/${id}`,postdata);

  }


  createRisk(data: any): Observable<any>{
    const hazardsArray = Array.isArray(data.hazards) ? data.hazards.map((hazard: string) => `"${hazard.trim()}"`):[`"${data.hazards.trim()}"`];
    const risksArray = Array.isArray(data.risks) ? data.risks.map((risk: string) => `"${risk.trim()}"`):[`"${data.risks.trim()}"`];
    const barriersArray = Array.isArray(data.barriers) ? data.barriers.map((barrier: string) => `"${barrier.trim()}"`):[`"${data.barriers.trim()}"`];

    const postdata= {
      ...data,
      hazards: hazardsArray,
      risks: risksArray,
      barriers: barriersArray
    };

    return this.http.post(this.url, data);
  }

  deleteRisk(id:any):Observable<any>{
    return this.http.delete(`${this.url}/${id}`);

  }


  }

