import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})

export class ChangepasswordComponent implements OnInit {

  messageClass;
  message;
  processing = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm(); // Create Login Form when component is constructed
  }

  // Function to create login form
  createForm() {
    this.form = this.formBuilder.group({
      old_password: ['', Validators.required], // Username field
      new_password: ['', Validators.required], // Username field
      // confirm_password: ['', Validators.required], // Username field

      // password: ['', Validators.required] // Password field
    });
  }

  // Function to disable form
  disableForm() {
    this.form.controls['old_password'].enable(); // Enable username field
    this.form.controls['new_password'].enable(); // Enable password field
    // this.form.controls['confirm_password'].enable(); // Enable password field
  }

  // Function to enable form
  enableForm() {
    this.form.controls['old_password'].enable(); // Enable username field
    this.form.controls['new_password'].enable(); // Enable password field
    // this.form.controls['confirm_password'].enable(); // Enable password field
  }

  // Functiont to submit form and login user

  onforgotSubmit() {
    this.processing = true; 
    this.disableForm(); 
    
    const user = {
      newPassword: this.form.get('new_password').value, 
      oldPassword: this.form.get('old_password').value, 
    
      // confirm_password: this.form.get('confirm_password').value, 
    }
//....................function for change password............
    this.authService.changepassword(user).subscribe(data => {
   
      if (data.code==200) {
     
          this.messageClass = 'alert alert-success'; // Set bootstrap success class
          this.message = data.message; // Set success message
          // After 2 seconds, redirect to dashboard page
          setTimeout(() => {
            this.router.navigate(['/login']); // Navigate to dashboard view
          }, 2000);
     
      } else {
          this.messageClass = 'alert alert-danger'; // Set bootstrap error class
          this.message = data.message; // Set error message
          this.processing = false; // Enable submit button
          this.enableForm(); // Enable form for editting
      }
    });
  }

  ngOnInit() {
  }

}