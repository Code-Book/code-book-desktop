import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { GlobalStoreService } from './global-store.service';
import * as globalStore from './global-store.actions';

@Injectable()
export class GlobalStoreEffects {

  // constructor(
  //   private globalStoreService: GlobalStoreService,
  //   private actions$: Actions
  // ) { }

}
