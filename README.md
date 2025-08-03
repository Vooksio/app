# Vooksio App - Monorepo

A modern monorepo structure for web, mobile, and backend applications.

## 📁 Project Structure

```
app/
├── package.json          # Root workspace configuration
├── README.md
│
├── apps/                 # Applications
│   ├── web/             # Web frontend (React/Next.js/Vue/etc.)
│   │   └── index.js     # Main web application
│   ├── mobile/          # Mobile app (React Native/Flutter/etc.)
│   └── backend/         # Monolithic backend application
│       ├── routes/      # API routes/endpoints
│       ├── controllers/ # Request handlers/business logic
│       ├── models/      # Data models/schemas
│       ├── middleware/  # Express middleware/auth/validation
│       └── utils/       # Backend utilities/helpers
│
├── packages/            # Shared libraries
│   ├── ui/              # Shared UI components (web + mobile)
│   ├── shared/          # Shared utilities/helpers
│   ├── types/           # TypeScript types/interfaces
│   └── config/          # Shared configuration
│
├── tools/               # Development tools
│   ├── build/           # Build scripts
│   └── scripts/         # Utility scripts
│
└── docs/                # Documentation
```

## 🚀 Architecture

- **Monolithic Backend**: Single backend application for simplicity
- **Multi-Platform Frontend**: Separate web and mobile applications
- **Shared Packages**: Common code shared across all applications
- **Scalable Structure**: Easy to extend and maintain

## 📦 Applications

- **Web App** (`apps/web/`): Frontend web application
- **Mobile App** (`apps/mobile/`): Mobile application
- **Backend** (`apps/backend/`): API server and business logic

## 🔧 Shared Packages

- **UI** (`packages/ui/`): Reusable UI components
- **Types** (`packages/types/`): TypeScript type definitions
- **Config** (`packages/config/`): Shared configuration
- **Shared** (`packages/shared/`): Common utilities and helpers

## 🛠️ Development

Each application and package can be developed independently while sharing common code through the shared packages.