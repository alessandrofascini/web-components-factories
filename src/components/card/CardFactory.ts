import {
  Component,
  ComponentExtender,
  Definer,
  WebComponent,
  WebComponentInstance,
} from "../../module/WebComponents/WebComponent";

export class CardFactory {
  components: WebComponent[] = [];

  constructor(private tagName: string) {
    // Do Nothing
  }

  private attributeNames = {};
  AttributeName(an: object) {
    this.attributeNames = Object.assign(this.attributeNames, an);
    return this;
  }

  private dep: Definer[] = [];
  Dependency(...d: Definer[]) {
    d?.forEach((v) => this.dep.push(v));
    return this;
  }

  Use(component: WebComponent) {
    this.components.push(component);
    return this;
  }

  Build<T>(): ComponentExtender<T, {}> {
    const components = this.components;

    const attributeNames = this.components.reduce((acc, curr) => {
      return Object.assign(acc, curr.AttributeName);
    }, this.AttributeName);

    // TODO: Improve Memory
    const dependecies = [...this.dep, ...this.components];

    const tagName = this.tagName;

    const C = class extends Component(tagName, attributeNames, dependecies) {
      static define() {
        if (!customElements.get(tagName)) {
          components.forEach((c) => c?.define());
          customElements.define(tagName, this);
        }
      }

      render() {
        this.replaceChildren(
          ...components.map((component) => {
            const c = new component();
            Object.keys(component.AttributeName).forEach((k) => {
              // @ts-ignore
              c[k] = this[k];
            });
            return c;
          })
        );
      }

      attributeChangedCallback(
        name: string | null,
        oldVal: string | null,
        newVal: string | null
      ): void {
        this.childNodes.forEach((child) => {
          (child as WebComponentInstance)?.attributeChangedCallback(
            name,
            oldVal,
            newVal
          );
        });
      }
    };

    this.components.forEach((c) =>
      Object.keys(c.AttributeName).forEach((k) => {
        Object.defineProperty(C.prototype, k, {
          set: function (v: any) {
            this[`_${k}`] = v;
            if (this.isConnected) {
              const el = this.querySelector(c.TagName);
              if (el && el[k]) {
                el[k] = v;
              }
            }
          },
          get: function (): any {
            return this[`_${k}`];
          },
        });
      })
    );

    return C as ComponentExtender<T, {}>;
  }
}
