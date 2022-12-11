// Previous realization of fetch data without Pick<>
// export type sourceObject = {
//   id: string;
//   name: string;
//   description: string;
//   url: string;
//   category: string;
//   language: string;
//   country: string;
// };

// export type everythingObject = {
//   source: {
//     id: string;
//     name: string;
//   };
//   author: string;
//   title: string;
//   description: string;
//   url: string;
//   urlToImage: string;
//   publishedAt: string;
//   content: string;
// };

// Realization of fetch data with utility type Pick<>↓
export type sourceObject = {
  id: string;
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  name: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  category: string;
  language: string;
  country: string;
};

export interface EverythingData {
  status: string;
  totalResults: number;
  articles: Array<
    Pick<sourceObject, 'source' | 'author' | 'title' | 'description' | 'url' | 'urlToImage' | 'publishedAt' | 'content'>
  >;
}

export interface SourceData {
  status: string;
  sources: Array<Pick<sourceObject, 'id' | 'name' | 'description' | 'url' | 'category' | 'language' | 'country'>>;
}

type urlObject = {
  [key: string]: string | undefined;
};

type endpointType = 'sources' | 'everything';

export type callbackType<T> = (d: T) => void;

enum errorCodes {
  Unauthorized = 401,
  NotFound = 404,
}

type options = {
  sources: string;
};

class Loader {
  baseLink: string;
  options: { apiKey: string };
  constructor(baseLink: string, options: { apiKey: string }) {
    this.baseLink = baseLink;
    this.options = options;
  }

  protected getResp<T>(
    { endpoint, options = {} }: { endpoint: endpointType; options?: Partial<options> },
    callback: callbackType<T> = () => {
      console.error('No callback for GET response');
    }
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  private errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === errorCodes.Unauthorized || res.status === errorCodes.NotFound)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: Partial<options>, endpoint: endpointType): string {
    const urlOptions: urlObject = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private load<T>(method: string, endpoint: endpointType, callback: callbackType<T>, options: Partial<options> = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data: T) => callback(data))
      .catch((err: ErrorCallback) => console.error(err));
  }
}

export default Loader;
