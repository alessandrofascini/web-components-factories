import { WebComponent } from "../WebComponents/WebComponent";

function createElement(tagname: string | WebComponent) {
  if (typeof tagname === "string") {
    return document.createElement(tagname);
  }
  return new tagname();
}

export function h(
  tagname: string | WebComponent,
  attributes: {
    id?: string;
    class?: string;
    style?: { [index: string]: string };
    [index: string]: any;
  } = {},
  ...children: (Node | string)[]
) {
  const el = createElement(tagname);

  const { style } = attributes;
  if (style) {
    Object.keys(style).forEach((p) => el.style.setProperty(p, style[p]));
    delete attributes["style"];
  }

  Object.keys(attributes).forEach((k) => {
    el.setAttribute(k, attributes[k]);
  });

  el.append(...children);
  return el;
}
