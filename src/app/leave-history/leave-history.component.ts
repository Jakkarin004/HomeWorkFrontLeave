import { Component } from '@angular/core';
import { IMPORT_ALL } from '../import.all';
import { MainService } from '../service/service.api';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-leave-history',
  standalone: true,
  imports: [IMPORT_ALL],
  templateUrl: './leave-history.component.html',
  styleUrl: './leave-history.component.css'
})
export class LeaveHistoryComponent {

  dataName: string[] = [
    'date',
    'username',
    'department',
    'type',
    'day',
    'status',
    'reason'
  ];

  dataSource = new MatTableDataSource<any>([]);
  
  selectType = 'all';
  selectStatus = 'all';

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.callApi();

    this.dataSource.filterPredicate = (data) => {
      return (
        (this.selectType === 'all' || data.name === this.selectType) && (this.selectStatus === 'all' || data.status === this.selectStatus)
      );
    };

  }

  //api
  callApi() {
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

  applyFilter() {
    this.dataSource.filter = Math.random.toString();
  }

}
