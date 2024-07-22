import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';
import { HttpService } from '../providers/http.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-racuni',
  templateUrl: './racuni.page.html',
  styleUrls: ['./racuni.page.scss'],
})
export class RacuniPage implements OnInit {
  user: any;
  env: any;
  dt: any = '';
  enddt: any = '';
  konobar: any = '';
  nivoi: any = '';
  sto: any = '';
  datum: any = '';

  nivoiList = [];
  KonobarList = [];
  DatumList = [];
  StoList = [];

  constructor(
    private helper: HelperService,
    public router: Router,
    private serviceCall: HttpService
  ) {
    this.user = this.helper.getUser();
    this.env = environment;
    this.getAllKonobar();
  }

  ngOnInit() {
    this.getAllKonobar();
  }

  async getAllKonobar() {
    console.log('adjhkashsa');
    this.serviceCall.getDetails('Stolovi/getAllKonobar/', {}).subscribe((r) => {
      console.log('test Konobar' + JSON.stringify(r.response));
      this.getAllNivoi();
      if (r.code == 200) {
        this.KonobarList = r.response;
      } else {
        this.KonobarList = [];
      }
    });
  }
  async getAllNivoi() {
    console.log('adjhkashsa');
    this.serviceCall.getDetails('Stolovi/getAllNivoi/', {}).subscribe((r) => {
      console.log('test' + JSON.stringify(r.response));

      if (r.code == 200) {
        this.nivoiList = r.response;
      } else {
        this.nivoiList = [];
      }
    });
  }

  filterbyNivo(ev) {
    console.log(ev.detail.value);
    this.serviceCall
      .getDetails('Stolovi/getSto/' + ev.detail.value, {})
      .subscribe((r) => {
        console.log('test' + JSON.stringify(r.response));
        if (r.code == 200) {
          this.StoList = r.response;
        } else {
          this.StoList = [];
        }
      });
  }
  save() {
    if (this.dt == '') {
      this.helper.showToast('Molimo vas da unesete adresu početni datum');
    } else if (this.enddt == '') {
      this.helper.showToast('Molimo vas da unesete adresu datum završetka');
    } else {
      let data = {
        date: this.dt,
        endDate: this.enddt,
        konbara: this.konobar,
        id_stola: this.nivoi,
        id_nivoa: this.sto,
      };
      localStorage.setItem('mydatafilter', JSON.stringify(data));
      this.router.navigate(['/racunidtl']);
    }
  }
}
