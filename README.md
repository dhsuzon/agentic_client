# TutorialsPoint - AI-Powered Learning Platform (Frontend)

A modern, AI-powered learning platform frontend built with Next.js 16, React 19, and HeroUI. Features AI-powered course generation, intelligent chat assistant, and seamless course discovery.

## 🚀 Project Overview

TutorialsPoint Frontend is the client-side application for an AI-powered learning platform. It provides an intuitive interface for course discovery, creation, enrollment, and AI-assisted content generation using Google's Gemini AI.

## ✨ Key Features

### 🤖 AI-Powered Course Creation
- **Content Generator**: Enter a topic → AI generates title, description, and syllabus
- **Auto Classification**: AI suggests category and relevant tags from course content
- **Regenerate**: Easy one-click regeneration

### 💬 AI Chat Assistant
- Floating widget accessible across all pages
- Conversation history with context awareness
- Suggested follow-up prompts
- Powered by Google Gemini

### 📚 Course Management
- Browse courses with search, filters (category, price range), and sorting
- Course detail pages with reviews, ratings, and related courses
- Create, edit, and manage courses (admin role)
- Enroll/unenroll functionality

### 🔐 Authentication
- Email/Password registration and login
- Google OAuth integration
- Demo login with auto-created account
- JWT-based session management

### 📊 Interactive Dashboard
- Recharts-powered statistics on landing page
- Enrolled courses view for students
- Full course management for admins
- Responsive admin panel

## 🛠 Technology Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **UI Library** | HeroUI 3 |
| **Styling** | Tailwind CSS 4 |
| **State Management** | TanStack Query 5 |
| **Charts** | Recharts |
| **Carousel** | Swiper.js |
| **Auth Client** | Better-Auth |
| **AI Provider** | Google Gemini |
| **Notifications** | React Toastify |
| **Icons** | React Icons |

## 📁 Directory Structure

```
tutorialpoints/
├── app/
│   ├── page.tsx              # Landing page (Hero, Features, Stats, FAQ, CTA)
│   ├── layout.tsx            # Root layout with metadata
│   ├── globals.css           # Global styles + CSS variables
│   ├── providers.tsx         # TanStack Query + Navbar + Footer + Toast + AI Chat
│   ├── not-found.tsx         # Custom 404 page
│   ├── explore/              # Course browsing with search, filter, sort
│   ├── courses/
│   │   ├── [id]/             # Course detail page
│   │   ├── new/              # Create course (AI-powered)
│   │   ├── manage/           # Manage courses
│   │   └── [id]/edit/        # Edit course
│   ├── login/                # Login (email, Google OAuth, Demo)
│   ├── register/             # Registration
│   ├── about/                # About page
│   ├── contact/              # Contact form
│   ├── help/                 # FAQ page
│   ├── privacy/              # Privacy policy
│   ├── terms/                # Terms of service
│   ├── admin/                # Admin dashboard
│   └── api/
│       ├── auth/[...all]/    # Better-Auth proxy
│       └── ai/chat/          # AI chat endpoint
├── components/
│   ├── Navbar.tsx            # Sticky, role-based navigation
│   ├── Footer.tsx            # Multi-column footer
│   ├── CourseCard.tsx        # Course card + skeleton
│   ├── ReviewCard.tsx        # Review display
│   ├── StarRating.tsx        # Interactive/display star rating
│   └── AIChatAssistant.tsx   # Floating AI chat widget
└── lib/
    ├── api.ts                # Backend API client
    ├── auth-client.ts        # Better-Auth client
    └── auth.ts               # Auth server config
```

## ⚡ Quick Start

### Prerequisites
- Node.js 22+
- MongoDB (local or Atlas)
- Google Gemini API key
- ImgBB API key

### Installation

```bash
cd tutorialpoints
npm install
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_api_key
NEXT_PUBLIC_GEMINI_KEY=your_gemini_api_key
```

### Development

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌐 Pages Overview

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page with 8 sections |
| `/explore` | Public | Browse courses with search, filters, pagination |
| `/courses/[id]` | Public | Course details, reviews, enrollment |
| `/courses/new` | Auth | Create course with AI generator |
| `/courses/manage` | Auth | View enrolled/manage courses |
| `/courses/[id]/edit` | Admin | Edit course details |
| `/login` | Public | Email, Google OAuth, Demo login |
| `/register` | Public | Create account |
| `/about` | Public | Platform information |
| `/contact` | Public | Contact form |
| `/help` | Public | FAQ |
| `/privacy` | Public | Privacy policy |
| `/terms` | Public | Terms of service |
| `/admin` | Admin | Course management dashboard |

## 🔗 Related

- **Backend**: [backend/README.md](../backend/README.md)

---

*Built with Next.js 16, React 19, HeroUI 3, and Google Gemini AI*
