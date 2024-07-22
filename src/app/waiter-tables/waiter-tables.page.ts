import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HelperService } from '../helper.service';
import { HttpService } from '../providers/http.service';
@Component({
  selector: 'app-waiter-tables',
  templateUrl: './waiter-tables.page.html',
  styleUrls: ['./waiter-tables.page.scss'],
})
export class WaiterTablesPage implements OnInit {
  user: any;
  data: any = [];
  mediaUrl: string;
  dataLoaded: boolean = false;
  env: any = {};
  skeleton: any[];
  nivoiList: any;
  nivoi: string = "-1"
  timer:any ;



  constructor(private helper: HelperService,
    private serviceCall: HttpService,
    private navCtrl : NavController
  ) {
    this.user = this.helper.getUser();
    this.env = environment
  }

  ngOnInit() {
    this.getAllNivoi()
    this.skeleton = this.helper.getSkeletonItem();
  }


  async getData() {

    let nivoi = this.nivoi == '-1' ? '' : this.nivoi
    let konobar_id = this.user.id

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
    this.serviceCall.getDetails("Stolovi/getAllActiveStoloviCustom/" , {"nivoi_id":nivoi,"konobar_id" :konobar_id}).subscribe(r => {
      console.log(r);
      this.dataLoaded = true;
      if (r.code == 200) {
        let _data = r.response;

        this.data = _data;

      } else {
        this.data = [];


      }
    })
  }
  ionViewDidEnter() {

    this.getData()
    this.timer = setInterval(() => this.getData(), 30000);

  }



  filterTables() {

    console.log(this.nivoi);
    this.getData()
  }


  async getAllNivoi() {

    this.serviceCall.getDetails("Stolovi/getAllNivoi/", {}).subscribe(r => {
      console.log(r);
      if (r.code == 200) {
        this.nivoiList = r.response;

      } else {
        this.nivoiList = [];


      }
    })
  }

  ionViewWillLeave() {
    clearInterval(this.timer)
  }


}
