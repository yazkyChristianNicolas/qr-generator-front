import { BaseCodeRequest } from "./base-code-request";

export class VcardCodeRequest extends BaseCodeRequest{
    private name:String;
	private company:String;
	private title:String;
	private phoneNumber:String;
	private email:String;
	private address:String;
	private website:String;
    private note:String;
    
    public constructor( name:String,company:String,title:String, phoneNumber:String, email:String, address:String, website:String, note:String,size:number){
             super(size);
             this.name = name;
             this.company = company;
             this.title = title;
             this.phoneNumber = phoneNumber;
             this.email = email;
             this.address = address;
             this.website = website;
             this.note = note;
    }

    
}
