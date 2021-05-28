import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public radioModel = 'Month';

  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public brandBoxChart: IChartProps = {};
  public data?  = [];
  public dbData2?;
  public customerCount?;
  public customerHistory? = [];
  public currentDate = new Date();
  constructor(private chartsData: DashboardChartsData, private http: HttpClient) {
    //this.getDashboard();
  }

  ngOnInit(): void {
    //this.getDashboardStats();
    //this.chartsData.customerData = this.customerHistory;
    this.initCharts();
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
    this.chart = this.chartsData.widgetChart;
    this.brandBoxChart = this.chartsData.brandBoxChart;
  }

  public getDashboard()
  {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.http.post<any>('http://192.168.64.2/Lamenu-Admin-API/public/getDashboard/', {headers: headers})
    .subscribe(
      data => {this.data = [...data]},
      error => {console.log(error)},
    );
  }
}
