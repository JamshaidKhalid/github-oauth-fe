import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationService } from './services/integration.service';
import { ConnectCardComponent } from './components/connect-card/connect-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ConnectCardComponent,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  connected = false;
  loading = true;
  syncing = false;

  constructor(private integration: IntegrationService) {}

  ngOnInit(): void {
    this.integration.getStatus().subscribe({
      next: (res) => {
        this.connected = res.connected;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  resync() {
    this.syncing = true;
    this.integration.resync().subscribe({
      next: () => {
        alert('Re-synced successfully');
        this.syncing = false;
      },
      error: () => {
        alert('Failed to re-sync');
        this.syncing = false;
      }
    });
  }

  remove() {
    if (confirm('Are you sure you want to remove the integration?')) {
      this.integration.removeIntegration().subscribe(() => {
        window.location.reload();
      });
    }
  }
}
