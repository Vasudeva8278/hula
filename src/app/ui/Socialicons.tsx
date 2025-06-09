'use client';

import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export const Socialicons = () => (
  <div className="flex gap-4">
    <Button
      variant="outline"
      asChild
      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
    >
      <a
        href="https://github.com/Vasudeva8278"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2"
      >
        <FaGithub size={20} />
        Github
      </a>
    </Button>

    <Button
      variant="outline"
      asChild
      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
    >
      <a
        href="https://www.linkedin.com/in/vasudeva-rao-sanchapu-a21107198/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2"
      >
        <FaLinkedin size={20} />
        LinkedIn
      </a>
    </Button>
  </div>
);
