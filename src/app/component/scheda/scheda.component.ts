import { Component, OnInit } from '@angular/core';
import { Scheda } from 'src/app/model/scheda/scheda';
import { Router } from '@angular/router';
import { SchedaService } from 'src/app/service/scheda/scheda.service';

@Component({
  selector: 'app-scheda',
  templateUrl: './scheda.component.html',
  styleUrls: ['./scheda.component.css']
})
export class SchedaComponent implements OnInit {

  schede: Scheda[] = [];
  showForm: boolean = false;
  isUpdate: boolean = false;
  selectedScheda: Scheda = {
    id: 0,
    data_creazione: new Date(),
    data_fine: new Date(),
    esercizio: '',
    reps: '',
    recupero: '',
    users: []
  };

  constructor(private schedaService: SchedaService, private router: Router) { }

  ngOnInit(): void {
    this.loadSchede();
  }

  loadSchede() {
    this.schedaService.getAllScheda().subscribe(
      schede => {
        this.schede = schede;
      },
      error => {
        console.log('Error fetching schede: ', error);
      }
    );
  }

  deleteScheda(id: number) {
    this.schedaService.deleteSchedaById(id).subscribe(
      () => {
        console.log('Scheda deleted successfully');
        this.loadSchede();
      },
      error => {
        console.error('Error deleting scheda:', error);
      }
    );
  }

  addScheda() {
    this.isUpdate = false;
    this.selectedScheda = {
      id: 0,
      data_creazione: new Date(),
      data_fine: new Date(),
      esercizio: '',
      reps: '',
      recupero: '',
      users: []
    };
    this.showForm = true;
  }

  updateScheda(scheda: Scheda) {
    this.isUpdate = true;
    this.selectedScheda = { ...scheda };

    if (this.selectedScheda.data_creazione instanceof Date) {
        this.selectedScheda.data_creazione = this.formatDateForInput(this.selectedScheda.data_creazione.toISOString());
    } else {
        this.selectedScheda.data_creazione = this.formatDateForInput(this.selectedScheda.data_creazione);
    }
    
    if (this.selectedScheda.data_fine instanceof Date) {
        this.selectedScheda.data_fine = this.formatDateForInput(this.selectedScheda.data_fine.toISOString());
    } else {
        this.selectedScheda.data_fine = this.formatDateForInput(this.selectedScheda.data_fine);
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
    console.log(this.selectedScheda);  // Verifica il contenuto dell'oggetto prima dell'invio
    if (this.isUpdate) {
      this.schedaService.updateSchedaById(this.selectedScheda.id, this.selectedScheda).subscribe(
        () => {
          console.log('Scheda updated successfully');
          this.loadSchede();
          this.showForm = false;
        },
        error => {
          console.error('Error updating scheda:', error);
        }
      );
    } else {
      this.schedaService.insertScheda(this.selectedScheda).subscribe(
        () => {
          console.log('Scheda added successfully');
          this.loadSchede();
          this.showForm = false;
        },
        error => {
          console.log('Error adding scheda: ', error);
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
  
}

