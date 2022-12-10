import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { nonNullQuerySelector } from '../view/news/news';

class App {
  controller: AppController;
  view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start() {
    nonNullQuerySelector(document, '.sources').addEventListener('click', (e) =>
      this.controller.getNews(e, (data) => this.view.drawNews(data))
    );
    this.controller.getSources((data) => this.view.drawSources(data));
  }
}

export default App;
