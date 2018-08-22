import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/admin.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
// import { Router } from '@angular/router';
// import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
// import {UserEditComponent} from './user-edit/user-edit.component'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard'

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  messageClass;
  count;
  message;
  public loaderCheck = false;
  currentPage: number;
  pageSize: number;
  totalItems?: number;
  numberOfPages?: number;
  public loader: boolean;
  processing = false;
  users;
  usersAll;
  filterForm: FormGroup;
  public itemsPerPage:any=10; 
  deactive_users;
  blogPost;
  p: number = 1;
  time;
  isCollapsed = false;
  active_users;
  newPost = false;
  results: any[] = [];
 queryField: FormControl = new FormControl();
  loadingBlogs = false;
  form;
  initiallimit = 0;
  searchField: FormControl;
  searches: string[] = [];
  nextpage;
  deactive;
  filterUser;
  buttonDisabled: boolean = true;
  commentForm;
  blog;
  currentUrl;
  username;
  size = 10;
  newComment = [];
  foundBlog = false;
  enabledComments = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,

    private activatedRoute: ActivatedRoute,
  ) { }


 async getPage(event) {
   let page =event;
    this.loader = true;
    this.userService.getAllUsers(event).subscribe(data => {
      this.loader = false;
      if (data.code == 200) {
        this.loader = false;
        this.p = page;
        this.usersAll = data.data; 
        this.count = data.totalCount;

        this.users = this.usersAll;


        this.deactive_users = data.data;

        this.deactive = this.deactive_users.filter(function (e) {
          return e.active == 0;
        });
      }
      else {
        alert(data.message);
      }
      this.loader = false;
    });
  }


  setRadio(status) {
    if (status == "Deactivated") {
      this.users = this.usersAll.filter(function (user) {
        if (user.active == "0") {
          return true;
        }
      })
    }else{
      this.users = this.usersAll;
    }
  }

  Clickme(i) {
    // i.toggle = !i.toggle;
    $("#details-view1"+i).toggle();
  }

  buttonDisableClick(i) {
    var user = this.users[i];
    var id = user._id;
    if (user.active) {
      user.active = false;
    } else {
      user.active = true;
    }
    this.users[i] = user;
    var val = {
      userId: id,
      active: user.active
    }
    this.processing = true; 
    this.userService.ActiveDeactive(val).subscribe(data => {
      if (!data.success) {
        this.message = data.message;
      } else {
        this.message = data.message; 
      }
    });
  }

  ngOnInit() {
  
    this.queryField.valueChanges

    .debounceTime(400)
    .subscribe(queryField =>this.userService.searchUser(queryField).subscribe(data => {
    if (data.code==200) {

      this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.users=data.data[1];
   
    } else {
        this.messageClass = 'alert alert-danger';
        this.message = data.message; 
        this.processing = false; 

    }
  })
)

   this.getPage(1)
  

  }



}
