import {NotImplementedError} from "./errors/NotImplementError";

export interface Definer {
    define(): void;
}

export interface Renderer {
    render(): void;
}

export interface TagNamer {
    TagName: string;
}

export interface AttributeNamer {
    AttributeName: object;
}

export type WebComponentInstance = {
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(
        name: string | null,
        oldVal: string | null,
        newVal: string | null,
    ): void;
    adoptedCallback(): void;
} & Renderer &
    HTMLElement;

export type WebComponent = {
    new(): WebComponentInstance;
    prototype: WebComponentInstance;
} & AttributeNamer &
    Definer &
    TagNamer;

export type ComponentExtender<I, S> = {
    new(): WebComponentInstance & I;
    prototype: WebComponentInstance & I;
} & AttributeNamer &
    Definer &
    TagNamer &
    S;

export function Component(
    tagName: string,
    attributes: object = {},
    dependencies?: Definer[],
): WebComponent {
    const executeWhenDisconnected: (() => void)[] = [];
    return class extends HTMLElement {
        static get TagName() {
            return tagName;
        }
        
        static get observedAttributes() {
            return Object.values(attributes);
        }
        
        static get AttributeName() {
            return attributes;
        }
        
        static define() {
            if (!customElements.get(tagName)) {
                Object.freeze(attributes);
                dependencies?.forEach((f) => f?.define?.call(f));
                customElements.define(tagName, this);
            }
        }
        
        render(): void {
            throw new NotImplementedError();
        }
        
        connectedCallback() {
            this.render();
        }
        
        disconnectedCallback() {
            executeWhenDisconnected?.forEach((f) => f?.call(f));
            executeWhenDisconnected.length = 0;
        }
        
        attributeChangedCallback(): void {
            // Do Nothing
        }
        
        adoptedCallback(): void {
            // Do Nothing
        }
        
        addEventListener<K extends keyof HTMLElementEventMap>(
            type: K,
            listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
            options?: boolean | AddEventListenerOptions,
        ): void;
        addEventListener(
            type: string,
            listener: EventListenerOrEventListenerObject,
            options?: boolean | AddEventListenerOptions,
        ): void;
        addEventListener(
            type: unknown,
            listener: unknown,
            options?: unknown,
            target: EventTarget = this,
        ): void {
            target?.addEventListener(
                type as string,
                listener as EventListenerOrEventListenerObject,
                options as EventListenerOptions,
            );
            executeWhenDisconnected.push(() => {
                // @ts-ignore
                target?.removeEventListener(type, listener, options);
            });
        }
        
        removeEventListener<K extends keyof HTMLElementEventMap>(
            type: K,
            listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
            options?: boolean | EventListenerOptions,
        ): void;
        removeEventListener(
            type: string,
            listener: EventListenerOrEventListenerObject,
            options?: boolean | EventListenerOptions,
        ): void;
        removeEventListener(
            type: unknown,
            listener: unknown,
            options?: unknown,
            target: EventTarget = this,
        ): void {
            target.removeEventListener(
                type as string,
                listener as EventListenerOrEventListenerObject,
                options as EventListenerOptions,
            );
        }
    };
}
