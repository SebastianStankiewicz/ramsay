module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "chunks/ff7e4_8c95fc7c._.js",
  "chunks/[root-of-the-server]__92fd71e1._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];