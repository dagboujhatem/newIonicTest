import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/utils';
import { customTooltips } from '@coreui/chartjs/dist/js/coreui-chartjs.js';
import { ValidationService } from '../../services/validation-service/validation.service';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { LocalInterfaceService } from '../../services/local-inteface-service/local-interface.service';
import { StorageService } from '../../services/storege-service/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  
  public isLoading = false;
  public data = null;
  public radioModel = 'Month';
  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public brandBoxChart: IChartProps = {};

  constructor(
    private validationSrv : ValidationService,
    private chartsData: DashboardChartsData,
    private localInterfaceSrv: LocalInterfaceService,
    private storageSrv: StorageService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.validationSrv.validateAcess()
    .then(async () => {
      await this.loadDashboardStatistics();
      this.initCharts();
    });
  }

  async initCharts(): Promise<void> {
    this.mainChart = await this.initMainChart();
    this.chart = await this.initWidgetCharts();
    // this.brandBoxChart = this.chartsData.brandBoxChart;
  }

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  initWidgetCharts() {
    return new Promise<any>(async (resolve) => {
      const widgetChart = [];
      // chart 0
      widgetChart[0] = {};
      widgetChart[0].title = 'Bookings';
      widgetChart[0].total = this.data.totalBookings;
      widgetChart[0].colors = [
        {
          backgroundColor: 'transparent',
          borderColor: 'rgba(255,255,255,.55)',
          pointBackgroundColor: getStyle('--primary'),
        },
      ];
      widgetChart[0].legend = true;
      widgetChart[0].type = 'line';
      widgetChart[0].data = [
        {
          data: [
            +this.data.bookings[0].totalBookingsMonthCount,
            +this.data.bookings[1].totalBookingsMonthCount,
            +this.data.bookings[2].totalBookingsMonthCount,
            +this.data.bookings[3].totalBookingsMonthCount,
            +this.data.bookings[4].totalBookingsMonthCount,
            +this.data.bookings[5].totalBookingsMonthCount,
          ],
          label: 'Bookings',
        },
      ];
      widgetChart[0].labels = [
        this.data.bookings[0].totalBookingsMonthName,
        this.data.bookings[1].totalBookingsMonthName,
        this.data.bookings[2].totalBookingsMonthName,
        this.data.bookings[3].totalBookingsMonthName,
        this.data.bookings[4].totalBookingsMonthName,
        this.data.bookings[5].totalBookingsMonthName,
      ];
      widgetChart[0].options = {
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
      widgetChart[1] = JSON.parse(JSON.stringify(widgetChart[0]));
      widgetChart[1].title = 'Customers';
      widgetChart[1].total = this.data.totalCustomers;
      widgetChart[1].options.elements.line.tension = 0.00001;
      widgetChart[1].options.tooltips = {
        enabled: false,
        custom: customTooltips,
      };
      widgetChart[1].options.elements.line.tension = 0.00001;
      widgetChart[1].data = [
        {
          data: [
            +this.data.customers[0].totalCustomersMonthCount,
            +this.data.customers[1].totalCustomersMonthCount,
            +this.data.customers[2].totalCustomersMonthCount,
            +this.data.customers[3].totalCustomersMonthCount,
            +this.data.customers[4].totalCustomersMonthCount,
            +this.data.customers[5].totalCustomersMonthCount,
          ],
          label: 'Customers',
        },
      ];
      widgetChart[1].labels = [
        this.data.customers[0].totalCustomersMonthName,
        this.data.customers[1].totalCustomersMonthName,
        this.data.customers[2].totalCustomersMonthName,
        this.data.customers[3].totalCustomersMonthName,
        this.data.customers[4].totalCustomersMonthName,
        this.data.customers[5].totalCustomersMonthName,
      ];
      widgetChart[1].colors = [
        {
          backgroundColor: 'rgba(255,255,255,.2)',
          borderColor: 'rgba(255,255,255,.55)',
          pointBackgroundColor: getStyle('--warning'),
        },
      ];
  
      // chart 2
      widgetChart[2] = JSON.parse(JSON.stringify(widgetChart[0]));
      widgetChart[2].title = 'Payments';
      widgetChart[2].total = this.data.totalPayments;
      widgetChart[2].options.tooltips = {
        enabled: false,
        custom: customTooltips,
      };
      widgetChart[2].options.scales.xAxes = [
        {
          display: false,
        },
      ];
      widgetChart[2].options.scales.yAxes = [
        {
          display: false,
        },
      ];
      widgetChart[2].options.elements.line.borderWidth = 2;
      widgetChart[2].options.elements.point.radius = 0;
      widgetChart[2].data = [
        {
          data: [
            +this.data.payments[0].totalPaymentsMonthCount,
            +this.data.payments[1].totalPaymentsMonthCount,
            +this.data.payments[2].totalPaymentsMonthCount,
            +this.data.payments[3].totalPaymentsMonthCount,
            +this.data.payments[4].totalPaymentsMonthCount,
            +this.data.payments[5].totalPaymentsMonthCount,
          ],
          label: 'Payments',
        },
      ];
      widgetChart[2].labels = [
        this.data.payments[0].totalPaymentsMonthName,
        this.data.payments[1].totalPaymentsMonthName,
        this.data.payments[2].totalPaymentsMonthName,
        this.data.payments[3].totalPaymentsMonthName,
        this.data.payments[4].totalPaymentsMonthName,
        this.data.payments[5].totalPaymentsMonthName,
      ];
      widgetChart[2].colors = [
        {
          backgroundColor: 'transparent',
          borderColor: 'rgba(255,255,255,.55)',
          pointBackgroundColor: getStyle('--info'),
        },
      ];
  
      // chart 3
      widgetChart[3] = JSON.parse(JSON.stringify(widgetChart[0]));
      widgetChart[3].title = 'Revenue BHD';
      widgetChart[3].total = this.data.totalRevenue ;
      widgetChart[3].type = 'bar';
      widgetChart[3].options.tooltips = {
        enabled: false,
        custom: customTooltips,
      };
      widgetChart[3].options.scales.xAxes = [
        {
          display: false,
        },
      ];
      widgetChart[3].options.scales.yAxes = [
        {
          display: false,
        },
      ];
      widgetChart[3].data = [
        {
          barPercentage: 0.7,
          data: [
            +this.data.revenue[0].totalRevenueMonthCount,
            +this.data.revenue[1].totalRevenueMonthCount,
            +this.data.revenue[2].totalRevenueMonthCount,
            +this.data.revenue[3].totalRevenueMonthCount,
            +this.data.revenue[4].totalRevenueMonthCount,
            +this.data.revenue[5].totalRevenueMonthCount,
          ],
          label: 'Value',
        },
      ];
      widgetChart[3].labels = [
        this.data.revenue[0].totalRevenueMonthName,
        this.data.revenue[1].totalRevenueMonthName,
        this.data.revenue[2].totalRevenueMonthName,
        this.data.revenue[3].totalRevenueMonthName,
        this.data.revenue[4].totalRevenueMonthName,
        this.data.revenue[5].totalRevenueMonthName,
      ];
      widgetChart[3].colors = [
        {
          backgroundColor: 'rgba(255,255,255,.2)',
          borderColor: 'rgba(255,255,255,.55)',
        },
      ];

      resolve(widgetChart);
    });
  }

  initMainChart() {
    return new Promise<any>(async (resolve) => {
      const mainChart: IChartProps = {};
      const brandSuccess = getStyle('--success') || '#4dbd74';
      const brandInfo = getStyle('--info') || '#20a8d8';
      const brandInfoBg = hexToRgba('#20a8d8', 10);
      const brandDanger = getStyle('--danger') || '#f86c6b';
    
      // mainChart
      mainChart.elements = 31;
      mainChart.booking = [];
      mainChart.refund = [];
      mainChart.void = [];
      mainChart.all = [];
      mainChart.labels = [];
  
      // generate random values for mainChart
      for (let i = 0; i < this.data.traffic.length; i++) {
        mainChart.booking.push(this.data.traffic[i].totalBookingsTrafficCount);
        //mainChart.refund.push(this.data.monthCountTrafficResponse[i].refund);
        //mainChart.void.push(this.data.monthCountTrafficResponse[i].void);
        mainChart.all.push(this.data.traffic[i].totalBookingsTrafficCount);
        //mainChart.all.push(this.data.monthCountTrafficResponse[i].refund);
        //mainChart.all.push(this.data.monthCountTrafficResponse[i].void);
        mainChart.labels.push(this.data.traffic[i].totalBookingsTrafficDay.trim() + " " + this.data.traffic[i].totalBookingsTrafficDate);
      }
  
      mainChart.Data = [
        {
          data: mainChart.booking,
          label: 'Booking',
        },
        // {
        //   data: mainChart.refund,
        //   label: 'Refund',
        // },
        // {
        //   data: mainChart.void,
        //   label: 'Void',
        // },
      ];

      mainChart.options = {
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
                stepSize: Math.ceil(Math.max(...mainChart.all) / 5),
                max: Math.max(...mainChart.all),
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
      mainChart.colors = [
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
      mainChart.legend = false;
      mainChart.type = 'line';

      resolve(mainChart);
    });
  }

  loadDashboardStatistics = () => {
    return new Promise<any>(async (resolve, reject) => {
      this.isLoading = true;
      console.log("asdfsadf" + this.storageSrv.getFacilityId());
      this.localInterfaceSrv.getDashboardStatistics(this.storageSrv.getFacilityId())
      .then(res => {
        this.data = res;
        this.isLoading = false;
        resolve(res);
      })
      .catch(err => { reject(err); });
    });
  }
}
