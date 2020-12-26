import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { StringToCodeRequest } from '../models/string-to-code-request';
import { WifiCodeRequest } from '../models/wifi-code-request';
import { VcardCodeRequest } from '../models/vcard-code-request';
import { CodeApiService } from '../services/code-api.service';


@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class GeneratorComponent implements OnInit {

  urlPatter:string = "(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\\s\/?\.#]+\.?)+(\/[^\\s]*)?";
  loading:boolean = false;
  placeholderImg:string = "assets/qr-code-placeholder.png";
  imageUrl:string = this.placeholderImg;
  selectedTab:number = 0;

  //Form Groups and Controls
  textToEncode:FormControl;
  urlToEncode:FormControl;
  wifiForm:FormGroup;
  vcardForm:FormGroup;

  constructor(private codeApiService: CodeApiService) { }

  ngOnInit(): void {
    this.initControls();
  }

  onTabClick(event) {
    console.log(event);
    this.selectedTab = event.index;
    this.clearControls();
  }

  encode(){
      switch(this.selectedTab){
        case 0: console.log(this.textToEncode); this.encodeString() ;break;
        case 1: console.log(this.urlToEncode); this.encodeString() ;break;
        case 2: this.encodeWifi() ;break;
        case 3: this.encodeVcard() ;break;
      }
  }


  encodeString(){
    if(this.textToEncode.valid || this.urlToEncode.valid){
      let stringToEncode = (this.textToEncode.valid )?this.textToEncode.value: this.urlToEncode.value;
      this.loading = true;
      this.codeApiService.encodeString(new StringToCodeRequest(stringToEncode))
          .pipe(catchError(error =>{
            console.log("String encode error");
            console.log(error);
            this.loading = false;
            return throwError(error);
          }))
          .subscribe(response => {
            this.loading = false;
              console.log("String encode response");
              console.log(response);
              this.imageUrl = "data:image/jpeg;base64," + response.encodeData;
      });
    }
  }


  encodeWifi(){
      console.log(this.wifiForm);
      if(this.wifiForm.valid){
        this.loading = true;
        this.codeApiService.encodeWifi(new WifiCodeRequest(this.wifiForm.controls['ssid'].value,this.wifiForm.controls['password'].value, 
        this.wifiForm.controls['encryption'].value, this.wifiForm.controls['hidden'].value))
            .pipe(catchError(error =>{
              console.log("Wifi encode error");
              console.log(error);
              this.loading = false;
              return throwError(error);
            }))
            .subscribe(response => {
              this.loading = false;
                console.log("Wifi encode response");
                console.log(response);
                this.imageUrl = "data:image/jpeg;base64," + response.encodeData;
        });
        
      }
  }

  encodeVcard(){
      console.log(this.vcardForm);
      if(this.vcardForm.valid){
         this.loading = true;
         let vcardRequest = new VcardCodeRequest((this.vcardForm.controls['lastName'].value + this.vcardForm.controls['name'].value),
         this.vcardForm.controls['company'].value,
         this.vcardForm.controls['title'].value,
         this.vcardForm.controls['phoneNumber'].value,
         this.vcardForm.controls['email'].value,
         this.vcardForm.controls['address'].value,
         this.vcardForm.controls['website'].value,
         this.vcardForm.controls['note'].value);
         
         this.codeApiService.encodeVCard(vcardRequest)
             .pipe(catchError(error =>{
               console.log("VCard encode error");
               console.log(error);
               this.loading = false;
               return throwError(error);
             }))
             .subscribe(response => {
               this.loading = false;
                 console.log("VCard encode response");
                 console.log(response);
                 this.imageUrl = "data:image/jpeg;base64," + response.encodeData;
         });
      }
  }

 
  clearControls(){
    this.textToEncode.reset();
    this.urlToEncode.reset();
    this.wifiForm.reset();
    this.vcardForm.reset();
    this.setDefaultValues();
  }

  initControls(){
    this.textToEncode = new FormControl('', [Validators.required]);
    this.urlToEncode = new FormControl('', [Validators.required, Validators.pattern(this.urlPatter)]);

    this.wifiForm = new FormGroup({
      ssid: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      encryption: new FormControl('nopass', [Validators.required]),
      hidden: new FormControl('false', [Validators.required])
    });

    this.vcardForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      website: new FormControl('', [Validators.required]),
      note: new FormControl('', [Validators.required])
    });

    
  }

  setDefaultValues(){
    this.wifiForm.controls['encryption'].setValue('nopass');
    this.wifiForm.controls['hidden'].setValue('false');
  }

}
