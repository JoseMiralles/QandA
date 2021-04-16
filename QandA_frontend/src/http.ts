import { webAPIUrl } from "./AppSettings";
import { Header } from "./Header";

export interface HttpRequest<REQB>{
    path: string;
    method?: string;
    body?: REQB;
    accessToken?: string;
}

export interface HttpResponse<RESB>{
    ok: Boolean;
    body?: RESB;
}

export const http = async <RESB, REQB = undefined>( config: HttpRequest<REQB> ): Promise<HttpResponse<RESB>> => {
    const request = new Request(
        `${webAPIUrl}${config.path}`,
        {
            method: config.method,
            headers: { 'Content-Type': 'application/json' },
            body: config.body
                ? JSON.stringify(config.body)
                : undefined
        }
    );

    if (config.accessToken) {
        request.headers.set(
            'authorization',
            `bearer ${config.accessToken}`
        );
    }

    const response = await fetch(request);
    if (response.ok) {
        const body = await response.json();
        return { ok: response.ok, body }
    } else {
        logError(request, response);
        return { ok: response.ok }
    }
};

const logError = async (request: Request, response: Response) => {
    const contentType = response.headers.get('content-type');
    let body: any;

    if (contentType && contentType.indexOf('application/json') !== -1) {
        body = await response.json();
    } else {
        body = await response.text();
    }

    console.error(
        `Error requestiong
        ${request.method} ${request.url}`,
        body
    );
};