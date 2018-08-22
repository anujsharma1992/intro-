import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/admin.service';
// import { Router } from '@angular/router';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {UserEditComponent} from './user-edit/user-edit.component'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard'
import * as $ from 'jquery';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  messageClass;
  message;
  public loaderCheck = false;
  public loader: boolean;
  processing = false;
  users;
  blogPost;
  time;
  // messageClass;
  public limit: number = 1;
  public count;
  public offset: number = 0;
  // message;
  newPost = false;
  loadingBlogs = false;
  form;
  initiallimit=0;
  nextpage;
  buttonDisabled: boolean = true;
  commentForm;
  
  // processing = false;
  blog;
  currentUrl;
  username;
  p: number = 1;
  // blogPosts;
  size=10;
  newComment = [];
  foundBlog = false;
  enabledComments = [];
  // modalRef: BsModalRef;
  // form: FormGroup;
  // previousUrl;

  constructor(
    // private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
   
    // private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    // private router: Router,
    // private authGuard: AuthGuard
  ) {
  }


 
  // =============================================get all users======================================================

  async getServerData($event) {
    let page=$event
    this.loader = true;
    this.userService.getAllUsers($event).subscribe(data => {
      this.loader = false;
      if (data.code == 200) {
        this.loader = false;
        this.users = data.data; // Assign array to use in HTML
        this.p=page
        let date = data.data[0].created;
        let x = date.split("T")[0]
        this.time = x;
        this.count = data.totalCount;
        this.nextpage = data; // Assign array to use in HTML
   
      } else {
        alert(data.message);
      }
      this.loader = false;
    });
  }


  deleteuser(id) {

    var userInfo = {
      userId: id
    }

    this.processing = true; // Disable buttons
    this.userService.deleteuser(userInfo).subscribe(data => {
      if (!data.success) {
        // this.messageClass = 'alert alert-danger'; // Return error bootstrap class
        this.message = data.message; // Return error message
      } else {
        // this.messageClass = 'alert alert-success'; // Return bootstrap success class
        this.message = data.message; // Return success message
      }
    });
  }




  buttonDisableClick(i) {
    var user =  this.users[i];
    var id = user._id;
    if (user.active) {
      user.active=false;
    }else{
      user.active=true;
    }
    this.users[i]=user;
    var val = {
      userId: id,
      active:user.active
    }

    this.processing = true; // Disable buttons
    this.userService.ActiveDeactive(val).subscribe(data => {
      if (!data.success) {
        this.message = data.message; // Return error message
      } else {
        // this.messageClass = 'alert alert-success'; // Return bootstrap success class
        this.message = data.message; // Return success message
      }
    });
  }


  ngOnInit() {

    this.getServerData(1);

  }

}




