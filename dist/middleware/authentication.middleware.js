"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const firebase_1 = require("../services/firebase");
let AuthenticationMiddleware = class AuthenticationMiddleware {
    getAuthToken(req, res, next) {
        if (req.headers.authorization &&
            req.headers.authorization.split(' ')[0] === 'Bearer') {
            req.authToken = req.headers.authorization.split(' ')[1];
        }
        else {
            req.authToken = null;
        }
        next();
    }
    ;
    async use(req, res, next) {
        this.getAuthToken(req, res, async () => {
            try {
                const { authToken } = req;
                if (!authToken)
                    return new common_1.UnauthorizedException('You are not authorized to make this request');
                firebase_1.auth.getAuth().verifyIdToken(authToken, true)
                    .then(userInfo => {
                    var _a;
                    req.authId = userInfo.uid;
                    req.userPhone = (_a = userInfo.phone_number) !== null && _a !== void 0 ? _a : "";
                    const currentRole = req.headers["current-role"];
                    req.currentRole = currentRole !== null && currentRole !== void 0 ? currentRole : (currentRole === "" ? undefined : currentRole);
                    const currentStore = req.headers["current-store"];
                    req.currentStore = currentStore !== null && currentStore !== void 0 ? currentStore : (currentStore === "" ? undefined : currentStore);
                    return next();
                })
                    .catch(e => new common_1.BadGatewayException("Something wrong while verifying your access. Relogin might resolve your issue."));
            }
            catch (error) {
                return new common_1.InternalServerErrorException(error);
            }
        });
    }
};
AuthenticationMiddleware = __decorate([
    (0, common_1.Injectable)()
], AuthenticationMiddleware);
exports.AuthenticationMiddleware = AuthenticationMiddleware;
//# sourceMappingURL=authentication.middleware.js.map