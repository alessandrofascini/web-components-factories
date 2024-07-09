import { Component } from "../../../module/WebComponents/WebComponent";

const AttributeName = {
  avatars: "avatars",
  maxLength: "max-length",
};

export class StackedAvatar extends Component("stacked-avatar", AttributeName) {
  avatars: string[];
  maxLength: number;
}
