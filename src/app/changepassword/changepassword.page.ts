import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';
import { HttpService } from '../providers/http.service';
import { NavController, MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment';
const { Storage } = Plugins;

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {

  	

  	old_pass: any;
  	new_pass:any;
  	user:any=[];
  	errormsg:any='';
  	constructor(private helper: HelperService,private serviceCall: HttpService,
		private navCtrl: NavController,public menuCtrl: MenuController,
    	private http: HttpClient) 
  	{
  		this.user = this.helper.getUser()
  	}

  	ngOnInit() {
  		this.user = this.helper.getUser()
	}

  	async save() {
  			
		if (this.old_pass=='') 
  		{
                  this.errormsg="Please enter your old password";
  		}
		else if (this.new_pass=='')
		{
                  this.errormsg="Please enter your new password";
		}
		else
		{
			let loader =await this.helper.presentLoading();
      		loader.present()
      		const id = this.user.id;
	 	      const old_pass = this.old_pass;
     	 	       const mobile_pass = this.new_pass;
      		this.serviceCall.postData("services/change_password", { id , old_pass, mobile_pass }).subscribe(r => 
      		{
      			console.log(r);
      			let data = r;
	          	loader.dismiss();
	          	if(data.code ==200)
	          	{
	          		this.errormsg=data.status;
	          		Storage.remove({ key: 'userProfile' }).then(() => {
	      				this.helper.setUser({});
	      				this.navCtrl.navigateRoot("/login");
    				})
	          	}
	          	else
	          	{
	          		this.errormsg=data.status;
	          	}
	      	})
		}
	}

  	ionViewWillEnter() {
    	
  	}

  	close() {
    	       this.navCtrl.back()
  	}
  	
  	

}

