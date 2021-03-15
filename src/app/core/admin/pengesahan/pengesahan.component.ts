import { Component, OnInit, NgZone, OnDestroy, TemplateRef } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import swal from "sweetalert2";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

@Component({
  selector: 'app-pengesahan',
  templateUrl: './pengesahan.component.html',
  styleUrls: ['./pengesahan.component.scss']
})
export class PengesahanComponent implements OnInit {

  // Chart
  private chart1: any
  private chart2: any
  private chart3: any

  //table
  entries: number = 5;
  selected: any[] = [];
  tableActiveRow: any;
  temp = [];
  activeRow: any;
  rows: any = [
    {
      tabHujan: "50%",
      statEmp: "60%",
      parAir: "80%",
      aliSung: "80%",
      epan: "70%",
      cho: "50%",
      kemAkt: "90%",
      kemasDalam: "80%",
    },
    {
      tabHujan: "56%",
      statEmp: "45%",
      parAir: "87%",
      aliSung: "34%",
      epan: "56%",
      cho: "67%",
      kemAkt: "69%",
      kemasDalam: "69%",
    },
    {
      tabHujan: "89%",
      statEmp: "34%",
      parAir: "56%",
      aliSung: "58%",
      epan: "89%",
      cho: "78%",
      kemAkt: "58%",
      kemasDalam: "67%",
    },
  ];
  SelectionType = SelectionType;

  //modal
  modalRef: BsModalRef;

  // Form
  registerForm: FormGroup
  registerFormMessages = {
    'name1': [
      { type: 'required', message: 'Data is required' }
    ],
    'name2': [
      { type: 'required', message: 'Data is required' }
    ],
    'name3': [
      { type: 'required', message: 'Data is required' }
    ],
  }

