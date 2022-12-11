import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.up.railway.app/', {
      // https://newsapi.org/v2/
      //
      apiKey: '74879d485c99428c9d07406cdc601d75', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
