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
    fetch(`fetch.php?add=${query}`);
}
function dbChangeMagnet(fridge: dbFridge, magnet: dbMagnet): void {
    let query = getQuery(fridge, magnet);
    fetch(`fetch.php?change=${query}`);
}
function dbDeleteMagnet(fridge: dbFridge, magnet: dbMagnet): void {
    let query = getQuery(fridge, magnet);
    fetch(`fetch.php?delete=${query}`);
}
function getQuery(fridge: dbFridge, magnet: dbMagnet) {
    return `${JSON.stringify(fridge)}|${JSON.stringify(magnet)}`
        .replace(/[{}]/g, "").replace(/"/g, "");
}

export { fridge, dbMagnet, getFridge, getMagnets, dbAddMagnet, dbChangeMagnet, dbDeleteMagnet };