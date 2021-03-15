import { Component, OnInit, NgZone, OnDestroy, TemplateRef } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
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
  selector: 'app-kemasukan-data',
  templateUrl: './kemasukan-data.component.html',
  styleUrls: ['./kemasukan-data.component.scss']
})
export class KemasukanDataComponent implements OnInit, OnDestroy {

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
    'name4': [
      { type: 'required', message: 'Data is required' }
    ],
    'name5': [
      { type: 'required', message: 'Data is required' }
    ],
    'name6': [
      { type: 'required', message: 'Data is required' }
    ],
    'name7': [
      { type: 'required', message: 'Data is required' }
    ],
    'name8': [
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
      name4: new FormControl('', Validators.compose([
        Validators.required
      ])),
      name5: new FormControl('', Validators.compose([
        Validators.required
      ])),
      name6: new FormControl('', Validators.compose([
        Validators.required
      ])),
      name7: new FormControl('', Validators.compose([
        Validators.required
      ])),
      name8: new FormControl('', Validators.compose([
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
      this.getChartKemasukanDataBubble()
      this.getChartKemasukanDataMixedDaily()
    })
  }

  getChartKemasukanDataBubble() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartkemasukandata1", am4charts.XYChart);
    chart.colors.step = 3;

    // Add data
    chart.data = [{
      "y": 10,
      "x": 14,
      "value": 59,
      "y2": -5,
      "x2": -3,
      "value2": 44
    }, {
      "y": 5,
      "x": 3,
      "value": 50,
      "y2": -15,
      "x2": -8,
      "value2": 12
    }, {
      "y": -10,
      "x": 8,
      "value": 19,
      "y2": -4,
      "x2": 6,
      "value2": 35
    }, {
      "y": -6,
      "x": 5,
      "value": 65,
      "y2": -5,
      "x2": -6,
      "value2": 168
    }, {
      "y": 15,
      "x": -4,
      "value": 92,
      "y2": -10,
      "x2": -8,
      "value2": 102
    }, {
      "y": 13,
      "x": 1,
      "value": 8,
      "y2": -2,
      "x2": 0,
      "value2": 41
    }, {
      "y": 1,
      "x": 6,
      "value": 35,
      "y2": 0,
      "x2": -3,
      "value2": 16
    }];

    // Create axes
    let xAxis = chart.xAxes.push(new am4charts.ValueAxis());
    xAxis.renderer.minGridDistance = 50;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.renderer.minGridDistance = 50;

    // Create series #1
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "y";
    series.dataFields.valueX = "x";
    series.dataFields.value = "value";
    series.strokeOpacity = 0;
    series.name = "Series 1";

    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.strokeOpacity = 0.2;
    bullet.stroke = am4core.color("#ffffff");
    bullet.nonScalingStroke = true;
    bullet.tooltipText = "x:{valueX} y:{valueY}";
    series.heatRules.push({
      target: bullet.circle,
      min: 10,
      max: 60,
      property: "radius"
    });

    // Create series #2
    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "y2";
    series2.dataFields.valueX = "x2";
    series2.dataFields.value = "value2";
    series2.strokeOpacity = 0;
    series2.name = "Series 2";

    let bullet2 = series2.bullets.push(new am4charts.Bullet());
    bullet2.tooltipText = "x:{valueX} y:{valueY}";
    bullet2.layout = "absolute";
    bullet2.rotation = 45;

    let rectangle = bullet2.createChild(am4core.Rectangle);
    rectangle.verticalCenter = "middle";
    rectangle.horizontalCenter = "middle";
    rectangle.width = 10;
    rectangle.height = 10;
    rectangle.strokeOpacity = 0.5;
    rectangle.stroke = am4core.color("#ffffff");
    rectangle.nonScalingStroke = true;

    rectangle.verticalCenter = "middle";
    rectangle.horizontalCenter = "middle";

    series2.heatRules.push({
      target: rectangle,
      min: 1,
      max: 8,
      property: "scale"
    });

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    chart.legend = new am4charts.Legend();

    this.chart1 = chart;
  }

  getChartKemasukanDataMixedDaily() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartkemasukandata2", am4charts.XYChart);

    // Create daily series and related axes
    let dateAxis1 = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis1.renderer.grid.template.location = 0;
    dateAxis1.renderer.minGridDistance = 40;

    let valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());

    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.dataFields.valueY = "value";
    series1.dataFields.dateX = "date";
    series1.data = generateDailyData();
    series1.xAxis = dateAxis1;
    series1.yAxis = valueAxis1;
    series1.tooltipText = "{dateX}: [bold]{valueY}[/]";

    // Create hourly series and related axes
    let dateAxis2 = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis2.renderer.grid.template.location = 0;
    dateAxis2.renderer.minGridDistance = 40;
    dateAxis2.renderer.labels.template.disabled = true;
    dateAxis2.renderer.grid.template.disabled = true;
    dateAxis2.renderer.tooltip.disabled = true;

    let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.renderer.opposite = true;
    valueAxis2.renderer.grid.template.disabled = true;
    valueAxis2.renderer.labels.template.disabled = true;
    valueAxis2.renderer.tooltip.disabled = true;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "value";
    series2.dataFields.dateX = "date";
    series2.data = generateHourlyData();
    series2.xAxis = dateAxis2;
    series2.yAxis = valueAxis2;
    series2.strokeWidth = 3;
    series2.tooltipText = "{dateX.formatDate('yyyy-MM-dd hh:00')}: [bold]{valueY}[/]";

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    function generateDailyData() {
      let firstDate = new Date();
      firstDate.setDate(firstDate.getDate() - 10);
      firstDate.setHours(0, 0, 0, 0);
      let data = [];
      for (var i = 0; i < 10; i++) {
        let newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);
        data.push({
          date: newDate,
          value: Math.round(Math.random() * 12) + 1
        });
      }
      return data;
    }

    function generateHourlyData() {
      let firstDate = new Date();
      firstDate.setDate(firstDate.getDate() - 10);
      let data = [];
      for (var i = 0; i < 10 * 24; i++) {
        let newDate = new Date(firstDate);
        newDate.setHours(newDate.getHours() + i);

        if (i == 0) {
          var value = Math.round(Math.random() * 10) + 1;
        } else {
          var value = Math.round(data[data.length - 1].value / 100 * (90 + Math.round(Math.random() * 20)) * 100) / 100;
        }
        data.push({
          date: newDate,
          value: value
        });
      }
      return data;
    }

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
