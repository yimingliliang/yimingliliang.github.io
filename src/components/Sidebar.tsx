import { Category } from '../types';
import './Sidebar.css';

interface SidebarProps {
  categories: Category[];
  activeCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

function Sidebar({ categories, activeCategory, onCategoryClick }: SidebarProps) {
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
    <aside className="sidebar">
      <nav>
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-button ${category.id === activeCategory ? 'active' : ''}`}
            onClick={() => onCategoryClick(category.id)}
            data-category={category.id}
          >
            {renderCategoryIcon(category)}
            <span>{category.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar; 