import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../providers/http.service';
import { MenuController, NavController } from '@ionic/angular';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-add-waiter',
  templateUrl: './add-waiter.page.html',
  styleUrls: ['./add-waiter.page.scss'],
})
export class AddWaiterPage implements OnInit {
  frm: FormGroup;
  isLoggedIn: boolean;
  users: any;
  err: any;
  formError:boolean=false
  frmSubmitted:boolean=true;
  frmType:string="add";
  inputParams: any;
  id: any;
  ngOnInit() {
  }



  constructor(
    public router: Router, public formBuilder: FormBuilder,
    private serviceCall: HttpService,
    public menuCtrl: MenuController,
    private navCtrl: NavController,
    private helper: HelperService,
    private activatedRoute: ActivatedRoute

  ) {

 
    this.frm = formBuilder.group({

      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      lozinka: ['',Validators.required],
      // prioritet: ['', Validators.required],
      ulica_broj: [''],
      grad: [''],
      br_lk: [''],
      telefon: [''],
      jmbg: [''],
      napomena: ['']

    });

    this.isLoggedIn = false;
  }




  ionViewDidLoad() {

  }

  ionViewWillEnter() {



    this.activatedRoute.paramMap.subscribe((p:any) => {

      if(p.keys.length!=0){
        console.log(p.params)
        this.inputParams = p.params;
        this.id = p.get('id');
        this.frmType='edit';
        this.frm.patchValue(p.params)
      } 
    });





  }


  public findInvalidControls() {
    const invalid = [];
    const controls = this.frm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
}



  async submit() {
    this.formError=false;
    this.frmSubmitted = this.frm.valid
    console.log("hreee");


    console.log(this.findInvalidControls());


    if (this.frm.valid) {
      let loader = await this.helper.presentLoading();
      loader.present()

      const formParams = this.frm.getRawValue();
      let endpoint = "services/update/";
      if(this.frmType=='edit'){
        endpoint = "services/update/"+this.id;
      
      }


      this.serviceCall.postData(endpoint, formParams).subscribe(r => {

        if (r.code == 403) {
          this.helper.showToast("IME Already Exists","danger")
          loader.dismiss()
        } else if (r.code == 200){
          this.navCtrl.pop()
          let msg = ("Uspesno uneto")
          if(this.frmType=='edit'){

            msg = "Uspesno uneto"
          }
          this.helper.showToast(msg);

          loader.dismiss();
        }


      })

    }else{

  this.formError=true;
    }
  }

  get prezime() { return this.frm.controls['prezime'] }
  get getIme() { return this.frm.controls['ime'] }

}

