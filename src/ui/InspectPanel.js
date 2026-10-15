export class InspectPanel {
    constructor() {
        this.root = document.getElementById('inspect');
        this.title = this.root.querySelector('.inspect-title');
        this.body = this.root.querySelector('.inspect-body');
        this.isOpen = false;
    }
    open(title, lines) {
        this.title.textContent = title;
        this.body.replaceChildren();

        for (const line of lines) {
            const paragraph = document.createElement('p');

            if (line.who) {
                const who = document.createElement('span');
                who.className = 'inspect-who';
                who.textContent = line.who;
                paragraph.appendChild(who);
            }
            paragraph.append(line.text);
            this.body.append(paragraph);
        }
        this.root.hidden = false;
        this.isOpen = true;
    }
    close() {
        this.root.hidden = true;
        this.isOpen = false;
    }
}