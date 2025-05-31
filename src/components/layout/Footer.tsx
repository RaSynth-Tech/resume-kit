import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#181828] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">ResumeKit</h3>
            <p className="text-gray-400 text-sm">
              Create professional resumes tailored to your dream job. Our AI-powered platform helps you craft the perfect resume that stands out to employers.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-orange-400 hover:text-purple-400 text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/tailor" className="text-orange-400 hover:text-purple-400 text-sm">
                  Create Resume
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-orange-400 hover:text-purple-400 text-sm">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-purple-400">
                <FaGithub className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-purple-400">
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-purple-400">
                <FaTwitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} ResumeKit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 