import { Component } from '@angular/core';
import { IMPORT_ALL } from '../import.all';
import { LeaveRequestFormComponent } from "../leave-request-form/leave-request-form.component";
import { NgIf, NgForOf } from "@angular/common";
import { LeaveHistoryComponent } from "../leave-history/leave-history.component";
import { LeaveRequestApproveComponent } from "../leave-request-approve/leave-request-approve.component";
import { MainService } from '../service/service.api';
import { MatTableDataSource } from '@angular/material/table';
import { DashBoardPageComponent } from "../dash-board-page/dash-board-page.component";
import { StatisticsPageComponent } from "../statistics-page/statistics-page.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [IMPORT_ALL, LeaveRequestFormComponent, LeaveHistoryComponent, LeaveRequestApproveComponent, DashBoardPageComponent, StatisticsPageComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  acTive = 1;

  page = [
    { id: 1, pageName: 'แดชบอร์ด' },
    { id: 2, pageName: 'ขอลางาน' },
    { id: 3, pageName: 'ประวัติการลา' },
    { id: 4, pageName: 'อนุมัติการลา' },
    { id: 5, pageName: 'สถิติการลาประจำเดือน' },
    { id: 6, pageName: 'ปฏิทินการลา' },
  ]

  trackByLink(index: number, item: any) {
    return item.id;
  }

}
