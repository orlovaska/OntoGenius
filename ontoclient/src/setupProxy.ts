import { Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function setupProxy(app: Express) {
    app.use(
        '/api',
        createProxyMiddleware({
            //target: process.env.REACT_APP_PROXY_TARGET as string,
            target: "http://localhost:5077/",
            changeOrigin: true,
        })
    );
}
