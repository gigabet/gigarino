# Error Catalog

## Conventions

NestJS built-in exceptions map to HTTP statuses automatically. Most thrown errors in the codebase use the standard Nest classes; a handful use `HttpException(message, status)` for custom codes (rate limiting, upstream provider proxying).

| Exception class                | HTTP | When it's used here                                                              |
| ------------------------------ | ---- | -------------------------------------------------------------------------------- |
| `BadRequestException`          | 400  | Client input invalid OR business-rule violation (e.g. "amount must be positive") |
| `UnauthorizedException`        | 401  | No / invalid credentials, expired token, wrong password                          |
| `ForbiddenException`           | 403  | Authenticated but not allowed (role / scope / responsible-gaming block)          |
| `NotFoundException`            | 404  | Resource doesn't exist or has been deleted                                       |
| `ConflictException`            | 409  | Duplicate (email, username), idempotency conflict, or stale-provider claim       |
| `BadGatewayException`          | 502  | Downstream provider gave a bad response (Slotegrator, payment gateways)          |
| `ServiceUnavailableException`  | 503  | Downstream provider unreachable, mis-configured, or temporarily refusing         |
| `InternalServerErrorException` | 500  | Internal invariant violated — shouldn't happen, treat as a bug                   |
| `HttpException(msg, status)`   | …    | Custom status: 429 for rate-limit; 4xx/502 for Slotegrator pass-through          |

**Response shape** (Nest default exception filter):

