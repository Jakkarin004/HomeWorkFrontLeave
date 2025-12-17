import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainService } from '../service/service.api';
import { MatTableDataSource } from '@angular/material/table';
import { IMPORT_ALL } from '../import.all';
import { provideNativeDateAdapter } from '@angular/material/core';
import * as echarts from 'echarts';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface LeaveSum {
  userId: number;
  username: string;
  department: string;
  leaveSick: number;
  leaveVa: number;
  leavePer: number;
  leaveTotal: number;
}

function sumLeaveAll(data: any[]): LeaveSum[] {
  const map = new Map<number, LeaveSum>();

  const checkData = data.filter(item => item.status === 'approved');

  checkData.forEach(item => {
    // เช็คคน 
    if (!map.has(item.userId)) {
      map.set(item.userId, {
        userId: item.userId,
        username: item.username,
        department: item.department,
        leaveSick: 0,
        leaveVa: 0,
        leavePer: 0,
        leaveTotal: 0
      });
    }

    const sum = map.get(item.userId)!;

    switch (item.name) {
      case 'ลาป่วย':
        sum.leaveSick += 1;
        break;
      case 'ลาพักร้อน':
        sum.leaveVa += 1;
        break;
      case 'ลากิจ':
        sum.leavePer += 1;
        break;
    }


    sum.leaveTotal = sum.leaveSick + sum.leaveVa + sum.leavePer;
  });

  return Array.from(map.values());
}


function sumLeaveGraph(data: any[]): LeaveSum[] {
  const map = new Map<number, LeaveSum>();

  const checkData = data.filter(item => item.status === 'approved');

  checkData.forEach(item => {

    if (!map.has(item.userId)) {
      map.set(item.userId, {
        userId: item.userId,
        username: item.username,
        department: item.department,
        leaveSick: 0,
        leaveVa: 0,
        leavePer: 0,
        leaveTotal: 0
      });
    }

    const sum = map.get(item.userId)!;

    const start = new Date(item.startDate);
    const end = new Date(item.endDate);
    const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    // นับตามประเภทลา
    switch (item.name) {
      case 'ลาป่วย':
        sum.leaveSick += days;
        break;
      case 'ลาพักร้อน':
        sum.leaveVa += days;
        break;
      case 'ลากิจ':
        sum.leavePer += days;
        break;
    }

    sum.leaveTotal = sum.leaveSick + sum.leaveVa + sum.leavePer;
  });

  return Array.from(map.values());
}


@Component({
  selector: 'app-statistics-page',
  standalone: true,
  imports: [IMPORT_ALL],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './statistics-page.component.html',
  styleUrl: './statistics-page.component.css'
})
export class StatisticsPageComponent {
  dataRe: any = [];
  dataList: LeaveSum[] = [];
  dataListG: LeaveSum[] = [];
  chartInstance!: echarts.ECharts;

  dataDepart: any = [];
  department = '';
  mothSelect = '';

  selectMonth = 'all';
  selectDepartment = 'all';

  dataName: string[] = [
    'username',
    'department',
    'leaveSick',
    'leaveVa',
    'leavePer',
    'leaveTotal'
  ];

  dataSource = new MatTableDataSource<any>([]);


  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.callRe();
    this.callDe();

    this.dataSource.filterPredicate = (data) => {
      return (
        (this.selectDepartment === 'all' || data.department === this.selectDepartment)
      );
    };

  }

  //api
  callRe() {
    this.mainService.getDataRequest().subscribe({
      next: (response) => {
        this.dataRe = response;
        this.dataList = sumLeaveAll(this.dataRe);
        this.dataListG = sumLeaveGraph(this.dataRe);
        this.dataSource.data = this.dataList;
        console.log('นำเข้าข้อมูลตาราง :', this.dataSource.data);
        this.initChart();
      },
      error: (error) => {
        console.error('เพิ่มใบลาไม่สำเร็จ:', error);
      }
    });
  }

  callDe() {
    this.mainService.getDataDepart().subscribe({
      next: (response) => {
        this.dataDepart = response;
      },
      error: (error) => {
        console.error('เพิ่มใบลาไม่สำเร็จ:', error);
      }
    });
  }

  applyFilter() {
    this.dataSource.filter = Math.random.toString();
  }


  initChart() {
    const chartDom = document.getElementById('leaveChart')!;
    this.chartInstance = echarts.init(chartDom);
    this.updateChart();
    window.addEventListener('resize', () => this.chartInstance.resize());
  }

  updateChart() {
    const totalLeaveSick = this.dataListG.reduce((sum, u) => sum + u.leaveSick, 0);
    const totalLeaveVa = this.dataListG.reduce((sum, u) => sum + u.leaveVa, 0);
    const totalLeavePer = this.dataListG.reduce((sum, u) => sum + u.leavePer, 0);

    const option = {
      title: {
        text: 'สรุปการลาแยกตามประเภท',
        left: 'left',
        top: 'top',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      xAxis: {
        type: 'category',
        data: ['ลาป่วย', 'ลาพักร้อน', 'ลากิจ'],
      },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'จำนวนวันลา',
          type: 'bar',
          data: [totalLeaveSick, totalLeaveVa, totalLeavePer],
          label: { show: true, position: 'top' }
        }
      ]
    };

    this.chartInstance.setOption(option);
  }

  exportToExcel() {
    // เตรียมข้อมูล
    const data = this.dataSource.data.map(item => ({
      ชื่อ: item.username,
      แผนก: item.department,
      ลาป่วย: item.leaveSick,
      ลาพักร้อน: item.leaveVa,
      ลากิจ: item.leavePer,
      รวมวันลา: item.leaveTotal
    }));

    // แปลงเป็น worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // สร้าง workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'สรุปการลา');

    // แปลงเป็นไฟล์ Excel และดาวน์โหลด
    const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'leave_summary.xlsx');
  }



}
