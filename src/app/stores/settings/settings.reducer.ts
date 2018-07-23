import { filter } from 'rxjs/operators';
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
    case settings.LOAD_INITIAL_SETTINGS: {
      return {
        ...state,
        isLoading: true
      };
    }

    case settings.LOAD_INITIAL_SETTINGS_SUCCESS: {
      const newSettings = action.payload || state.settings;
      return {
        ...state,
        isLoading: false,
        settings: newSettings
      };
    }

    case settings.SET_THEME: {
      return {
        ...state,
        settingChanged: true,
        settings: {
          ...state.settings,
          theme: action.payload
        }
      };
    }

    case settings.ADD_TEMPLATE_PATH: {
      return {
        ...state,
        settingChanged: true,
        settings: {
          ...state.settings,
          templatePaths: Array.from(new Set([...(state.settings.templatePaths || []), action.payload]))
        }
      };
    }

    case settings.REMOVE_TEMPLATE_PATH: {
      return {
        ...state,
        settingChanged: true,
        settings: {
          ...state.settings,
          templatePaths: [...(state.settings.templatePaths || []).filter(res => res !== action.payload)]
        }
      };
    }

    default: {
      return state;
    }
  }
}
