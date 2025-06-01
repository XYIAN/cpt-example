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
- **PrimeReact** - UI Component Library

## Prerequisites

- Node.js 18+ and npm
- Git

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd class-action-lawsuit-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Create a .env file in the root directory
   echo 'DATABASE_URL="file:./prisma/dev.db"' > .env
   ```

4. Set up the database and generate Prisma client:
   ```bash
   # Generate Prisma Client
   npx prisma generate

   # Create database and run migrations
   npx prisma migrate dev

   # (Optional) Open Prisma Studio to view/edit data
   npx prisma studio
   ```

5. Import sample data (if available):
   - Ensure CSV files are placed in the `data` directory:
     - `data/Members1.csv`
     - `data/Members2.csv`
   - Run the import script:
     ```bash
     # Run with ts-node and ESM support
     NODE_OPTIONS='--loader ts-node/esm' npx ts-node --esm scripts/import-csv.ts
     ```

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development Tools

- **Prisma Studio**: Access the database GUI
  ```bash
  npx prisma studio
  ```
  This will open a browser window at [http://localhost:5555](http://localhost:5555)

- **Type Generation**: After making changes to the Prisma schema
  ```bash
  npx prisma generate
  ```

- **Database Migrations**: After modifying the schema
  ```bash
  npx prisma migrate dev --name <migration-name>
  ```

## Project Structure

```
├── data/                  # CSV data files
├── prisma/               
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Database migrations
├── scripts/
│   └── import-csv.ts     # Data import script
├── src/
│   ├── app/             # Next.js app router pages
│   ├── components/      # React components
│   ├── contexts/        # React contexts
│   └── lib/            # Utility functions and shared code
```

## Data Import Format

The application supports importing member data from CSV files with different structures:

### Members1.csv Format:
- Required fields: FirstName, LastName
- Optional fields: Email, HomePhone, MobilePhone, Address1, Address2, City, State, Zip, Zip4
- Specific fields: ProductName, DatePurchased, PaidAmount

### Members2.csv Format:
- Required fields: FirstName, LastName
- Optional fields: Email, HomePhone, MobilePhone, Address1, Address2, City, State, Zip, Zip4
- Specific fields: CoveredWeeks, LastStateWorked

## Troubleshooting

1. **Database Issues**:
   - If you encounter database errors, try:
     ```bash
     npx prisma migrate reset  # Reset the database
     npx prisma generate      # Regenerate Prisma Client
     ```
   - Then re-run the data import script

2. **Import Script Errors**:
   - Ensure CSV files are in the correct format
   - Check file permissions
   - Verify CSV column names match the expected format

## Author

**Kyle Dilbeck**  
GitHub: [https://github.com/xyian](https://github.com/xyian)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
