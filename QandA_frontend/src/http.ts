import { webApiUrl } from "./AppSettings";

export interface HttpRequest<REQB>{
    path: string;
}

export interface HttpResponse<RESB>{
    ok: Boolean;
    body?: RESB;
}