import { Injectable } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/utils';
import { customTooltips } from '@coreui/chartjs/dist/js/coreui-chartjs.js';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.BASE_URL;
export interface IChartProps {
  Data?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;
  [propName: string]: any;
}

@Injectable({
  providedIn: 'any',
})
export class DashboardChartsData {
  public mainChart: IChartProps = {};
  public widgetChart: Array<any> = [];
  public brandBoxChart: any = {};
  public customerData: Array<any> = [];
  public dbData?;
  public customerCount?;
  public customerHistoryTotal? = [];
  public customerHistoryMonth? = [];
  public facilityHistoryMonth? = [];
  public facilityHistoryTotal? = [];
  public branchHistoryMonth? = [];
  public branchHistoryTotal? = [];
  public revenueHistoryMonth? = [];
  public revenueHistoryTotal? = [];
  public dineInHistoryMonth? = [];
  public dineInHistoryTotal? = [];
  public pickupHistoryMonth? = [];
  public pickupHistoryTotal? = [];
  public deliveryHistoryMonth? = [];
  public deliveryHistoryTotal? = [];
  public elementSizeArray? = [];
  public elementSize? = 0;
  public chartMaxValueArray? = []
  public chartMaxValue? = 1000;

  constructor(private http: HttpClient) {
    this.getDashboardStats();
    this.initWidgetCharts();
    this.initMainChart();
    this.initBrandCharts();
  }

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  public async getDashboardStats()
  {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    await this.http.post<any>(BASE_URL + 'getDashboardStats/', {headers: headers})
    .subscribe(
      data => {
        this.dbData = data;  
        for (let i = 0; i <= this.dbData?.data.count; i++) 
        {
          if (this.dbData?.data.content[i].Entity == "Customer")
          {
            this.customerHistoryMonth.push(this.dbData?.data.content[i].Month);
            this.customerHistoryTotal.push(this.dbData?.data.content[i].Total);
          }
          else if (this.dbData?.data.content[i].Entity == "Facility")
          {
            this.facilityHistoryMonth.push(this.dbData?.data.content[i].Month);
            this.facilityHistoryTotal.push(this.dbData?.data.content[i].Total);
          }
          else if (this.dbData?.data.content[i].Entity == "Branch")
          {
            this.branchHistoryMonth.push(this.dbData?.data.content[i].Month);
            this.branchHistoryTotal.push(this.dbData?.data.content[i].Total);
          }
          else if (this.dbData?.data.content[i].Entity == "Payments")
          {
            this.revenueHistoryMonth.push(this.dbData?.data.content[i].Month);
            this.revenueHistoryTotal.push(this.dbData?.data.content[i].Total);
          }
          else if (this.dbData?.data.content[i].Entity == "dinein")
          {
            this.dineInHistoryMonth.push(this.dbData?.data.content[i].Month);
            this.dineInHistoryTotal.push(this.dbData?.data.content[i].Total);
          }
          else if (this.dbData?.data.content[i].Entity == "pickup")
          {
            this.pickupHistoryMonth.push(this.dbData?.data.content[i].Month);
            this.pickupHistoryTotal.push(this.dbData?.data.content[i].Total);
          }
          else if (this.dbData?.data.content[i].Entity == "delivery")
          {
            this.deliveryHistoryMonth.push(this.dbData?.data.content[i].Month);
            this.deliveryHistoryTotal.push(this.dbData?.data.content[i].Total);
          }
        }
        this.elementSizeArray.push(this.dineInHistoryMonth.length, this.pickupHistoryMonth.length, this.deliveryHistoryTotal.length); 
        this.elementSize = Math.max(...this.elementSizeArray);
        this.chartMaxValueArray = [...this.deliveryHistoryTotal, ...this.pickupHistoryTotal, ...this.dineInHistoryTotal];
        this.chartMaxValue = Math.max(...this.chartMaxValueArray);
      },
      error => {console.log(error)},
    );
  }

