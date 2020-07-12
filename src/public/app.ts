import { WebSocketClientService } from "./WebSocketClientService";
import angular = require("angular");
import { MenuCtrl, MainCtrl, LoginCtrl, EntityCtrl, EntitiesCtrl, HistoryCtrl, CatsCtrl, CatCtrl, noderedCtrl } from "./Controllers";
import { userdata, api, timesince, translate, textarea, fileread } from "./CommonControllers";

/**
 * @type {angular.Module}
 */
module openflow {
    "use strict";
    // .config(function (ChartJsProvider) {
    //     ChartJsProvider.setOptions({ responsive: true });
    //     ChartJsProvider.setOptions('Line', { responsive: true });
    // })
    var webApp: any = angular.module("webApp", ['ngRoute', 'chart.js', 'ngLocalize', 'ngLocalize.Config'])
        .controller("MenuCtrl", MenuCtrl)
        .directive("timesince", timesince.factory())
        .directive("translate", translate.factory())
        .directive("textarea", textarea.factory())
        .directive("fileread", fileread.factory())
        .service("userdata", userdata)
        .service("WebSocketClientService", WebSocketClientService)
        // .directive('autoComplete', function ($timeout) {
        //     return function (scope, iElement, iAttrs) {
        //         (iElement as any).autocomplete({
        //             source: scope[iAttrs.uiItems],
        //             select: function () {
        //                 $timeout(function () {
        //                     iElement.trigger('input');
        //                 }, 0);
        //             }
        //         })
        //     };
        // })
        .service("api", api);
    webApp.config([
        <any>'$routeProvider',
        ($routeProvider: angular.route.IRouteProvider) => {
            $routeProvider
                .when('/main', { templateUrl: 'Main.html', controller: MainCtrl, controllerAs: 'ctrl' })
                .when('/main/:id', { templateUrl: 'Main.html', controller: MainCtrl, controllerAs: 'ctrl' })
                .when('/Login', { templateUrl: 'Login.html', controller: LoginCtrl, controllerAs: 'ctrl' })

                .when('/Entities', { templateUrl: 'Entities.html', controller: EntitiesCtrl, controllerAs: 'ctrl' })
                .when('/Entities/:collection', { templateUrl: 'Entities.html', controller: EntitiesCtrl, controllerAs: 'ctrl' })
                .when('/Entity/:collection', { templateUrl: 'Entity.html', controller: EntityCtrl, controllerAs: 'ctrl' })
                .when('/Entity/:collection/:id', { templateUrl: 'Entity.html', controller: EntityCtrl, controllerAs: 'ctrl' })
                .when('/History/:collection/:id', { templateUrl: 'History.html', controller: HistoryCtrl, controllerAs: 'ctrl' })

                .when('/Cats', { templateUrl: 'Cats.html', controller: CatsCtrl, controllerAs: 'ctrl' })
                .when('/Cat', { templateUrl: 'Cat.html', controller: CatCtrl, controllerAs: 'ctrl' })
                .when('/Cat/:id', { templateUrl: 'Cat.html', controller: CatCtrl, controllerAs: 'ctrl' })

                .when('/nodered', { templateUrl: 'nodered.html', controller: noderedCtrl, controllerAs: 'ctrl' })

                .otherwise({ redirectTo: '/main' });
        }
    ])
    webApp.config([
        <any>'$locationProvider',
        ($locationProvider) => {
            //$locationProvider.html5Mode(false);
            $locationProvider.hashPrefix('');
        }
    ]).value('localeConf', {
        basePath: 'languages',
        defaultLocale: 'en-US',
        sharedDictionary: 'common',
        fileExtension: '.json',
        persistSelection: true,
        cookieName: 'COOKIE_LOCALE_LANG',
        observableAttrs: new RegExp('^data-(?!ng-|i18n)'),
        delimiter: '::',
        validTokens: new RegExp('^[\\w\\.-]+\\.[\\w\\s\\.-]+\\w(:.*)?$')
    }).value('localeSupported', [
        'en-US',
        'da-DK'
    ]);

}
