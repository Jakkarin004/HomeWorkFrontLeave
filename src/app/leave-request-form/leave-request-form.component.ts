import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IMPORT_ALL } from '../import.all';
import { MainService } from '../service/service.api';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-leave-request-form',
  standalone: true,
  imports: [IMPORT_ALL],
  templateUrl: './leave-request-form.component.html',
  styleUrl: './leave-request-form.component.css'
})
export class LeaveRequestFormComponent {
  userId = 1;
  leaveTypeId = '';
  startDate = '';
  endDate = '';
  status = '';
  reason = '';

  typeAll: any = [];

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.callApi();
  }

  //api
  callApi() {
    this.mainService.getData().subscribe({
      next: (response) => {
        this.typeAll = response;
        console.log('เพิ่มใบลาสำเร็จ :', response);
      },
      error: (error) => {
        console.error('เพิ่มใบลาไม่สำเร็จ:', error);
      }
    });
  }

  saveLeaveRe(form: NgForm) {

    const NumLeave = Number(this.leaveTypeId);

    const payload = {
      userID: {id:this.userId},
      leaveTypeId: {id: NumLeave},
      startDate: this.startDate,
      endDate: this.endDate,
      status: 'pending',
      reason: this.reason
    }
    this.mainService.saveData(payload).subscribe({
      next: (response) => {
        console.log('เพิ่มใบลาสำเร็จ :', response);
        form.resetForm();
      },
      error: (error) => {
        console.error('เพิ่มใบลาไม่สำเร็จ:', error);
      }
    });
  }

  resetForm() {
    this.userId = 1;
    this.leaveTypeId = '';
    this.startDate = '';
    this.endDate = '';
    this.status = '';
    this.reason = '';
  }
}
