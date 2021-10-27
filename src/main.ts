import { Magnet, magnets } from "./Magnet";
// import * as tinymce from "tinymce";

let totalAmount = 0;

document.getElementById("add").onclick = addMagnet;

function addMagnet(): void {
    if (totalAmount == 0) {
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
    }

    magnets.push(new Magnet(totalAmount++));
    document.getElementById("total").innerText = "Total: " + totalAmount.toString();
    document.getElementById("on").innerText = "On: " + magnets.length.toString();
}

tinymce.init({
    selector: "textarea#tinymce",
    height: 500
});