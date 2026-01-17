(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__ = __turbopack_context__.i("[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/node_modules/lucide-react/dist/esm/icons/lightbulb.js [app-client] (ecmascript) <export default as Lightbulb>");
var __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function page() {
    _s();
    const [tvl, setTvl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [apr, setApr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "page.useEffect": ()=>{
            const getVaultData = {
                "page.useEffect.getVaultData": async ()=>{
                    try {
                        const response = await fetch("/api/vault", {
                            // note no trailing slash
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });
                        const d = await response.json();
                        const data = d.data[0];
                        console.log(data);
                        if (response.ok) {
                            console.log("VAULT fetched successfully:", data);
                            setApr(data.apr);
                            setTvl(data.tvl);
                        } else {
                            console.error("Failed:", data);
                        }
                    } catch (error) {
                        console.error("Error fetching vault:", error);
                    }
                }
            }["page.useEffect.getVaultData"];
            getVaultData();
        }
    }["page.useEffect"], []);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const navigateToDepositPage = ()=>router.push("/deposit");
    const navigateToSettings = ()=>router.push("/settings");
    const navigateToHelp = ()=>router.push("/help");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-black p-6 flex flex-col font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex justify-end w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: navigateToSettings,
                        className: "p-2 active:scale-90 transition-transform hover:bg-gray-100 rounded-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                            className: "w-6 h-6"
                        }, void 0, false, {
                            fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: navigateToHelp,
                        className: "p-2 active:scale-90 transition-transform",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__["Lightbulb"], {
                            className: "w-6 h-6"
                        }, void 0, false, {
                            fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full max-w-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-3xl shadow-lg shadow-gray-200 p-8 border border-gray-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-gray-500 text-xs uppercase tracking-wide mb-1 text-center font-medium",
                                children: "Past APR (30 days)"
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-green-500 text-4xl font-bold mb-6 text-center",
                                children: [
                                    Math.floor(apr * 100),
                                    " %"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full h-48",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/assets/pig.png",
                                    alt: "Piggy Bank",
                                    fill: true,
                                    className: "object-contain",
                                    priority: true
                                }, void 0, false, {
                                    fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                                    lineNumber: 74,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-500 text-sm",
                                            children: "Total Locked Value"
                                        }, void 0, false, {
                                            fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                                            lineNumber: 91,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-lg",
                                            children: [
                                                "$",
                                                tvl >= 1_000_000_000 ? +(tvl / 1_000_000_000).toFixed(1) + "B" : tvl >= 1_000_000 ? +(tvl / 1_000_000).toFixed(1) + "M" : tvl >= 1_000 ? +(tvl / 1_000).toFixed(1) + "K" : tvl
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                                            lineNumber: 92,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-px bg-gray-100"
                                }, void 0, false, {
                                    fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-500 text-sm",
                                            children: "Your Holdings"
                                        }, void 0, false, {
                                            fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                                            lineNumber: 105,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-lg",
                                            children: "$200"
                                        }, void 0, false, {
                                            fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "flex gap-3 pb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: navigateToDepositPage,
                                className: "flex-1 bg-black text-white py-4 rounded-2xl font-semibold text-base active:scale-95 transition-transform shadow-lg shadow-gray-300",
                                children: "Deposit"
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "flex-1 bg-white text-black py-4 rounded-2xl font-semibold text-base active:scale-95 transition-transform border-2 border-black",
                                children: "Withdraw"
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/dashboard/page.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_s(page, "U9Iovfv74WT6cA7jD39Yy2nufOk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
const __TURBOPACK__default__export__ = page;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=encodeClub_hyperliquid_frontend-rewrite_my-app_app_dashboard_page_tsx_375363d2._.js.map