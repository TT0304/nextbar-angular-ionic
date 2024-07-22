import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoadingController,ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public apiUrl: string = "http://109.233.191.130" + environment.nextBarDomain;



  constructor(private http: HttpClient,private toastController:ToastController) {

    this.apiUrl = this.apiUrl 

  }

  getDetails(endpoint, params): Observable<any> {
    let _params = new HttpParams();
    for (let key in params) {
      _params.append(key, params[key])
    }

    return this.http.get(this.apiUrl  + endpoint, { params })
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('getDetails', []))
      );
  }

  postData(endpoint, params): Observable<any> {


    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');


    return this.http.post(this.apiUrl + endpoint, params, { headers, responseType: 'json' })
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError(endpoint, []))
      );
  }


  upload(endpoint, params): Observable<any> {


    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');


    return this.http.post(this.apiUrl + endpoint, params, {
      headers, responseType: 'json', reportProgress: true,
      observe: 'events'
    })
      .pipe(

        map((event) => {

          switch (event.type) {

            case HttpEventType.UploadProgress:
              const progress = Math.round(100 * event.loaded / event.total);
              return { status: 'progress', message: progress };

            case HttpEventType.Response:
              return event.body;
            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      );
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  private log(message: string) {
    console.log(message);
  }


  setConfiguration(apiUrl){
    this.apiUrl = apiUrl
  }

  getCongiuration(){
    return this.apiUrl
  }

   async presentToast(msg) {
            const toast = await this.toastController.create({
                  message: msg,
            duration: 2000
            });
            toast.present();
      }


}
