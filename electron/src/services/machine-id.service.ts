import { ipcMain } from "electron";
import { machineIdSync } from 'node-machine-id';

export class MachineIdService {

    constructor() {
        ipcMain.on('MACHINE_ID_REQUEST', async (event: any, args: any) => {
            event.returnValue = machineIdSync();
        });
    }

}