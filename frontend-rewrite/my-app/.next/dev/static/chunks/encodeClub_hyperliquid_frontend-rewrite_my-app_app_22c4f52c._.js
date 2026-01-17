(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/lib/wallet.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearWallet",
    ()=>clearWallet,
    "createWallet",
    ()=>createWallet,
    "getWalletAddress",
    ()=>getWalletAddress,
    "hasWallet",
    ()=>hasWallet,
    "loadWallet",
    ()=>loadWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/node_modules/ethers/lib.esm/wallet/wallet.js [app-client] (ecmascript)");
;
const WALLET_KEY = 'encrypted_wallet';
async function createWallet(password) {
    const wallet = __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Wallet"].createRandom();
    const encrypted = await wallet.encrypt(password);
    localStorage.setItem(WALLET_KEY, encrypted);
    return wallet;
}
async function loadWallet(password) {
    const encrypted = localStorage.getItem(WALLET_KEY);
    if (!encrypted) return null;
    return __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Wallet"].fromEncryptedJson(encrypted, password);
}
function hasWallet() {
    return !!localStorage.getItem(WALLET_KEY);
}
function getWalletAddress() {
    const encrypted = localStorage.getItem(WALLET_KEY);
    if (!encrypted) return null;
    try {
        const parsed = JSON.parse(encrypted);
        return parsed.address ? `0x${parsed.address}` : null;
    } catch  {
        return null;
    }
}
function clearWallet() {
    localStorage.removeItem(WALLET_KEY);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Onboarding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$app$2f$lib$2f$wallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/lib/wallet.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Onboarding({ onComplete }) {
    _s();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$app$2f$lib$2f$wallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasWallet"])() ? 'fund' : 'welcome');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [walletAddress, setWalletAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$app$2f$lib$2f$wallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWalletAddress"])());
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [copiedKey, setCopiedKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showKeyPrompt, setShowKeyPrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [keyPassword, setKeyPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [fundAmount, setFundAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('100');
    const handleCopy = ()=>{
        navigator.clipboard.writeText(walletAddress || '');
        setCopied(true);
        setTimeout(()=>setCopied(false), 2000);
    };
    const handleCopyPrivateKey = async ()=>{
        if (!keyPassword) return;
        try {
            const wallet = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$app$2f$lib$2f$wallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadWallet"])(keyPassword);
            if (wallet) {
                navigator.clipboard.writeText(wallet.privateKey);
                setCopiedKey(true);
                setTimeout(()=>{
                    setCopiedKey(false);
                    setShowKeyPrompt(false);
                    setKeyPassword('');
                }, 2000);
            } else {
                alert('Incorrect password');
            }
        } catch  {
            alert('Incorrect password');
        }
    };
    const handleGenerateNewWallet = ()=>{
        if (confirm('This will reset your account. Make sure you have backed up any important information. Continue?')) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$app$2f$lib$2f$wallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearWallet"])();
            setWalletAddress(null);
            setPassword('');
            setStep('welcome');
        }
    };
    const handleCreateWallet = async ()=>{
        if (password.length < 8) return;
        setLoading(true);
        try {
            const wallet = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$app$2f$lib$2f$wallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWallet"])(password);
            setWalletAddress(wallet.address);
            setStep('fund');
        } catch (err) {
            console.error(err);
            alert('Failed to create account');
        }
        setLoading(false);
    };
    const handleMockFund = async ()=>{
        setStep('processing');
        await new Promise((r)=>setTimeout(r, 2000));
        setStep('done');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "onboarding",
        children: [
            step === 'welcome' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "screen welcome-screen",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "welcome-bg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "gradient-orb orb-1"
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "gradient-orb orb-2"
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "welcome-content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "logo-mark",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    viewBox: "0 0 48 48",
                                    fill: "none",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            width: "48",
                                            height: "48",
                                            rx: "12",
                                            fill: "currentColor"
                                        }, void 0, false, {
                                            fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                            lineNumber: 88,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M14 34V14h8c5 0 8 3 8 7 0 3-2 5-4 6l5 7h-5l-4-6h-3v6h-5zm5-10h3c2 0 3-1 3-3s-1-3-3-3h-3v6z",
                                            fill: "#000"
                                        }, void 0, false, {
                                            fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                            lineNumber: 89,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "welcome-title",
                                children: "Ramsay"
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "welcome-subtitle",
                                children: "High-yield savings, simplified"
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "welcome-footer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn-primary",
                                onClick: ()=>setStep('create-password'),
                                children: "Get Started"
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "terms",
                                children: "By continuing, you agree to our Terms of Service"
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                lineNumber: 80,
                columnNumber: 9
            }, this),
            step === 'create-password' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "screen",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "back-btn",
                        onClick: ()=>setStep('welcome'),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M19 12H5M12 19l-7-7 7-7"
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 108,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "screen-content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "screen-header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Create Password"
                                    }, void 0, false, {
                                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                        lineNumber: 113,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "This secures your account. Keep it safe."
                                    }, void 0, false, {
                                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                        lineNumber: 114,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 112,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "input-wrapper",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "password",
                                        placeholder: "Enter password",
                                        value: password,
                                        onChange: (e)=>setPassword(e.target.value),
                                        onKeyDown: (e)=>e.key === 'Enter' && handleCreateWallet()
                                    }, void 0, false, {
                                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "input-hint",
                                        children: "Minimum 8 characters"
                                    }, void 0, false, {
                                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 116,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "screen-footer",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn-primary",
                            onClick: handleCreateWallet,
                            disabled: loading || password.length < 8,
                            children: loading ? 'Creating...' : 'Continue'
                        }, void 0, false, {
                            fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                            lineNumber: 128,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                        lineNumber: 127,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                lineNumber: 105,
                columnNumber: 9
            }, this),
            step === 'fund' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "screen fund-screen",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fund-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Add Money"
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 142,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Start earning 12.5% APY"
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                        lineNumber: 141,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fund-amount-display",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "currency-symbol",
                                children: "$"
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 147,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: fundAmount,
                                onChange: (e)=>setFundAmount(e.target.value),
                                placeholder: "0",
                                className: "amount-display-input"
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                        lineNumber: 146,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fund-presets",
                        children: [
                            '50',
                            '100',
                            '250',
                            '500'
                        ].map((amt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `fund-preset ${fundAmount === amt ? 'active' : ''}`,
                                onClick: ()=>setFundAmount(amt),
                                children: [
                                    "$",
                                    amt
                                ]
                            }, amt, true, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 159,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                        lineNumber: 157,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fund-footer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "apple-pay-btn",
                                onClick: handleMockFund,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    viewBox: "0 0 165.521 40",
                                    className: "apple-pay-logo",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            fill: "#fff",
                                            d: "M150.698 0H14.823c-.566 0-1.133 0-1.698.003-.477.004-.953.009-1.43.022-1.039.028-2.087.09-3.113.274a10.51 10.51 0 0 0-2.958.975 9.932 9.932 0 0 0-2.52 1.83A9.927 9.927 0 0 0 1.273 5.63a10.464 10.464 0 0 0-.974 2.95C.061 9.607.004 10.656-.001 11.696c-.013.477-.012.954-.012 1.43v13.748c0 .476-.001.953.012 1.43.005 1.04.062 2.09.274 3.117a10.463 10.463 0 0 0 .974 2.95 9.93 9.93 0 0 0 1.83 2.525c.753.752 1.6 1.35 2.52 1.83a10.5 10.5 0 0 0 2.958.975c1.026.183 2.074.246 3.113.273.477.014.953.02 1.43.024.565.003 1.132.003 1.698.003H150.698c.566 0 1.132 0 1.699-.003.476-.004.953-.01 1.43-.024 1.038-.027 2.085-.09 3.113-.273a10.478 10.478 0 0 0 2.958-.975 9.955 9.955 0 0 0 2.52-1.83 9.957 9.957 0 0 0 1.83-2.525c.384-.93.683-1.912.974-2.95.213-1.027.27-2.077.273-3.117.014-.477.02-.954.02-1.43.004-.566.004-1.133.004-1.699V14.824c0-.566 0-1.133-.004-1.699 0-.476-.006-.953-.02-1.43-.003-1.04-.06-2.089-.273-3.116a10.478 10.478 0 0 0-.974-2.95 9.955 9.955 0 0 0-4.35-4.355 10.478 10.478 0 0 0-2.958-.975c-1.028-.183-2.075-.246-3.113-.273-.477-.013-.954-.019-1.43-.022C151.83 0 151.264 0 150.698 0z"
                                        }, void 0, false, {
                                            fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                            lineNumber: 172,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M150.698 2.678h.367c.454.004.908.011 1.36.022.793.022 1.719.063 2.58.211.762.13 1.38.319 1.988.595a7.292 7.292 0 0 1 1.832 1.333c.597.592 1.05 1.269 1.348 2.005.254.596.443 1.22.577 1.988.155.94.196 1.875.217 2.58.012.451.017.903.02 1.357.003.553.003 1.106.003 1.66v13.146c0 .553 0 1.106-.003 1.659-.003.455-.008.908-.02 1.359-.021.705-.062 1.64-.217 2.578a6.91 6.91 0 0 1-.577 1.989 7.332 7.332 0 0 1-1.348 2.006 7.323 7.323 0 0 1-1.832 1.333 6.94 6.94 0 0 1-1.988.594c-.861.149-1.787.189-2.58.211-.452.011-.906.018-1.36.022l-.736.003H15.19l-.738-.003c-.453-.004-.906-.011-1.358-.022-.793-.022-1.719-.062-2.58-.21a6.94 6.94 0 0 1-1.99-.595 7.29 7.29 0 0 1-1.83-1.333 7.283 7.283 0 0 1-1.35-2.006 6.89 6.89 0 0 1-.576-1.989c-.154-.938-.196-1.873-.218-2.578a70.869 70.869 0 0 1-.019-1.359c-.004-.553-.004-1.106-.004-1.659V14.429c0-.554 0-1.107.004-1.66.003-.454.007-.906.019-1.357.022-.705.064-1.64.218-2.58a6.89 6.89 0 0 1 .576-1.988 7.283 7.283 0 0 1 1.35-2.005A7.32 7.32 0 0 1 8.524 3.506a6.94 6.94 0 0 1 1.99-.595c.86-.148 1.786-.189 2.58-.21.452-.012.905-.019 1.358-.023h136.246z"
                                        }, void 0, false, {
                                            fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                            lineNumber: 173,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            fill: "#fff",
                                            d: "M43.508 26.13a4.199 4.199 0 0 1-2.011-.569 3.5 3.5 0 0 1-1.37-1.482 4.291 4.291 0 0 1-.456-1.833 4.84 4.84 0 0 1 .206-1.569c.238-.73.61-1.331 1.14-1.796a4.136 4.136 0 0 1 1.614-.948c.498-.165.999-.248 1.473-.247h.12c.749.002 1.442.16 2.037.466l-.607 1.433c-.432-.247-.963-.393-1.56-.394h-.089a2.317 2.317 0 0 0-.815.14c-.316.119-.609.311-.859.574a2.54 2.54 0 0 0-.579.975c-.12.359-.162.715-.13 1.07.024.282.096.543.217.786.149.297.351.546.605.745.267.21.584.367.943.462.302.083.6.123.895.123h.091c.597-.003 1.127-.15 1.557-.396l.608 1.433a4.12 4.12 0 0 1-2.03.526h-.001zm8.286-7.627h1.548v7.384h-1.548zm-4.89 0h4.36v1.391h-2.815v1.502h2.5v1.39h-2.5v1.71h2.815v1.391h-4.36zm-7.257 0h4.358v1.391h-2.814v1.502h2.5v1.39h-2.5v1.71h2.814v1.391h-4.358zm-5.132 0h4.166l-2.113 3.626 2.113 3.758h-1.789l-1.27-2.354-1.27 2.354h-1.788l2.112-3.758-2.112-3.626h1.951zm-6.403 7.384h1.548v-5.993h-1.914v-1.391h5.376v1.391h-1.914v5.993h-1.548zm-.456-3.607c0 .57-.095 1.089-.285 1.55a3.552 3.552 0 0 1-.784 1.197 3.507 3.507 0 0 1-1.169.775 3.756 3.756 0 0 1-1.44.282h-.158a3.759 3.759 0 0 1-1.441-.282 3.506 3.506 0 0 1-1.169-.775 3.561 3.561 0 0 1-.784-1.197 3.813 3.813 0 0 1-.284-1.55c0-.57.095-1.09.284-1.55.19-.46.455-.86.784-1.198a3.504 3.504 0 0 1 1.169-.775 3.757 3.757 0 0 1 1.441-.283h.158c.512.001.994.095 1.44.283.447.187.838.445 1.169.775.33.337.595.738.784 1.198.19.46.285.98.285 1.55zm-1.548 0c0-.323-.051-.615-.152-.873a1.932 1.932 0 0 0-.42-.666 1.818 1.818 0 0 0-.628-.42 1.92 1.92 0 0 0-.78-.157h-.158c-.282 0-.542.052-.78.157a1.818 1.818 0 0 0-.628.42 1.938 1.938 0 0 0-.42.666 2.309 2.309 0 0 0-.152.873c0 .323.051.614.152.873.1.258.243.484.42.666.176.182.39.326.628.42.238.095.498.157.78.157h.158c.282 0 .542-.052.78-.157.238-.094.452-.238.628-.42.177-.182.32-.408.42-.666.101-.259.152-.55.152-.873z"
                                        }, void 0, false, {
                                            fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                            lineNumber: 174,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            fill: "#fff",
                                            d: "M127.725 28.788h-2.079l3.683-8.8h2.145l3.683 8.8h-2.091l-.751-1.824h-3.826l-.764 1.824zm1.425-3.488h2.505l-1.234-3.024-1.271 3.024zm-12.063-1.704c0 .505-.099 1.023-.296 1.55-.198.527-.506 1.016-.923 1.464-.417.448-.952.809-1.603 1.082-.652.274-1.435.41-2.349.41h-3.328v-8.8h3.328c.914 0 1.697.136 2.349.41.651.273 1.186.634 1.603 1.082.417.448.725.937.923 1.464.197.528.296 1.045.296 1.55zm-2.012.012c0-.352-.061-.699-.181-1.04a2.41 2.41 0 0 0-.545-.885c-.241-.257-.544-.466-.91-.626-.365-.16-.797-.24-1.294-.24h-1.437v5.583h1.437c.497 0 .929-.08 1.294-.24.366-.16.669-.369.91-.626.241-.257.421-.549.545-.885.12-.341.18-.688.181-1.041z"
                                        }, void 0, false, {
                                            fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                            lineNumber: 175,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                    lineNumber: 171,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 170,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "fund-alt-actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "fund-alt-btn",
                                        onClick: ()=>setShowKeyPrompt(true),
                                        children: "Export Key"
                                    }, void 0, false, {
                                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                        lineNumber: 180,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "fund-divider",
                                        children: "|"
                                    }, void 0, false, {
                                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                        lineNumber: 183,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "fund-alt-btn",
                                        onClick: handleGenerateNewWallet,
                                        children: "Reset"
                                    }, void 0, false, {
                                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                        lineNumber: 184,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 179,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "fund-skip",
                                onClick: ()=>setStep('done'),
                                children: "Skip for now"
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 189,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                        lineNumber: 169,
                        columnNumber: 11
                    }, this),
                    showKeyPrompt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "modal-overlay",
                        onClick: ()=>setShowKeyPrompt(false),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "modal",
                            onClick: (e)=>e.stopPropagation(),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: "Export Recovery Key"
                                }, void 0, false, {
                                    fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                    lineNumber: 197,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Enter your password to reveal your recovery key"
                                }, void 0, false, {
                                    fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                    lineNumber: 198,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    placeholder: "Password",
                                    value: keyPassword,
                                    onChange: (e)=>setKeyPassword(e.target.value),
                                    onKeyDown: (e)=>e.key === 'Enter' && handleCopyPrivateKey(),
                                    autoFocus: true
                                }, void 0, false, {
                                    fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                    lineNumber: 199,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "modal-actions",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "btn-ghost",
                                            onClick: ()=>setShowKeyPrompt(false),
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                            lineNumber: 208,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "btn-primary small",
                                            onClick: handleCopyPrivateKey,
                                            children: copiedKey ? 'Copied' : 'Copy Key'
                                        }, void 0, false, {
                                            fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                            lineNumber: 211,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                    lineNumber: 207,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                            lineNumber: 196,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                        lineNumber: 195,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                lineNumber: 140,
                columnNumber: 9
            }, this),
            step === 'processing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "screen center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "processing-animation",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "spinner"
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 224,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pulse-ring"
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 225,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                        lineNumber: 223,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Processing"
                    }, void 0, false, {
                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                        lineNumber: 227,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Setting up your account..."
                    }, void 0, false, {
                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                        lineNumber: 228,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                lineNumber: 222,
                columnNumber: 9
            }, this),
            step === 'done' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "done-screen",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "done-content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "done-tick",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M20 6L9 17l-5-5"
                                    }, void 0, false, {
                                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                        lineNumber: 237,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                    lineNumber: 236,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 235,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "done-title",
                                children: "All set"
                            }, void 0, false, {
                                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                                lineNumber: 240,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                        lineNumber: 234,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$encodeClub$2f$hyperliquid$2f$frontend$2d$rewrite$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "done-expand",
                        onAnimationEnd: onComplete
                    }, void 0, false, {
                        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                        lineNumber: 242,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
                lineNumber: 233,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/encodeClub/hyperliquid/frontend-rewrite/my-app/app/onboarding/[screen-id]/page.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
_s(Onboarding, "eyst7UFFOQp86b5mjI6kgOlZVx8=");
_c = Onboarding;
var _c;
__turbopack_context__.k.register(_c, "Onboarding");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=encodeClub_hyperliquid_frontend-rewrite_my-app_app_22c4f52c._.js.map