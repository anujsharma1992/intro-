import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  domain = "http://54.68.126.78:3011"; // Development Domain
  authToken;
  user;
  options;

  constructor(
    private http: Http
  ) { }

  
// Function to create headers, add token, to be used in HTTP requests
 createAuthenticationHeaders() {
  this.loadToken(); // Get token so it can be attached to headers
  this.options = new RequestOptions({
    headers: new Headers({
      'Content-Type': 'application/json', // Format set to JSON
      'authorization': "Basic YWRtaW5AaW50cm9hcHAuY29tOlBhc3NAd29yZDE=" ,// Attach token
      'authtoken': this.authToken
    })
  });
}

loadToken() {
  this.authToken = localStorage.getItem('token');; // Get token and asssign to variable to be used elsewhere
}


 login(user) {
    console.log(user)

    this.createAuthenticationHeaders();
    return this.http.post(this.domain+'/api/admins/admin-login',user, this.options).map(res => res.json());
  }


 forgotpassword(user) {
    console.log(user)

    this.createAuthenticationHeaders();
    return this.http.post(this.domain+'/api/admins/admin-forgot-password',user, this.options).map(res => res.json());
  }
  
 // Function to logout
 logout() {
  this.authToken = null; // Set token to null
  this.user = null; // Set user to null
  localStorage.clear(); // Clear local storage
}

 changepassword(user) {
    console.log(user)
    this.createAuthenticationHeaders();
    return this.http.post(this.domain+'/api/admins/change-password',user, this.options).map(res => res.json());
  }

  // Function to store user's data in client local storage
 storeUserData(token, user) {
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }

  // Function to check if user is logged in
 loggedIn() {
    return tokenNotExpired();
  }
 
}