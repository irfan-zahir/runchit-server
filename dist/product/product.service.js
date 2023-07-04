"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../services/prisma");
let ProductService = class ProductService {
    async create_product(_a) {
        var { storeId } = _a, product = __rest(_a, ["storeId"]);
        return await prisma_1.default.product.create({
            data: Object.assign(Object.assign({}, product), { store: { connect: { id: storeId } } })
        });
    }
    async query_product({ sku, categories }) {
        return await prisma_1.default.product.findMany({
            where: {
                sku,
            }
        });
    }
    async fetch_products(storeId) {
        return await prisma_1.default.product.findMany({
            where: { storeId: { equals: storeId } },
            orderBy: { name: "desc" }
        });
    }
    async fetch_unique(id) {
        return await prisma_1.default.product.findUnique({ where: { id } });
    }
    async update_product(product) {
        return await prisma_1.default.product.update({
            data: product,
            where: { id: product.id }
        });
    }
    async delete_product(id) {
        return await prisma_1.default.product.delete({ where: { id } });
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)()
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map