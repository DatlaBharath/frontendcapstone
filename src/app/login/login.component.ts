import { Component, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../User';
import { StorageService } from '../token.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  enteredemail: string = '';
  enteredpassword: string = '';
  rememberMe: boolean = false;
  token!: any;

  @Output()
  user!: User;
  // constructor() { }
  constructor(private router: Router,private userService:UserService,private storageService: StorageService) {}

  ngOnInit() {
    console.log('Email:', this.enteredemail);  // Check initial value
    console.log('Password:', this.enteredpassword);  // Check initial value
  }

  // Called on form submission
  onSubmit(form: NgForm) {
    if (form.valid) {
      // Process login (e.g., call an authentication service)
      this.userService.login(this.enteredemail,this.enteredpassword).subscribe( d => {
        console.log(d.token)
        this.token = d.token
        if(this.token != null){
          let bearer = "Bearer "+this.token
          let header = new HttpHeaders().set("Authorization",bearer);
          this.storageService.set("token",this.token)
          this.storageService.set("header",header)
          this.userService.getUserByEmail(this.enteredemail).subscribe(d => {
            let u:User = new User(d.email,d.password,d.fullName,d.mobile);
            u.id = d.id;
            this.storageService.set("user",u)
            
            console.log('Login successful');
            console.log('Email:', this.enteredemail);
            console.log('Password:', this.enteredpassword);
            console.log('Remember me:', this.rememberMe);
            if(d.id==1){
              this.storageService.set("role","admin")
              this.router.navigate(['/admin']);
            }
            else{
              this.storageService.set("role","user")
              this.router.navigate(['/home']);
            }
          })
        }
        else{
          console.log('incorrect credentials');
        }
      })

      // Clear form
      
    } else {
      // Handle invalid form
      console.log('Form is invalid');
    }
  }

}
