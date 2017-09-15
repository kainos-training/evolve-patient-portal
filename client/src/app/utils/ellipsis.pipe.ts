import {Pipe} from '@angular/core';

@Pipe({
    name: 'ellipsis'
})
export class EllipsisPipe {
    transform(val, len, collapsed) {
        if (len === undefined || collapsed === undefined) {
            return val;
        }
        if(val.length < len)
            return val;

        if (collapsed) {
            return val.substring(0, len) + '...<br><br><div class="text-center" style="width:100%"><strong>(Click to expand)</strong></div><br>';
        } else {
            return val + '<br><br><div class="text-center" style="width:100%"><strong>(Click to collapse)</strong></div><br>';
        }
    }
}