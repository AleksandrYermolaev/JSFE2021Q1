import { everythingObject } from '../../controller/loader';
import './news.css';

function nonNullQuerySelector(parentNode: ParentNode, selector: string): HTMLElement {
  const elem = parentNode.querySelector(selector);
  if (!elem) {
    throw new Error('Must be an HTMLElement!');
  }
  if (!(elem instanceof HTMLElement)) {
    throw new Error('Must be an HTMLElement!');
  }
  return elem;
}

class News {
  draw(data: everythingObject[]) {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector('#newsItemTemp');
    if (newsItemTemp instanceof HTMLTemplateElement) {
      news.forEach((item, idx) => {
        const newsClone = newsItemTemp.content.cloneNode(true);

        if (!(newsClone instanceof DocumentFragment)) {
          throw new Error('An element is missing!');
        }
        if (idx % 2) nonNullQuerySelector(newsClone, '.news__item').classList.add('alt');

        nonNullQuerySelector(newsClone, '.news__meta-photo').style.backgroundImage = `url(${
          item.urlToImage || 'img/news_placeholder.jpg'
        })`;
        nonNullQuerySelector(newsClone, '.news__meta-author').textContent = item.author || item.source.name;
        nonNullQuerySelector(newsClone, '.news__meta-date').textContent = item.publishedAt
          .slice(0, 10)
          .split('-')
          .reverse()
          .join('-');
        nonNullQuerySelector(newsClone, '.news__description-title').textContent = item.title;
        nonNullQuerySelector(newsClone, '.news__description-source').textContent = item.source.name;
        nonNullQuerySelector(newsClone, '.news__description-content').textContent = item.description;
        nonNullQuerySelector(newsClone, '.news__read-more a').setAttribute('href', item.url);

        fragment.append(newsClone);
      });
    }
    nonNullQuerySelector(document, '.news').innerHTML = '';
    nonNullQuerySelector(document, '.news').appendChild(fragment);
  }
}

export default News;
