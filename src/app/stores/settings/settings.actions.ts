import { Action } from '@ngrx/store';

/**
 * Good Action hygiene
 * 1. Actions names should be readable and easy to debug
 * 2. Actions should be unique for an intent
 * 3. Payload should be an Object instead of using the variable directly
 */

export const SET_THEME = '[Settings] SET_THEME';

// Create actions with or without payload
export class SetThemeAction implements Action {
  readonly type = SET_THEME;

  constructor(public payload: string) { }
}

// Export created actions
export type Actions =
  | SetThemeAction;
