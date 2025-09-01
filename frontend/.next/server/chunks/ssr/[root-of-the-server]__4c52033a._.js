module.exports = [
"[project]/lib/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00ca0adbcb5b0d3aca410fe488ae8c44b826a5a7cb":"signOutUser","40136f0d8e290a8899f32b4025c225216618ac502c":"updateCartitemQuantity","406db119c46a91376dcdf1fefd8e04218968c23033":"addToCartAction","40a69122a99a62caa7bc6bbd295faf191c8fe53262":"addReview","40e45bf5ba5e936151011b9b638aa37799787ce131":"deleteCartItem","40fb35575712deeae09ff261b3e6d02c20f3c02cd5":"addToWishlistAction"},"",""] */ __turbopack_context__.s([
    "addReview",
    ()=>addReview,
    "addToCartAction",
    ()=>addToCartAction,
    "addToWishlistAction",
    ()=>addToWishlistAction,
    "deleteCartItem",
    ()=>deleteCartItem,
    "signOutUser",
    ()=>signOutUser,
    "updateCartitemQuantity",
    ()=>updateCartitemQuantity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function signOutUser() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signOut"])({
        redirectTo: "/"
    });
}
async function addReview(formData) {
    const product_id = Number(formData.get("product_id"));
    const email = formData.get("email");
    const rating = Number(formData.get("rating"));
    const comment = formData.get("review");
    const slug = formData.get("slug");
    if (!product_id || !email || !rating || !comment || !slug) {
        throw new Error('Missing required fields');
    }
    const reviewObj = {
        product_id,
        email,
        rating,
        comment
    };
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["api"].post('add_review/', reviewObj);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/products/${slug}`);
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}
async function addToCartAction(formData) {
    const cart_code = formData.get("cart_code");
    const product_id = formData.get("product_id");
    const cartitemObj = {
        cart_code,
        product_id
    };
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["api"].post('add_to_cart/', cartitemObj);
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}
async function addToWishlistAction(formData) {
    const email = formData.get("email");
    const product_id = formData.get("product_id");
    if (!email || !product_id) {
        throw new Error('Email and product ID are required');
    }
    const wishlistObj = {
        email,
        product_id
    };
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["api"].post('add_to_wishlist/', wishlistObj);
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}
async function updateCartitemQuantity(formData) {
    const item_id = formData.get("item_id");
    const quantity = formData.get("quantity");
    const cart_code = formData.get("cart_code");
    // Validate required fields
    if (!item_id || !quantity || !cart_code) {
        throw new Error('Missing required fields: item_id, quantity, and cart_code are required');
    }
    // Validate and convert item_id
    const itemId = Number(item_id);
    if (isNaN(itemId) || itemId <= 0) {
        throw new Error('Invalid item_id: must be a positive number');
    }
    // Validate and convert quantity
    const itemQuantity = Number(quantity);
    if (isNaN(itemQuantity) || itemQuantity <= 0) {
        throw new Error('Invalid quantity: must be a positive number');
    }
    const cartitemObj = {
        item_id: itemId,
        quantity: itemQuantity
    };
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["api"].put('update_cartitem_quantity/', cartitemObj);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/cart/${cart_code}`);
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}
async function deleteCartItem(formData) {
    const item_id = formData.get("item_id");
    const cart_code = formData.get("cart_code");
    // Validate required fields
    if (!item_id || !cart_code) {
        throw new Error('Missing required fields: item_id and cart_code are required');
    }
    // Validate and convert item_id
    const itemId = Number(item_id);
    if (isNaN(itemId) || itemId <= 0) {
        throw new Error('Invalid item_id: must be a positive number');
    }
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["api"].delete(`delete_cartitem/${itemId}/`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/cart/${cart_code}`);
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    signOutUser,
    addReview,
    addToCartAction,
    addToWishlistAction,
    updateCartitemQuantity,
    deleteCartItem
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(signOutUser, "00ca0adbcb5b0d3aca410fe488ae8c44b826a5a7cb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addReview, "40a69122a99a62caa7bc6bbd295faf191c8fe53262", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addToCartAction, "406db119c46a91376dcdf1fefd8e04218968c23033", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addToWishlistAction, "40fb35575712deeae09ff261b3e6d02c20f3c02cd5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateCartitemQuantity, "40136f0d8e290a8899f32b4025c225216618ac502c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteCartItem, "40e45bf5ba5e936151011b9b638aa37799787ce131", null);
}),
"[project]/app/signin/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"009f3889cd16cb7c88349602da10dda71aac1f0bf4":"$$RSC_SERVER_ACTION_0"},"",""] */ __turbopack_context__.s([
    "$$RSC_SERVER_ACTION_0",
    ()=>$$RSC_SERVER_ACTION_0,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/auth.ts [app-rsc] (ecmascript)");
;
;
;
;
const $$RSC_SERVER_ACTION_0 = async function action() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signIn"])("google", {
        redirectTo: "/"
    });
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_ACTION_0, "009f3889cd16cb7c88349602da10dda71aac1f0bf4", null);
const SignupPage = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gray-50 flex items-center justify-center min-h-screen px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white shadow-xl rounded-2xl p-6 sm:p-10 max-w-sm w-full flex flex-col gap-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-3xl font-semibold text-center text-gray-900",
                    children: "Welcome!"
                }, void 0, false, {
                    fileName: "[project]/app/signin/page.tsx",
                    lineNumber: 10,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    action: $$RSC_SERVER_ACTION_0,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "w-full flex items-center cursor-pointer justify-center border border-gray-300 hover:border-gray-500 text-gray-700 font-medium py-3 rounded-lg shadow-sm transition-all duration-300 bg-white hover:bg-gray-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                src: "/google.png",
                                alt: "Google Icon",
                                width: 30,
                                height: 30,
                                className: "mr-3"
                            }, void 0, false, {
                                fileName: "[project]/app/signin/page.tsx",
                                lineNumber: 19,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Continue with Google"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/signin/page.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/app/signin/page.tsx",
                    lineNumber: 14,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/app/signin/page.tsx",
            lineNumber: 9,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/signin/page.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = SignupPage;
}),
"[project]/.next-internal/server/app/signin/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/signin/page.tsx [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$signin$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/signin/page.tsx [app-rsc] (ecmascript)");
;
;
}),
"[project]/.next-internal/server/app/signin/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/signin/page.tsx [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "009f3889cd16cb7c88349602da10dda71aac1f0bf4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$signin$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_ACTION_0"],
    "00ca0adbcb5b0d3aca410fe488ae8c44b826a5a7cb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signOutUser"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$signin$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$signin$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/signin/page/actions.js { ACTIONS_MODULE0 => "[project]/lib/actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/app/signin/page.tsx [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$signin$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/signin/page.tsx [app-rsc] (ecmascript)");
}),
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/signin/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/signin/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4c52033a._.js.map