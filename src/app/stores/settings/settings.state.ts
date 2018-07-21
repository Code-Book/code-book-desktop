export interface SettingsState {
    isLoading: boolean;
    settingChanged: boolean;
    settings: {
        theme: string
    };
}

export const initialSettingsState: SettingsState = {
    isLoading: false,
    settingChanged: false,
    settings: {
        theme: 'dark-theme',
    }
};
