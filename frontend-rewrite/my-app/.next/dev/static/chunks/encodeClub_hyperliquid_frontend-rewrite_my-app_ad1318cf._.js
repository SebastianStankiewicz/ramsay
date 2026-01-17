(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/node_modules/next/navigation.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Home() {
    _s();
    const [showOnboarding, setShowOnBoarding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [onboardingStage, setOnBoardingStage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    if (showOnboarding) {
        router.push(`/onboarding/${1}/`);
    } else {
        router.push('/dashboard');
    }
}
_s(Home, "NnSW8OafUp+MJY5zRRRhcWCm99c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=encodeClub_hyperliquid_frontend-rewrite_my-app_ad1318cf._.js.map