import { Observable } from 'rxjs';
import { NgZone } from '@angular/core';

const observeOnZone = (_zone: NgZone) => <T>(source: Observable<T>) =>
    new Observable<T>(observer => {
        return source.subscribe({
            next(x) {
                _zone.run(() => {
                    observer.next(x);
                });
            },
            error(err) {
                _zone.run(() => {
                    observer.error(err);
                });
            },
            complete() {
                _zone.run(() => {
                    observer.complete();
                });
            }
        });
    });

export default observeOnZone;
