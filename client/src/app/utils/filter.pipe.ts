import { Pipe } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe {

    transform(items: any[], filter: any) {
        if (!items || !filter) {
            return items;
        }
        
        return items.filter((item: any) => this.applyFilter(item, filter));
    }

    applyFilter(item: any, filter: any): boolean {
        for (let field in filter) {
            if (filter[field]) {
                if (filter[field] instanceof Date) {
                    let temp1 = new Date(item[field]);
                    let temp2 = new Date(filter[field]);
                    if (temp1.getDate() != temp2.getDate() || temp1.getFullYear() != temp2.getFullYear() || temp1.getMonth() != temp2.getMonth()) {
                        return false;
                    }
                }
                else if (typeof filter[field] === 'string') {
                    if (item[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
                        return false;
                    }
                } else if (typeof filter[field] === 'number') {
                    if (item[field] !== filter[field]) {
                        return false;
                    }
                }
            }
        }
        
        return true;
    }
}