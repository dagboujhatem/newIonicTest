import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/utils';
import { customTooltips } from '@coreui/chartjs/dist/js/coreui-chartjs.js';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

const BASE_URL = environment.BASE_URL;
@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
})
export class WidgetsComponent implements OnInit {
  // lineChart1
  public lineChart5Legend = false;
  public lineChart5Type = 'line';
  public dbData? = {data: {content: {}, count: {}},};
  public customerHistory? = [];
  public dbData2?;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
     this.getDashboardStats();
    // console.log ("12");
    // for (let i = 0; i < this.dbData.data.count; i++) 
    // {
    //   console.log ("Entity " + this.dbData.data.content[i].Entity);
    //   console.log ("Month " + this.dbData.data.content[i].Month);
    //   console.log ("Total " + this.dbData.data.content[i].Total);

    // }
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

  public lineChart1Data: Array<any> = [
    {
      data: this.customerHistory,
      label: 'Series A',
    },
  ];
  public lineChart1Labels: Array<any> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',

  ];
  public lineChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: customTooltips,
    },
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
            min: 40 - 5,
            max: 84 + 5,
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
  public lineChart1Colours: Array<any> = [
    {
      // grey
      backgroundColor: getStyle('--primary'),
      borderColor: 'rgba(255,255,255,.55)',
    },
  ];
  public lineChart1Legend = false;
  public lineChart1Type = 'line';

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: 'Series A',
    },
  ];
  public lineChart2Labels: Array<any> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  public lineChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: customTooltips,
    },
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
            min: 1 - 5,
            max: 34 + 5,
          },
        },
      ],
    },
    elements: {
      line: {
        tension: 0.00001,
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
  public lineChart2Colours: Array<any> = [
    {
      // grey
      backgroundColor: getStyle('--info'),
      borderColor: 'rgba(255,255,255,.55)',
    },
  ];
  public lineChart2Legend = false;
  public lineChart2Type = 'line';

  // lineChart3
  public lineChart3Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'Series A',
    },
  ];
  public lineChart3Labels: Array<any> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  public lineChart3Options: any = {
    tooltips: {
      enabled: false,
      custom: customTooltips,
    },
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
      },
    },
    legend: {
      display: false,
    },
  };
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
    },
  ];
  public lineChart3Legend = false;
  public lineChart3Type = 'line';

  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: 'Series A',
      barPercentage: 0.6,
    },
  ];
  public barChart1Labels: Array<any> = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
  ];
  public barChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: customTooltips,
    },
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
    legend: {
      display: false,
    },
  };
  public barChart1Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.3)',
      borderWidth: 0,
    },
  ];
  public barChart1Legend = false;
  public barChart1Type = 'bar';

  // lineChart4
  public lineChart4Data: Array<any> = [
    {
      data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
      label: 'Series A',
    },
  ];
  public lineChart4Labels: Array<any> = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  public lineChart4Options: any = {
    tooltips: {
      enabled: false,
      custom: customTooltips,
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          display: false,
          points: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
    elements: { point: { radius: 0 } },
    legend: {
      display: false,
    },
  };
  public lineChart4Colours: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      borderWidth: 2,
    },
  ];
  public lineChart4Legend = false;
  public lineChart4Type = 'line';

  // barChart2
  public barChart2Data: Array<any> = [
    {
      data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
      label: 'Series A',
      barPercentage: 0.6,
    },
  ];
  public barChart2Labels: Array<any> = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  public barChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: customTooltips,
    },
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
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  };
  public barChart2Colours: Array<any> = [
    {
      backgroundColor: 'rgba(0,0,0,.2)',
      borderWidth: 0,
    },
  ];
  public barChart2Legend = false;
  public barChart2Type = 'bar';

  // barChart3
  public barChart3Data: Array<any> = [
    {
      data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
      label: 'Series A',
    },
  ];
  public barChart3Labels: Array<any> = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  public barChart3Options: any = {
    tooltips: {
      enabled: false,
      custom: customTooltips,
    },
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
    legend: {
      display: false,
    },
  };
  public barChart3Primary: Array<any> = [
    {
      backgroundColor: getStyle('--primary'),
      borderColor: 'transparent',
      borderWidth: 1,
    },
  ];
  public barChart3Danger: Array<any> = [
    {
      backgroundColor: getStyle('--danger'),
      borderColor: 'transparent',
      borderWidth: 1,
    },
  ];
  public barChart3Success: Array<any> = [
    {
      backgroundColor: getStyle('--success'),
      borderColor: 'transparent',
      borderWidth: 1,
    },
  ];
  public barChart3Legend = false;
  public barChart3Type = 'bar';

  // lineChart5
  public lineChart5Data: Array<any> = [
    {
      data: this.customerHistory,
      label: 'Series A',
    },
  ];
  public lineChart5Labels: Array<any> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
  ];
  public lineChart5Options: any = {
    tooltips: {
      enabled: false,
      custom: customTooltips,
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          display: false,
          points: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
    elements: { point: { radius: 0 } },
    legend: {
      display: false,
    },
  };
  public lineChart5Info: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: getStyle('--info'),
      borderWidth: 2,
    },
  ];
  public lineChart5Success: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: getStyle('--info'),
      borderWidth: 2,
    },
  ];
  public lineChart5Warning: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: getStyle('--warning'),
      borderWidth: 2,
    },
  ];
}
