import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDataService implements OnInit {
  constructor(private http: HttpClient) {}
  public risk_id: any;
  public editData!: boolean;

  url: any = 'http://localhost:3000/risks';

  ngOnInit(): void {}

  getAllRisks(): Observable<any> {
    return this.http.get(this.url);
  }

  getRiskById(id: any): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  updateRisk(id: any, data: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }

  createRisk(data: any): Observable<any> {
    const formattedRiskData = {
      ...data,
      hazards: data.hazards.join(','),
      risks: data.risks.join(','),
      barriers: data.barriers.join(','),
    };
    return this.http.post(this.url, formattedRiskData);
  }

  deleteRisk(id: any): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
