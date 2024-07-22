 


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HelperService } from '../helper.service';
import { HttpService } from '../providers/http.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  authForm: FormGroup;
  isLoggedIn: boolean;
  users: any;
  err: any;
  formError:boolean=false
  user: any;

  ngOnInit() {
  }



  constructor(
    public router: Router, public formBuilder: FormBuilder,
    private serviceCall: HttpService,
    private navCtrl: NavController,
    private helper: HelperService
  ) {
    this.user = this.helper.getUser()
    console.log(this.user );

    this.authForm = formBuilder.group({

      password: ['', Validators.compose([Validators.minLength(6)])],
      name: [this.user.name, Validators.compose([Validators.required, Validators.minLength(3)])],
      phone: [this.user.phone, Validators.compose([Validators.required, Validators.minLength(10)])],
      address: [this.user.address, Validators.compose([Validators.required])],
      businessName: [this.user.businessName, Validators.compose([Validators.required])]

    });

    this.isLoggedIn = false;
  }




  ionViewDidLoad() {

  }

  async register() {
    this.formError=false;


    if (this.authForm.valid) {
      let loader = await this.helper.presentLoading();
      loader.present()

      let formParams = this.authForm.getRawValue();
      formParams.id = this.user.id;
      
 
      this.serviceCall.postData("services/updateprofile", formParams).subscribe(r => {
        
        if (r.code == 409) {
          this.err = r.status;
          loader.dismiss()
        } else if (r.code == 200){
          this.helper.setUser(r.response[0]);
          this.navCtrl.navigateRoot("/home");
          loader.dismiss();
        }


      })

    }else{
   this.formError=true;
    }
  }


}

