import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { NgForOf, NgIf } from '@angular/common';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { StartEndDatePipe } from './pipe/start-end-date.pipe';
import { NumDayPipe } from './pipe/num-day.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';

export const IMPORT_ALL = [
    FormsModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatIconModule,
    NgIf,
    NgForOf,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    StartEndDatePipe,
    NumDayPipe,
    MatDatepickerModule  
    
]