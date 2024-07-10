import {Component} from "../../../module/WebComponents/WebComponent";
import {h} from "../../../module/render/h.ts";

import "./StackedAvatar.scss"

const {min} = Math;

const AttributeName = {
    avatars: "avatars",
    maxLength: "max-length",
};

export type Avatar = string;

export class StackedAvatar extends Component("stacked-avatar", AttributeName) {
    #avatars: Avatar[] = [];
    #maxLength: number = 3;
    
    get avatars() {
        return this.#avatars ?? [];
    }
    
    set avatars(value: Avatar[]) {
        if (Array.isArray(value)) {
            this.#avatars = value;
        }
        this.isConnected && this.renderAvatars();
    }
    
    get maxLength() {
        return this.#maxLength;
    }
    
    set maxLength(value: number) {
        if (Number.isInteger(value)) {
            this.#maxLength = value;
        }
        this.isConnected && this.renderAvatars()
    }
    
    render() {
        this.renderAvatars();
    }
    
    renderAvatars() {
        if (!Array.isArray(this.#avatars)) {
            this.replaceChildren();
            return;
        }
        const authors = this.#avatars.slice(0, min(this.#avatars.length, this.#maxLength));
        this.replaceChildren(...authors.map((author, i) => h("img", {
            src: author,
            class: "avatar",
            style: {"z-index": `${this.#maxLength - i}`},
        })));
    }
    
}
