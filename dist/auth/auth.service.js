"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../services/prisma");
const firebase_1 = require("../services/firebase");
let AuthService = class AuthService {
    async identify(authId) {
        const { phoneNumber: phone } = await firebase_1.auth.getAuth().getUser(authId);
        const currentUser = await prisma_1.default.user.findFirst({
            where: { id: authId, phone },
            include: { storeMember: { include: { roles: true } } }
        });
        if (!currentUser || currentUser.id === "")
            return { message: "new-user" };
        return { currentUser };
    }
    async register(authId, { stores, fullName }) {
        const { phoneNumber: phone } = await firebase_1.auth.getAuth().getUser(authId);
        let user = await prisma_1.default.user.findFirst({ where: { id: authId, phone: phone } });
        if (user && user.id !== "")
            return { createdUser: await prisma_1.default.user.update({ where: { phone }, data: { id: authId } }) };
        if (user)
            throw new common_1.BadGatewayException();
        return await prisma_1.default.user.create({ data: { fullName, phone, id: authId } })
            .then(async (createdUser) => {
            await Promise.all(stores.map(async (store) => {
                const createdStore = await prisma_1.default.store.create({ data: store });
                const createdRole = await prisma_1.default.storeRole.create({
                    data: {
                        name: "Owner",
                        store: { connect: { id: createdStore.id } }
                    }
                });
                const members = await prisma_1.default.storeMember.create({
                    data: {
                        members: { connect: { id: createdUser.id } },
                        store: { connect: { id: createdStore.id } },
                        roles: { connect: { id: createdRole.id } }
                    }
                });
            }));
            createdUser = await prisma_1.default.user.findUnique({ where: { id: createdUser.id } });
            return { createdUser };
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map