  initWidgetCharts() {
    // Customer
    return new Promise<any>(async (resolve) => {
    this.widgetChart[0] = {};
    var sf = Math.max.apply(null, this.customerHistoryTotal)+50;
    this.widgetChart[0].colors = [
      {
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--primary'),
      },
    ];
    this.widgetChart[0].legend = true;
    this.widgetChart[0].type = 'line';
    this.widgetChart[0].data = [
      {
        data: this.customerHistoryTotal,
        label: 'Series A',
      },
    ];
    this.widgetChart[0].labels = this.customerHistoryMonth;
    this.widgetChart[0].options = {
      tooltips: {
        enabled: false,
        custom: customTooltips,
      },
      animation: {
        duration: 0,
      },
      responsiveAnimationDuration: 0,
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            gridLines: {
              color: 'transparent',
              zeroLineColor: 'transparent',
            },
            ticks: {
              fontSize: 2,
              fontColor: 'transparent',
            },
          },
        ],
        yAxes: [
          {
            display: false,
            ticks: {
              display: false,
              min: 0,
              max: 150,
            },
          },
        ],
      },
      elements: {
        line: {
          borderWidth: 1,
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 4,
        },
      },
      legend: {
        display: false,
      },
    };

    // chart 1
    this.widgetChart[1] = JSON.parse(JSON.stringify(this.widgetChart[0]));
    this.widgetChart[1].options.tooltips = {
      enabled: false,
      custom: customTooltips,
    };
    this.widgetChart[1].options.elements.line.tension = 0.00001;
    this.widgetChart[1].labels = this.facilityHistoryMonth;
    this.widgetChart[1].options.scales.yAxes = [
      {
        display: false,
        ticks: { min: 1, max: 10 },
      },
    ];
    this.widgetChart[1].data = [
      {
        data: this.facilityHistoryTotal,
        label: 'Series A',
      },
    ];
    this.widgetChart[1].colors = [
      {
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--info'),
      },
    ];

    // chart 2
    this.widgetChart[2] = JSON.parse(JSON.stringify(this.widgetChart[0]));
    this.widgetChart[2].labels = this.branchHistoryMonth;
    this.widgetChart[2].options.tooltips = {
      enabled: false,
      custom: customTooltips,
    };
    this.widgetChart[2].options.scales.xAxes = [
      {
        display: false,
      },
    ];
    this.widgetChart[2].options.scales.yAxes = [
      {
        display: false,
        ticks: { min: 0, max: 12 },
      },
    ];
    this.widgetChart[2].options.elements.line.borderWidth = 2;
    this.widgetChart[2].options.elements.point.radius = 0;
    this.widgetChart[2].data = [
      {
        data: this.branchHistoryTotal,
        label: 'Series A',
      },
    ];
    this.widgetChart[2].colors = [
      {
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--warning'),
      },
    ];

