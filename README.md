# CPT Example Project

A modern, full-stack Next.js application showcasing best practices in web development through a member management system. Built with scalability and user experience in mind, this application demonstrates efficient CRUD operations, responsive design, and seamless data handling.

## 💫 Overview

This project serves as a practical example of:

- **Robust Data Management**: Full CRUD operations with real-time updates and optimistic UI
- **Modern Architecture**: Server-side rendering with Next.js 13+ App Router
- **Scalable Database**: PostgreSQL integration via Neon's serverless platform
- **Type Safety**: End-to-end type safety with TypeScript and Prisma ORM
- **Responsive Design**: Mobile-first approach using Tailwind CSS and modern UI components
- **Data Import**: Efficient bulk data handling through CSV import functionality

View the live demo at [https://cptapp.netlify.app](https://cptapp.netlify.app)

## 🎯 Key Features

- ✨ **Intuitive Interface**
  - Clean, modern UI with responsive design
  - Dark/light mode support
  - Accessible components following WCAG guidelines
  - Interactive data tables with sorting and filtering

- 🔍 **Advanced Search Capabilities**
  - Real-time search with debouncing
  - Multiple filter combinations
  - Sortable columns
  - Pagination for large datasets

- 📊 **Data Management**
  - Create, read, update, and delete member records
  - Bulk import via CSV files
  - Data validation and error handling
  - Optimistic updates for better UX

- 🏗️ **Scalable Architecture**
  - Serverless PostgreSQL database
  - Connection pooling for optimal performance
  - API rate limiting
  - Efficient caching strategies

## 🚀 Technical Stack

- **Frontend**
  - Next.js 13+ with App Router
  - React Server Components
  - TailwindCSS for styling
  - TypeScript for type safety
  - PrimeReact UI components

- **Backend**
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL (Neon)
  - CSV parsing and validation
  - Zod schema validation

- **Infrastructure**
  - Netlify Edge Functions
  - Serverless PostgreSQL
  - Connection pooling
  - GitHub Actions CI/CD
  - Environment variable management

## 📋 Prerequisites

| Requirement | Version |
|------------|---------|
| Node.js    | >= 18.0.0 |
| npm        | >= 9.0.0  |
| PostgreSQL | >= 14.0.0 |

## 🛠️ Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/XYIAN/cpt-example.git
   cd cpt-example
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your database**
   - Create a free account at [Neon.tech](https://neon.tech)
   - Create a new project and get your database connection string
   - Create a `.env` file in the project root and add your database URL:
     ```env
     DATABASE_URL="your-neon-database-url-here"
     ```

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Import sample data**
   ```bash
   npx ts-node scripts/import-csv.ts
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
cpt-example/
├── app/                  # Next.js app directory
├── components/          # React components
├── lib/                 # Utility functions and configurations
├── prisma/             # Prisma schema and migrations
├── public/             # Static assets
├── scripts/            # Data import scripts
└── styles/             # CSS styles
```

## 🔄 Data Import

The application comes with two sample CSV files in the `data/` directory:
- `Members1.csv`: Contains basic member information and purchase data
- `Members2.csv`: Contains additional member details and coverage information

To import new data:
1. Place your CSV files in the `data/` directory
2. Update the import script if your CSV structure differs
3. Run the import command:
   ```bash
   npx ts-node scripts/import-csv.ts
   ```

## 🚀 Deployment

This project is configured for deployment on Netlify:

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add the following environment variables in Netlify:
   - `DATABASE_URL`: Your Neon database connection string
   - `NEXT_USE_NETLIFY_EDGE`: true

## 📝 API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/members` | GET | Fetch all members with pagination |
| `/api/members/search` | GET | Search members by name/email |
| `/api/members/:id` | GET | Get specific member details |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- Netlify for hosting
- Neon for the serverless PostgreSQL database

---
Built with ❤️ by [Kyle Dilbeck](https://github.com/xyian)
