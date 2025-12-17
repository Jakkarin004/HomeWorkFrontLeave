import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestApproveComponent } from './leave-request-approve.component';

describe('LeaveRequestApproveComponent', () => {
  let component: LeaveRequestApproveComponent;
  let fixture: ComponentFixture<LeaveRequestApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveRequestApproveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveRequestApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
