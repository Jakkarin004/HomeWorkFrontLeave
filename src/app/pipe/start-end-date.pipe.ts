import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'startEndDate',
  standalone: true
})
export class StartEndDatePipe implements PipeTransform {

  private monthThai = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.']

  transform(startDate:string,endDate:string): string {
    if(!startDate || !endDate){
      return '-'
    }
    const startD = new Date(startDate);
    const endD = new Date(endDate);

    const statDay = startD.getDate();
    const statMonth = startD.getMonth();
    const statYear = startD.getFullYear()+543;
  
    const endDay = endD.getDate();
    const endMonth = endD.getMonth();
    const endYear = endD.getFullYear()+543;

    if( statMonth ===  endMonth && statYear === endYear && statDay === endDay){
      
        return `${statDay} ${this.monthThai[statMonth]} ${statYear}`;
    }else if(statMonth ===  endMonth && statYear === endYear){

      return `${statDay}-${endDay} ${this.monthThai[statMonth]} ${statYear}`;
    }else{
      
      return `${statDay} ${this.monthThai[statMonth]} ${statYear} - ${endDay} ${this.monthThai[endMonth]} ${endYear}`;
    }

  }

}
