# Class Action Lawsuit Member Management System

A web-based application for managing class action lawsuit members. Built with Next.js, TypeScript, Prisma, and SQLite.

## Features

- Search members by Last Name, Email, or Mobile Phone
- View member details in a clean, organized table
- Edit existing member information
- Add new members
- Import member data from CSV files
- Responsive design for all screen sizes

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with:
   ```
   DATABASE_URL="file:./dev.db"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Import CSV data:
   - CSV files are placed in the `data` directory:
     - `data/Members1.csv`
     - `data/Members2.csv`
   - Run the import script:
     ```bash
     npx ts-node scripts/import-csv.ts
     ```

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## CSV File Format

The import script expects CSV files with the following columns:
- FirstName
- LastName
- Email (optional)
- MobilePhone (optional)
- Address (optional)

## Development

- `src/app/` - Next.js app router pages and API routes
- `src/components/` - React components
- `src/lib/` - Utility functions and database client
- `prisma/` - Database schema and migrations
- `scripts/` - Data import and utility scripts

## License

MIT
