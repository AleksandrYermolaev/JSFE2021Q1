import { EverythingData, SourceData } from '../controller/loader';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
  news: News;
  sources: Sources;
  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: EverythingData) {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  public drawSources(data: SourceData) {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
