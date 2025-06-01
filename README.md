# CPT Example Project

A Next.js application demonstrating member data management with PostgreSQL, Prisma, and CSV import functionality. View the live demo at [https://cptapp.netlify.app](https://cptapp.netlify.app).

## 🚀 Features

- ✨ Modern UI with Tailwind CSS
- 📊 Member data visualization
- 🔍 Advanced search and filtering
- 📱 Responsive design
- 🗃️ CSV data import functionality
- 🔒 PostgreSQL database integration

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
