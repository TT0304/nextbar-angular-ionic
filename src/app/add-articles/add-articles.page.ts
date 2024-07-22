import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { MenuController, NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HelperService } from '../helper.service';
import { HttpService } from '../providers/http.service';

const { Camera } = Plugins;

@Component({
  selector: 'app-add-articles',
  templateUrl: './add-articles.page.html',
  styleUrls: ['./add-articles.page.scss'],
})
export class AddArticlesPage implements OnInit {
  frm: FormGroup;
  isLoggedIn: boolean;
  users: any;
  err: any;
  formError: boolean = false
  frmSubmitted: boolean = true;
  frmType: string = "add";
  inputParams: any;
  artikli_id: any;
  categories: any[];
  categories2: any[];
  selectedText: string = "";
  selectedText2: string = "";
  artikli_slika: any;
  productImage: any = "";
  mediaPath: string;
  singleArticle: any;
  vrsta:any=[]
  artikli_vrsta_serviranjaText:string = ""


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

      artikli_ime: ['', Validators.required],
      artikli_sifra: ['', Validators.required],
      // artikli_bar_kod: ['',Validators.required],
      // artikli_kataloska_sifra: ['', Validators.required],
      artikli_pdv: ['', Validators.required],
      artikli_JM: ['', Validators.required],
      artikli_kolicina: [''],
      artikli_kolicina2: [''],
      artikli_cena: ['', Validators.required],
      artikli_id_kat1: ['', Validators.required],
      artikli_vrsta_serviranja: ['', Validators.required],
      artikli_id_kat2: ['', Validators.required],
      artikli_prioritet: ['0'],
      artikli_napomena: [''],
      artikli_izbrisan: ['0'],

    });

    this.isLoggedIn = false;
    this.getCategories()
    this.getTipoviserviranja();

  }


  getCategories() {



    this.serviceCall.getDetails("KategoriOne/getAllActiveKategorije", {}).subscribe(r => {
      console.log(r);
      if (r.code == 403) {
        this.categories = []
        this.categories2 = []
        this.selectedText2 = ""

      } else if (r.code == 200) {
        this.categories = r.response
        this.categories2 = []
        this.selectedText2 = ""
        this.frm.controls['artikli_id_kat2'].setValue('')

      } else {
        this.categories = []
        this.categories2 = []
        this.selectedText2 = ""

      }


    })



  }




  getSingleArticle() {



    this.serviceCall.getDetails("Artikli/getAllActiveArtikliById/" + this.artikli_id, {}).subscribe(r => {
      console.log(r);
      if (r.code == 200) {
        this.singleArticle = r.response[0];
        this.frm.patchValue(r.response[0])
        this.artikli_slika=""

        // this.selectedText=r.response[0].kategorije1_naziv

      }
    })
  }


  getTipoviserviranja() {

    this.serviceCall.getDetails("Tipoviserviranja/getAllActiveTipoviserviranja/", {}).subscribe(r => {
      console.log(r);
      if (r.code == 200) {
        this.vrsta = r.response

      }else{
        this.vrsta = [];
      }
    })
  }




  getCategories2() {
    this.selectedText2 = ""
    this.frm.controls['artikli_id_kat2'].setValue('')
    console.log("categories 2");
    this.serviceCall.getDetails("KategoriTwo/getAllActiveKategorije/" + this.getKategory.value, {}).subscribe(r => {
      console.log(r);
      if (r.code == 403) {
        this.categories2 = []
      } else if (r.code == 200) {
        this.categories2 = r.response
        if(this.singleArticle){
        if(this.singleArticle.kategorije2_naziv){

          setTimeout(() => {
            this.getKategory2.setValue(this.singleArticle.artikli_id_kat2)
            console.log("*********");
            this.selectedText2=this.singleArticle.kategorije2_naziv
            this.singleArticle.kategorije2_naziv=''

          }, 1000);

        }
      }


      } else {
        this.categories2 = []
      }


    })



  }

  selectCategory2(){
    this.selectedText2=''
    console.log(this.getKategory2.value)
  }


  ionViewDidLoad() {



  }

  ionViewDidEnter() {



    this.activatedRoute.paramMap.subscribe((p: any) => {

      if (p.keys.length != 0) {
        console.log(p.params)
        this.inputParams = p.params;
        this.artikli_id = p.get('artikli_id');
        this.artikli_slika = p.get('artikli_slika');
        this.productImage = this.mediaPath + this.artikli_slika
        this.frmType = 'edit';
        this.frm.patchValue(p.params)
        this.getSingleArticle()


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


      let endpoint = "Artikli/insertArtikli/";
      if (this.frmType == 'edit') {
        endpoint = "Artikli/updateArtikli/" + this.artikli_id;

      }


      this.serviceCall.postData(endpoint, formParams).subscribe(r => {
        console.log(r);
        if (r.code == 403) {
          this.helper.showToast("Article Already Exists", "danger")
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

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 60,
      resultType: CameraResultType.Base64,
      correctOrientation: true,
      width: 500,
      height: 500,
      source: CameraSource.Prompt,
      allowEditing: false

    });

    this.artikli_slika = image.base64String
    var imageUrl = 'data:image/png;base64,' + image.base64String;
    this.productImage = imageUrl;
  }




}

