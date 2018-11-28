import { Action } from '@ngrx/store';

export const SEARCH_ENABLE = '[Global Store] Search enable';
export const SEARCH_DISABLE = '[Global Store] Search disable';
export const SEARCH_SHOW = '[Global Store] Search show';
export const SEARCH_HIDE = '[Global Store] Search hide';

export const ANALYTICS_EVENT = '[Global Store] Analytics Event';
export const ANALYTICS_SCREEN = '[Global Store] Analytics Screen';

export class SearchEnableAction implements Action {
  readonly type = SEARCH_ENABLE;

  constructor() { }
}

export class SearchDisableAction implements Action {
  readonly type = SEARCH_DISABLE;

  constructor() { }
}

export class SearchShowAction implements Action {
  readonly type = SEARCH_SHOW;

  constructor() { }
}

export class SearchHideAction implements Action {
  readonly type = SEARCH_HIDE;

  constructor() { }
}

export class AnalyticsEventAction implements Action {
  readonly type = ANALYTICS_EVENT;

  constructor(public payload: {
    category: string,
    action: string,
    label?: string,
    value?: number
  }) { }
}

export class AnalyticsScreenAction implements Action {
  readonly type = ANALYTICS_SCREEN;

  constructor(public payload: {
    path: string,
    title: string
  }) { }
}


export type Actions =
  | SearchEnableAction | SearchDisableAction | SearchShowAction | SearchHideAction | AnalyticsEventAction | AnalyticsScreenAction;
