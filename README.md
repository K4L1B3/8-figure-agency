# 8 Figure Agency Task Management System

A modern, full-stack task management system built with Next.js, featuring WhatsApp integration through n8n for seamless task management via messaging.

## 🚀 Features

- ✨ Modern, responsive web interface
- 📱 WhatsApp integration for task management
- 🔐 User authentication and authorization
- 🔄 Real-time task updates
- 📋 Rich task management features
- 🎨 Customizable UI components with shadcn/ui
- 🌐 API endpoints for task operations

## 🛠 Tech Stack

### Frontend
- **Next.js 13+** - React framework with App Router
- **TypeScript** - For type safety
- **Tailwind CSS** - For styling
- **shadcn/ui** - Customizable component library
- **React Hook Form** - Form handling

### Backend
- **Next.js API Routes** - Backend API implementation
- **Supabase** - Database and authentication
- **PostgreSQL** - Primary database
- **Redis** - Caching layer
- **n8n** - Workflow automation for WhatsApp integration

### Development Tools
- **pnpm** - Package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Project Structure

```
├── app/                  # Next.js app router and API routes
├── backend/             # Backend services and repositories
├── components/          # React components
│   ├── atoms/          # Basic UI components
│   ├── molecules/      # Compound components
│   ├── organisms/      # Complex components
│   └── ui/             # shadcn/ui components
├── docs/               # Project documentation
├── hooks/              # Custom React hooks
├── lib/               # Utility functions and configurations
└── styles/            # Global styles
```

## 🔧 Prerequisites

Before running this project, make sure you have:

1. Node.js 16+ installed
2. pnpm package manager
3. PostgreSQL database
4. Redis server
5. n8n instance (for WhatsApp integration)
6. WhatsApp Business API account

## 📥 Installation

1. Clone the repository:
```bash
git clone https://github.com/K4L1B3/8-figure-agency.git
cd 8-figure-agency
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables with:
- Database connection strings
- Redis configuration
- n8n webhook URLs
- WhatsApp API credentials

## 🚀 Running the Project

1. Start the development server:
```bash
pnpm dev
```

2. Start Redis server:
```bash
redis-server
```

3. Ensure PostgreSQL is running:
```bash
sudo service postgresql start
```

The application will be available at `http://localhost:3000`

## 🔌 Integration Components

### Database Setup
- PostgreSQL stores user data, tasks, and relationships
- Redis caches frequently accessed data and manages sessions
- Database migrations are in `/scripts/001_create_tables.sql`

### WhatsApp Integration
- Utilizes n8n for workflow automation
- Supports commands like:
  - Task listing
  - Task creation
  - Task completion
  - Task deletion
- Detailed integration guide in `/docs/n8n_integration/N8N_INTEGRATION.md`

## 🛣 API Routes

The application provides various API endpoints for task management:

- `/api/tasks` - CRUD operations for tasks
- `/api/tasks/formatted` - WhatsApp-friendly task formatting
- `/api/tasks/by-index` - Task operations by list index
- `/api/tasks/by-title` - Task operations by title
- `/api/users` - User management

For detailed API documentation, refer to the integration guide.

## 🔐 Authentication

The project uses Supabase for authentication, supporting:
- Email/Password login
- Social authentication (configurable)
- Session management
- Role-based access control

## 🎨 UI Components

Built with shadcn/ui, the project includes:
- Custom theme support
- Responsive design
- Accessible components
- Dark/Light mode
- Custom UI components in `/components/ui`

## 📚 Documentation

The project includes comprehensive documentation in the `/docs` directory:

### Setup Documentation
- **[Setup Guide](./docs/SETUP.md)** - Detailed technical guide for setting up the Next.js project, including:
  - Environment configuration
  - Development setup
  - Database configuration
  - Project structure explanation
  - Deployment guidelines

### Integration Documentation
- **[n8n Integration Guide](./docs/n8n_integration/N8N_INTEGRATION.md)** - Complete technical documentation for the WhatsApp integration, covering:
  - Available API endpoints
  - WhatsApp command structure
  - n8n workflow configuration
  - Message formatting
  - Error handling
  - Integration testing

For detailed technical information about:
- Setting up the Next.js project and its components, refer to `docs/SETUP.md`
- WhatsApp integration and n8n workflow configuration, check `docs/n8n_integration/N8N_INTEGRATION.md`

Future Documentation (Coming Soon):
- API Documentation
- Component Library Documentation
- Deployment Guide
- Testing Guide

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Luiz Gomes** - *Initial work* - [GitHub Profile](https://github.com/K4L1B3)

## 🙏 Acknowledgments

- shadcn/ui for the amazing component library
- n8n team for the workflow automation platform
- All contributors who have helped shape this project