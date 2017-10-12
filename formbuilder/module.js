
'use strict';


angular.module('app.formbuilder', ['ui.router', 'datatables', 'datatables.bootstrap']);


angular.module('app.formbuilder').config(function ($stateProvider) {

    $stateProvider
        .state('app.formbuilder', {
            abstract: true,
            data: {
                title: 'Formbuilder'
            }
        })
        .state('app.formbuilder.create', {
            url: '/formbuilder/forms',
            data: {
                title: 'Create'
            },
            views: {
                'content@app': {
                     controller: 'CreateCtrl as createformctrl',
                    templateUrl: 'app/formbuilder/views/create.tpl.html'
                }
            }
        })
        .state('app.formbuilder.empty', {
            url: '/formbuilder/forms/:id',
            data: {
                title: 'Empty Form'
            },
            views: {
                'content@app': {
                    controller: 'FormCtrl as formctrl',
                    templateUrl: 'app/formbuilder/views/empty.html'
                }
            }
        })
        // .state('app.finance.incomestatement',{
        //     url: '/finance/statements/:id/is',
        //     data: {
        //         title: 'Income Statement'
        //     },
        //     views:{
        //         "content@app": {
        //             controller: 'IncomeStatementCtrl as incomestatementctrl',
        //             templateUrl: 'app/finance/views/incomestatement.tpl.html'
        //         }
        //     }
        // })

        ;
});
