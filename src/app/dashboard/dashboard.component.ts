import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Dashboard } from '../models/dashboard';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboard?: Dashboard;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.load_dashboard().subscribe(dashboard=>this.dashboard=dashboard);
  }

  onSave(): void {
    if(this.dashboard){
      this.dashboardService.save_dashboard(this.dashboard);
    }
    
  }

}
