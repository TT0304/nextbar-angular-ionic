import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HelperService } from '../helper.service';
import { HttpService } from '../providers/http.service';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  authForm: FormGroup;
  isLoggedIn: boolean;
  users: any;
  err: any;
  formError:boolean=false

  ngOnInit() {
  }



  constructor(
    public router: Router, public formBuilder: FormBuilder,
    private serviceCall: HttpService,
    public menuCtrl: MenuController,
    private navCtrl: NavController,
    private helper: HelperService
  ) {

    this.authForm = formBuilder.group({

      email: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Z0-9a-z._%+-]+@([A-Za-z0-9-]+.)+[A-Za-z]{2,4}$')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      address: ['', Validators.compose([Validators.required])],
      businessName: ['', Validators.compose([Validators.required])]

    });

    this.isLoggedIn = false;
  }




  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }


  async register() {
    this.formError=false;


    if (this.authForm.valid) {
      let loader = await this.helper.presentLoading();
      loader.present()

      const formParams = this.authForm.getRawValue();

      this.serviceCall.postData("services/register", formParams).subscribe(r => {

        if (r.code == 409) {
          this.err = r.status;
          loader.dismiss()
        } else if (r.code == 200){
          this.helper.setUser(r.response);
          this.navCtrl.navigateRoot("/register-completed");
          loader.dismiss();
        }


      })

    }else{

  this.formError=true;
    }
  }


}
