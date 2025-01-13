import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import { Category } from './types';
import './App.css';
import { decrypt } from './utils/crypto';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');

  // 加载数据
  useEffect(() => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (isDevelopment) {
      // 开发环境直接加载源文件
      import('./data/sites.json')
        .then(data => {
          setCategories(data.categories);
          if (data.categories.length > 0) {
            setActiveCategory(data.categories[0].id);
          }
        })
        .catch(console.error);
    } else {
      // 生产环境加载加密文件
      fetch('/sites.encrypted.json')
        .then(res => {
          return res.text();
        })
        .then(encryptedData => {
          const decryptedData = decrypt(encryptedData);
          setCategories(decryptedData.categories);
          if (decryptedData.categories.length > 0) {
            setActiveCategory(decryptedData.categories[0].id);
          }
        })
        .catch(console.error);
    }
  }, []);

  // 搜索处理函数
  const handleSearch = (keyword: string) => {
    if (!keyword.trim()) {
      const isDevelopment = process.env.NODE_ENV === 'development';
      
      if (isDevelopment) {
        import('./data/sites.json')
          .then(data => {
            setCategories(data.categories);
          })
          .catch(console.error);
      } else {
        fetch('/sites.encrypted.json')
          .then(res => res.text())
          .then(encryptedData => {
            const decryptedData = decrypt(encryptedData);
            setCategories(decryptedData.categories);
          })
          .catch(console.error);
      }
      return;
    }

    const filteredCategories = categories.map(category => ({
      ...category,
      sites: category.sites.filter(site => 
        site.title.toLowerCase().includes(keyword.toLowerCase()) ||
        site.description?.toLowerCase().includes(keyword.toLowerCase()) ||
        site.tags?.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
      )
    })).filter(category => category.sites.length > 0);

    setCategories(filteredCategories);
    
    if (filteredCategories.length > 0) {
      setActiveCategory(filteredCategories[0].id);
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
    const headerOffset = 84;

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
      <Analytics />
    </div>
  );
}

export default App;
