class Magnet {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private div: HTMLDivElement;
    private contentDiv: HTMLDivElement;
    readonly id: number;
    static startSize: number = 100;
    static startOffset: number = 40;
    static startContent: string = "NEW JOB!!!";

    constructor(id: number) {
        this.id = id;
        this.div = this.createDiv();
        this.resize(Magnet.startSize, Magnet.startSize);
        this.move(Magnet.startOffset, Magnet.startOffset);
        this.getOnTop();
    }

    private createDiv(): HTMLDivElement {
        let div = document.createElement("div")
        div.className = "magnet";
        div.id = this.id.toString();
        div.onmousedown = (e: MouseEvent) => { this.divFocus(e) };

        let del = document.createElement("button");
        del.className = "del";
        del.onclick = () => { this.yeet() };
        div.appendChild(del);

        let resizer = document.createElement("div");
        resizer.className = "resizer";
        resizer.onmousedown = (e: MouseEvent) => { this.resizerFocus(e) };
        div.appendChild(resizer);

        let edit = document.createElement("button");
        edit.className = "edit";
        edit.onclick = () => {
            this.getOnTop();
            editMagnet(this);
        };
        div.appendChild(edit);

        this.contentDiv = document.createElement("div");
        this.contentDiv.className = "content";
        this.contentDiv.innerHTML = Magnet.startContent;
        this.contentDiv.onclick = (e) => { e.preventDefault() }
        div.append(this.contentDiv);

        document.body.appendChild(div);
        return div;
    }

    private resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
        this.div.style.width = width + "px";
        this.div.style.height = height + "px";
    }

    private move(x: number, y: number): void {
        this.x = x;
        this.y = y;
        this.div.style.left = x + "px";
        this.div.style.top = y + "px";
    }

    private color(color: string): void {
        this.div.style.backgroundColor = color;
    }

    get getZ(): number {
        return parseInt(this.div.style.zIndex);
    }

    private getOnTop(): void {
        let z = 0;
        for (let magnet of magnets) {
            if (z <= magnet.getZ)
                z = magnet.getZ + 1;
        }
        this.div.style.zIndex = z.toString();
    }

    private divFocus(e: MouseEvent): void {
        if (this.div == e.target || this.contentDiv == e.target) {
            e.preventDefault();
            this.color("#feefed");
            this.getOnTop();

            document.onmouseup = () => {
                document.onmouseup = null;
                document.onmousemove = null;
                this.color("#fff");
            };

            let offsetX = e.clientX - this.x;
            let offsetY = e.clientY - this.y;
            document.onmousemove = (e) => { this.divDrag(e, offsetX, offsetY) };
        }
    }
    private divDrag(e: MouseEvent, offX: number, offY: number): void {
        e.preventDefault();
        this.move(e.clientX - offX, e.clientY - offY);
    }

    private resizerFocus(e: MouseEvent): void {
        e.preventDefault();
        this.color("#feefed");
        this.getOnTop();

        document.onmouseup = () => {
            document.onmouseup = null;
            document.onmousemove = null;
            this.color("#fff");
        };

        document.onmousemove = (e) => { this.resizerResize(e) };
    }
    private resizerResize(e: MouseEvent): void {
        e.preventDefault();
        let x = e.clientX - this.x;
        x = x > 100 ? x : 100;
        let y = e.clientY - this.y;
        y = y > 100 ? y : 100;
        this.resize(x, y);
    }

    private yeet(): void {
        this.div.parentNode.removeChild(this.div);
        yeetMagnet(this.id);
    }

    public editContent(): void {
        this.contentDiv.innerHTML = tinymce.activeEditor.getContent();
        document.getElementById("editor").style.display = "none";
    }

    get getContent(): string {
        return this.contentDiv.innerHTML;
    }
}

let magnets: Array<Magnet> = [];

function yeetMagnet(id: number): void {
    magnets = magnets.filter((val) => { return val.id != id });
    document.getElementById("on").innerText = "On: " + magnets.length.toString();
}

function editMagnet(magnet: Magnet): void {
    tinymce.activeEditor.setContent(magnet.getContent);
    let editor = document.getElementById("editor") as HTMLDivElement;
    editor.style.display = "block";
    editor.style.zIndex = (magnet.getZ + 1).toString();
    document.getElementById("saveEdit").onclick = () => { magnet.editContent() };
}

export { Magnet, magnets };