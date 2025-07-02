import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationService } from './services/integration.service';
import { ConnectCardComponent } from './components/connect-card/connect-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CollectionGridComponent } from './components/collection-grid/collection-grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ConnectCardComponent,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    CollectionGridComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  connected = false;
  loading = true;
  syncing = false;

  selectedCollection = '';
  collections = [
    'github-organizations',
    'org-repos',
    'org-pulls',
    'org-commits',
    'org-issues',
    'org-issues-changelogs',
    'org-users'
  ];

  searchTerm = '';

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
