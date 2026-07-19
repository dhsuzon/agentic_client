# TutorialsPoint - AI-Powered Learning Platform (Frontend)

A modern, AI-powered learning platform frontend built with Next.js 16, React 19, and HeroUI. Features intelligent course creation, AI chat assistance, and seamless user experience.

## 🚀 Project Overview

TutorialsPoint Frontend is the client-side application for an AI-powered learning platform. It provides an intuitive interface for course discovery, creation, enrollment, and AI-assisted content generation using Google's Gemini AI.

## 🛠 Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | Next.js (App Router) | 16.2.10 |
| **Language** | TypeScript | 5.x |
| **UI Library** | HeroUI | 3.2.2 |
| **Styling** | Tailwind CSS | 4.x |
| **State Management** | TanStack Query | 5.101.2 |
| **Icons** | React Icons | 5.7.0 |
| **Notifications** | React Toastify | 11.1.0 |
| **Charts** | Recharts | 3.9.2 |
| **Carousel/Slider** | Swiper.js | 14.0.5 |
| **Animations** | Framer Motion | 12.42.2 |
| **Auth Client** | Better-Auth | 1.6.23 |
| **React** | React / React DOM | 19.2.4 |

## 📁 Directory Structure

```
tutorialpoints/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Login, Register pages
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── (public)/          # Public pages (explore, course details)
│   ├── api/               # API routes (AI chat, auth proxy)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Base UI components (Button, Card, Input, etc.)
│   ├── forms/             # Form components
│   ├── layout/            # Navbar, Footer, Sidebar
│   ├── services/          # Service/Course related components
│   ├── chat/              # AI Chat Widget components
│   └── providers/         # Context providers
├── lib/
│   ├── api.ts             # API client with token management
│   ├── auth-client.ts     # Better-Auth client config
│   ├── auth.ts            # Auth utilities
│   ├── utils.ts           # Helper functions
│   └── validations.ts     # Zod schemas
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── public/                # Static assets
└── package.json
```

## ⚡ Quick Start

### Prerequisites
nvm use 22
npm install


### Environment Variables

Create `.env.local` in the tutorialpoints directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:4000

# Image Hosting (ImgBB)
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_api_key

# Google Gemini AI
NEXT_PUBLIC_GEMINI_KEY=your_gemini_api_key
```

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linting
npm run lint

# Production build
npm run build

# Start production server
npm run start
```

The app will be available at `http://localhost:3000`

## 🔑 Key Features

### 1. AI-Powered Course Creation
- **Content Generator**: Transform any topic into structured course content (title, description, syllabus)
- **Smart Classification**: Auto-categorize courses and generate relevant tags
- **Difficulty Assessment**: AI determines beginner/intermediate/advanced level

### 2. Course Discovery & Management
- Browse courses with search, filters (category, price, rating), and sorting
- Course detail pages with galleries, reviews, and related courses
- Enrollment management with progress tracking

### 3. AI Chat Assistant
- Floating chat widget accessible across all pages
- Context-aware responses based on current page and user history
- Streaming responses with typing indicators
- Suggested follow-up prompts

### 4. User Dashboard
- Create and manage courses
- View enrollments and progress
- Favorites/bookmarks
- Messages with providers
- Profile settings

### 5. Authentication
- Email/Password registration and login
- Google OAuth (via Better-Auth)
- Protected routes with middleware
- Session management with httpOnly cookies

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint configuration
- `.env.local` - Environment variables (create from `.env.example`)

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

```bash
# Build verification
npm run build
```

### Docker (Optional)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔗 Related

- **Backend Repository**: [backend/README.md](../backend/README.md)
- **Full Documentation**: See implementation plan

---

*Built with Next.js 16, React 19, HeroUI 3, and Google Gemini AI*