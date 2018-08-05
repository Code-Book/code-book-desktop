const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')

describe('Application launch', function () {
    this.timeout(10000);

    beforeEach(() => {
        this.app = new Application({
            path: electronPath,
            args: [path.join(__dirname, '..')]
        })
        return this.app.start()
    })

    afterEach(() => {
        if (this.app && this.app.isRunning()) {
            return this.app.stop()
        }
    })

    it('Test initial load of application', async () => {
        const windowCount = await this.app.client.getWindowCount();
        console.log(windowCount);
        assert.equal(windowCount, 1);

        const windowTitle = await this.app.client.getText('#mainTitle');
        console.log(windowTitle);
        assert.equal(windowTitle, 'CodeBook')

        assert.ok(await this.app.client.isExisting('#mainIconSettings'))
    })

    it('Test Settings Page', async () => {
        assert.ok(await this.app.client.isExisting('#mainIconSettings'))
        console.log('Setting Button exists')

        // var settingButton = await this.app.client.selectByAttribute('id', '#mainIconSettings')
        // console.log(settingButton)
        // settingButton.click()

        // var moreSettingButton = await this.app.client.selectByAttribute('ng-reflect-router-link', 'settings')
        // console.log(moreSettingButton)
        // moreSettingButton.click()

    })

})