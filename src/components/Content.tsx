import { Category, Site } from '../types';
import './Content.css';
import { useState } from 'react';

interface ContentProps {
  categories: Category[];
}

function Content({ categories }: ContentProps) {
  const totalSites = categories.reduce(
    (total, category) => total + category.sites.length, 
    0
  );

  // 记录加载失败的图标
  const [failedIcons, setFailedIcons] = useState<Set<string>>(new Set());
  
  const handleIconError = (iconUrl: string) => {
    setFailedIcons(prev => new Set(prev).add(iconUrl));
  };

  const defaultIcon = (
    <svg 
      className="site-icon"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  );

  const renderIcon = (site: Site) => {
    // 如果图标已经失败过或没有图标，使用默认SVG图标
    if (!site.icon || failedIcons.has(site.icon)) {
      return defaultIcon;
    }

    return (
      <img 
        src={site.icon}
        alt={site.title}
        className="site-icon"
        onError={() => handleIconError(site.icon!)}
        loading="lazy"
      />
    );
  };

  const renderCategoryIcon = (category: Category) => {
    if (category.icon) {
      return (
        <svg className="category-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d={category.icon} />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="content">
      <div className="sites-container">
        {categories.map(category => (
          <section 
            key={category.id} 
            className="category-section"
            data-category-id={category.id}
          >
            <div className="category-header">
              {renderCategoryIcon(category)}
              <h2>{category.name}</h2>
            </div>
            <div className="sites-grid">
              {category.sites.map((site, index) => (
                <a 
                  key={index}
                  href={site.url}
                  className="site-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="site-header">
                    {renderIcon(site)}
                    <h3 className="site-title">{site.title}</h3>
                  </div>
                  {site.description && <p className="site-description">{site.description}</p>}
                  {site.tags && site.tags.length > 0 && (
                    <div className="site-tags">
                      {site.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="site-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="content-bottom">
        <div className="announcement">
          <h3>公告</h3>
          <p>欢迎投稿优质站点，请通过 <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">GitHub</a> 提交 PR 或 Issue</p>
        </div>
        <div className="site-stats">
          <div className="stat-item">
            <span className="stat-value">{categories.length}</span>
            <span className="stat-label">分类数量</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{totalSites}</span>
            <span className="stat-label">站点总数</span>
          </div>
        </div>
        <footer className="site-footer">
          <div className="footer-links">
            <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span className="divider">|</span>
            <a href="/about">关于我们</a>
            <span className="divider">|</span>
            <a href="/feedback">问题反馈</a>
          </div>
          <div className="footer-info">
            <p>© 2024 导航站点 All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Content; 