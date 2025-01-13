// 反爬配置
export const ANTI_CRAWLER = {
  MAX_REQUESTS: 50,
  TIME_WINDOW: 60000,
  COOLDOWN_TIME: 3600000,
};

// 检查是否为自动化测试工具
export const isAutomated = () => {
  return !!(
    // @ts-ignore
    window.webdriver ||
    // @ts-ignore
    window._phantom ||
    // @ts-ignore
    window.__nightmare ||
    // @ts-ignore
    window.callPhantom ||
    // @ts-ignore
    window._selenium ||
    // @ts-ignore
    window.buffer ||
    // @ts-ignore
    window.domAutomation ||
    // @ts-ignore
    window.domAutomationController ||
    navigator.webdriver ||
    // Selenium attributes
    document.documentElement.getAttribute('selenium') ||
    document.documentElement.getAttribute('webdriver') ||
    document.documentElement.getAttribute('driver')
  );
};

// 检查是否为爬虫
export const isBot = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return /bot|crawler|spider|crawling/i.test(userAgent);
};

// 请求频率限制
export const checkRequestLimit = () => {
  const now = Date.now();
  const requests = JSON.parse(localStorage.getItem('requests') || '[]');
  const validRequests = requests.filter((time: number) => now - time < ANTI_CRAWLER.TIME_WINDOW);
  
  if (validRequests.length >= ANTI_CRAWLER.MAX_REQUESTS) {
    const cooldownUntil = now + ANTI_CRAWLER.COOLDOWN_TIME;
    localStorage.setItem('cooldown', cooldownUntil.toString());
    throw new Error('请求过于频繁，请稍后再试');
  }

  validRequests.push(now);
  localStorage.setItem('requests', JSON.stringify(validRequests));
};

// 禁用开发者工具
export const disableDevTools = () => {
  // 检测 F12
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && e.key === 'I') ||
      (e.ctrlKey && e.shiftKey && e.key === 'J') ||
      (e.ctrlKey && e.shiftKey && e.key === 'C')
    ) {
      e.preventDefault();
    }
  });

  // 检测右键菜单
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // 检测控制台打开
  const checkDevTools = () => {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (widthThreshold || heightThreshold) {
      document.body.innerHTML = '检测到开发者工具，请关闭后刷新页面';
    }
  };

  setInterval(checkDevTools, 1000);
};

// 禁用复制
export const disableCopy = () => {
  document.addEventListener('copy', (e) => {
    e.preventDefault();
    return false;
  });
  
  document.addEventListener('cut', (e) => {
    e.preventDefault();
    return false;
  });
  
  document.addEventListener('paste', (e) => {
    e.preventDefault();
    return false;
  });

  // 禁用选择
  document.addEventListener('selectstart', (e) => {
    e.preventDefault();
    return false;
  });
}; 