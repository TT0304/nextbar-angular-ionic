import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../providers/http.service';
import { MenuController, NavController } from '@ionic/angular';
import { HelperService } from '../helper.service';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { environment } from 'src/environments/environment';

const { Camera } = Plugins;

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.page.html',
  styleUrls: ['./add-supplier.page.scss'],
})
export class AddSupplierPage implements OnInit {
  frm: FormGroup;
  isLoggedIn: boolean;
  users: any;
  err: any;
  formError: boolean = false
  frmSubmitted: boolean = true;
  frmType: string = "add";
  inputParams: any;
  id: any;
  categories: any[];
  categories2: any[];
  selectedText: string = "";
  selectedText2: string = "";
  artikli_slika: any;
  productImage: any = "";
  mediaPath: string;
  singleArticle: any;


  ngOnInit() {

    this.mediaPath = environment.mediaPath
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

      naziv: ['', Validators.required],
      pib: ['', Validators.required],
      maticni_broj: ['', Validators.required],
      sifra_delatnosti: [''],
      ulica_broj: ['', Validators.required],
      postanski_broj: ['', Validators.required],
      grad: ['', Validators.required],
      drzava: ['', Validators.required],
      telefon: [''],
      telefon2: [''],
      fax: [''],
      e_mail: ['',  Validators.compose([Validators.pattern('^[A-Z0-9a-z._%+-]+@([A-Za-z0-9-]+.)+[A-Za-z]{2,4}$')])],
      web_sajt: [''],
      tekuci_racun: [''],
      banka: [''],
      napomena: [''],
      izbrisan: ['0'],
 

    });

    this.isLoggedIn = false;

  }

 

 
 
  ionViewDidLoad() {



  }

  ionViewWillEnter() {



    this.activatedRoute.paramMap.subscribe((p: any) => {

      if (p.keys.length != 0) {
        this.inputParams = p.params;
        this.id = p.get('id');
        this.frmType = 'edit';
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
    this.formError = false;
    this.frmSubmitted = this.frm.valid
    console.log("hreee");


    console.log(this.findInvalidControls());


    if (this.frm.valid) {
      let loader = await this.helper.presentLoading();
      loader.present()

      const formParams = this.frm.getRawValue();
      formParams.artikli_slika = this.artikli_slika;


      let endpoint = "Dobavljaci/insertDobavljaci";
      if (this.frmType == 'edit') {
        endpoint = "Dobavljaci/insertDobavljaci/" + this.id;

      }


      this.serviceCall.postData(endpoint, formParams).subscribe(r => {
        console.log(r);
        if (r.code == 403) {
          this.helper.showToast("Supplier Already Exists", "danger")
          loader.dismiss()
        } else if (r.code == 200) {
          this.navCtrl.pop()
          let msg = ("Uspesno uneto")
          if (this.frmType == 'edit') {

            msg = "Uspesno uneto"
          }
          this.helper.showToast(msg);

          loader.dismiss();
        }


      })

    } else {

      this.formError = true;
    }
  }

  get getIme() { return this.frm.controls['ime'] }
  get getKategory() { return this.frm.controls['artikli_id_kat1'] }
  get getKategory2() { return this.frm.controls['artikli_id_kat2'] }
 


}