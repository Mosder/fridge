import { JsxEmit } from "../node_modules/typescript/lib/typescript";

interface dbFridge {
    readonly IDofFridge: number;
    readonly Name: string;
    Total: number;
    Remaining: number;
}
let fridge: dbFridge;

interface dbMagnet {
    readonly IDofFridge: number;
    readonly IDofFridgeMagnet: number;
    X: number;
    Y: number;
    Z: number;
    Width: number;
    Height: number;
    Content: string;
}

async function getFridge(name: string) {
    let response = await fetch(`fetch.php?getF=${name}`);

    if (!response.ok) {
        return response.status;
    }
    else {
        fridge = await response.json();
    }
}
async function getMagnets(id: number) {
    let response = await fetch(`fetch.php?getM=${id}`);

    if (!response.ok) {
        return response.status;
    }
    else {
        return await response.json();
    }
}

function dbAddMagnet(fridge: dbFridge, magnet: dbMagnet): void {
    let query = getQuery(fridge, magnet);
    fetch(`fetch.php?add=1&${query}`);
}
function dbChangeMagnet(fridge: dbFridge, magnet: dbMagnet): void {
    let query = getQuery(fridge, magnet);
    fetch(`fetch.php?change=1&${query}`);
}
function dbDeleteMagnet(fridge: dbFridge, magnet: dbMagnet): void {
    let query = getQuery(fridge, magnet);
    fetch(`fetch.php?delete=1&${query}`);
}
function getQuery(fridge: dbFridge, magnet: dbMagnet): string {
    return `IDofFridge=${fridge.IDofFridge}&Name=${fridge.Name}&Total=${fridge.Total}&Remaining=${fridge.Remaining}
        &IDofFridgeMagnet=${magnet.IDofFridgeMagnet}&X=${magnet.X}&Y=${magnet.Y}&Z=${magnet.Z}
        &Width=${magnet.Width}&Height=${magnet.Height}&Content=${magnet.Content}`;
}

export { fridge, dbMagnet, getFridge, getMagnets, dbAddMagnet, dbChangeMagnet, dbDeleteMagnet };