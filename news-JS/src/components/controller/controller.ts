import AppLoader from './appLoader';
import { callbackType, EverythingData, SourceData } from './loader';

class AppController extends AppLoader {
  getSources(callback: callbackType<SourceData>) {
    super.getResp<SourceData>(
      {
        endpoint: 'sources',
      },
      callback
    );
  }

  getNews(e: Event, callback: callbackType<EverythingData>) {
    let target = e.target;

    const newsContainer = e.currentTarget;
    if (!(newsContainer instanceof HTMLElement)) {
      throw new Error('No target Element');
    }

    while (target !== newsContainer) {
      if (target !== null && target instanceof HTMLElement) {
        if (target.classList.contains('source__item')) {
          const sourceId = target.getAttribute('data-source-id');
          if (!sourceId) {
            throw new Error('No target Element');
          }
          if (newsContainer.getAttribute('data-source') !== sourceId) {
            newsContainer.setAttribute('data-source', sourceId);
            super.getResp<EverythingData>(
              {
                endpoint: 'everything',
                options: {
                  sources: sourceId,
                },
              },
              callback
            );
          }
          return;
        }
        target = target.parentNode;
      }
    }
  }
}

export default AppController;
