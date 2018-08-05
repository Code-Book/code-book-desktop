export interface SettingsState {
    isLoading: boolean;
    settingChanged: boolean;
    settings: {
        theme: string,
        defaultDestination?: string;
        templatePaths: {
            filesystem?: string
        }
    };
}

export const initialSettingsState: SettingsState = {
    isLoading: false,
    settingChanged: false,
    settings: {
        theme: 'dark-theme',
        templatePaths: {}
    }
};
