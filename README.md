# 🌐 GitHub Integration Frontend

This is the **Angular 19 standalone** frontend for the GitHub OAuth integration system. It interacts with a Node.js + MongoDB backend and provides a beautiful UI for visualizing GitHub organization data using AG Grid and Angular Material.

---

## 🚀 Features

- 🔐 Connect to GitHub via OAuth2
- ✅ Display connection status + integration date
- 🧠 Re-sync and Remove Integration controls
- 📂 Dynamic dropdown to select collections
- 🔍 Global search across all fields
- 📊 Dynamic AG Grid for displaying organization data
- 🔁 Server-side pagination, sorting, filtering
- 💡 Standalone Angular Components (v19)
- 📱 Responsive & clean UI

---

## 📁 Folder Structure

```
📦 github-integration-fe
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── collection-grid/
│   │   │       ├── collection-grid.component.ts
│   │   │       ├── collection-grid.component.html
│   │   │       └── collection-grid.component.scss
│   │   ├── services/
│   │   │   └── integration.service.ts
│   │   ├── constants/
│   │   │   └── api.constants.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   └── styles.scss
└── angular.json
```

---

## 📦 Libraries Used

- [Angular 19](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [AG Grid Community](https://www.ag-grid.com/angular-data-grid/)
- RxJS for Observables & HTTP handling

### Install Required Packages

```bash
npm install @angular/material @angular/cdk
npm install ag-grid-community ag-grid-angular
```

---

## ⚙️ Environment Setup

### 1. Clone the repo

```bash
git clone https://github.com/jamshaidkhalid/github-oauth-fe.git
cd github-oauth-fe
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application

```bash
ng serve
```

> The app runs at `http://localhost:4200` and connects to the backend at `http://localhost:3000`

---

## 📡 Backend Integration

Make sure the backend is running locally or remotely and exposes the following endpoints:

- `GET /integration/status`
- `POST /integration/resync`
- `DELETE /integration/remove`
- `POST /data/:collection`

Update `api.constants.ts` if your backend URL is different.

---

## 👨‍💻 Developed By

[@Jamshaid Khalid](https://github.com/jamshaidkhalid)
