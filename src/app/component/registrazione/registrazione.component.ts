import { Component } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent {

  user: User = {
    nome: '',
    cognome: '',
    email: '',
    password: '',
    cf: '',
    id: 0,
    anno_nascita: '',
    scheda: []
  };

  constructor(private userService: UserService) {}

  onSubmit() {
    this.userService.insertUser(this.user).subscribe(
      () => {
        console.log('Utente registrato con successo');
        // Resetta i campi del form dopo la registrazione
        this.resetForm();
        // Gestire eventuali azioni post-registrazione, come il redirect o un messaggio di conferma
      },
      error => {
        console.error('Errore durante la registrazione:', error);
        // Gestire errori di registrazione, ad esempio mostrando un messaggio di errore all'utente
      }
    );
  }

  resetForm() {
    this.user = {
      nome: '',
      cognome: '',
      email: '',
      password: '',
      cf: '',
      id: 0,
      anno_nascita: '',
      scheda: []
    };
  }
}
