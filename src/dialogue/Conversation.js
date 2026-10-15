import { state } from '../state/gameState.js';

// Runs one character's conversation: shows a node, records what it reveals,
// and moves to the next node when the player picks a choice.
export class Conversation {
    constructor(title, nodes, panel) {
        this.title = title;
        this.nodes = nodes;
        this.panel = panel;
        this.choices = [];
        this.isActive = false;
    }

    start(nodeId) {
        this.isActive = true;
        this.panel.onChoose = (index) => this.choose(index);
        this.show(nodeId);
    }

    show(nodeId) {
        const node = this.nodes [nodeId];

        // Record flags first, so the lines and choices below can see them
        for (const flag of node.adds ?? []) {
            state.flags[flag] = true;
        }
        const lines = typeof node.lines === 'function' ? node.lines(state) : node.lines;
        this.choices = typeof node.choices === 'function' ? node.choices(state) : node.choices;
        this.panel.open(this.title, lines, this.choices);
    }

    choose(index) {
        const choice = this.choices[index];
        if (!choice) {
            return;
        }
        if (choice.next) {
            this.show(choice.next);
        } else {
            this.end();
        }
    }

    // Esc works only where a choice already ends the conversation
    leave() {
        const index = this.choices.findIndex((choice) => choice.next === null);
        if (index !== -1) {
            this.choose(index);
        }
    }
    end() {
        this.isActive = false;
        this.choices = [];
        this.panel.close();
    }
}