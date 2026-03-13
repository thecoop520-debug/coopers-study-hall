import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";
import cors from "cors";
import * as cheerio from "cheerio";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Proxy Route
  app.get("/api/proxy", async (req, res) => {
    const targetUrl = req.query.url as string;
    
    if (!targetUrl) {
      return res.status(400).json({ error: "URL is required" });
    }

    const maxRetries = 2;
    let attempts = 0;

    const fetchWithRetry = async (): Promise<any> => {
      try {
        const response = await axios.get(targetUrl, {
          responseType: 'arraybuffer',
          timeout: 15000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
          },
          validateStatus: (status) => status < 500
        });
        return response;
      } catch (error: any) {
        if (attempts < maxRetries && (error.response?.status === 503 || error.code === 'ECONNABORTED' || !error.response)) {
          attempts++;
          await new Promise(resolve => setTimeout(resolve, attempts * 1000));
          return fetchWithRetry();
        }
        throw error;
      }
    };

    try {
      const response = await fetchWithRetry();
      const finalUrl = response.request.res.responseUrl || targetUrl;
      const urlObj = new URL(finalUrl);
      const baseUrl = `${urlObj.protocol}//${urlObj.host}`;

      if (response.status >= 400) {
        return res.status(response.status).send(response.data);
      }

      const contentType = response.headers['content-type'] || '';
      res.set('Content-Type', contentType);

      if (contentType.includes('text/html')) {
        let html = response.data.toString();
        const $ = cheerio.load(html);

        // Rewrite URLs in HTML
        const rewriteUrl = (url: string | undefined) => {
          if (!url || url.startsWith('data:') || url.startsWith('javascript:') || url.startsWith('#')) return url;
          
          try {
            // Handle protocol-relative URLs
            let target = url;
            if (target.startsWith('//')) {
              target = urlObj.protocol + target;
            }
            
            const absoluteUrl = new URL(target, finalUrl).href;
            if (absoluteUrl.startsWith('http')) {
              return `/api/proxy?url=${encodeURIComponent(absoluteUrl)}`;
            }
          } catch (e) {}
          return url;
        };

        const rewriteSrcset = (srcset: string | undefined) => {
          if (!srcset) return srcset;
          return srcset.split(',').map(part => {
            const [url, size] = part.trim().split(/\s+/);
            return `${rewriteUrl(url)}${size ? ' ' + size : ''}`;
          }).join(', ');
        };

        $('a, link, area').each((_, el) => {
          $(el).attr('href', rewriteUrl($(el).attr('href')));
        });

        $('img, script, iframe, source, video, audio, embed, object').each((_, el) => {
          $(el).attr('src', rewriteUrl($(el).attr('src')));
          if ($(el).attr('srcset')) {
            $(el).attr('srcset', rewriteSrcset($(el).attr('srcset')));
          }
        });

        $('[data-href], [data-src], [data-url]').each((_, el) => {
          if ($(el).attr('data-href')) $(el).attr('data-href', rewriteUrl($(el).attr('data-href')));
          if ($(el).attr('data-src')) $(el).attr('data-src', rewriteUrl($(el).attr('data-src')));
          if ($(el).attr('data-url')) $(el).attr('data-url', rewriteUrl($(el).attr('data-url')));
        });

        $('form').each((_, el) => {
          $(el).attr('action', rewriteUrl($(el).attr('action')));
        });

        // Inject a more robust script to catch dynamic navigations and fix relative paths
        $('head').prepend(`
          <base href="${finalUrl}">
          <script>
            (function() {
              const originalFetch = window.fetch;
              window.fetch = function(input, init) {
                if (typeof input === 'string' && !input.startsWith('http') && !input.startsWith('/api/proxy')) {
                  const url = new URL(input, "${finalUrl}").href;
                  input = "/api/proxy?url=" + encodeURIComponent(url);
                }
                return originalFetch.call(this, input, init);
              };

              const originalOpen = XMLHttpRequest.prototype.open;
              XMLHttpRequest.prototype.open = function(method, url) {
                if (typeof url === 'string' && !url.startsWith('http') && !url.startsWith('/api/proxy')) {
                  const absUrl = new URL(url, "${finalUrl}").href;
                  url = "/api/proxy?url=" + encodeURIComponent(absUrl);
                }
                return originalOpen.apply(this, arguments);
              };

              // Intercept link clicks that might have been missed or added dynamically
              document.addEventListener('click', (e) => {
                const link = e.target.closest('a');
                if (link && link.href && !link.href.includes('/api/proxy') && link.href.startsWith('http')) {
                  e.preventDefault();
                  window.location.href = "/api/proxy?url=" + encodeURIComponent(link.href);
                }
              }, true);
            })();
          </script>
        `);

        return res.send($.html());
      }

      res.send(response.data);
    } catch (error: any) {
      const statusCode = error.response?.status || 500;
      res.status(statusCode).json({ error: "Proxy Error", details: error.message });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
