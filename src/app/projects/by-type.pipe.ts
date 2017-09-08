import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byType'
})
export class ByTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(Array.isArray(value)){
      return value.filter(v=>v.type==args);
    }else{
      return [];
    }
  }

}
