A Spotify-inspired music streaming web application built with Astro, React, TypeScript, and Tailwind CSS.
This project focuses on recreating the core layout and interactive experience of a modern music streaming platform.

🚀 Features

Dark-themed music streaming interface

Sidebar navigation (Home, Search, Library)

Dynamic playlist and song display

Bottom music player with controls

Client-side routing

Member authentication support

CMS integration

Responsive layout for desktop and mobile

Component-based architecture

Testing setup with Vitest

🛠️ Tech Stack

Framework: Astro 5.8.0

Frontend: React 18.3.0

Styling: Tailwind CSS 3.4.14

Language: TypeScript 5.8.3

UI Components: Radix UI

State Management: Zustand

Forms: React Hook Form with Zod

Testing: Vitest

Build Tool: Vite

Deployment: Cloudflare

🚀 Getting Started
Prerequisites

Node.js (v18 or higher)

npm or yarn

Wix account and site (if using Wix integrations)

Installation

Install dependencies:

npm install


Set up environment variables:

npm run env


Start development server:

npm run dev


The app runs at:

http://localhost:4321

📁 Project Structure
main/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── Head.tsx
│   │   └── Router.tsx
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   └── styles/
├── integrations/
│   ├── cms/
│   └── members/
├── public/
└── eslint-rules/

🎨 UI Components

UI components are built with Radix UI and styled using Tailwind CSS:

Layout: Accordion, Tabs, Sheet

Forms: Input, Select, Checkbox, Radio Group

Navigation: Navigation Menu, Breadcrumb

Feedback: Alert, Toast, Progress

Overlays: Dialog, Popover, Tooltip

Data Display: Table, Card, Badge, Avatar

Interactive: Button, Toggle, Slider

🔧 Available Scripts

npm run dev – Start development server

npm run build – Build for production

npm run preview – Preview production build

npm run release – Release to Wix

npm run env – Pull environment variables

npm run check – Type check

npm run test:run – Run tests

🧪 Testing

Run:

npm run test:run

📱 Responsive Design

Mobile-first layout

Flexible grid system

Adaptive sidebar

Sticky bottom player

🚀 Deployment

Build for production:

npm run build


Configured for deployment on Cloudflare.
