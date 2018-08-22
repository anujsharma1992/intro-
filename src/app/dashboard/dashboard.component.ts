import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/admin.service';
// import * $ from 'jquery';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  messageClass;
  array=[];
  message;
  public loaderCheck = false;
  public loader: boolean;
  processing = false;
  countryCount=[];
   counTries=[];
  count;
  blogPost;
  public limit:number=1;
	public offset:number=0;
 
  newPost = false;
  loadingBlogs = false;
  form;
  

public doughnutChartType:string = 'doughnut';
public doughnutChartLabels = this.counTries;
public doughnutcolors: any[] = [{ backgroundColor: ["#1db5ac","#10c5c7","#16ddd7","#17ece7","#42f4f1","#419af4","#358c8a","#4a45e0","#1d7199"]}];
public doughnutchartOptions = {
  cutoutPercentage: 70,
  legend: {
    position: 'right',
    labels: {
      fontSize: 20
    },
  
}
}

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }


getUsersCount() {
    this.loader = true;
    this.userService.getUsersCount().subscribe(data => {
      if(data.code==200){
        this.loader = false;
        this.count = data.count; 
        this.blogPost = data;   
      }else{

        this.loader = false;
        alert(data.message);
   }
      this.loader=false;
    });
  }


  getChartData() {
    this.loader = true;
    this.userService.getChartData().subscribe(data => {
      if(data.code==200){
        this.loader = false;
      
       //  this.counTries=data.data.country; 
            this.countryCount = data.data.count;
      //  this.doughnutChartLabels.push(asd)
        
      }else{
        this.loader = false;
        alert(data.message);
   }
      this.loader=false;
    });
  }
  
  getChartMasala() {
    this.loader = true;
    this.userService.getChartMasala().subscribe(data => {
      if(data.code==200){
        this.loader = false;
      
        
         this.counTries=data.data.country; 
            // this.countryCount = data.data.count;
        //  this.doughnutChartLabels.push(asd)
       
      }else{
        this.loader = false;
        alert(data.message);
   }
      this.loader=false;
    });
  }



 // ADD CHART OPTIONS. 
 chartOptions = {
  responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
}



labels =  ["Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday", "Sunday"];

// STATIC DATA FOR THE CHART IN JSON FORMAT.
chartData = [
  {
    label: '1st Year',
    data: [12, 19, 3, 17, 28, 24, 7]
  },
  { 
    label: '2nd Year',
    data:  [30, 29, 5, 5, 20, 3, 10]
  }
];

// CHART COLOR.
colors = [
  { // 1st Year.
    backgroundColor:"#10c6c8" 
  },
  { // 2nd Year.
    backgroundColor:"#dbdbdb" 
  }
]

// CHART CLICK EVENT.
onChartClick(event) {
}

  ngOnInit() {
 
    this.doughnutChartLabels.length = 0;
    for (let i = this.counTries.length - 1; i >= 0; i--) {
      this.doughnutChartLabels.push(this.counTries[i]);
    }
this.getChartMasala()
    this.getUsersCount();

    this.getChartData()
  }

}
