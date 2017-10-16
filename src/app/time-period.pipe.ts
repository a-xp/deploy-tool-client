import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePeriod'
})
export class TimePeriodPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value)return '-';
    let days = Math.floor(value/86400);
      value = value%86400;
      let hours = Math.floor(value/3600);
      value = value%3600;
      let mins = Math.floor(value/60);
      if(days){
        return days+" дн. "+hours+" ч.";
      }
      if(hours){
        return ("0" + hours).slice(-2)+":"+("0" + mins).slice(-2);
      }
      return 'меньше мин.';
  }

}
