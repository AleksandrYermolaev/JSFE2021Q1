import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { nonNullQuerySelector } from '../view/news/news';
import { newsBlock } from '../view/sources/sources';

class App {
  controller: AppController;
  view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start() {
    nonNullQuerySelector(document, '.sources').addEventListener('click', (e) => {
      this.controller.getNews(e, (data) => this.view.drawNews(data));
      newsBlock.classList.toggle('active');
    });
    this.controller.getSources((data) => this.view.drawSources(data));
  }
}

export default App;
