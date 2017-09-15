import { Pipe } from '@angular/core';
import * as _ from 'lodash'; 

@Pipe({
    name: 'unique'
})
export class UniquePipe {
    transform(value: any, field: string): any{
        if(value!== undefined && value!== null){
            return _.uniqBy(value, field);
        }
        return value;
    }
}