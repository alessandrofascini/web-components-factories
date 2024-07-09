import { h } from "../../../module/render/h";
import { Component } from "../../../module/WebComponents/WebComponent";
import { Utilites } from "../../../utils/Utilities";

import "./PublishDate.scss";

export const PublishDateAttributeName: { publishDate: string } = {
  publishDate: "publish-date",
};

export class PublishDate extends Component(
  "publish-date",
  PublishDateAttributeName
) {
  render() {
    this.innerHTML =
      this.renderClock() +
      this.renderDate().outerHTML +
      this.renderArrowTradingUp();
  }

  #publishDate: Date | undefined;
  set publishDate(d: Date | number) {
    if (d === undefined) {
      return;
    }
    if (typeof d === "number") {
      this.#publishDate = new Date(d);
    } else {
      this.#publishDate = d;
    }
    this.isConnected && this.renderDate();
  }

  get publishDate(): Date | undefined {
    return this.#publishDate;
  }

  renderClock() {
    return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>`;
  }

  get PublishDate() {
    return (
      this.querySelector(".publish-date") ??
      h("span", { class: "publish-date" })
    );
  }

  renderDate() {
    const el = this.PublishDate;

    if (this.#publishDate) {
      const minutes =
        ((Date.now() - (this.#publishDate?.getTime() || 0)) /
          Utilites.Time.Minute) >>
        0;

      el.textContent = minutes === 0 ? `Right now` : `${minutes} min`;
    } else {
      el.textContent = "unkown";
    }
    return el;
  }

  renderArrowTradingUp() {
    return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
</svg>
`;
  }
}
