import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { IntegrationService } from './services/integration.service';
import { ConnectCardComponent } from './components/connect-card/connect-card.component';
import { CollectionGridComponent } from './components/collection-grid/collection-grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ConnectCardComponent,
    CollectionGridComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  connected = false;
  loading = true;
  syncing = false;
  collections: string[] = [
    'github-organizations',
    'org-repos',
    'org-commits',
    'org-pulls',
    'org-issues',
    'org-users',
    'org-changelogs'
  ];
  selectedCollection: string = '';
  searchTerm: string = '';
  searchDebounceTimer: any;

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

  onCollectionChange() {
  }

  onSearchChange(term: string) {
    clearTimeout(this.searchDebounceTimer);
    this.searchDebounceTimer = setTimeout(() => {
      this.searchTerm = term;
    }, 400);
  }

  clearSearch() {
    this.searchTerm = '';
  }
}
