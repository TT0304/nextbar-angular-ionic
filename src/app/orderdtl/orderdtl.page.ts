import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HelperService } from '../helper.service';
import { HttpService } from '../providers/http.service';

@Component({
  selector: 'app-orderdtl',
  templateUrl: './orderdtl.page.html',
  styleUrls: ['./orderdtl.page.scss'],
})
export class OrderdtlPage implements OnInit {

	item:any={
		"cena": "",
		"datum": "",
		"kolicina": "",
		"naziv_proizvoda": "",
		"order_id": ""
	};
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
    private activatedRoute: ActivatedRoute,public route: Router ) {
		
		this.item=JSON.parse(localStorage.getItem('orderdata'));
		this.getData();
    this.env = environment
		
   	}

  	ngOnInit() {
  		
		this.item=JSON.parse(localStorage.getItem('orderdata'));
		this.getData();
    this.env = environment
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

            this.serviceCall.getDetails("Stolovi/getOrderDetails/" +this.item.order_id,'').subscribe(r => {
                  console.log(r);
                  this.dataLoaded = true;
                  if (r.code ==200) {
                        let _data = r.response;
                        
                        this.data = _data;
                  } else {
                        this.data = [];
                  }
            })
      }

}