```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

Frontend can branch on `statusCode` for generic handling, or match on `message` substrings for specific cases (login failed vs. account suspended both return 401).

---

## 1. Authentication

### `admin-auth` — backoffice login, password reset, sessions

`src/modules/admin-auth/`

| File:Line                                                                                        | Exception               | Message                                                     |
| ------------------------------------------------------------------------------------------------ | ----------------------- | ----------------------------------------------------------- |
| [admin-auth.service.ts:69](../casino/src/modules/admin-auth/admin-auth.service.ts#L69)           | `UnauthorizedException` | `Invalid email or password` (login, wrong email)            |
| [admin-auth.service.ts:75](../casino/src/modules/admin-auth/admin-auth.service.ts#L75)           | `UnauthorizedException` | `Admin account is suspended`                                |
| [admin-auth.service.ts:84](../casino/src/modules/admin-auth/admin-auth.service.ts#L84)           | `UnauthorizedException` | `Invalid email or password` (login, wrong password)         |
| [admin-auth.service.ts:269](../casino/src/modules/admin-auth/admin-auth.service.ts#L269)         | `UnauthorizedException` | `Invalid or expired reset token`                            |
| [admin-auth.service.ts:273](../casino/src/modules/admin-auth/admin-auth.service.ts#L273)         | `UnauthorizedException` | `Invalid token type`                                        |
| [admin-auth.service.ts:277](../casino/src/modules/admin-auth/admin-auth.service.ts#L277)         | `UnauthorizedException` | `This reset token has already been used`                    |
| [admin-auth.service.ts:281](../casino/src/modules/admin-auth/admin-auth.service.ts#L281)         | `UnauthorizedException` | `This reset token has expired`                              |
| [admin-auth.service.ts:336](../casino/src/modules/admin-auth/admin-auth.service.ts#L336)         | `UnauthorizedException` | `Admin not found` (change-password flow)                    |
| [admin-auth.service.ts:345](../casino/src/modules/admin-auth/admin-auth.service.ts#L345)         | `UnauthorizedException` | `Current password is incorrect`                             |
| [admin-auth.service.ts:455](../casino/src/modules/admin-auth/admin-auth.service.ts#L455)         | `HttpException`         | `429 Too Many Requests` — login attempt rate-limit exceeded |
| [guards/admin-auth.guard.ts:21](../casino/src/modules/admin-auth/guards/admin-auth.guard.ts#L21) | `UnauthorizedException` | `Missing or invalid authorization header`                   |
| [guards/admin-auth.guard.ts:29](../casino/src/modules/admin-auth/guards/admin-auth.guard.ts#L29) | `UnauthorizedException` | `Missing token`                                             |
| [guards/admin-auth.guard.ts:35](../casino/src/modules/admin-auth/guards/admin-auth.guard.ts#L35) | `UnauthorizedException` | `Invalid or expired admin session`                          |
| [guards/roles.guard.ts:30](../casino/src/modules/admin-auth/guards/roles.guard.ts#L30)           | `ForbiddenException`    | `Admin user not found in request`                           |
| [guards/roles.guard.ts:36](../casino/src/modules/admin-auth/guards/roles.guard.ts#L36)           | `ForbiddenException`    | `Access requires one of the following roles: ...`           |

### `player-auth` — registration, login, password reset, email verification

`src/modules/player-auth/`

| File:Line                                                                                           | Exception                      | Message                                                                                        |
| --------------------------------------------------------------------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------- |
| [player-auth.service.ts:79](../casino/src/modules/player-auth/player-auth.service.ts#L79)           | `BadRequestException`          | `Invalid supervisor` (registration)                                                            |
| [player-auth.service.ts:89](../casino/src/modules/player-auth/player-auth.service.ts#L89)           | `BadRequestException`          | `Invalid branch`                                                                               |
| [player-auth.service.ts:93](../casino/src/modules/player-auth/player-auth.service.ts#L93)           | `BadRequestException`          | `Branch does not belong to this supervisor`                                                    |
| [player-auth.service.ts:111](../casino/src/modules/player-auth/player-auth.service.ts#L111)         | `ConflictException`            | `A player with this email already exists`                                                      |
| [player-auth.service.ts:124](../casino/src/modules/player-auth/player-auth.service.ts#L124)         | `ConflictException`            | `This username is already taken`                                                               |
| [player-auth.service.ts:192](../casino/src/modules/player-auth/player-auth.service.ts#L192)         | `InternalServerErrorException` | `Failed to initialize player wallet`                                                           |
| [player-auth.service.ts:226](../casino/src/modules/player-auth/player-auth.service.ts#L226)         | `UnauthorizedException`        | `Invalid credentials` (login, wrong email/username)                                            |
| [player-auth.service.ts:232](../casino/src/modules/player-auth/player-auth.service.ts#L232)         | `UnauthorizedException`        | `Invalid credentials` (login, wrong password)                                                  |
| [player-auth.service.ts:237](../casino/src/modules/player-auth/player-auth.service.ts#L237)         | `ForbiddenException`           | `Your account is <status>. Please contact support.` — `<status>` is e.g. `suspended`, `closed` |
| [player-auth.service.ts:243](../casino/src/modules/player-auth/player-auth.service.ts#L243)         | `ForbiddenException`           | `Your account is self-excluded. Contact support to discuss removal.`                           |
| [player-auth.service.ts:455](../casino/src/modules/player-auth/player-auth.service.ts#L455)         | `UnauthorizedException`        | `Player not found` (profile update)                                                            |
| [player-auth.service.ts:504](../casino/src/modules/player-auth/player-auth.service.ts#L504)         | `UnauthorizedException`        | `Player not found` (change password)                                                           |
| [player-auth.service.ts:509](../casino/src/modules/player-auth/player-auth.service.ts#L509)         | `UnauthorizedException`        | `Current password is incorrect`                                                                |
| [player-auth.service.ts:639](../casino/src/modules/player-auth/player-auth.service.ts#L639)         | `UnauthorizedException`        | `Invalid or expired reset token`                                                               |
| [player-auth.service.ts:643](../casino/src/modules/player-auth/player-auth.service.ts#L643)         | `UnauthorizedException`        | `Invalid token type`                                                                           |
| [player-auth.service.ts:647](../casino/src/modules/player-auth/player-auth.service.ts#L647)         | `UnauthorizedException`        | `This reset token has already been used`                                                       |
| [player-auth.service.ts:651](../casino/src/modules/player-auth/player-auth.service.ts#L651)         | `UnauthorizedException`        | `This reset token has expired`                                                                 |
| [player-auth.service.ts:693](../casino/src/modules/player-auth/player-auth.service.ts#L693)         | `UnauthorizedException`        | `Player not found` (resend verification)                                                       |
| [player-auth.service.ts:769](../casino/src/modules/player-auth/player-auth.service.ts#L769)         | `UnauthorizedException`        | `Invalid or expired verification token`                                                        |
| [player-auth.service.ts:773](../casino/src/modules/player-auth/player-auth.service.ts#L773)         | `UnauthorizedException`        | `Invalid token type`                                                                           |
| [player-auth.service.ts:777](../casino/src/modules/player-auth/player-auth.service.ts#L777)         | `UnauthorizedException`        | `This token has already been used`                                                             |
| [player-auth.service.ts:781](../casino/src/modules/player-auth/player-auth.service.ts#L781)         | `UnauthorizedException`        | `This verification token has expired`                                                          |
| [guards/player-auth.guard.ts:36](../casino/src/modules/player-auth/guards/player-auth.guard.ts#L36) | `UnauthorizedException`        | `Missing or invalid authorization header`                                                      |
| [guards/player-auth.guard.ts:42](../casino/src/modules/player-auth/guards/player-auth.guard.ts#L42) | `UnauthorizedException`        | `Missing token`                                                                                |
| [guards/player-auth.guard.ts:48](../casino/src/modules/player-auth/guards/player-auth.guard.ts#L48) | `UnauthorizedException`        | `Invalid or expired session`                                                                   |
| [guards/player-auth.guard.ts:55](../casino/src/modules/player-auth/guards/player-auth.guard.ts#L55) | `UnauthorizedException`        | `Account is <status>` — status changed since login                                             |

---

## 2. Wallet & Money

### `wallet` — real-money wallet operations

`src/modules/wallet/`

| File:Line                                                                                      | Exception             | Message                                                                                                                     |
| ---------------------------------------------------------------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| [wallet.service.ts:77](../casino/src/modules/wallet/wallet.service.ts#L77)                     | `NotFoundException`   | `No active wallet found for currency <X>`                                                                                   |
| [wallet.service.ts:161](../casino/src/modules/wallet/wallet.service.ts#L161)                   | `NotFoundException`   | `No active wallet found for player <id> with currency <X>`                                                                  |
| [wallet.service.ts:224](../casino/src/modules/wallet/wallet.service.ts#L224)                   | `BadRequestException` | `Deposit amount must be positive`                                                                                           |
| [wallet.service.ts:298](../casino/src/modules/wallet/wallet.service.ts#L298)                   | `BadRequestException` | `Withdrawal amount must be positive`                                                                                        |
| [wallet.service.ts:450](../casino/src/modules/wallet/wallet.service.ts#L450)                   | `NotFoundException`   | `No active wallet found for player <id> with currency <X>` (admin path)                                                     |
| [wallet.service.ts:456](../casino/src/modules/wallet/wallet.service.ts#L456)                   | `BadRequestException` | `Insufficient funds — the player does not have enough balance for this withdrawal`                                          |
| [wallet.controller.ts:96](../casino/src/modules/wallet/wallet.controller.ts#L96)               | `ForbiddenException`  | `Mock deposits are disabled in production. Use the payment gateway integration.`                                            |
| [wallet.controller.ts:146](../casino/src/modules/wallet/wallet.controller.ts#L146)             | `ForbiddenException`  | `Mock withdrawals are disabled in production. Use the payout gateway integration.`                                          |
| [wallet.controller.ts:193](../casino/src/modules/wallet/wallet.controller.ts#L193)             | `ForbiddenException`  | `Wallet seeding is disabled in production`                                                                                  |
| [admin-wallet.controller.ts:174](../casino/src/modules/wallet/admin-wallet.controller.ts#L174) | `NotFoundException`   | `Player not found`                                                                                                          |
| [admin-wallet.controller.ts:182](../casino/src/modules/wallet/admin-wallet.controller.ts#L182) | `BadRequestException` | `Player <id> has an invalid branchId (<value>). Re-assign the player to a real branch before performing wallet operations.` |

### `branch-credit` — branch credit wallet (admin)

`src/modules/branch-credit/`

| File:Line                                                                                         | Exception             | Message                                                                                                   |
| ------------------------------------------------------------------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------- |
| [branch-credit.service.ts:60](../casino/src/modules/branch-credit/branch-credit.service.ts#L60)   | `NotFoundException`   | `Branch <id> not found`                                                                                   |
| [branch-credit.service.ts:95](../casino/src/modules/branch-credit/branch-credit.service.ts#L95)   | `NotFoundException`   | `No credit wallet found for branch <id>`                                                                  |
| [branch-credit.service.ts:127](../casino/src/modules/branch-credit/branch-credit.service.ts#L127) | `BadRequestException` | `Payment amount must be positive`                                                                         |
| [branch-credit.service.ts:192](../casino/src/modules/branch-credit/branch-credit.service.ts#L192) | `BadRequestException` | `Amount must be positive` (consume)                                                                       |
| [branch-credit.service.ts:198](../casino/src/modules/branch-credit/branch-credit.service.ts#L198) | `BadRequestException` | `Insufficient branch credit. Available: <X>, requested: <Y>`                                              |
| [branch-credit.service.ts:257](../casino/src/modules/branch-credit/branch-credit.service.ts#L257) | `BadRequestException` | `Amount must be positive` (release)                                                                       |
| [branch-credit.service.ts:314](../casino/src/modules/branch-credit/branch-credit.service.ts#L314) | `BadRequestException` | `Adjustment amount cannot be zero`                                                                        |
| [branch-credit.service.ts:321](../casino/src/modules/branch-credit/branch-credit.service.ts#L321) | `BadRequestException` | `Adjustment would result in negative credit (<X>). Current: <Y>`                                          |
| [branch-credit.service.ts:385](../casino/src/modules/branch-credit/branch-credit.service.ts#L385) | `NotFoundException`   | `No credit wallet found for branch <id>`                                                                  |
| [branch-credit.service.ts:459](../casino/src/modules/branch-credit/branch-credit.service.ts#L459) | `NotFoundException`   | `No credit wallet found for branch <id>. Create one first via POST /admin/branch-credit/:branchId/wallet` |
| [branch-credit.service.ts:465](../casino/src/modules/branch-credit/branch-credit.service.ts#L465) | `BadRequestException` | `Branch <id> credit wallet is frozen. Contact platform admin.`                                            |

---

## 3. Payments (deposits / withdrawals)

`src/modules/payments/`

| File:Line                                                                                                                | Exception                     | Message                                                  |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------------------- | -------------------------------------------------------- |
| [payments.service.ts:190](../casino/src/modules/payments/payments.service.ts#L190)                                       | `NotFoundException`           | `Branch <id> not found`                                  |
| [payments.service.ts:197](../casino/src/modules/payments/payments.service.ts#L197)                                       | `BadRequestException`         | `Branch <id> has no credit wallet — initialize it first` |
| [payments.service.ts:275](../casino/src/modules/payments/payments.service.ts#L275)                                       | `BadRequestException`         | `Invalid webhook signature`                              |
| [payments.service.ts:286](../casino/src/modules/payments/payments.service.ts#L286)                                       | `NotFoundException`           | `Unknown payment reference`                              |
| [payments.service.ts:346](../casino/src/modules/payments/payments.service.ts#L346)                                       | `NotFoundException`           | `Payment not found` (cancel)                             |
| [payments.service.ts:353](../casino/src/modules/payments/payments.service.ts#L353)                                       | `ConflictException`           | `Cannot cancel payment in <status> state`                |
| [payments.service.ts:441](../casino/src/modules/payments/payments.service.ts#L441)                                       | `NotFoundException`           | `Payment not found` (admin lookup)                       |
| [payments.service.ts:450](../casino/src/modules/payments/payments.service.ts#L450)                                       | `NotFoundException`           | `Payment not found` (player lookup)                      |
| [payments.service.ts:457](../casino/src/modules/payments/payments.service.ts#L457)                                       | `NotFoundException`           | `Provider <name> does not publish a bank list`           |
| [payments.service.ts:534](../casino/src/modules/payments/payments.service.ts#L534)                                       | `BadRequestException`         | `Amount must be positive`                                |
| [payments.service.ts:730](../casino/src/modules/payments/payments.service.ts#L730)                                       | `ServiceUnavailableException` | `Payment provider <name> is not registered`              |
| [payments.service.ts:775](../casino/src/modules/payments/payments.service.ts#L775)                                       | `NotFoundException`           | `Player <id> not found`                                  |
| [payments.service.ts:783](../casino/src/modules/payments/payments.service.ts#L783)                                       | `ForbiddenException`          | `Player is outside your supervisor scope`                |
| [payments.service.ts:788](../casino/src/modules/payments/payments.service.ts#L788)                                       | `ForbiddenException`          | `Player is outside your branch scope`                    |
| [payments-webhooks.controller.ts:48](../casino/src/modules/payments/payments-webhooks.controller.ts#L48)                 | `BadRequestException`         | `Unknown payment provider: <name>`                       |
| [providers/alensoft/alensoft.service.ts:96](../casino/src/modules/payments/providers/alensoft/alensoft.service.ts#L96)   | `BadRequestException`         | `Deposit amount must be positive` (AlenSoft)             |
| [providers/alensoft/alensoft.service.ts:147](../casino/src/modules/payments/providers/alensoft/alensoft.service.ts#L147) | `BadRequestException`         | `AlenSoft withdrawal requires \`iban\` and \`bankCode\`` |
| [providers/alensoft/alensoft.service.ts:154](../casino/src/modules/payments/providers/alensoft/alensoft.service.ts#L154) | `BadRequestException`         | `Withdrawal must be at least <X> TL`                     |
| [providers/alensoft/alensoft.service.ts:254](../casino/src/modules/payments/providers/alensoft/alensoft.service.ts#L254) | `ServiceUnavailableException` | `AlenSoft banks unavailable`                             |
| [providers/alensoft/alensoft.service.ts:276](../casino/src/modules/payments/providers/alensoft/alensoft.service.ts#L276) | `ServiceUnavailableException` | `Payment provider unavailable`                           |
| [providers/alensoft/alensoft.service.ts:283](../casino/src/modules/payments/providers/alensoft/alensoft.service.ts#L283) | `ServiceUnavailableException` | `Payment provider unavailable`                           |
| [providers/alensoft/alensoft.service.ts:298](../casino/src/modules/payments/providers/alensoft/alensoft.service.ts#L298) | `ServiceUnavailableException` | `AlenSoft is not configured (missing API credentials)`   |

---

## 4. Promotions

### `promotions` — admin CRUD + scope authorization

`src/modules/promotions/`

| File:Line                                                                                        | Exception                     | Message                                                                                                                          |
| ------------------------------------------------------------------------------------------------ | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [promotions.service.ts:197](../casino/src/modules/promotions/promotions.service.ts#L197)         | `BadRequestException`         | `Cannot update an archived promotion.`                                                                                           |
| [promotions.service.ts:223](../casino/src/modules/promotions/promotions.service.ts#L223)         | `BadRequestException`         | `Cannot update an archived promotion.` (image path)                                                                              |
| [promotions.service.ts:243](../casino/src/modules/promotions/promotions.service.ts#L243)         | `BadRequestException`         | `Archived promotions cannot be reactivated. Create a new one.`                                                                   |
| [promotions.service.ts:319](../casino/src/modules/promotions/promotions.service.ts#L319)         | `BadRequestException`         | `BRANCH-scoped promotions are implicitly enrolled and cannot be opted into.`                                                     |
| [promotions.service.ts:446](../casino/src/modules/promotions/promotions.service.ts#L446)         | `BadRequestException`         | `Promotion <id> is of type <X>, cannot apply <Y> rules.`                                                                         |
| [promotions.service.ts:451](../casino/src/modules/promotions/promotions.service.ts#L451)         | `BadRequestException`         | `Cannot update rules of an archived promotion.`                                                                                  |
| [promotions.service.ts:504](../casino/src/modules/promotions/promotions.service.ts#L504)         | `BadRequestException`         | `Provide either a total_bet_id or a bet_id (+ denomination), not both.`                                                          |
| [promotions.service.ts:509](../casino/src/modules/promotions/promotions.service.ts#L509)         | `BadRequestException`         | `A bet_id freespin selection also requires a denomination.`                                                                      |
| [promotions.service.ts:521](../casino/src/modules/promotions/promotions.service.ts#L521)         | `ServiceUnavailableException` | `Could not validate the freespin stake with the provider — try again shortly.`                                                   |
| [promotions.service.ts:532](../casino/src/modules/promotions/promotions.service.ts#L532)         | `BadRequestException`         | `The selected freespin bet is not offered by the provider for this game and currency. Refresh the bet options and choose again.` |
| [promotions.service.ts:549](../casino/src/modules/promotions/promotions.service.ts#L549)         | `NotFoundException`           | `Promotion not found`                                                                                                            |
| [promotions.service.ts:576-592](../casino/src/modules/promotions/promotions.service.ts#L576)     | `ForbiddenException` (×4)     | `Not allowed` — scope-check failure (write access)                                                                               |
| [promotions.service.ts:641](../casino/src/modules/promotions/promotions.service.ts#L641)         | `BadRequestException`         | `Invalid slug.`                                                                                                                  |
| [promotions.service.ts:661](../casino/src/modules/promotions/promotions.service.ts#L661)         | `BadRequestException`         | `A promotion with slug "<X>" already exists at this scope.`                                                                      |
| [promotions.service.ts:675](../casino/src/modules/promotions/promotions.service.ts#L675)         | `BadRequestException`         | `validFrom must be ≤ validUntil.`                                                                                                |
| [promotions.service.ts:688](../casino/src/modules/promotions/promotions.service.ts#L688)         | `NotFoundException`           | `Branch not found.`                                                                                                              |
| [promotions.service.ts:719](../casino/src/modules/promotions/promotions.service.ts#L719)         | `NotFoundException`           | `Branch not found.` (enrollment)                                                                                                 |
| [promotions.service.ts:726](../casino/src/modules/promotions/promotions.service.ts#L726)         | `BadRequestException`         | `Branch is not under the promotion's supervisor.`                                                                                |
| [promotions.service.ts:735](../casino/src/modules/promotions/promotions.service.ts#L735)         | `ForbiddenException`          | `Branch is not under your supervisor.`                                                                                           |
| [promotions.service.ts:741](../casino/src/modules/promotions/promotions.service.ts#L741)         | `ForbiddenException`          | `BRANCH_MANAGER admins can only enroll their own branch.`                                                                        |
| [promotions.service.ts:747](../casino/src/modules/promotions/promotions.service.ts#L747)         | `ForbiddenException`          | `Not allowed.` (enrollment, fallthrough)                                                                                         |
| [promotions.controller.ts:272](../casino/src/modules/promotions/promotions.controller.ts#L272)   | `BadRequestException`         | `No image file uploaded`                                                                                                         |
| [promotion-image.service.ts:97](../casino/src/modules/promotions/promotion-image.service.ts#L97) | `BadRequestException`         | `Uploaded file is not a valid PNG, JPEG, or WebP image. The file content does not match any supported image format.`             |

### `utils/scope-authz.ts` — promotion scope authorization (called from admin paths)

| File:Line                                                                        | Exception             | Message                                                                                 |
| -------------------------------------------------------------------------------- | --------------------- | --------------------------------------------------------------------------------------- |
| [scope-authz.ts:79](../casino/src/modules/promotions/utils/scope-authz.ts#L79)   | `ForbiddenException`  | `Only platform admins can author PLATFORM-scoped promotions.`                           |
| [scope-authz.ts:84](../casino/src/modules/promotions/utils/scope-authz.ts#L84)   | `BadRequestException` | `PLATFORM scope must not include supervisorId or branchId.`                             |
| [scope-authz.ts:95](../casino/src/modules/promotions/utils/scope-authz.ts#L95)   | `BadRequestException` | `supervisorId is required when a PLATFORM_ADMIN authors a SUPERVISOR-scoped promotion.` |
| [scope-authz.ts:102](../casino/src/modules/promotions/utils/scope-authz.ts#L102) | `ForbiddenException`  | `Only SUPERVISOR admins (or PLATFORM_ADMIN) can author SUPERVISOR-scoped promotions.`   |
| [scope-authz.ts:107](../casino/src/modules/promotions/utils/scope-authz.ts#L107) | `ForbiddenException`  | `SUPERVISOR admins can only author for their own supervisor.`                           |
| [scope-authz.ts:114](../casino/src/modules/promotions/utils/scope-authz.ts#L114) | `BadRequestException` | `SUPERVISOR scope must not include branchId.`                                           |
| [scope-authz.ts:123](../casino/src/modules/promotions/utils/scope-authz.ts#L123) | `BadRequestException` | `branchId is required for BRANCH-scoped promotions.`                                    |
| [scope-authz.ts:131](../casino/src/modules/promotions/utils/scope-authz.ts#L131) | `BadRequestException` | `branchId could not be resolved.`                                                       |
| [scope-authz.ts:142](../casino/src/modules/promotions/utils/scope-authz.ts#L142) | `BadRequestException` | `Could not resolve the owning supervisor for this branch.`                              |
| [scope-authz.ts:153](../casino/src/modules/promotions/utils/scope-authz.ts#L153) | `ForbiddenException`  | `SUPERVISOR admins can only author for branches under their own supervisor.`            |
| [scope-authz.ts:160](../casino/src/modules/promotions/utils/scope-authz.ts#L160) | `ForbiddenException`  | `BRANCH_MANAGER admins can only author for their own branch.`                           |
| [scope-authz.ts:165](../casino/src/modules/promotions/utils/scope-authz.ts#L165) | `ForbiddenException`  | `This supervisor has not enabled branch-authored promotions.`                           |
| [scope-authz.ts:171](../casino/src/modules/promotions/utils/scope-authz.ts#L171) | `ForbiddenException`  | `This role cannot author BRANCH-scoped promotions.`                                     |
| [scope-authz.ts:204](../casino/src/modules/promotions/utils/scope-authz.ts#L204) | `ForbiddenException`  | `Only PLATFORM_ADMIN can modify PLATFORM-scoped promotions.`                            |
| [scope-authz.ts:210](../casino/src/modules/promotions/utils/scope-authz.ts#L210) | `ForbiddenException`  | `Only the owning supervisor can modify a SUPERVISOR-scoped promotion.`                  |
| [scope-authz.ts:215](../casino/src/modules/promotions/utils/scope-authz.ts#L215) | `ForbiddenException`  | `You can only modify your own supervisor scope.`                                        |
| [scope-authz.ts:222](../casino/src/modules/promotions/utils/scope-authz.ts#L222) | `ForbiddenException`  | `Branch is not under your supervisor.`                                                  |
| [scope-authz.ts:228](../casino/src/modules/promotions/utils/scope-authz.ts#L228) | `ForbiddenException`  | `BRANCH_MANAGER admins can only modify their own branch promotions.`                    |
| [scope-authz.ts:234](../casino/src/modules/promotions/utils/scope-authz.ts#L234) | `ForbiddenException`  | `Insufficient permissions for this promotion.`                                          |

### `player-promotions` — player-facing claim flow

| File:Line                                                                                              | Exception             | Message                                                               |
| ------------------------------------------------------------------------------------------------------ | --------------------- | --------------------------------------------------------------------- |
| [player-promotions.service.ts:461](../casino/src/modules/promotions/player-promotions.service.ts#L461) | `NotFoundException`   | `Claim not found`                                                     |
| [player-promotions.service.ts:493](../casino/src/modules/promotions/player-promotions.service.ts#L493) | `NotFoundException`   | `Promotion not available` (claim attempt)                             |
| [player-promotions.service.ts:496](../casino/src/modules/promotions/player-promotions.service.ts#L496) | `BadRequestException` | `Promotion is not active`                                             |
| [player-promotions.service.ts:501](../casino/src/modules/promotions/player-promotions.service.ts#L501) | `ForbiddenException`  | `Promotion is not available for this player`                          |
| [player-promotions.service.ts:508](../casino/src/modules/promotions/player-promotions.service.ts#L508) | `BadRequestException` | `Not eligible for this promotion (<reason>).`                         |
| [player-promotions.service.ts:527](../casino/src/modules/promotions/player-promotions.service.ts#L527) | `ConflictException`   | `You have already claimed this promotion. Check your active bonuses.` |

### `bonus-wallet`, `freespin-grant`, `loss-cashback` — promotion fulfilment

| File:Line                                                                                        | Exception             | Message                                                                                                                |
| ------------------------------------------------------------------------------------------------ | --------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| [bonus-wallet.service.ts:157](../casino/src/modules/promotions/bonus-wallet.service.ts#L157)     | `ConflictException`   | `Bonus wallet already exists for claim <id>.`                                                                          |
| [bonus-wallet.service.ts:350](../casino/src/modules/promotions/bonus-wallet.service.ts#L350)     | `NotFoundException`   | `Bonus wallet <id> not found.`                                                                                         |
| [bonus-wallet.service.ts:353](../casino/src/modules/promotions/bonus-wallet.service.ts#L353)     | `BadRequestException` | `Bonus wallet <id> is inactive (already voided or converted).`                                                         |
| [bonus-wallet.service.ts:358](../casino/src/modules/promotions/bonus-wallet.service.ts#L358)     | `BadRequestException` | `Insufficient bonus balance: requested <X>, available <Y>.`                                                            |
| [bonus-wallet.service.ts:401](../casino/src/modules/promotions/bonus-wallet.service.ts#L401)     | `NotFoundException`   | `Bonus wallet <id> not found.` (close)                                                                                 |
| [bonus-wallet.service.ts:472](../casino/src/modules/promotions/bonus-wallet.service.ts#L472)     | `BadRequestException` | `Invalid amount "<X>".`                                                                                                |
| [bonus-wallet.service.ts:475](../casino/src/modules/promotions/bonus-wallet.service.ts#L475)     | `BadRequestException` | `Amount must not be negative.`                                                                                         |
| [bonus-wallet.service.ts:478](../casino/src/modules/promotions/bonus-wallet.service.ts#L478)     | `BadRequestException` | `Amount must be greater than zero.`                                                                                    |
| [freespin-grant.service.ts:78](../casino/src/modules/promotions/freespin-grant.service.ts#L78)   | `BadGatewayException` | `Freespin currency mismatch: rule=<X>, claim=<Y>`                                                                      |
| [freespin-grant.service.ts:102](../casino/src/modules/promotions/freespin-grant.service.ts#L102) | `ConflictException`   | `This freespin promotion is temporarily unavailable — the provider changed its stake terms and it is awaiting review.` |
| [freespin-grant.service.ts:132](../casino/src/modules/promotions/freespin-grant.service.ts#L132) | `BadGatewayException` | `Could not grant freespins — upstream provider rejected the request`                                                   |
| [loss-cashback.service.ts:78](../casino/src/modules/promotions/loss-cashback.service.ts#L78)     | `BadRequestException` | `Real wallet balance <X> exceeds the cashback limit of <Y> — settle down first or wait for the next window.`           |
| [loss-cashback.service.ts:93](../casino/src/modules/promotions/loss-cashback.service.ts#L93)     | `BadRequestException` | `No net loss in the qualifying window — nothing to refund (bets=<X>, wins=<Y>).`                                       |
| [loss-cashback.service.ts:98](../casino/src/modules/promotions/loss-cashback.service.ts#L98)     | `BadRequestException` | `Net loss <X> <CCY> is below the minimum <Y> required for this cashback.`                                              |
| [loss-cashback.service.ts:110](../casino/src/modules/promotions/loss-cashback.service.ts#L110)   | `BadRequestException` | `Computed cashback is zero.`                                                                                           |

---

## 5. Games

### `games` — catalog + admin tools

`src/modules/games/`

| File:Line                                                                       | Exception             | Message                                                  |
| ------------------------------------------------------------------------------- | --------------------- | -------------------------------------------------------- |
| [games.service.ts:198](../casino/src/modules/games/games.service.ts#L198)       | `NotFoundException`   | `Game with UUID <X> not found`                           |
| [games.service.ts:780](../casino/src/modules/games/games.service.ts#L780)       | `BadRequestException` | `CSV must contain "Game ID" and "Release Date" columns.` |
| [games.controller.ts:190](../casino/src/modules/games/games.controller.ts#L190) | `BadRequestException` | `No CSV file uploaded`                                   |
| [games.controller.ts:194](../casino/src/modules/games/games.controller.ts#L194) | `BadRequestException` | `File must be a valid CSV`                               |

### `game-sessions` — launching gameplay

`src/modules/game-sessions/`

| File:Line                                                                                         | Exception             | Message                                                                    |
| ------------------------------------------------------------------------------------------------- | --------------------- | -------------------------------------------------------------------------- |
| [game-sessions.service.ts:57](../casino/src/modules/game-sessions/game-sessions.service.ts#L57)   | `NotFoundException`   | `Game not found or inactive: <uuid>`                                       |
| [game-sessions.service.ts:68](../casino/src/modules/game-sessions/game-sessions.service.ts#L68)   | `NotFoundException`   | `Player not found: <id>`                                                   |
| [game-sessions.service.ts:80](../casino/src/modules/game-sessions/game-sessions.service.ts#L80)   | `BadRequestException` | `No active wallet for currency <X>. Create one first.`                     |
| [game-sessions.service.ts:163](../casino/src/modules/game-sessions/game-sessions.service.ts#L163) | `NotFoundException`   | `Game not found or inactive: <uuid>` (demo launch)                         |
| [game-sessions.service.ts:274](../casino/src/modules/game-sessions/game-sessions.service.ts#L274) | `ForbiddenException`  | `Your account is self-excluded. You cannot play games during this period.` |

### `slotegrator` — provider HTTP proxy

`src/modules/slotegrator/`

| File:Line                                                                                   | Exception       | Status                                                          | Message                                       |
| ------------------------------------------------------------------------------------------- | --------------- | --------------------------------------------------------------- | --------------------------------------------- |
| [slotegrator.service.ts:216](../casino/src/modules/slotegrator/slotegrator.service.ts#L216) | `HttpException` | upstream 4xx (pass-through) or 502 (upstream 5xx → BAD_GATEWAY) | `Slotegrator <endpoint>: <upstream message>`  |
| [slotegrator.service.ts:226](../casino/src/modules/slotegrator/slotegrator.service.ts#L226) | `HttpException` | 502                                                             | `Slotegrator <endpoint> unreachable: <error>` |
| [slotegrator.service.ts:236](../casino/src/modules/slotegrator/slotegrator.service.ts#L236) | `HttpException` | 502                                                             | `Slotegrator API error: <code> — <message>`   |

---

## 6. Responsible Gaming

`src/modules/responsible-gaming/`

| File:Line                                                                                                                | Exception             | Message                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [responsible-gaming.service.ts:41](../casino/src/modules/responsible-gaming/responsible-gaming.service.ts#L41)           | `BadRequestException` | `An active self-exclusion is already applied to this account.`                                                     |
| [responsible-gaming.service.ts:112](../casino/src/modules/responsible-gaming/responsible-gaming.service.ts#L112)         | `BadRequestException` | `COOLING_OFF requires a durationDays value of at least 1.`                                                         |
| [responsible-gaming.service.ts:119](../casino/src/modules/responsible-gaming/responsible-gaming.service.ts#L119)         | `BadRequestException` | `SESSION_TIME_LIMIT requires an amount (minutes per session).`                                                     |
| [responsible-gaming.service.ts:126](../casino/src/modules/responsible-gaming/responsible-gaming.service.ts#L126)         | `BadRequestException` | `<type> requires an amount.`                                                                                       |
| [responsible-gaming.service.ts:232](../casino/src/modules/responsible-gaming/responsible-gaming.service.ts#L232)         | `NotFoundException`   | `Restriction not found.`                                                                                           |
| [responsible-gaming.service.ts:236](../casino/src/modules/responsible-gaming/responsible-gaming.service.ts#L236)         | `BadRequestException` | `This restriction is already inactive.`                                                                            |
| [responsible-gaming.service.ts:242](../casino/src/modules/responsible-gaming/responsible-gaming.service.ts#L242)         | `ForbiddenException`  | `Self-exclusion cannot be cancelled by the player. Please contact support.`                                        |
| [guards/responsible-gaming.guard.ts:42](../casino/src/modules/responsible-gaming/guards/responsible-gaming.guard.ts#L42) | `ForbiddenException`  | `Player context not found. Ensure PlayerAuthGuard runs first.`                                                     |
| [guards/responsible-gaming.guard.ts:51](../casino/src/modules/responsible-gaming/guards/responsible-gaming.guard.ts#L51) | `ForbiddenException`  | `<blockingRestriction.reason>` — dynamic per-restriction message (e.g. "Your session time limit has been reached") |

---

## 7. Freespins (legacy direct-provider path)

`src/modules/freespins/`

| File:Line                                                                             | Exception           | Message                                                                   |
| ------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------- |
| [freespins.service.ts:41](../casino/src/modules/freespins/freespins.service.ts#L41)   | `NotFoundException` | `Game "<uuid>" not found in local catalog. Run sync first.` (create)      |
| [freespins.service.ts:109](../casino/src/modules/freespins/freespins.service.ts#L109) | `NotFoundException` | `Game "<uuid>" not found in local catalog. Run sync first.` (bets lookup) |
| [freespins.service.ts:139](../casino/src/modules/freespins/freespins.service.ts#L139) | `NotFoundException` | `Freespin campaign "<id>" not found.`                                     |
| [freespins.service.ts:167](../casino/src/modules/freespins/freespins.service.ts#L167) | `NotFoundException` | `Freespin campaign "<id>" not found.` (cancel)                            |

---

## 8. Freevouchers

`src/modules/freevouchers/`

| File:Line                                                                                      | Exception           | Message                                     |
| ---------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------- |
| [freevouchers.service.ts:43](../casino/src/modules/freevouchers/freevouchers.service.ts#L43)   | `ConflictException` | `Freevoucher "<id>" is already active.`     |
| [freevouchers.service.ts:105](../casino/src/modules/freevouchers/freevouchers.service.ts#L105) | `NotFoundException` | `No active freevouchers for player "<id>".` |
| [freevouchers.service.ts:139](../casino/src/modules/freevouchers/freevouchers.service.ts#L139) | `NotFoundException` | `Freevoucher "<id>" not found.`             |

---

## 9. Backoffice (multi-tenant admin: supervisors / partners / branches / admin users / players)

`src/modules/backoffice/`

| File:Line                                                                                  | Exception             | Message                                                                                      |
| ------------------------------------------------------------------------------------------ | --------------------- | -------------------------------------------------------------------------------------------- |
| [backoffice.service.ts:239](../casino/src/modules/backoffice/backoffice.service.ts#L239)   | `BadRequestException` | `Search query must be at least 3 characters`                                                 |
| [backoffice.service.ts:330](../casino/src/modules/backoffice/backoffice.service.ts#L330)   | `NotFoundException`   | `Supervisor not found`                                                                       |
| [backoffice.service.ts:339](../casino/src/modules/backoffice/backoffice.service.ts#L339)   | `BadRequestException` | `Slug "<X>" is already taken` (supervisor create)                                            |
| [backoffice.service.ts:346](../casino/src/modules/backoffice/backoffice.service.ts#L346)   | `BadRequestException` | `An admin account with this email already exists` (supervisor create)                        |
| [backoffice.service.ts:516](../casino/src/modules/backoffice/backoffice.service.ts#L516)   | `NotFoundException`   | `Partner not found`                                                                          |
| [backoffice.service.ts:533](../casino/src/modules/backoffice/backoffice.service.ts#L533)   | `BadRequestException` | `An admin account with this email already exists` (partner create)                           |
| [backoffice.service.ts:543](../casino/src/modules/backoffice/backoffice.service.ts#L543)   | `BadRequestException` | `A partner named "<X>" already exists under this supervisor. Pick a different name.`         |
| [backoffice.service.ts:696](../casino/src/modules/backoffice/backoffice.service.ts#L696)   | `NotFoundException`   | `Branch not found`                                                                           |
| [backoffice.service.ts:719](../casino/src/modules/backoffice/backoffice.service.ts#L719)   | `NotFoundException`   | `Branch not found` (detail get)                                                              |
| [backoffice.service.ts:726](../casino/src/modules/backoffice/backoffice.service.ts#L726)   | `ForbiddenException`  | `Access denied` (branch get, wrong scope)                                                    |
| [backoffice.service.ts:744](../casino/src/modules/backoffice/backoffice.service.ts#L744)   | `ForbiddenException`  | `Access denied` (branch create, wrong scope)                                                 |
| [backoffice.service.ts:753](../casino/src/modules/backoffice/backoffice.service.ts#L753)   | `NotFoundException`   | `Partner not found` (branch create)                                                          |
| [backoffice.service.ts:760](../casino/src/modules/backoffice/backoffice.service.ts#L760)   | `BadRequestException` | `An admin account with this email already exists` (branch create)                            |
| [backoffice.service.ts:770](../casino/src/modules/backoffice/backoffice.service.ts#L770)   | `BadRequestException` | `A branch named "<X>" already exists under this partner. Pick a different name.`             |
| [backoffice.service.ts:889](../casino/src/modules/backoffice/backoffice.service.ts#L889)   | `NotFoundException`   | `Player not found`                                                                           |
| [backoffice.service.ts:966](../casino/src/modules/backoffice/backoffice.service.ts#L966)   | `BadRequestException` | `Cannot admin-suspend a self-excluded player. Use the responsible gaming override workflow.` |
| [backoffice.service.ts:1001](../casino/src/modules/backoffice/backoffice.service.ts#L1001) | `ForbiddenException`  | `Self-excluded players cannot be reactivated via admin.`                                     |
| [backoffice.service.ts:1033](../casino/src/modules/backoffice/backoffice.service.ts#L1033) | `NotFoundException`   | `No <CCY> wallet found for player <id>`                                                      |
| [backoffice.service.ts:1041](../casino/src/modules/backoffice/backoffice.service.ts#L1041) | `BadRequestException` | `Manual debit would result in a negative balance`                                            |
| [backoffice.service.ts:1337](../casino/src/modules/backoffice/backoffice.service.ts#L1337) | `ForbiddenException`  | `SUPERVISOR cannot create PLATFORM_ADMIN or SUPERVISOR accounts`                             |
| [backoffice.service.ts:1341](../casino/src/modules/backoffice/backoffice.service.ts#L1341) | `ForbiddenException`  | `Cannot create admin user for a different supervisor`                                        |
| [backoffice.service.ts:1350](../casino/src/modules/backoffice/backoffice.service.ts#L1350) | `BadRequestException` | `An admin user with this email already exists`                                               |
| [backoffice.service.ts:1386](../casino/src/modules/backoffice/backoffice.service.ts#L1386) | `NotFoundException`   | `Admin user not found`                                                                       |
| [backoffice.service.ts:1392](../casino/src/modules/backoffice/backoffice.service.ts#L1392) | `ForbiddenException`  | `Access denied` (admin update, wrong scope)                                                  |
| [backoffice.service.ts:1415](../casino/src/modules/backoffice/backoffice.service.ts#L1415) | `BadRequestException` | `You cannot deactivate your own account`                                                     |
| [backoffice.service.ts:1439](../casino/src/modules/backoffice/backoffice.service.ts#L1439) | `ForbiddenException`  | `Access denied — resource belongs to a different supervisor`                                 |

---

## 10. Platform Settings

`src/modules/backoffice/services/`

| File:Line                                                                                                       | Exception                      | Message                            |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------ | ---------------------------------- |
| [platform-settings.service.ts:26](../casino/src/modules/backoffice/services/platform-settings.service.ts#L26)   | `InternalServerErrorException` | `Platform configuration not found` |
| [platform-settings.service.ts:41](../casino/src/modules/backoffice/services/platform-settings.service.ts#L41)   | `InternalServerErrorException` | `Platform configuration not found` |
| [platform-settings.service.ts:89](../casino/src/modules/backoffice/services/platform-settings.service.ts#L89)   | `InternalServerErrorException` | `Failed to clear image cache`      |
| [platform-settings.service.ts:117](../casino/src/modules/backoffice/services/platform-settings.service.ts#L117) | `InternalServerErrorException` | `Failed to reset game catalog`     |

---

## Cross-cutting notes

### Errors not enumerated here

This catalog covers **explicit `throw new XxxException(...)`** sites. Two other classes of error will hit the frontend without appearing in this list:

1. **`class-validator` rejections** from DTOs — `BadRequestException` with a `message` array describing each failed field. Triggered by Nest's global `ValidationPipe`. The frontend can detect these by checking if `message` is an array.
2. **Generic 500s from unhandled exceptions** — e.g. database connection drops, unexpected nulls. These have message `Internal server error` and no useful body; treat as "show generic error toast, log Sentry."

### Rate limiting

The throttler (`ThrottlerModule` configured in `app.module.ts`) returns `429 Too Many Requests` from any rate-limited route without going through one of these explicit throws.

### Multer / file upload errors

Promotion image and CSV uploads use Multer, whose validation failures (file too big, wrong mime type, multiple files when one expected) are caught and reformatted by `MulterExceptionFilter` ([src/common/filters/multer-exception.filter.ts](../casino/src/common/filters/multer-exception.filter.ts)) into clean `400` responses. Specific messages depend on which Multer rule fired.

### Slotegrator pass-through

The `slotegrator.service.ts` `HttpException` calls are uniquely shaped because they proxy upstream provider errors:

- Upstream 4xx is passed through with its original status code so the frontend sees the real cause.
- Upstream 5xx is collapsed to **502** because "their fault, not ours."
- Network failures (DNS, refused connection, timeout) also become **502**.

If you see a 502 mentioning "Slotegrator" in the message, it's an upstream issue — retry-with-backoff is appropriate.
