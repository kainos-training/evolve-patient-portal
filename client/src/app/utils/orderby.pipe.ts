import { Pipe } from '@angular/core';

@Pipe({
    name: 'orderby'
})
export class OrderByPipe {
    transform(items: any[], filter: string, orderby:string): any[] {

        if (items === undefined || filter === undefined) {
            return items;
        }

        if(!orderby)
        {
            orderby = 'ASC';
        }
        else if(orderby != 'ASC' && orderby != 'DESC'){
            orderby = 'ASC';
        }

        items.sort((a: any, b: any) => {
            if (a[filter] < b[filter]) {
                return (orderby == 'ASC')?-1:1;
            } else if (a[filter] > b[filter]) {
                return (orderby == 'ASC')?1:-1;
            } else {
                return 0;
            }
        });
        return items;
    }
}