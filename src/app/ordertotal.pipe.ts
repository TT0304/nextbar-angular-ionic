import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordertotal'
})
export class OrdertotalPipe implements PipeTransform {
  constructor(){
    console.log("----")
  }
  transform(value: any, orderID): any {
    console.log(value);
    console.log(orderID);
    let total = 0;

    value.forEach(element => {
        if(element.order_id==orderID){
          total = total +  parseFloat(element.ukupno);
        }
    });

    return total;
  }

}
