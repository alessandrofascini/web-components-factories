import {Component} from "../../../module/WebComponents/WebComponent.ts";

import "./Background.scss"

export const BackgroundAttributeName: { background: string } = {
    background: "background",
};

export class Background extends Component("card-background", BackgroundAttributeName) {
    #background?: string;
    set background(src: string) {
        if (src) {
            this.#background = src;
        }
        this.isConnected && this.renderImage();
    }
    
    get Image(): HTMLImageElement {
        return this.querySelector("img") ?? new Image();
    }
    
    render() {
        this.replaceChildren(this.renderImage());
    }
    
    renderImage() {
        const img = this.Image;
        
        img.src = this.#background ?? "";
        
        return img;
    }
}