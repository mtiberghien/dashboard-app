import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {Dashboard} from './models/dashboard';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
  load_dashboard(): Observable<Dashboard> {
    return this.http.get<Dashboard>('/assets/dashboard.json');
  }

  download(dashboard: Dashboard) {
    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(dashboard)], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = "dashboard.json";
    a.click();
   }
   
  save_dashboard(dashboard: Dashboard): void {
    this.download(dashboard);
  }
}
