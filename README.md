# Digital Library

A modern digital library website with AI-powered features, inspired by the Dubai Public Library.

## Features

- Book listings with availability indicators (EBook, Physical, Audio)
- NLP search for natural language queries
- Interactive book chat for discussions about book content
- Mood-based book recommendations
- Admin/librarian dashboard for book management
- User authentication with multiple roles

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, DaisyUI
- **Backend**: Supabase for authentication and database
- **AI**: OpenAI integration for NLP features
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mustapha-softhub/digital-library.git
cd digital-library
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your environment variables:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
OPENAI_API_KEY=your-openai-api-key
NEXT_PUBLIC_APP_NAME="Digital Library"
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

1. Create a new project in Supabase
2. Run the SQL queries in `database-schema.md` to set up the tables and relationships
3. Set up authentication providers in the Supabase dashboard

## Deployment

This project is configured for deployment on Netlify:

1. Connect your GitHub repository to Netlify
2. Set the build command to `npm run build`
3. Set the publish directory to `.next`
4. Add your environment variables in the Netlify dashboard

## License

This project is licensed under the MIT License - see the LICENSE file for details.
