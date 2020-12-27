import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StringToCodeRequest } from '../models/string-to-code-request';
import { StringToCodeResponse } from '../models/string-to-code-response';
import { WifiCodeRequest } from '../models/wifi-code-request';
import { VcardCodeRequest } from '../models/vcard-code-request';

@Injectable({
  providedIn: 'root'
})
export class CodeApiService {

  httpOptions = { headers: new HttpHeaders({'Content-Type':  'application/json'})};

  constructor(private http: HttpClient, @Inject('BASE_API_URL') private baseUrl: string) { }

  encodeVCard(request:VcardCodeRequest): Observable<StringToCodeResponse> {
    return this.http.post<StringToCodeResponse>(this.baseUrl + "/qr/vcard", request, this.httpOptions);
  }

  encodeString(request:StringToCodeRequest): Observable<StringToCodeResponse> {
    console.log(request);
    return this.http.post<StringToCodeResponse>(this.baseUrl + "/qr/string", request, this.httpOptions);
  }

  encodeWifi(request:WifiCodeRequest): Observable<StringToCodeResponse> {
    return this.http.post<StringToCodeResponse>(this.baseUrl + "/qr/wifi", request, this.httpOptions);
  }

  handleError(error: HttpErrorResponse){
    return throwError(error);
  }
}
