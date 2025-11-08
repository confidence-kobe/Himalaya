/**
 * Service Worker for Tibetan Typing Practice
 * Version: 1.0.0
 *
 * Features:
 * - Offline-first caching strategy
 * - Smart cache invalidation
 * - Network race with cache fallback
 * - Background sync support
 * - Push notifications support
 */

// Version and Cache Names
const VERSION = '1.0.0';
const CACHE_NAME = `tibetan-typing-v${VERSION}`;
const CACHE_URLS = {
    APP_SHELL: `${CACHE_NAME}-shell`,
    CONTENT: `${CACHE_NAME}-content`,
    FONTS: `${CACHE_NAME}-fonts`,
    IMAGES: `${CACHE_NAME}-images`
};

// Assets to cache on install
const ASSETS_TO_CACHE = {
    shell: [
        './',
        './index.html',
        './style.css',
        './app.js',
        './manifest.json'
    ],
    fonts: [
        'https://fonts.googleapis.com/css2?family=Noto+Serif+Tibetan:wght@400;700&display=swap'
    ],
    images: [
        './icon-192.png',
        './icon-512.png'
    ]
};

// Cache timeout (in milliseconds)
const CACHE_TIMEOUT = 3000;

// ========================================
// Install Event
// ========================================
self.addEventListener('install', (event) => {
    console.log(`[ServiceWorker v${VERSION}] Installing...`);

    event.waitUntil(
        Promise.all([
            // Cache app shell
            caches.open(CACHE_URLS.APP_SHELL)
                .then(cache => {
                    console.log('[ServiceWorker] Caching app shell');
                    return cache.addAll(ASSETS_TO_CACHE.shell);
                }),

            // Cache fonts
            caches.open(CACHE_URLS.FONTS)
                .then(cache => {
                    console.log('[ServiceWorker] Caching fonts');
                    return cache.addAll(ASSETS_TO_CACHE.fonts);
                }),

            // Cache images
            caches.open(CACHE_URLS.IMAGES)
                .then(cache => {
                    console.log('[ServiceWorker] Caching images');
                    return cache.addAll(ASSETS_TO_CACHE.images);
                })
        ])
        .then(() => {
            console.log('[ServiceWorker] Installation complete');
            return self.skipWaiting();
        })
        .catch(error => {
            console.error('[ServiceWorker] Installation failed:', error);
            // Don't prevent installation, some caches might have succeeded
        })
    );
});

// ========================================
// Activate Event
// ========================================
self.addEventListener('activate', (event) => {
    console.log(`[ServiceWorker v${VERSION}] Activating...`);

    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                // Delete old caches
                const currentCaches = Object.values(CACHE_URLS);
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (!currentCaches.includes(cacheName)) {
                            console.log('[ServiceWorker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[ServiceWorker] Activation complete');
                return self.clients.claim();
            })
            .catch(error => {
                console.error('[ServiceWorker] Activation error:', error);
            })
    );
});

// ========================================
// Fetch Event - Smart Caching Strategy
// ========================================
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip chrome-extension and other non-http(s) requests
    if (!url.protocol.startsWith('http')) {
        return;
    }

    // Choose strategy based on request type
    if (isAppShellRequest(url)) {
        event.respondWith(cacheFirst(request, CACHE_URLS.APP_SHELL));
    } else if (isFontRequest(url)) {
        event.respondWith(cacheFirst(request, CACHE_URLS.FONTS));
    } else if (isImageRequest(url)) {
        event.respondWith(cacheFirst(request, CACHE_URLS.IMAGES));
    } else {
        event.respondWith(networkFirst(request, CACHE_URLS.CONTENT));
    }
});

// ========================================
// Caching Strategies
// ========================================

/**
 * Cache First Strategy - Try cache, fallback to network
 * Best for: App shell, fonts, images
 */
async function cacheFirst(request, cacheName) {
    try {
        // Try cache first
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        // Fallback to network
        const networkResponse = await fetch(request);

        // Cache the new response
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.error('[ServiceWorker] Cache-first failed:', error);
        return offlineResponse(request);
    }
}

/**
 * Network First Strategy - Try network with timeout, fallback to cache
 * Best for: Dynamic content
 */
async function networkFirst(request, cacheName) {
    try {
        // Race network request with timeout
        const networkResponse = await Promise.race([
            fetch(request),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout')), CACHE_TIMEOUT)
            )
        ]);

        // Cache successful response
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        // Fallback to cache
        console.log('[ServiceWorker] Network failed, using cache:', error.message);
        const cachedResponse = await caches.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        return offlineResponse(request);
    }
}

/**
 * Generate offline response
 */
