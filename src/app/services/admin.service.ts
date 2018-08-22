import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import * as $ from 'jquery';

@Injectable()
export class UserService {

  options;
  domain = this.authService.domain;

  constructor(
    private authService: AuthService,

    private http: Http
  ) { }

  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authtoken': this.authService.authToken, // Attach token,
        'authorization': "Basic YWRtaW5AaW50cm9hcHAuY29tOlBhc3NAd29yZDE="
      })
    });
  }


  searchUser(term) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain+'/api/admins/search?search=' + term, this.options).map(res => res.json());
  }


  getSingleuser(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'blogs/singleBlog/' + id, this.options).map(res => res.json());
  }


   deleteuser(userInfo) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain+'/api/admins/user-delete',userInfo, this.options).map(res => res.json());
  }
  
ActiveDeactive(val) {
 this.createAuthenticationHeaders(); // Create headers
 return this.http.post(this.domain+'/api/admins/activation',val, this.options).map(res => res.json());
}


  getAllUsers($event) {
    this.createAuthenticationHeaders(); // Create headers
   
    return this.http.get(this.domain+'/api/admins/user-list?pageNo='+$event, this.options).map(res => res.json());
  }
  
  getUsersCount() {
    this.createAuthenticationHeaders(); // Create headers   
    return this.http.get(this.domain+'/api/admins/dashboard-data', this.options).map(res => res.json());
  }
  

  getChartData() {
  
    this.createAuthenticationHeaders(); // Create headers   
    return this.http.get(this.domain+'/api/admins/bycountries', this.options).map(res => res.json());
  }

  getChartMasala() {
  
    this.createAuthenticationHeaders(); // Create headers   
    return this.http.get(this.domain+'/api/admins/bycountries', this.options).map(res => res.json());
  }

}