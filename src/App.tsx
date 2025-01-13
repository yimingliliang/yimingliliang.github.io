import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import { Category } from './types';
import './App.css';
import { decrypt } from './utils/crypto';
import { Analytics } from '@vercel/analytics/react';
import { 
  isBot, 
  isAutomated, 
  checkRequestLimit, 
  disableDevTools, 
  disableCopy 
} from './utils/antiCrawler';

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');

  // 初始化反爬措施
  useEffect(() => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isAntiCrawlerEnabled = import.meta.env.VITE_ENABLE_ANTI_CRAWLER === 'true';

    if (!isDevelopment && isAntiCrawlerEnabled) {
      // 检查自动化工具
      if (isAutomated()) {
        document.body.innerHTML = '检测到自动化测试工具';
        return;
      }

      // 启用反爬措施
      disableDevTools();
      disableCopy();
    }
  }, []);

  // 加载数据
  useEffect(() => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isAntiCrawlerEnabled = import.meta.env.VITE_ENABLE_ANTI_CRAWLER === 'true';
    
    const loadData = async () => {
      try {
        // 在生产环境且启用反爬时进行检查
        if (!isDevelopment && isAntiCrawlerEnabled) {
          if (isBot()) {
            throw new Error('检测到爬虫行为');
          }

          const cooldownUntil = parseInt(localStorage.getItem('cooldown') || '0');
          if (Date.now() < cooldownUntil) {
            throw new Error('请求过于频繁，请稍后再试');
          }

          checkRequestLimit();
        }

        if (isDevelopment) {
          // 开发环境直接加载源文件
          const data = await import('./data/sites.json');
          setCategories(data.categories);
          if (data.categories.length > 0) {
            setActiveCategory(data.categories[0].id);
          }
        } else {
          // 生产环境加载加密文件
          const res = await fetch('/sites.encrypted.json');
          const encryptedData = await res.text();
          const decryptedData = decrypt(encryptedData);
          setCategories(decryptedData.categories);
          if (decryptedData.categories.length > 0) {
            setActiveCategory(decryptedData.categories[0].id);
          }
        }
      } catch (error) {
        console.error('加载数据失败:', error);
        // 可以在这里添加错误提示UI
      }
    };

    loadData();
  }, []);

  // 搜索处理函数
  const handleSearch = async (keyword: string) => {
    try {
      const isDevelopment = process.env.NODE_ENV === 'development';
      const isAntiCrawlerEnabled = import.meta.env.VITE_ENABLE_ANTI_CRAWLER === 'true';

      // 在生产环境且启用反爬时进行检查
      if (!isDevelopment && isAntiCrawlerEnabled) {
        if (isBot()) {
          throw new Error('检测到爬虫行为');
        }

        const cooldownUntil = parseInt(localStorage.getItem('cooldown') || '0');
        if (Date.now() < cooldownUntil) {
          throw new Error('请求过于频繁，请稍后再试');
        }

        checkRequestLimit();
      }

      if (!keyword.trim()) {
        if (isDevelopment) {
          const data = await import('./data/sites.json');
          setCategories(data.categories);
        } else {
          const res = await fetch('/sites.encrypted.json');
          const encryptedData = await res.text();
          const decryptedData = decrypt(encryptedData);
          setCategories(decryptedData.categories);
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
    } catch (error) {
      console.error('搜索失败:', error);
      // 可以在这里添加错误提示UI
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
