import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';
import { HttpService } from '../providers/http.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-racunidtl',
  templateUrl: './racunidtl.page.html',
  styleUrls: ['./racunidtl.page.scss'],
})
export class RacunidtlPage implements OnInit {
  dt: any = '';
  enddt: any = '';
  konobar: any = '';
  nivoi: any = '';
  sto: any = '';
  datum: any = '';
  dataLoaded: boolean = false;
  data: any = [];
  skeleton: any = [];
  firstcall: any = 0;
  constructor(
    private helper: HelperService,
    public router: Router,
    private serviceCall: HttpService
  ) {
    if (this.firstcall == 0) {
      this.firstcall = 1;
      this.getAlldata();
    }
  }

  ngOnInit() {
    if (this.firstcall == 0) {
      this.firstcall = 1;
      this.getAlldata();
    }
  }
  getAlldata() {
    let holedata = JSON.parse(localStorage.getItem('mydatafilter'));
    this.serviceCall.postData('/Stolovi/Racuni', holedata).subscribe((r) => {
      this.dataLoaded = true;
      this.data = [];
      if (r.code == 200) {
        let _data = r.response;
        console.log(_data);
        this.data = _data;
      } else {
        this.data = [];
      }
    });
  }
}
