import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

const BASE_URL = environment.BASE_URL;
import {
  DashboardChartsData,
  IChartProps,
} from '../../dashboard/dashboard-charts-data';

@Component({
  selector: 'app-widgets-dropdown',
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss'],
})
export class WidgetsDropdownComponent implements OnInit {
  public chart: Array<IChartProps> = [];
  public dbData?;
  public dbData2?;
  public customerCount?;
  public customerHistory? = [];

  constructor(private chartsData: DashboardChartsData, private http: HttpClient) {
  }

  ngOnInit(): void {
    //this.getDashboard();
    this.getDashboard();
    this.chart = this.chartsData.widgetChart;

    this.getDashboardStats();
  }

  public getDashboard()
  {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.http.post<any>(BASE_URL + 'getDashboard/', {headers: headers})
    .subscribe(
      data => {this.dbData = data;},
      error => {console.log(error)},
    );
  }
  public getDashboardStats()
  {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.http.post<any>(BASE_URL + 'getDashboardStats/', {headers: headers})
    .subscribe(
      data => {
        this.dbData2 = data;  
        for (let i = 0; i <= this.dbData2?.data.count; i++) 
        {
          if (this.dbData2?.data.content[i].Entity == "Customer")
          {
            this.customerHistory.push(this.dbData2?.data.content[i].Total);
          }
          else if (this.dbData2?.data.content[i].Entity == "Facility")
          {
            
          }
          else if (this.dbData2?.data.content[i].Entity == "Branch")
          {
            
          }
          else if (this.dbData2?.data.content[i].Entity == "Payment")
          {
            
          }
          //console.log ("Month " + this.dbData2?.data.content[i].Month);
          //console.log ("Total " + this.dbData2?.data.content[i].Total);
        }
        console.log ("customerHistory " + this.customerHistory);
      },
      error => {console.log(error)},
    );
  }
}
