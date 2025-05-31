import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#181828] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span className="inline-block">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="36" rx="8" fill="url(#paint0_linear)"/>
                  <path d="M12 24L24 12M12 12L24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FF6B00"/>
                      <stop offset="0.5" stopColor="#FFB800"/>
                      <stop offset="1" stopColor="#6C38FF"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-100 to-purple-200 drop-shadow-sm tracking-tight">ResumeKit</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="text-white/90 hover:text-yellow-200 px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              href="/tailor"
              className="text-white/90 hover:text-yellow-200 px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200"
            >
              Create Resume
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 