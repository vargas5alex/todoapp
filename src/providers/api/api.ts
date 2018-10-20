import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  logout(): any {
    throw new Error("Method not implemented.");
  }
  private url: string;
  // Crear la variable token
  private token: string;
  constructor(public http: HttpClient) {
    this.url = 'https://fede-todo-list.herokuapp.com/api'
    // Cargar el token cada que inicia el app
    this.loadToken();
  }
  public getLists(): Observable<any> {
    return this.http.get(`${this.url}/v1/list`, {
      headers: {
        'Authorization': this.token
      }
    });
}
public createList(params): Observable<boolean> {
  return this.http.post(`${this.url}/v1/list`, {
    list: params
  }, {
    headers: {
      'Authorization': this.token
    }
  }).pipe(map((response: any) => {
    return true;
  }), catchError((error: HttpErrorResponse) => {
    return Observable.of(false);
  }))
}
  public isAuth(): boolean {
    return this.token ? true : false;
}
  public auth(params): Observable<boolean> {
    return this.http.post(`${this.url}/auth`, {
      auth: params
    }).pipe(map((response: any) => {
      // Guardar el token
      this.token = response.jwt;
      this.saveToken();
      return true;
    }), catchError((error: HttpErrorResponse) => {
      return Observable.of(false);
    }))
  }

  public register(params): Observable<boolean> {
    return this.http.post(`${this.url}/v1/user`, {
      user: params
    }).pipe(map((response: any) => {
      return true;
    }), catchError((error: HttpErrorResponse) => {
      return Observable.of(false);
    }))
  }

  private saveToken(): void {
    localStorage.setItem('token', this.token);
  }

  private loadToken(): void {
    this.token = localStorage.getItem('token');
  }
}