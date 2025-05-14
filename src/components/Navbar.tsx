import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">ResumeKit</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/tailor" className="btn-secondary">
              Tailor Resume
            </Link>
            <Link href="/kit" className="btn-primary">
              My Kit
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 