import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IMPORT_ALL } from '../import.all';
import { MainService } from '../service/service.api';

@Component({
  selector: 'app-dash-board-page',
  standalone: true,
  imports: [IMPORT_ALL],
  templateUrl: './dash-board-page.component.html',
  styleUrl: './dash-board-page.component.css'
})
export class DashBoardPageComponent {
  acTive = 1;
  totalDay = 0;
  maxDay = 0;
  dayUse = 0;
  userId = 1;
  pendingCount = 0;

  dataName: string[] = [
    'date',
    'type',
    'day',
    'status'
  ];

  dataSource = new MatTableDataSource<any>([]);
  checkPending: any = [];
  dataBalance: any = [];
  yearNow = new Date().getFullYear().toString();

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.callApi();
    this.callPending();
    this.callRe();
  }

  //api
  callRe() {
    this.mainService.getDataRequest().subscribe({
      next: (response) => {
        this.dataSource.data = response;
        console.log('นำเข้าข้อมูล :', this.dataSource.data);
      },
      error: (error) => {
        console.error('เพิ่มใบลาไม่สำเร็จ:', error);
      }
    });
  }

  //api
  callApi() {
    this.mainService.getDataBalance().subscribe({
      next: (response) => {
        this.dataBalance = response;
        this.totalDays(1, this.yearNow)
        console.log('นำเข้าข้อมูล :', this.dataBalance);
      },
      error: (error) => {
        console.error('เพิ่มใบลาไม่สำเร็จ:', error);
      }
    });
  }

    totalDays(userId: number, year: string) {
    this.totalDay = this.dataBalance
      .filter((item: any) =>
        item.userId === userId && item.year === year
      ).reduce((sum: number, item: any) => sum + item.remainingDays, 0);

    this.maxDay = this.dataBalance
      .filter((item: any) =>
        item.userId === userId && item.year === year
      ).reduce((sum: number, item: any) => sum + item.maxDays, 0);

    this.dayUse = this.maxDay - this.totalDay;
  }

  callPending() {
    this.mainService.getDataRequest().subscribe({
      next: (response) => {
        this.checkPending = response.filter((item: any) =>
          item.status === 'pending' && item.userId === this.userId
        );
        this.pendingCount = this.checkPending.length;
        console.log('ข้อมูลรออนุมัติ :', this.checkPending);
      },
      error: (error) => {
        console.error('เพิ่มใบลาไม่สำเร็จ:', error);
      }
    });
  }
}
