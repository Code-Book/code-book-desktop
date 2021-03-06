import { Action } from '@ngrx/store';

/**
 * Good Action hygiene
 * 1. Actions names should be readable and easy to debug
 * 2. Actions should be unique for an intent
 * 3. Payload should be an Object instead of using the variable directly
 */
export const LOAD_INITIAL_SETTINGS = '[Settings] LOAD_INITIAL_SETTINGS';
export const LOAD_INITIAL_SETTINGS_SUCCESS = '[Settings] LOAD_INITIAL_SETTINGS_SUCCESS';

export const SET_THEME = '[Settings] SET_THEME';
export const SET_DEFAULT_DESTINATION_PATH = '[Settings] SET_DEFAULT_DESTINATION_PATH';

export const SET_FILE_SYSTEM_TEMPLATE_PATH = '[Settings] SET_FILE_SYSTEM_TEMPLATE_PATH';

// Create actions with or without payload
export class LoadInitialSettingSAction implements Action {
  readonly type = LOAD_INITIAL_SETTINGS;
}
export class LoadInitialSettingSuccessAction implements Action {
  readonly type = LOAD_INITIAL_SETTINGS_SUCCESS;
  constructor(public payload: any) { }
}
export class SetThemeAction implements Action {
  readonly type = SET_THEME;

  constructor(public payload: string) { }
}

export class SetDefaultDestinationPathAction implements Action {
  readonly type = SET_DEFAULT_DESTINATION_PATH;

  constructor(public payload: string) { }
}
export class SetFileSystemTemplatePathAction implements Action {
  readonly type = SET_FILE_SYSTEM_TEMPLATE_PATH;

  constructor(public payload: string) { }
}


// Export created actions
export type Actions =
  | LoadInitialSettingSAction
  | LoadInitialSettingSuccessAction
  | SetThemeAction
  | SetFileSystemTemplatePathAction
  | SetDefaultDestinationPathAction;
