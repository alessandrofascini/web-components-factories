export type AttributeNameType = {
  [key: Uncapitalize<string>]: string;
  [K: `${string}_${string}`]: never;
  [T: Capitalize<string>]: never;
  [S: `${string}-${string}`]: never;
};
/*
const temp: AttributeNameType = {
  publishDate: "publish-date",
  "publish-date": "error",
  publish_date: "error",
  PublishDate: "error",
};
*/
