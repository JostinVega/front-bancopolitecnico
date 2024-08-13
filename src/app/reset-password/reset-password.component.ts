import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CredencialesService } from '../services/credenciales.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  cedula: string = '';

  constructor(private router: Router, private credencialesService: CredencialesService) {}

  goBack() {
    this.router.navigate(['/previous-route']);
  }

  validateInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.cedula = input.value;
  }

  continue() {
    if (this.cedula.length === 10) {
      this.credencialesService.getCredencialesUsuario(this.cedula).subscribe(
        response => {
          if (response.credencialesUsuario) {
            this.router.navigate(['/answer-security-questions'], { queryParams: { cedula: this.cedula } });
          } else {
            alert('Credenciales de usuario no encontradas');
          }
        },
        error => {
          console.error('Error al obtener las credenciales de usuario:', error);
          alert('Error al obtener las credenciales de usuario');
        }
      );
    } else {
      alert('Ingrese un número de cédula válido');
    }
  }
}
