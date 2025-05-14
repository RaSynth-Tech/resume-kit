# ResumeKit - AI-Powered Resume Tailoring

ResumeKit is a modern web application that helps job seekers tailor their resumes for specific job descriptions using AI. Built with Next.js, React, and Tailwind CSS.

## Features

- AI-powered resume tailoring
- Real-time editing and preview
- PDF export (coming soon)
- Modern, responsive design
- Secure authentication with Supabase

## Tech Stack

- Next.js 15.3.2 with App Router
- React 19
- Tailwind CSS v4
- TypeScript
- Supabase (Auth & Storage)
- OpenAI API
- Razorpay (Payments)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/resume-kit.git
cd resume-kit
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/src
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── lib/             # External service integrations
├── utils/           # Utility functions and constants
├── types/           # TypeScript type definitions
└── styles/          # Global styles and Tailwind config
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 