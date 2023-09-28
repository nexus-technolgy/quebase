/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PlayerController } from './../controllers/player-controller';
import type { RequestHandler, Router } from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "PlayerExperience": {
        "dataType": "refObject",
        "properties": {
            "earned": {"dataType":"double","required":true},
            "target": {"dataType":"double"},
            "stage": {"dataType":"double"},
            "expires": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlayerAchievement": {
        "dataType": "refObject",
        "properties": {
            "earned": {"dataType":"double","required":true},
            "target": {"dataType":"double"},
            "stage": {"dataType":"double"},
            "expires": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlayerProgress": {
        "dataType": "refObject",
        "properties": {
            "earned": {"dataType":"double","required":true},
            "target": {"dataType":"double"},
            "stage": {"dataType":"double"},
            "expires": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlayerCurrency": {
        "dataType": "refObject",
        "properties": {
            "balance": {"dataType":"double","required":true},
            "target": {"dataType":"double"},
            "expires": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlayerResource": {
        "dataType": "refObject",
        "properties": {
            "balance": {"dataType":"double","required":true},
            "target": {"dataType":"double"},
            "expires": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "R": {
        "dataType": "refAlias",
        "type": {"ref":"Record_string.unknown_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlayerPilot": {
        "dataType": "refObject",
        "properties": {
            "price": {"dataType":"array","array":{"dataType":"refObject","ref":"PlayerCurrency"}},
            "started": {"dataType":"double"},
            "duration": {"dataType":"double"},
            "downtime": {"dataType":"double"},
            "special": {"ref":"R","required":true},
            "expires": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlayerVehicle": {
        "dataType": "refObject",
        "properties": {
            "price": {"dataType":"array","array":{"dataType":"refObject","ref":"PlayerCurrency"}},
            "started": {"dataType":"double"},
            "duration": {"dataType":"double"},
            "downtime": {"dataType":"double"},
            "balance": {"dataType":"double","required":true},
            "capacity": {"dataType":"double","required":true},
            "expires": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlayerMission": {
        "dataType": "refObject",
        "properties": {
            "customer": {"dataType":"nestedObjectLiteral","nestedProperties":{"dialog":{"dataType":"string","required":true},"avatar":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},
            "started": {"dataType":"double"},
            "duration": {"dataType":"double"},
            "resource": {"ref":"PlayerResource"},
            "rewards": {"dataType":"nestedObjectLiteral","nestedProperties":{"pilot":{"ref":"PlayerPilot"},"vehicle":{"ref":"PlayerVehicle"},"resource":{"dataType":"array","array":{"dataType":"refObject","ref":"PlayerResource"}},"currency":{"dataType":"array","array":{"dataType":"refObject","ref":"PlayerCurrency"}},"progress":{"dataType":"array","array":{"dataType":"refObject","ref":"PlayerProgress"}},"experience":{"dataType":"array","array":{"dataType":"refObject","ref":"PlayerExperience"}}},"required":true},
            "vehicles": {"dataType":"array","array":{"dataType":"refObject","ref":"PlayerVehicle"}},
            "pilots": {"dataType":"array","array":{"dataType":"refObject","ref":"PlayerPilot"}},
            "expires": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlayerTerritory": {
        "dataType": "refObject",
        "properties": {
            "started": {"dataType":"double"},
            "duration": {"dataType":"double"},
            "progress": {"dataType":"array","array":{"dataType":"refObject","ref":"PlayerProgress"}},
            "vehicles": {"dataType":"array","array":{"dataType":"refObject","ref":"PlayerVehicle"}},
            "missions": {"dataType":"array","array":{"dataType":"refObject","ref":"PlayerMission"}},
            "expires": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Player": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "uid": {"dataType":"string","required":true},
            "locale": {"dataType":"string","required":true},
            "handle": {"dataType":"string","required":true},
            "avatar": {"dataType":"string","required":true},
            "group": {"dataType":"string"},
            "level": {"dataType":"double","required":true},
            "experience": {"dataType":"array","array":{"dataType":"refObject","ref":"PlayerExperience"},"required":true},
            "achievements": {"dataType":"array","array":{"dataType":"refObject","ref":"PlayerAchievement"}},
            "progress": {"dataType":"array","array":{"dataType":"refObject","ref":"PlayerProgress"}},
            "treasury": {"dataType":"array","array":{"dataType":"refObject","ref":"PlayerCurrency"}},
            "inventory": {"dataType":"nestedObjectLiteral","nestedProperties":{"resources":{"dataType":"array","array":{"dataType":"refObject","ref":"PlayerResource"},"required":true},"capacity":{"dataType":"double","required":true},"balance":{"dataType":"double","required":true}}},
            "pilots": {"dataType":"array","array":{"dataType":"refObject","ref":"PlayerPilot"}},
            "territories": {"dataType":"array","array":{"dataType":"refObject","ref":"PlayerTerritory"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_Player.handle-or-locale-or-avatar_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"handle":{"dataType":"string","required":true},"locale":{"dataType":"string","required":true},"avatar":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlayerCreateRequest": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_Player.handle-or-locale-or-avatar_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Player_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string"},"uid":{"dataType":"string"},"locale":{"dataType":"string"},"handle":{"dataType":"string"},"avatar":{"dataType":"string"},"group":{"dataType":"string"},"level":{"dataType":"double"},"experience":{"dataType":"array","array":{"dataType":"refObject","ref":"PlayerExperience"}},"achievements":{"dataType":"array","array":{"dataType":"refObject","ref":"PlayerAchievement"}},"progress":{"dataType":"array","array":{"dataType":"refObject","ref":"PlayerProgress"}},"treasury":{"dataType":"array","array":{"dataType":"refObject","ref":"PlayerCurrency"}},"inventory":{"dataType":"nestedObjectLiteral","nestedProperties":{"resources":{"dataType":"array","array":{"dataType":"refObject","ref":"PlayerResource"},"required":true},"capacity":{"dataType":"double","required":true},"balance":{"dataType":"double","required":true}}},"pilots":{"dataType":"array","array":{"dataType":"refObject","ref":"PlayerPilot"}},"territories":{"dataType":"array","array":{"dataType":"refObject","ref":"PlayerTerritory"}}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlayerUpdateRequest": {
        "dataType": "refAlias",
        "type": {"ref":"PlayerCreateRequest","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/players',
            ...(fetchMiddlewares<RequestHandler>(PlayerController)),
            ...(fetchMiddlewares<RequestHandler>(PlayerController.prototype.createPlayer)),

            function PlayerController_createPlayer(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    data: {"in":"body","name":"data","required":true,"ref":"PlayerCreateRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PlayerController();


              const promise = controller.createPlayer.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/players',
            ...(fetchMiddlewares<RequestHandler>(PlayerController)),
            ...(fetchMiddlewares<RequestHandler>(PlayerController.prototype.getAllPlayers)),

            function PlayerController_getAllPlayers(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    handle: {"in":"query","name":"handle","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PlayerController();


              const promise = controller.getAllPlayers.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/players/:playerId',
            ...(fetchMiddlewares<RequestHandler>(PlayerController)),
            ...(fetchMiddlewares<RequestHandler>(PlayerController.prototype.getPlayer)),

            function PlayerController_getPlayer(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    playerId: {"in":"path","name":"playerId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PlayerController();


              const promise = controller.getPlayer.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/players/:playerId',
            ...(fetchMiddlewares<RequestHandler>(PlayerController)),
            ...(fetchMiddlewares<RequestHandler>(PlayerController.prototype.updatePlayer)),

            function PlayerController_updatePlayer(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    playerId: {"in":"path","name":"playerId","required":true,"dataType":"string"},
                    data: {"in":"body","name":"data","required":true,"ref":"PlayerUpdateRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PlayerController();


              const promise = controller.updatePlayer.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/players/:playerId',
            ...(fetchMiddlewares<RequestHandler>(PlayerController)),
            ...(fetchMiddlewares<RequestHandler>(PlayerController.prototype.deletePlayer)),

            function PlayerController_deletePlayer(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    playerId: {"in":"path","name":"playerId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PlayerController();


              const promise = controller.deletePlayer.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            response.status(statusCode || 200)
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'queries':
                    return validationService.ValidateParam(args[key], request.query, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
