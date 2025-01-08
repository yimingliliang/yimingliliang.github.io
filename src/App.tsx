import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import { Category } from './types';
import './App.css';
import sitesData from './data/sites.json';

function App() {
  const [categories, setCategories] = useState<Category[]>(sitesData.categories);
  const [activeCategory, setActiveCategory] = useState<string>('');

  // 初始化时设置第一个分类为选中状态
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, []);

  // 搜索处理函数
  const handleSearch = (keyword: string) => {
    if (!keyword.trim()) {
      setCategories(sitesData.categories);
      return;
    }

    const filteredCategories = sitesData.categories.map(category => ({
      ...category,
      sites: category.sites.filter(site => 
        site.title.toLowerCase().includes(keyword.toLowerCase()) ||
        site.description?.toLowerCase().includes(keyword.toLowerCase()) ||
        site.tags?.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
      )
    })).filter(category => category.sites.length > 0);

    setCategories(filteredCategories);
    
    // 设置第一个有结果的分类为选中状态
    if (filteredCategories.length > 0) {
      setActiveCategory(filteredCategories[0].id);
      // 滚动到第一个分类
      const element = document.querySelector(`[data-category-id="${filteredCategories[0].id}"]`);
      if (element) {
        const headerOffset = 84;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // 监听滚动，更新当前分类
  const updateActiveCategory = () => {
    const categoryElements = document.querySelectorAll('.category-section');
    const headerOffset = 84; // 与点击滚动使用相同的偏移量

    categoryElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top <= headerOffset && rect.bottom >= headerOffset) {
        setActiveCategory((element as HTMLElement).dataset.categoryId || '');
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', updateActiveCategory);
    return () => window.removeEventListener('scroll', updateActiveCategory);
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    const element = document.querySelector(`[data-category-id="${categoryId}"]`);
    if (element) {
      const headerOffset = 84;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      <main className="main-content">
        <Sidebar 
          categories={categories} 
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />
        <Content categories={categories} />
      </main>
    </div>
  );
}

export default App;
