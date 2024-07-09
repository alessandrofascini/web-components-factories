import { h } from "../../module/render/h";
import { CardFactory } from "../card/CardFactory";
import { StackedAvatar } from "./components/StackedAvatar";
import { PublishDate } from "./components/PublishDate";

import "./ArticlePreview.scss";

const AttributeName = {};

export class ArticlePreview extends new CardFactory("article-preview")
  .AttributeName(AttributeName)
  .Use(PublishDate)
  .Build<{
    publishDate: Date | number | undefined;
  }>() {
  set background(b: string) {
    this.setAttribute("background", b);
  }

  get background() {
    return this.getAttribute("background") || "";
  }

  set title(t: string) {
    this.setAttribute("title", t);
  }

  get title() {
    return this.getAttribute("title") || "";
  }

  get Authors(): StackedAvatar {
    return (this.querySelector(StackedAvatar.TagName) ??
      h(StackedAvatar, { "max-length": "3" })) as StackedAvatar;
  }

  #authors: string[] = [];
  set authors(a: string[]) {
    this.#authors = a;
    if (!this.isConnected) {
      return;
    }
    const el = this.Authors;
    el.avatars = a;
  }

  get authors() {
    return this.#authors;
  }

  #description: string = "";
  set description(d: string) {
    this.#description = d;
  }

  get description() {
    return this.#description;
  }
}
