export interface GlobalStoreState {
    search: {
        enabled: boolean,
        visible: boolean
    };
}

export const initialGlobalStoreState: GlobalStoreState = {
    search: {
        enabled: true,
        visible: false
    }
};
