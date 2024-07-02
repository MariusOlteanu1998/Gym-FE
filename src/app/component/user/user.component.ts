import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  showForm: boolean = false;
  isUpdate: boolean = false;
  selectedUser: User = {
    id: 0, nome: '', cognome: '', email: '',
    anno_nascita: '', // Assicurati che `anno_nascita` sia di tipo string
    password: '',
    cf: ''
  };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.log('Error fetching users: ', error);
      }
    );
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      () => {
        console.log('User deleted successfully');
        this.loadUsers();
      },
      error => {
        console.log('Error deleting user: ', error);
      }
    );
  }

  addUser() {
    this.isUpdate = false;
    this.selectedUser = { id: 0, nome: '', cognome: '', email: '', anno_nascita: '', password: '', cf: '' };
    this.showForm = true;
  }

  updateUser(user: User) {
    this.isUpdate = true;
    this.selectedUser = { ...user };
    this.selectedUser.anno_nascita = this.formatDateForInput(this.selectedUser.anno_nascita); // Converti la data nel formato YYYY-MM-DD
    this.showForm = true;
  }
  
  // Aggiungi un nuovo metodo per formattare la data nel formato YYYY-MM-DD
  private formatDateForInput(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit() {
    // Verifica il formato della data prima di convertire
    if (this.selectedUser.anno_nascita && this.isValidDateFormat(this.selectedUser.anno_nascita)) {
      const parts = this.selectedUser.anno_nascita.split('/');
      const day = +parts[0];
      const month = +parts[1] - 1; // I mesi in JavaScript sono indicizzati da 0
      const year = +parts[2];
      
      // Creiamo una data mantenendo l'offset del fuso orario locale
      const date = new Date(year, month, day, 12, 0, 0);
      this.selectedUser.anno_nascita = date.toISOString().split('T')[0];
    }
  
    if (this.isUpdate) {
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(
        () => {
          console.log('User updated successfully');
          this.loadUsers();
          this.showForm = false;
        },
        error => {
          console.log('Error updating user: ', error);
        }
      );
    } else {
      this.userService.addUser(this.selectedUser).subscribe(
        () => {
          console.log('User added successfully');
          this.loadUsers();
          this.showForm = false;
        },
        error => {
          console.log('Error adding user: ', error);
        }
      );
    }
  }

  cancel() {
    this.showForm = false;
  }

  navigateToRegistration() {
    this.router.navigate(['/registrazione']); // Naviga verso l'URL /registrazione
  }

  formatDate(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  // Funzione per validare il formato della data
  private isValidDateFormat(date: string): boolean {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/; // dd/MM/yyyy
    return regex.test(date);
  }
}
