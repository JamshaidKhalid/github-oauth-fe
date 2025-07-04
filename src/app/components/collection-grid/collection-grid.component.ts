import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  GridReadyEvent,
  SortChangedEvent,
  FilterChangedEvent,
  ColDef,
  GridApi,
  ModuleRegistry,
  ClientSideRowModelModule,
} from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

@Component({
  selector: 'app-collection-grid',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  templateUrl: './collection-grid.component.html',
  styleUrl: './collection-grid.component.scss',
})
export class CollectionGridComponent implements OnChanges {
  @Input() collection = '';
  @Input() searchTerm = '';

  modules = [ClientSideRowModelModule];
  gridApi!: GridApi;

  rowData: any[] = [];
  columnDefs: ColDef[] = [];

  defaultColDef: ColDef = {
  sortable: true,
  filter: true,
  resizable: true,
  flex: 1
};

  page = 1;
  pageSize = 10;
  total = 0;

  sort: { field: string; order: 'asc' | 'desc' } | null = null;
  filters: { [key: string]: any } = {};

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['collection'] || changes['searchTerm']) {
      this.page = 1;
      this.loadData();
    }
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.loadData();
  }

  onSortChanged(event: SortChangedEvent): void {
    const api = event.api as any;
    const sortModel = api.getSortModel?.() || [];
   this.sort = sortModel.length > 0
    ? { field: sortModel[0].colId, order: sortModel[0].sort }
    : null;

  this.page = 1;
  this.loadData();
  }

  onFilterChanged(event: FilterChangedEvent): void {
  this.filters = event.api.getFilterModel?.() || {};
  this.page = 1;
  this.loadData();
}

  loadData(): void {
    if (!this.collection) return;

    this.http
      .post<any>(`http://localhost:3000/data/${this.collection}`, {
        page: this.page,
        pageSize: this.pageSize,
        search: this.searchTerm,
        sort: this.sort,
        filters: this.filters,
      })
      .subscribe({
        next: (res) => {
          this.rowData = res.data || [];
          this.total = res.total || 0;

          if (this.rowData.length > 0) {
            this.columnDefs = Object.keys(this.rowData[0]).map((field) => ({
              field,
              sortable: true,
              filter: true,
              resizable: true,
              valueGetter: (params: any) => {
                const value = params.data[field];

                if (Array.isArray(value)) {
                  return value.join(', ');
                }

                if (typeof value === 'object' && value !== null) {
                  return Object.entries(value)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(', ');
                }

                return value;
              },
            }));
          } else {
            this.columnDefs = [];
          }
        },
        error: (err) => {
          console.error('❌ Failed to load data:', err.message);
          this.rowData = [];
          this.columnDefs = [];
        },
      });
  }

  nextPage(): void {
    if (this.page * this.pageSize < this.total) {
      this.page++;
      this.loadData();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadData();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }
}
