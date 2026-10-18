export class InspectPanel {
    constructor() {
        this.root = document.getElementById('inspect');
        this.title = this.root.querySelector('.inspect-title');
        this.body = this.root.querySelector('.inspect-body');
        this.choiceList = this.root.querySelector('.inspect-choices');
        this.hint = this.root.querySelector('.inspect-hint');
        this.isOpen = false;
        this.onChoose = () => {};
    }
    open(title, lines, choices = []) {
        this.title.textContent = title;
        this.body.replaceChildren();

        for (const line of lines) {
            const paragraph = document.createElement('p');

            if (line.note) {
                paragraph.className = 'inspect-note';
            }
            if (line.who) {
                const who = document.createElement('span');
                who.className = 'inspect-who';
                who.textContent = line.who;
                paragraph.appendChild(who);
            }
            paragraph.append(line.text);
            this.body.append(paragraph);
        }
        this.showChoices(choices);
        this.root.hidden = false;
        this.root.scrollTop =0;
        this.isOpen = true;
    }
    showChoices(choices) {
        this.choiceList.replaceChildren();

        choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = `${index + 1}. ${choice.label}`;
            button.addEventListener('click', () => this.onChoose(index));
            this.choiceList.append(button);
        });
        this.hint.textContent = choices.length > 0 ? 'Press a number or click a choice' : 'E, Enter, or Esc to close';
    }
    close() {
        this.root.hidden = true;
        this.isOpen = false;
    }
}