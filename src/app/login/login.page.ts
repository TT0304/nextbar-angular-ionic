import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { MenuController, NavController } from '@ionic/angular';
import { HelperService } from '../helper.service';
import { HttpService } from '../providers/http.service';
const { Storage } = Plugins;


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  ngOnInit() {
  }

  isLoggedIn: boolean = false;
  users: any;
  authForm: FormGroup;
  fbEmail: string
  fbUserId: string
  fbUserName: any
  fbImg: any;
  public lat: any;
  public long: any;
  public loading1: any;
  public firstname: any;
  public lastname: any;
  error:string=""

  constructor(
    public router: Router, public formBuilder: FormBuilder,
    private helper: HelperService,
    private serviceCall: HttpService,
    public menuCtrl: MenuController,
    private navCtrl: NavController,


  ) {

    this.authForm = formBuilder.group({
      rememberMe: [false],
      email: ['', Validators.compose([Validators.required])],
      lozinka: ['', Validators.compose([Validators.required, Validators.minLength(3)])]

    });

    this.isLoggedIn = false;
    this.users = { id: '', name: '', email: '', picture: { data: { url: '' } } };

  }




  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  forgotPass() {
    // this.navCtrl.push('ForgotPasswordPage');
  }




  showError(text) {

  }

  async login() {
    if (this.authForm.valid) {
      let loader = await this.helper.presentLoading();
      loader.present();
  
      const ime = this.authForm.controls['email'].value;
      const mobile_pass = this.authForm.controls['lozinka'].value;
  
      this.serviceCall.postData("services/login", { ime, mobile_pass }).subscribe(r => {
        loader.dismiss();
        if (r.code == 409) {
          // this.helper.showToast("Username / Password not valid");
          this.error = 'Pogresno korisnicko ime ili lozninka';
        } else if (r.code == 200) {
          if (r.response.izbrisan == "1") {
            this.error = 'Vas nalog je izbrisan.';
          } else {
            this.helper.setUser(r.response);
            this.storeUserDetails(r.response);
  
            if (this.authForm.controls["rememberMe"].value == true) {
              this.storeUserDetails(r.response);
            }
  
            this.navCtrl.navigateRoot("/home");
            // this.router.navigateByUrl("home");
          }
        }
      });
    }
  }

  signup() {
    // this.navCtrl.push('SignupPage');
  }
 
  async storeUserDetails(r) {
    await Storage.set({
      key: 'userProfile',
      value: JSON.stringify(r)
    })
    const { value } = await Storage.get({ key: 'userProfile' });
    console.log('Got item: ', value);
  
  }
  
  

}
