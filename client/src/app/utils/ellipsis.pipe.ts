import {Pipe} from '@angular/core';

@Pipe({
    name: 'ellipsis'
})
export class EllipsisPipe {
    transform(val, len) {
        if (len === undefined) {
            return val;
        }

        if (val.length > len) {
            return val.substring(0, len) + '...<br> <br><strong>(Click to expand)</strong>';
        } else {
            return val + '<br> <br><strong>(Click to collapse)</strong>';
        }
    }
}