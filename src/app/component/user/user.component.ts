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
    id: 0, 
    nome: '',
    cognome: '', 
    email: '',
    anno_nascita: '', 
    password: '',
    cf: '',
    //scheda: [] 
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
    this.userService.deleteUserById(id).subscribe(
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
    this.selectedUser = { id: 0, nome: '', cognome: '', email: '', anno_nascita: '', password: '', cf: ''/*, scheda: []*/ };
    this.showForm = true;
  }

  updateUser(user: User) {
    this.isUpdate = true;
    this.selectedUser = { ...user };
  
    if (this.selectedUser.anno_nascita instanceof Date) {
      this.selectedUser.anno_nascita = this.formatDateForInput(this.selectedUser.anno_nascita.toISOString());
    } else {
      this.selectedUser.anno_nascita = this.formatDateForInput(this.selectedUser.anno_nascita);
    }
  
    this.showForm = true;
  }
  
  

  private formatDateForInput(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit() {
    let dateString: string;

    // Se anno_nascita è una data, converti in stringa ISO
    if (this.selectedUser.anno_nascita instanceof Date) {
        dateString = this.formatDateForInput((this.selectedUser.anno_nascita as Date).toISOString());
    } else {
        // Se è una stringa, usa direttamente
        dateString = this.selectedUser.anno_nascita as string;
    }

    // Verifica la validità del formato della data
    if (dateString && this.isValidDateFormat(dateString)) {
        const parts = dateString.split('/');
        const day = +parts[0];
        const month = +parts[1] - 1;
        const year = +parts[2];
        const date = new Date(year, month, day, 12, 0, 0);
        this.selectedUser.anno_nascita = date.toISOString().split('T')[0];
    }

    if (this.isUpdate) {
        this.userService.updateUserById(this.selectedUser.id, this.selectedUser).subscribe(
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
        this.userService.insertUser(this.selectedUser).subscribe(
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
    this.router.navigate(['/registrazione']);
  }

  formatDate(date: string | Date): string {
    let d: Date;
    if (typeof date === 'string') {
      d = new Date(date);
    } else {
      d = date;
    }
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  }
  

  private isValidDateFormat(date: string): boolean {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(date);
  }
}