    // chart 3
    this.widgetChart[3] = JSON.parse(JSON.stringify(this.widgetChart[0]));
    this.widgetChart[3].labels = this.revenueHistoryMonth;
    this.widgetChart[3].options.tooltips = {
      enabled: false,
      custom: customTooltips,
    };
    this.widgetChart[3].options.scales.xAxes = [
      {
        display: false,
      },
    ];
    this.widgetChart[3].options.scales.yAxes = [
      {
        display: false,
        ticks: { min: 50, max: 1200 },
      },
    ];
    this.widgetChart[3].data = [
      {
        barPercentage: 0.7,
        data: this.revenueHistoryTotal,
        label: 'Series A',
      },
    ];
    this.widgetChart[3].colors = [
      {
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',
      },
    ];
    this.widgetChart[3].type = 'bar';
    resolve(this.widgetChart);
  });
  }

  initMainChart() {
    return new Promise<any>(async (resolve) => {
    const brandSuccess = getStyle('--success') || '#4dbd74';
    const brandInfo = getStyle('--info') || '#20a8d8';
    const brandInfoBg = hexToRgba('#20a8d8', 10);
    const brandDanger = getStyle('--danger') || '#f86c6b';

    // console.log(brandInfo, brandInfoBg);

    // mainChart
    this.mainChart.elements = this.elementSize;
    this.mainChart.Data1 = this.pickupHistoryTotal;
    this.mainChart.Data2 = this.dineInHistoryTotal;
    this.mainChart.Data3 = this.deliveryHistoryTotal;

    //console.log(this.pickupHistoryTotal.length, this.dineInHistoryTotal.length , this.deliveryHistoryTotal.length);

    // generate random values for mainChart
    // for (let i = 0; i <= this.mainChart.elements; i++) {
    //   this.mainChart.Data1.push(this.random(50, 200));
    //   this.mainChart.Data2.push(this.random(80, 100));
    //   this.mainChart.Data3.push(65);
    // }

    this.mainChart.Data = [
      {
        data: this.mainChart.Data1,
        label: 'Pick-up',
      },
      {
        data: this.mainChart.Data2,
        label: 'Dine-in',
      },
      {
        data: this.mainChart.Data3,
        label: 'Delivery',
      },
    ];
    /* tslint:disable:max-line-length */
    // this.mainChart.labels = [
    //   'Monday',
    //   'Tuesday',
    //   'Wednesday',
    //   'Thursday',
    //   'Friday',
    //   'Saturday',
    //   'Sunday',
    //   'Monday',
    //   'Tuesday',
    //   'Wednesday',
    //   'Thursday',
    //   'Friday',
    //   'Saturday',
    //   'Sunday',
    //   'Monday',
    //   'Tuesday',
    //   'Wednesday',
    //   'Thursday',
    //   'Friday',
    //   'Saturday',
    //   'Sunday',
    //   'Monday',
    //   'Thursday',
    //   'Wednesday',
    //   'Thursday',
    //   'Friday',
    //   'Saturday',
    //   'Sunday',
    // ];
    /* tslint:enable:max-line-length */
    this.mainChart.labels = this.pickupHistoryMonth;

    this.mainChart.options = {
      tooltips: {
        enabled: false,
        custom: customTooltips,
        intersect: true,
        mode: 'index',
        position: 'nearest',
        callbacks: {
          labelColor: function (tooltipItem, chart) {
            return {
              backgroundColor:
                chart.data.datasets[tooltipItem.datasetIndex].borderColor,
            };
          },
        },
      },
      animation: {
        duration: 0,
      },
      responsiveAnimationDuration: 0,
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
            ticks: {
              callback: function (value: any) {
                return value.charAt(0);
              },
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
              max: this.chartMaxValue,
            },
          },
        ],
      },
      elements: {
        line: {
          borderWidth: 2,
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
      legend: {
        display: false,
      },
    };
    this.mainChart.colors = [
      {
        // brandInfo
        backgroundColor: brandInfoBg,
        borderColor: brandInfo,
        pointHoverBackgroundColor: '#fff',
      },
      {
        // brandSuccess
        backgroundColor: 'transparent',
        borderColor: brandSuccess || '#4dbd74',
        pointHoverBackgroundColor: '#fff',
      },
      {
        // brandDanger
        backgroundColor: 'transparent',
        borderColor: brandDanger || '#f86c6b',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 1,
        borderDash: [8, 5],
      },
    ];
    this.mainChart.legend = false;
    this.mainChart.type = 'line';
    resolve(this.mainChart);
  });
  }

  initBrandCharts() {
    // social box charts
    this.brandBoxChart.Data1 = [
      {
        data: [65, 59, 84, 84, 51, 55, 40],
        label: 'Facebook',
      },
    ];
    this.brandBoxChart.Data2 = [
      {
        data: [1, 13, 9, 17, 34, 41, 38],
        label: 'Twitter',
      },
    ];
    this.brandBoxChart.Data3 = [
      {
        data: [78, 81, 80, 45, 34, 12, 40],
        label: 'LinkedIn',
      },
    ];
    this.brandBoxChart.Data4 = [
      {
        data: [35, 23, 56, 22, 97, 23, 64],
        label: 'Events',
      },
    ];

    this.brandBoxChart.labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
    ];
    this.brandBoxChart.options = {
      tooltips: {
        enabled: false,
        custom: customTooltips,
      },
      animation: {
        duration: 0,
      },
      responsive: true,
      responsiveAnimationDuration: 0,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            display: false,
          },
        ],
        yAxes: [
          {
            display: false,
          },
        ],
      },
      elements: {
        line: {
          borderWidth: 2,
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
      legend: {
        display: false,
      },
    };
    this.brandBoxChart.colors = [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
      },
    ];
    this.brandBoxChart.legend = false;
    this.brandBoxChart.type = 'line';
  }
}