  constructor(
    private zone: NgZone,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
  ) {
    this.temp = this.rows.map((prop, key) => {
      return {
        ...prop,
        id: key
      };

    });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name1: new FormControl('', Validators.compose([
        Validators.required
      ])),
      name2: new FormControl('', Validators.compose([
        Validators.required
      ])),
      name3: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
    this.getCharts()
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function (d) {

      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(
      () => {
        if (this.chart1) {
          console.log('Chart disposed')
          this.chart1.dispose()
        }
        if (this.chart2) {
          console.log('Chart disposed')
          this.chart2.dispose()
        }
      }
    )
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChartPengesahanLine()
      this.getChartPengesahanDonut()
    })
  }

  getChartPengesahanLine() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartpengesahan1", am4charts.XYChart);

    // Add data
    chart.data = [{
      "date": "2012-07-27",
      "value": 13
    }, {
      "date": "2012-07-28",
      "value": 11
    }, {
      "date": "2012-07-29",
      "value": 15
    }, {
      "date": "2012-07-30",
      "value": 16
    }, {
      "date": "2012-07-31",
      "value": 18
    }, {
      "date": "2012-08-01",
      "value": 13
    }, {
      "date": "2012-08-02",
      "value": 22
    }, {
      "date": "2012-08-03",
      "value": 23
    }, {
      "date": "2012-08-04",
      "value": 20
    }, {
      "date": "2012-08-05",
      "value": 17
    }, {
      "date": "2012-08-06",
      "value": 16
    }, {
      "date": "2012-08-07",
      "value": 18
    }, {
      "date": "2012-08-08",
      "value": 21
    }, {
      "date": "2012-08-09",
      "value": 26
    }, {
      "date": "2012-08-10",
      "value": 24
    }, {
      "date": "2012-08-11",
      "value": 29
    }, {
      "date": "2012-08-12",
      "value": 32
    }, {
      "date": "2012-08-13",
      "value": 18
    }, {
      "date": "2012-08-14",
      "value": 24
    }, {
      "date": "2012-08-15",
      "value": 22
    }, {
      "date": "2012-08-16",
      "value": 18
    }, {
      "date": "2012-08-17",
      "value": 19
    }, {
      "date": "2012-08-18",
      "value": 14
    }, {
      "date": "2012-08-19",
      "value": 15
    }, {
      "date": "2012-08-20",
      "value": 12
    }, {
      "date": "2012-08-21",
      "value": 8
    }, {
      "date": "2012-08-22",
      "value": 9
    }, {
      "date": "2012-08-23",
      "value": 8
    }, {
      "date": "2012-08-24",
      "value": 7
    }, {
      "date": "2012-08-25",
      "value": 5
    }, {
      "date": "2012-08-26",
      "value": 11
    }, {
      "date": "2012-08-27",
      "value": 13
    }, {
      "date": "2012-08-28",
      "value": 18
    }, {
      "date": "2012-08-29",
      "value": 20
    }, {
      "date": "2012-08-30",
      "value": 29
    }, {
      "date": "2012-08-31",
      "value": 33
    }, {
      "date": "2012-09-01",
      "value": 42
    }, {
      "date": "2012-09-02",
      "value": 35
    }, {
      "date": "2012-09-03",
      "value": 31
    }, {
      "date": "2012-09-04",
      "value": 47
    }, {
      "date": "2012-09-05",
      "value": 52
    }, {
      "date": "2012-09-06",
      "value": 46
    }, {
      "date": "2012-09-07",
      "value": 41
    }, {
      "date": "2012-09-08",
      "value": 43
    }, {
      "date": "2012-09-09",
      "value": 40
    }, {
      "date": "2012-09-10",
      "value": 39
    }, {
      "date": "2012-09-11",
      "value": 34
    }, {
      "date": "2012-09-12",
      "value": 29
    }, {
      "date": "2012-09-13",
      "value": 34
    }, {
      "date": "2012-09-14",
      "value": 37
    }, {
      "date": "2012-09-15",
      "value": 42
    }, {
      "date": "2012-09-16",
      "value": 49
    }, {
      "date": "2012-09-17",
      "value": 46
    }, {
      "date": "2012-09-18",
      "value": 47
    }, {
      "date": "2012-09-19",
      "value": 55
    }, {
      "date": "2012-09-20",
      "value": 59
    }, {
      "date": "2012-09-21",
      "value": 58
    }, {
      "date": "2012-09-22",
      "value": 57
    }, {
      "date": "2012-09-23",
      "value": 61
    }, {
      "date": "2012-09-24",
      "value": 59
    }, {
      "date": "2012-09-25",
      "value": 67
    }, {
      "date": "2012-09-26",
      "value": 65
    }, {
      "date": "2012-09-27",
      "value": 61
    }, {
      "date": "2012-09-28",
      "value": 66
    }, {
      "date": "2012-09-29",
      "value": 69
    }, {
      "date": "2012-09-30",
      "value": 71
    }, {
      "date": "2012-10-01",
      "value": 67
    }, {
      "date": "2012-10-02",
      "value": 63
    }, {
      "date": "2012-10-03",
      "value": 46
    }, {
      "date": "2012-10-04",
      "value": 32
    }, {
      "date": "2012-10-05",
      "value": 21
    }, {
      "date": "2012-10-06",
      "value": 18
    }, {
      "date": "2012-10-07",
      "value": 21
    }, {
      "date": "2012-10-08",
      "value": 28
    }, {
      "date": "2012-10-09",
      "value": 27
    }, {
      "date": "2012-10-10",
      "value": 36
    }, {
      "date": "2012-10-11",
      "value": 33
    }, {
      "date": "2012-10-12",
      "value": 31
    }, {
      "date": "2012-10-13",
      "value": 30
    }, {
      "date": "2012-10-14",
      "value": 34
    }, {
      "date": "2012-10-15",
      "value": 38
    }, {
      "date": "2012-10-16",
      "value": 37
    }, {
      "date": "2012-10-17",
      "value": 44
    }, {
      "date": "2012-10-18",
      "value": 49
    }, {
      "date": "2012-10-19",
      "value": 53
    }, {
      "date": "2012-10-20",
      "value": 57
    }, {
      "date": "2012-10-21",
      "value": 60
    }, {
      "date": "2012-10-22",
      "value": 61
    }, {
      "date": "2012-10-23",
      "value": 69
    }, {
      "date": "2012-10-24",
      "value": 67
    }, {
      "date": "2012-10-25",
      "value": 72
    }, {
      "date": "2012-10-26",
      "value": 77
    }, {
      "date": "2012-10-27",
      "value": 75
    }, {
      "date": "2012-10-28",
      "value": 70
    }, {
      "date": "2012-10-29",
      "value": 72
    }, {
      "date": "2012-10-30",
      "value": 70
    }, {
      "date": "2012-10-31",
      "value": 72
    }, {
      "date": "2012-11-01",
      "value": 73
    }, {
      "date": "2012-11-02",
      "value": 67
    }, {
      "date": "2012-11-03",
      "value": 68
    }, {
      "date": "2012-11-04",
      "value": 65
    }, {
      "date": "2012-11-05",
      "value": 71
    }, {
      "date": "2012-11-06",
      "value": 75
    }, {
      "date": "2012-11-07",
      "value": 74
    }, {
      "date": "2012-11-08",
      "value": 71
    }, {
      "date": "2012-11-09",
      "value": 76
    }, {
      "date": "2012-11-10",
      "value": 77
    }, {
      "date": "2012-11-11",
      "value": 81
    }, {
      "date": "2012-11-12",
      "value": 83
    }, {
      "date": "2012-11-13",
      "value": 80
    }, {
      "date": "2012-11-14",
      "value": 81
    }, {
      "date": "2012-11-15",
      "value": 87
    }, {
      "date": "2012-11-16",
      "value": 82
    }, {
      "date": "2012-11-17",
      "value": 86
    }, {
      "date": "2012-11-18",
      "value": 80
    }, {
      "date": "2012-11-19",
      "value": 87
    }, {
      "date": "2012-11-20",
      "value": 83
    }, {
      "date": "2012-11-21",
      "value": 85
    }, {
      "date": "2012-11-22",
      "value": 84
    }, {
      "date": "2012-11-23",
      "value": 82
    }, {
      "date": "2012-11-24",
      "value": 73
    }, {
      "date": "2012-11-25",
      "value": 71
    }, {
      "date": "2012-11-26",
      "value": 75
    }, {
      "date": "2012-11-27",
      "value": 79
    }, {
      "date": "2012-11-28",
      "value": 70
    }, {
      "date": "2012-11-29",
      "value": 73
    }, {
      "date": "2012-11-30",
      "value": 61
    }, {
      "date": "2012-12-01",
      "value": 62
    }, {
      "date": "2012-12-02",
      "value": 66
    }, {
      "date": "2012-12-03",
      "value": 65
    }, {
      "date": "2012-12-04",
      "value": 73
    }, {
      "date": "2012-12-05",
      "value": 79
    }, {
      "date": "2012-12-06",
      "value": 78
    }, {
      "date": "2012-12-07",
      "value": 78
    }, {
      "date": "2012-12-08",
      "value": 78
    }, {
      "date": "2012-12-09",
      "value": 74
    }, {
      "date": "2012-12-10",
      "value": 73
    }, {
      "date": "2012-12-11",
      "value": 75
    }, {
      "date": "2012-12-12",
      "value": 70
    }, {
      "date": "2012-12-13",
      "value": 77
    }, {
      "date": "2012-12-14",
      "value": 67
    }, {
      "date": "2012-12-15",
      "value": 62
    }, {
      "date": "2012-12-16",
      "value": 64
    }, {
      "date": "2012-12-17",
      "value": 61
    }, {
      "date": "2012-12-18",
      "value": 59
    }, {
      "date": "2012-12-19",
      "value": 53
    }, {
      "date": "2012-12-20",
      "value": 54
    }, {
      "date": "2012-12-21",
      "value": 56
    }, {
      "date": "2012-12-22",
      "value": 59
    }, {
      "date": "2012-12-23",
      "value": 58
    }, {
      "date": "2012-12-24",
      "value": 55
    }, {
      "date": "2012-12-25",
      "value": 52
    }, {
      "date": "2012-12-26",
      "value": 54
    }, {
      "date": "2012-12-27",
      "value": 50
    }, {
      "date": "2012-12-28",
      "value": 50
    }, {
      "date": "2012-12-29",
      "value": 51
    }, {
      "date": "2012-12-30",
      "value": 52
    }, {
      "date": "2012-12-31",
      "value": 58
    }, {
      "date": "2013-01-01",
      "value": 60
    }, {
      "date": "2013-01-02",
      "value": 67
    }, {
      "date": "2013-01-03",
      "value": 64
    }, {
      "date": "2013-01-04",
      "value": 66
    }, {
      "date": "2013-01-05",
      "value": 60
    }, {
      "date": "2013-01-06",
      "value": 63
    }, {
      "date": "2013-01-07",
      "value": 61
    }, {
      "date": "2013-01-08",
      "value": 60
    }, {
      "date": "2013-01-09",
      "value": 65
    }, {
      "date": "2013-01-10",
      "value": 75
    }, {
      "date": "2013-01-11",
      "value": 77
    }, {
      "date": "2013-01-12",
      "value": 78
    }, {
      "date": "2013-01-13",
      "value": 70
    }, {
      "date": "2013-01-14",
      "value": 70
    }, {
      "date": "2013-01-15",
      "value": 73
    }, {
      "date": "2013-01-16",
      "value": 71
    }, {
      "date": "2013-01-17",
      "value": 74
    }, {
      "date": "2013-01-18",
      "value": 78
    }, {
      "date": "2013-01-19",
      "value": 85
    }, {
      "date": "2013-01-20",
      "value": 82
    }, {
      "date": "2013-01-21",
      "value": 83
    }, {
      "date": "2013-01-22",
      "value": 88
    }, {
      "date": "2013-01-23",
      "value": 85
    }, {
      "date": "2013-01-24",
      "value": 85
    }, {
      "date": "2013-01-25",
      "value": 80
    }, {
      "date": "2013-01-26",
      "value": 87
    }, {
      "date": "2013-01-27",
      "value": 84
    }, {
      "date": "2013-01-28",
      "value": 83
    }, {
      "date": "2013-01-29",
      "value": 84
    }, {
      "date": "2013-01-30",
      "value": 81
    }];

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.strokeWidth = 3;
    series.fillOpacity = 0.5;

    // Add vertical scrollbar
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.marginLeft = 0;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";
    chart.cursor.lineX.disabled = true;

    this.chart1 = chart;
  }

  getChartPengesahanDonut() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartpengesahan2", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.legend = new am4charts.Legend();

    chart.data = [
      {
        country: "Accept",
        litres: 501.9
      },
      {
        country: "Reject",
        litres: 301.9
      },
      {
        country: "Pending",
        litres: 201.1
      },
    ];

    chart.innerRadius = 50;

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.category = "country";

    this.chart2 = chart;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide()
    this.registerForm.reset()
  }

  confirm() {
    swal.fire({
      title: "Pengesahan",
      text: "Adakah anda pasti dapat menyimpan data?",
      type: "info",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-info",
      confirmButtonText: "Sahkan",
      showCancelButton: true,
      cancelButtonClass: "btn btn-danger",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.value) {
        this.register()
      }
    })
  }

  register() {
    swal.fire({
      title: "Berjaya",
      text: "Data baru telah disimpan!",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
      confirmButtonText: "Tutup"
    }).then((result) => {
      if (result.value) {
        this.modalRef.hide()
        this.registerForm.reset()
      }
    })
  }

}
