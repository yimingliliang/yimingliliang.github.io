import { useState } from 'react';
import './Header.css';

interface HeaderProps {
  onSearch: (keyword: string) => void;
}

function Header({ onSearch }: HeaderProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <header className="header">
      <a href="/" className="logo">
        <svg viewBox="0 0 40 32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="20" cy="16" r="15" 
                  className="animate-path"
                  strokeLinecap="round" />
          <path d="M12 26L18 6l6 20" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="animate-path" />
          <path d="M14 19h8" 
                strokeLinecap="round"
                className="animate-path" />
          <path d="M26 6v20" 
                strokeLinecap="round"
                className="animate-path" />
          <circle cx="18" cy="6" r="1.5" className="animate-dot" />
          <circle cx="26" cy="6" r="1.5" className="animate-dot" />
          <circle cx="26" cy="26" r="1.5" className="animate-dot" />
        </svg>
        <span className="logo-text">导航</span>
      </a>
      
      <div className="search-box">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="搜索站点..."
          value={searchValue}
          onChange={handleSearch}
        />
      </div>

      <div className="header-right">
        <a href="https://github.com/gly-hub/ai-nav-site" className="header-link" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          GitHub
        </a>
        <a href="/about" className="header-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          关于
        </a>
      </div>
    </header>
  );
}

export default Header; 