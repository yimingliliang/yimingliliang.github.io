<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>AI导航网站地图 - 精选优质AI工具和资源导航</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style type="text/css">
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #333;
            background: #f8f9fa;
            line-height: 1.6;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
          }
          .header {
            background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
            padding: 30px;
            color: white;
            border-radius: 12px;
            margin-bottom: 30px;
            box-shadow: 0 4px 6px rgba(13, 110, 253, 0.1);
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
          }
          .header p {
            margin-top: 10px;
            opacity: 0.9;
            font-size: 16px;
          }
          .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
          }
          .stat-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          }
          .stat-value {
            font-size: 24px;
            font-weight: 600;
            color: #0d6efd;
            margin-bottom: 5px;
          }
          .stat-label {
            color: #6c757d;
            font-size: 14px;
          }
          table {
            width: 100%;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            margin-bottom: 30px;
          }
          th {
            background: #f8f9fa;
            padding: 16px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
            color: #495057;
            border-bottom: 2px solid #e9ecef;
          }
          td {
            padding: 16px;
            border-bottom: 1px solid #e9ecef;
            font-size: 14px;
            vertical-align: middle;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover td {
            background: #f8f9fa;
          }
          a {
            color: #0d6efd;
            text-decoration: none;
            transition: color 0.2s;
          }
          a:hover {
            color: #0a58ca;
            text-decoration: underline;
          }
          .priority-high {
            color: #198754;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 4px;
          }
          .priority-medium {
            color: #ffc107;
            font-weight: 600;
          }
          .priority-low {
            color: #dc3545;
            font-weight: 600;
          }
          .changefreq {
            display: inline-flex;
            align-items: center;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
            background: #e9ecef;
            color: #495057;
          }
          .lastmod {
            color: #6c757d;
            font-size: 13px;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #6c757d;
            font-size: 14px;
          }
          @media (max-width: 768px) {
            body {
              padding: 10px;
            }
            .header {
              padding: 20px;
            }
            .header h1 {
              font-size: 24px;
            }
            td, th {
              padding: 12px;
            }
            .url-cell {
              max-width: 200px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>AI导航网站地图</h1>
          <p>发现和使用最优质的AI工具，覆盖AI绘画、写作、编程、设计等领域</p>
        </div>
        
        <div class="stats">
          <div class="stat-card">
            <div class="stat-value">
              <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
            </div>
            <div class="stat-label">总页面数</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">
              <xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:changefreq='daily'])"/>
            </div>
            <div class="stat-label">每日更新页面</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">
              <xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority>=0.9])"/>
            </div>
            <div class="stat-label">重要页面</div>
          </div>
        </div>

        <table>
          <tr>
            <th>URL</th>
            <th>最后更新</th>
            <th>更新频率</th>
            <th>优先级</th>
          </tr>
          <xsl:for-each select="sitemap:urlset/sitemap:url">
            <tr>
              <td class="url-cell">
                <a href="{sitemap:loc}" target="_blank">
                  <xsl:value-of select="sitemap:loc"/>
                </a>
              </td>
              <td class="lastmod">
                <xsl:value-of select="substring(sitemap:lastmod, 0, 11)"/>
              </td>
              <td>
                <span class="changefreq">
                  <xsl:value-of select="sitemap:changefreq"/>
                </span>
              </td>
              <td>
                <xsl:choose>
                  <xsl:when test="sitemap:priority &gt;= 0.9">
                    <span class="priority-high">
                      <xsl:value-of select="sitemap:priority"/>
                    </span>
                  </xsl:when>
                  <xsl:when test="sitemap:priority &gt;= 0.5">
                    <span class="priority-medium">
                      <xsl:value-of select="sitemap:priority"/>
                    </span>
                  </xsl:when>
                  <xsl:otherwise>
                    <span class="priority-low">
                      <xsl:value-of select="sitemap:priority"/>
                    </span>
                  </xsl:otherwise>
                </xsl:choose>
              </td>
            </tr>
          </xsl:for-each>
        </table>

        <div class="footer">
          <p>© 2024 AI导航 - 精选优质AI工具和资源导航</p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet> 