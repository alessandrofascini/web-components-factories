import {Component} from "../../../module/WebComponents/WebComponent.ts";
import {h} from "../../../module/render/h.ts";

export class TextContent extends Component("text-content", {title: "title", description: "description"}) {
    _title: string = "";
    
    get title() {
        return this._title;
    }
    
    set title(v: string) {
        if (v) {
            this._title = v;
        }
        this.isConnected && this.renderTitle();
    }
    
    _description: string = "";
    
    get description() {
        return this._description;
    }
    
    set description(v: string) {
        if (v) {
            this._description = v;
        }
        this.isConnected && this.renderDescription()
    }
    
    get Title() {
        return this.querySelector("span.title") ?? h("span", {class: "title"})
    }
    
    get Description() {
        return this.querySelector("span.description") ?? h("span", {class: "description"});
    }
    
    render() {
        this.replaceChildren(this.renderTitle(), this.renderDescription());
    }
    
    renderTitle() {
        const title = this.Title;
        title.textContent = this._title;
        return title;
    }
    
    renderDescription() {
        const description = this.Description;
        description.textContent = this._description;
        return description;
    }
}