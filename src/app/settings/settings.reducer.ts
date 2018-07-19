import * as settings from './settings.actions';
import { SettingsState, initialSettingsState } from './settings.state';

/**
 * Writing Good reducer's
 * 1. Keep then PURE
 * 2. Should handle data in an immutable manner
 * 3. Always return a value (State)
 */

export function settingsReducer(state = initialSettingsState, action: settings.Actions): SettingsState {
  switch (action.type) {
    case settings.SET_THEME: {
      return {
        ...state,
        theme: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
