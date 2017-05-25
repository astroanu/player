import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "timecode"
})
export class FormatTimePipe implements PipeTransform {

    transform(seconds): any {
        let minutes: any = Math.floor(seconds / 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        return minutes + ":" + seconds;
    }

    constructor() {
    }
}