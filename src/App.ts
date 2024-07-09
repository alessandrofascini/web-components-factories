import { ArticlePreview } from "./components/ArticlePreview/ArticlePreview";
import { Component } from "./module/WebComponents/WebComponent";
import { Utilites } from "./utils/Utilities";

export class App extends Component("wc-cards", {}, [ArticlePreview]) {
  static get Id() {
    return "app";
  }

  static NewApp() {
    App.define();

    const app = new App();

    app.setAttribute("id", App.Id);

    document.getElementById(App.Id)!.replaceWith(app);

    return app;
  }

  render() {
    this.replaceChildren(
      ...[
        {
          publicDate: App.MinutesAgo(70),
          background:
            "https://images.unsplash.com/photo-1717501220725-83f151c447e7?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          title: "How To Design Abstract Shapes In Blender",
          description:
            "In this article we are going to show you the best techniques to create abstract shapes in Blender software, We will be using geometry nodes and some basic materials.",
          authors: [
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
        },
        {
          publicDate: App.MinutesAgo(0),
          background:
            "https://images.unsplash.com/photo-1718202248160-59558af70521?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          title: "10 Tips To Make your Blender Worflow easier",
          authors: [
            "https://images.unsplash.com/photo-1706885093487-7eda37b48a60?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
          description:
            "Have you ever been stuck in a complicated workflow? In this article we are showing you 10 tips to make your modelling in Blender much easier.",
        },
      ]
        .slice(0, 2)
        .map(
          (d: {
            publicDate: Date;
            background: string;
            title: string;
            authors: string[];
            description: string;
          }) => {
            const ap = new ArticlePreview();

            ap.publishDate = d.publicDate;
            //ap.authors = d.authors;

            return ap;
          }
        )
    );
  }

  static MinutesAgo(minutes: number) {
    return new Date(Date.now() - minutes * Utilites.Time.Minute);
  }
}
