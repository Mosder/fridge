import { Magnet, magnets } from "./Magnet";

let totalAmount = 0;

document.getElementById("add").onclick = addMagnet;

function addMagnet(): void {
    magnets.push(new Magnet(totalAmount++));
    document.getElementById("total").innerText = "Total: " + totalAmount.toString();
    document.getElementById("on").innerText = "On: " + magnets.length.toString();
}