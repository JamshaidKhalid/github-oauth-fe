import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { IntegrationService } from '../../services/integration.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connect-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './connect-card.component.html',
  styleUrl: './connect-card.component.scss'
})
export class ConnectCardComponent {
  constructor(private integration: IntegrationService) {}

  connect() {
    this.integration.redirectToGithubOAuth();
  }
}
