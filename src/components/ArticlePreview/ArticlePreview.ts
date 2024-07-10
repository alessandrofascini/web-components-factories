import {CardFactory} from "../card/CardFactory";
import {Avatar, StackedAvatar} from "./components/StackedAvatar";
import {PublishDate} from "./components/PublishDate";
import {Background} from "./components/Background.ts";
import {TextContent} from "./components/Content.ts";

import "./ArticlePreview.scss";

export class ArticlePreview extends new CardFactory("article-preview")
    .Use(PublishDate)
    .Use(Background)
    .Use(TextContent)
    .Use(StackedAvatar)
    .Build<{
        publishDate: Date | number | undefined;
        background?: string;
        avatars?: Avatar[];
        maxLength?: number;
        title?: string;
        description?: string;
    }>() {
    
    get authors(): Avatar[] {
        return this.avatars ?? [];
    }
    
    set authors(a: Avatar[]) {
        this.avatars = a;
    }
}
