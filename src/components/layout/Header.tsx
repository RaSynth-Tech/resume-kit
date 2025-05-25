import Link from 'next/link';
import { FaFileAlt } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <FaFileAlt className="h-8 w-8 text-gray-900" />
              <span className="text-xl font-bold text-gray-900">ResumeKit</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              href="/tailor"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Create Resume
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 