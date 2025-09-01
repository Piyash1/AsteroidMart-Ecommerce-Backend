(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__872c7aed._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/lib/api.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BASE_URL",
    ()=>BASE_URL,
    "MEDIA_BASE_URL",
    ()=>MEDIA_BASE_URL,
    "api",
    ()=>api,
    "checkProductInCart",
    ()=>checkProductInCart,
    "createNewUser",
    ()=>createNewUser,
    "deleteReview",
    ()=>deleteReview,
    "getCart",
    ()=>getCart,
    "getCartStats",
    ()=>getCartStats,
    "getCategories",
    ()=>getCategories,
    "getCategoryDetail",
    ()=>getCategoryDetail,
    "getExistingUser",
    ()=>getExistingUser,
    "getProductDetail",
    ()=>getProductDetail,
    "getProducts",
    ()=>getProducts,
    "productSearch",
    ()=>productSearch,
    "updateReview",
    ()=>updateReview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/navigation.react-server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/navigation.react-server.js [middleware-edge] (ecmascript)");
;
;
const BASE_URL = 'http://localhost:8000/api';
const MEDIA_BASE_URL = 'http://localhost:8000';
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: 'http://localhost:8000/api'
});
async function getExistingUser(email) {
    try {
        const safeEmail = email ? encodeURIComponent(email) : '';
        const response = await api.get(`/existing_user/${safeEmail}/`);
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}
async function createNewUser(data) {
    try {
        const response = await api.post('/create_user/', data);
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}
async function getCategories() {
    try {
        const response = await api.get('category_list');
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}
async function getProducts() {
    try {
        const response = await api.get('product_list');
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}
async function getCategoryDetail(slug) {
    try {
        const response = await api.get(`categories/${encodeURIComponent(slug)}/`);
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}
async function getProductDetail(slug) {
    try {
        const response = await api.get(`products/${encodeURIComponent(slug)}/`);
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}
async function updateReview(reviewId, data) {
    try {
        const response = await api.put(`update_review/${reviewId}/`, data);
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}
async function deleteReview(reviewId) {
    try {
        const response = await api.delete(`delete_review/${reviewId}/`);
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}
async function checkProductInCart(cartCode, productId) {
    if (!cartCode || !productId) {
        throw new Error('Cart code and product ID are required');
    }
    try {
        const response = await api.get(`product_in_cart/?cart_code=${cartCode}&product_id=${productId}`);
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}
async function getCartStats(cartCode) {
    if (!cartCode) {
        throw new Error('Cart code is required');
    }
    try {
        const response = await api.get(`get_cart_stat/?cart_code=${cartCode}`);
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}
async function getCart(cart_code) {
    try {
        const response = await api.get(`get_cart/${cart_code}/`);
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            if (err.message == "Request failed with status code 404") {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["redirect"])('/cart');
            }
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}
async function productSearch(searchInput) {
    if (!searchInput) {
        return [];
    }
    try {
        const response = await api.get(`search/?query=${encodeURIComponent(searchInput)}`);
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}
}),
"[project]/auth.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "handlers",
    ()=>handlers,
    "signIn",
    ()=>signIn,
    "signOut",
    ()=>signOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-auth/index.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$google$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-auth/providers/google.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$providers$2f$google$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth/core/providers/google.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [middleware-edge] (ecmascript)");
;
;
;
const { handlers, signIn, signOut, auth } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])({
    providers: [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$providers$2f$google$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"]
    ],
    callbacks: {
        async signIn ({ profile }) {
            try {
                const email = profile?.email;
                const first_name = profile?.given_name;
                const last_name = profile?.family_name;
                const username = profile?.name?.split("@")[0];
                const profile_picture_url = profile?.picture;
                const userObj = {
                    email,
                    first_name,
                    last_name,
                    username,
                    profile_picture_url
                };
                try {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getExistingUser"])(email);
                } catch (err) {
                    console.log(err);
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createNewUser"])(userObj);
                }
                return true;
            } catch (err) {
                return false;
            }
        }
    }
});
}),
"[project]/middleware.ts [middleware-edge] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/auth.ts [middleware-edge] (ecmascript)");
;
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "middleware",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["auth"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$middleware$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/middleware.ts [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/auth.ts [middleware-edge] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__872c7aed._.js.map