# Class Action Lawsuit Member Management

A full-stack Next.js application for managing class action lawsuit members. The application provides functionality for importing, searching, and managing member data from various sources.

## Features

- Search members by last name, email, or mobile phone
- Add new members with comprehensive information
- Edit existing member details
- Import member data from CSV files
- Responsive design with modern UI
- Data validation and error handling

## Technologies

- **Next.js 13+** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Prisma** - Type-safe ORM for database operations
- **SQLite** - Lightweight, file-based database
- **TailwindCSS** - Utility-first CSS framework
- **Zod** - TypeScript-first schema validation with static type inference

## Dependencies

- `@prisma/client` - Prisma ORM client for database operations
- `@tailwindcss/forms` - Form styling utilities for Tailwind CSS
- `csv-parse` - CSV parsing library for data imports
- `zod` - Schema declaration and validation
- `typescript` - JavaScript with syntax for types
- `tailwindcss` - A utility-first CSS framework
- `postcss` - Tool for transforming CSS with JavaScript
- `autoprefixer` - PostCSS plugin to parse CSS and add vendor prefixes

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```
DATABASE_URL="file:./dev.db"
```

## Data Import

The application supports importing member data from CSV files with different structures:
- Members1.csv: includes ProductName, DatePurchased, PaidAmount
- Members2.csv: includes CoveredWeeks, LastStateWorked

## Author

**Kyle Dilbeck**  
GitHub: [https://github.com/xyian](https://github.com/xyian)
