/**
 * Created by rkhabibullin on 08.11.2017.
 */

export interface UiEvent {
    type: string;
    value: any;
}

export let uiActions = {
  PROJECT_VIEW: 'UI OPEN PROJECT',
  PROJECT_VIEW_CODE: 'UI OPEN PROJECT BY CODE'
};