type sourceObject = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};

type everythingObject = {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};

export interface EverythingData {
    status: string;
    totalResults: number;
    articles: Array<everythingObject>;
}

export interface SourceData {
    status: string;
    sources: Array<sourceObject>;
}

type urlObject = {
    [key: string]: string | undefined;
};

type endpointType = 'sources' | 'everything';

export type callbackType<T> = (d?: T) => void;

class Loader {
    baseLink: string;
    options: { apiKey: string };
    constructor(baseLink: string, options: { apiKey: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: { endpoint: endpointType; options?: { sources?: string } },
        callback: callbackType<EverythingData | SourceData> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: { sources?: string }, endpoint: endpointType): string {
        const urlOptions: urlObject = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(
        method: string,
        endpoint: endpointType,
        callback: callbackType<EverythingData | SourceData>,
        options: { sources?: string } = {}
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: EverythingData | SourceData) => callback(data))
            .catch((err: ErrorCallback) => console.error(err));
    }
}

export default Loader;
