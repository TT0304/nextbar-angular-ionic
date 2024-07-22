import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HelperService } from '../helper.service';
import { HttpService } from '../providers/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  user: any;
  data: any = [];
  mediaUrl: string;
  dataLoaded: boolean=false;  
  env: any = {};
  params: any;
  images: any=[];

  constructor(private helper: HelperService,
    private serviceCall: HttpService,
    private activatedRoute: ActivatedRoute, private router: Router,
    private navCtrl: NavController

  ) {
    this.user = this.helper.getUser();
    console.log(this.user);
   }
 
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
      console.log(this.params);
    });

    this.getData()
  }

      
  async getData() {

    let params: any = { user_id: this.user.id ,complaint_id: this.params.complaint_id  };
    await this.serviceCall.postData("Services/userCheck", { id: this.user.id }).subscribe(response => {
      console.log('Delete status response:', response);
  
      if (response && response.status === "success" && response.code === 200) {
        const deleteStatus = response.response[0]?.izbrisan; // Accessing izbrisan from the first item in the array
  
        if (deleteStatus === "1") {
          console.log('User is deleted. Navigating to login page...');
          this.navCtrl.navigateRoot("/login");
        } else {
          console.log('User is not deleted or delete status not confirmed.');
          // Handle other cases if needed
        }
      } else {
        console.error('Invalid response format or server error:', response);
        // Handle error scenarios
      }
    }, error => {
      console.error('Error fetching delete status:', error);
      // Handle error scenarios
    });

    this.serviceCall.getDetails ("complaints/complaint", params).subscribe(r => {
      
      this.dataLoaded = true;
      if (r.code ==200) {

        r.photos.forEach(e => {
          e.picture = environment.mediaPath + e.picture;
        });
        this.data = r.park_complaints[0];
        this.images = r.photos
      } else {
        this.data = [];


      }
    })
  }


}
