import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ElectronService } from 'ngx-electron';
import * as moment from 'moment-timezone';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient, private electronService: ElectronService) { }

  postFeedback(data: any): Observable<any> {
    return this.http.post<{
      status: string,
      message?: string
    }>('https://us-central1-codebook-1.cloudfunctions.net/api/feedback/', data, {
      headers: {
        'Content-Type': 'application/json',
        'machineId': this.electronService.ipcRenderer.sendSync('MACHINE_ID_REQUEST'),
        'timeZone': moment.tz.guess()
      }
    });
  }
}
