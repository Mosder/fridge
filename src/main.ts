import * as tinymce from "tinymce";
import { fridge, dbMagnet, getFridge, getMagnets, dbAddMagnet } from "./dbStuff";
import { Magnet, magnets } from "./Magnet";

let tmpMagnets: Array<dbMagnet>;
tinymce.init({
    selector: "textarea#tinymce",
    height: 500
});

document.getElementById("get").onclick = start;
document.getElementById("add").onclick = addMagnet;

async function start() {
    let input = document.getElementById("input") as HTMLInputElement;
    let parent = document.getElementsByClassName("tox-statusbar__text-container")[0] as HTMLDivElement;
    parent.removeChild(parent.children[1]);
    parent.parentElement.style.height = "30px";
    parent.style.lineHeight = "30px";
    let saveEdit = document.createElement("button");
    saveEdit.id = "saveEdit";
    let cancelEdit = document.createElement("button");
    cancelEdit.id = "cancelEdit";
    cancelEdit.onclick = () => {
        document.getElementById("editor").style.display = "none";
    }
    parent.appendChild(cancelEdit);
    parent.appendChild(saveEdit);

    await getFridge(input.value);
    tmpMagnets = await getMagnets(fridge.IDofFridge);
    for (let magnet of tmpMagnets) {
        magnets.push(new Magnet(magnet.IDofFridgeMagnet, magnet.X, magnet.Y, magnet.Z,
            magnet.Width, magnet.Height, magnet.Content));
    }
    document.getElementById("total").innerText = "Total: " + fridge.Total.toString();
    document.getElementById("remaining").innerText = "Remaining: " + fridge.Remaining.toString();
    console.log(fridge.Remaining);

    document.getElementById("getter").style.display = "none";
    document.getElementById("fridge").style.display = "block";
}

function addMagnet(): void {
    let newMagnet = new Magnet(fridge.Total);
    magnets.push(newMagnet);
    document.getElementById("total").innerText = "Total: " + (++fridge.Total).toString();
    document.getElementById("remaining").innerText = "Remaining: " + (++fridge.Remaining).toString();
    dbAddMagnet(fridge, newMagnet.getDbMagnet);
}