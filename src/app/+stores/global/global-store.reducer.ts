import * as globalStore from './global-store.actions';
import { GlobalStoreState, initialGlobalStoreState } from './global-store.state';

export function globalStoreReducer(state = initialGlobalStoreState, action: globalStore.Actions): GlobalStoreState {
  switch (action.type) {

    case globalStore.SEARCH_ENABLE: {
      return {
        ...state,
        search: {
          ...state.search,
          enabled: true
        }
      };
    }

    case globalStore.SEARCH_DISABLE: {
      return {
        ...state,
        search: {
          ...state.search,
          enabled: false
        }
      };
    }

    case globalStore.SEARCH_SHOW: {
      return {
        ...state,
        search: {
          ...state.search,
          visible: true
        }
      };
    }

    case globalStore.SEARCH_HIDE: {
      return {
        ...state,
        search: {
          ...state.search,
          visible: false
        }
      };
    }

    default: {
      return state;
    }
  }
}
