import { Component } from '@angular/core';
import { IMPORT_ALL } from '../import.all';
import { MainService } from '../service/service.api';

@Component({
  selector: 'app-leave-request-approve',
  standalone: true,
  imports: [IMPORT_ALL],
  templateUrl: './leave-request-approve.component.html',
  styleUrl: './leave-request-approve.component.css'
})
export class LeaveRequestApproveComponent {
  
  dataReList: any = [];
  comment='';

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.callApi();
  }

  //api
  callApi() {
    this.mainService.getDataRequest().subscribe({
      next: (response) => {
        this.dataReList = response.filter((item)=>item.status === 'pending');
        console.log('นำเข้าข้อมูล :', this.dataReList);
      },
      error: (error) => {
        console.error('เพิ่มใบลาไม่สำเร็จ:', error);
      }
    });
  }

  access(id: number){

    console.log('เช็ค id :', id);
    const payload = {
      status:'approved',
      comment:this.comment
    }
    console.log('เช็ค payload :', payload);

    this.mainService.updateData(id,payload).subscribe({
      next: (response) => {
        console.log('update สำเร็จ :', response);
        this.callApi();
      },
      error: (error) => {
        console.error('update ไม่สำเร็จ:', error);
      }
    });
  }

  cancle(id: number){

    console.log('เช็ค id :', id);
    const payload = {
      status:'cancle',
      comment:this.comment
    }
    console.log('เช็ค payload :', payload);

    this.mainService.updateData(id,payload).subscribe({
      next: (response) => {
        console.log('update สำเร็จ :', response);
        this.callApi();
      },
      error: (error) => {
        console.error('update ไม่สำเร็จ:', error);
      }
    });
  }
}
