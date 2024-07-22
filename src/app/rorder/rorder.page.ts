import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { sumBy, uniqBy } from "lodash";
import { environment } from 'src/environments/environment';
import { HelperService } from '../helper.service';
import { HttpService } from '../providers/http.service';

@Component({
  selector: 'app-rorder',
  templateUrl: './rorder.page.html',
  styleUrls: ['./rorder.page.scss'],
})
export class RorderPage implements OnInit {

  user: any;
      data: any = [];
      mediaUrl: string;
      dataLoaded: boolean=false;
      env: any = {};
      skeleton: any[];
      inputParams: any;
      ID: any;
      timer:any ;
      grandTotal: any=0;

  constructor(private helper: HelperService,private serviceCall: HttpService,
      private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,public route: Router ) 
      {
            this.user = this.helper.getUser();
            this.env = environment
      }

      ngOnInit() {
            this.skeleton = this.helper.getSkeletonItem();
      }

      ionViewWillEnter() {
            this.activatedRoute.paramMap.subscribe((p:any) => {
                  if(p.keys.length!=0){
                        console.log(p.params)
                        this.inputParams = p.params;
                        this.ID = p.get('id');
                        console.log(this.ID);
                        this.getData();
                        //this.timer = setInterval(() => this.getData(), 30000);
                  } 
            });
      }


      
      async getData() {
            let params: any = {   };

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

            this.serviceCall.getDetails("Stolovi/getAllRecumiActiveStoloviOrderByOrderId/" + this.ID, params).subscribe(r => {
                  console.log(r);
                  this.dataLoaded = true;
                  if (r.code ==200) {
                        let _data = r.response;
                        let uniqueOrders  = uniqBy(_data, 'order_id');
                        this.grandTotal   = sumBy(uniqBy(_data, 'order_id'),'ukupno');
                        this.data = _data;
                  } else {
                        this.data = [];
                  }
            })
      }

      ngOnDestroy() {
            clearInterval(this.timer)
      }
      gotoorderdtl(item)
      {
            localStorage.setItem('orderdata',JSON.stringify(item));
            this.route.navigateByUrl("orderdtl");
      }


}

