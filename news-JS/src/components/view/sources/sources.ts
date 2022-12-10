import { sourceObject } from '../../controller/loader';
import { nonNullQuerySelector } from '../news/news';
import './sources.css';

class Sources {
  draw(data: sourceObject[]) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp');
    if (!(sourceItemTemp instanceof HTMLTemplateElement)) {
      throw new Error('No template element!');
    }

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true);
      if (!(sourceClone instanceof DocumentFragment)) {
        throw new Error('An element is missing!');
      }
      nonNullQuerySelector(sourceClone, '.source__item-name').textContent = item.name;
      nonNullQuerySelector(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });
    nonNullQuerySelector(document, '.sources').append(fragment);
  }
}

export default Sources;