function offlineResponse(request) {
    const url = new URL(request.url);

    // For HTML requests, return offline page
    if (request.headers.get('accept').includes('text/html')) {
        return new Response(
            `<!DOCTYPE html>
            <html lang="zh-CN">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>离线 - 藏文打字练习</title>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        margin: 0;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        text-align: center;
                        padding: 20px;
                    }
                    .offline-content {
                        max-width: 500px;
                    }
                    h1 { font-size: 3rem; margin: 0 0 1rem; }
                    p { font-size: 1.2rem; margin: 1rem 0; }
                    .btn {
                        background: white;
                        color: #667eea;
                        border: none;
                        padding: 12px 30px;
                        font-size: 1rem;
                        border-radius: 8px;
                        cursor: pointer;
                        margin-top: 2rem;
                    }
                </style>
            </head>
            <body>
                <div class="offline-content">
                    <h1>📵</h1>
                    <h2>您当前处于离线状态</h2>
                    <p>无法连接到网络，但您可以继续使用已缓存的内容。</p>
                    <p>བཀྲ་ཤིས་བདེ་ལེགས།</p>
                    <button class="btn" onclick="location.reload()">重新加载</button>
                </div>
            </body>
            </html>`,
            {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({
                    'Content-Type': 'text/html; charset=utf-8'
                })
            }
        );
    }

    // For other requests
    return new Response('Offline', {
        status: 503,
        statusText: 'Service Unavailable'
    });
}

// ========================================
// Helper Functions
// ========================================

/**
 * Check if request is for app shell
 */
function isAppShellRequest(url) {
    const shellPaths = ['/', '/index.html', '/style.css', '/app.js', '/manifest.json'];
    return shellPaths.some(path => url.pathname.endsWith(path));
}

/**
 * Check if request is for fonts
 */
function isFontRequest(url) {
    return url.hostname === 'fonts.googleapis.com' ||
           url.hostname === 'fonts.gstatic.com' ||
           /\.(woff2?|ttf|otf|eot)$/i.test(url.pathname);
}

/**
 * Check if request is for images
 */
function isImageRequest(url) {
    return /\.(png|jpg|jpeg|gif|svg|ico|webp)$/i.test(url.pathname);
}

// ========================================
// Background Sync
// ========================================
self.addEventListener('sync', (event) => {
    console.log('[ServiceWorker] Sync event:', event.tag);

    if (event.tag === 'sync-practice-data') {
        event.waitUntil(syncPracticeData());
    }
});

/**
 * Sync practice data to server (future feature)
 */
async function syncPracticeData() {
    try {
        console.log('[ServiceWorker] Syncing practice data...');
        // TODO: Implement data sync when backend is available
        return Promise.resolve();
    } catch (error) {
        console.error('[ServiceWorker] Sync failed:', error);
        throw error; // Retry on failure
    }
}

// ========================================
// Push Notifications
// ========================================
self.addEventListener('push', (event) => {
    console.log('[ServiceWorker] Push received');

    const data = event.data ? event.data.json() : {};
    const title = data.title || '藏文打字练习';
    const options = {
        body: data.body || '继续您的藏文打字练习！',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        vibrate: [100, 50, 100],
        data: {
            url: data.url || '/',
            dateOfArrival: Date.now()
        },
        actions: [
            {
                action: 'open',
                title: '开始练习'
            },
            {
                action: 'close',
                title: '稍后'
            }
        ],
        requireInteraction: false,
        tag: 'tibetan-typing-reminder'
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

/**
 * Handle notification click
 */
self.addEventListener('notificationclick', (event) => {
    console.log('[ServiceWorker] Notification clicked:', event.action);

    event.notification.close();

    if (event.action === 'open' || !event.action) {
        event.waitUntil(
            clients.matchAll({ type: 'window', includeUncontrolled: true })
                .then(clientList => {
                    // Focus existing window if available
                    for (const client of clientList) {
                        if (client.url === '/' && 'focus' in client) {
                            return client.focus();
                        }
                    }
                    // Open new window
                    if (clients.openWindow) {
                        return clients.openWindow('/');
                    }
                })
        );
    }
});

// ========================================
// Message Handler
// ========================================
self.addEventListener('message', (event) => {
    console.log('[ServiceWorker] Message received:', event.data);

    if (event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: VERSION });
    }

    if (event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys()
                .then(cacheNames => {
                    return Promise.all(
                        cacheNames.map(cacheName => caches.delete(cacheName))
                    );
                })
                .then(() => {
                    event.ports[0].postMessage({ success: true });
                })
        );
    }
});

// ========================================
// Error Handler
// ========================================
self.addEventListener('error', (event) => {
    console.error('[ServiceWorker] Error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
    console.error('[ServiceWorker] Unhandled rejection:', event.reason);
});

// Log Service Worker registration
console.log(`[ServiceWorker v${VERSION}] Registered successfully`);
