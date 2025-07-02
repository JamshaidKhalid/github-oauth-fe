import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiRoutes } from '../constants/api.constants';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IntegrationService {
  constructor(private http: HttpClient) {}

  getStatus(): Observable<{ connected: boolean }> {
    return this.http.get<{ connected: boolean }>(ApiRoutes.STATUS);
  }

  redirectToGithubOAuth(): void {
    window.location.href = ApiRoutes.GITHUB_AUTH;
  }

  resync(): Observable<any> {
    return this.http.post(ApiRoutes.RESYNC, {});
  }

  removeIntegration(): Observable<any> {
    return this.http.delete(ApiRoutes.REMOVE);
  }
}
