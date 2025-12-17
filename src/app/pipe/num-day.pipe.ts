import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numDay',
  standalone: true
})
export class NumDayPipe implements PipeTransform {

  transform(startDate:string,endDate:string): number {
    if(!startDate || !endDate){
      return 0;
    }
    const startD = new Date(startDate);
    const endD = new Date(endDate);

    const countTime = endD.getTime() - startD.getTime();
    const countDay = Math.floor(countTime/(1000*60*60*24))+1;

    return countDay;
  }

}
