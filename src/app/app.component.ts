import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'enem';
  constructor(
    private toastService:ToastService,
    private authService: AuthService,
    private toastr: ToastrService
    ){

  }

  public mostrarMenu: boolean = false;
  public mostrarMenuCandidato: boolean = false;
  public mostrarMenuExame: boolean = false;



  ngOnInit(){
    this.authService.mostrarMenu.subscribe(
      mostrar => {this.mostrarMenu = mostrar
                  this.mostrarMenuCandidato = mostrar;
                  this.mostrarMenuExame = mostrar;}
    );

    if(sessionStorage.getItem("usuarioAutenticado") == "true"){
      this.authService.exibirMenu;
      this.mostrarMenu = true;
      if(sessionStorage.getItem("usuarioCandidato") == "true"){
        this.mostrarMenuCandidato = true;
      }else if(sessionStorage.getItem("usuarioExame") == "true"){
        this.mostrarMenuExame = true;
      }
    }
  }

  lerSessionStorage(key) {
    return sessionStorage.getItem(key);
  }

  logout(){
    
    this.authService.logout();
  }


}
