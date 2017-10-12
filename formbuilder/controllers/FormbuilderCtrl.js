'use strict';

//config
function configFct(easyFormSteWayConfigProvider){
    //enable/disable modal animation
    easyFormSteWayConfigProvider.setModalAnimation(false);
}
configFct.$inject = ['easyFormSteWayConfigProvider', '$stateProvider'];

//controller
function FormbuilderCtrl($timeout){
    var frmbldrCtrl = this;

    function saveForm(easyFormGeneratorModel){
        window.parent.notifySaved(easyFormGeneratorModel);

    /**
     *
     * MORE DETAILS ON 'easyFormGeneratorModel'
     * ----------------------------------------
     *
     * easy form generator model properties:
     *
     * - formName 									: {string} (at save step you name your form)
     * - btnSubmitText 							: {string} (if 'Submit' does not suits to you change submit button name)
     * - btnCancelText							: {string} (if 'Cancel' does not suits to you change cancel button name)
     * - edaFieldsModel 						: {array} - easy form generator model that describe form
     * - edaFieldsModelStringified 	: {string} - exactly same as edaFieldsModel it is just stringified
     * - formlyFieldsModel 					: {object} - easy form generator model translate by itself 'edaFieldsModel' to 'angular formly fields model' -> usefull is you just need a formly directive
     * - dataModel									: {object} - this object is filled when filling form.
     */

    }

    function testACompleteForm(){
        var _testACompleteForm = window.parent.fields;
        return _testACompleteForm;
    }

    function timedModelChanged(){
        $timeout(function(){

            frmbldrCtrl
                .easyFormGeneratorModel
                .formName = window.parent.form_name;

            frmbldrCtrl
                .easyFormGeneratorModel
                .edaFieldsModel = testACompleteForm();

            frmbldrCtrl
                .easyFormGeneratorModel
                .btnSubmitText = 'Submit';

            frmbldrCtrl
                .easyFormGeneratorModel
                .btnCancelText = 'Cancel';
        });
    }

    frmbldrCtrl.easyFormGeneratorModel	= {};
    frmbldrCtrl.saveForm = saveForm;

    timedModelChanged();

}
FormbuilderCtrl.$inject = ['$timeout', 'easyFormSteWayConfig', '$scope', '$rootScope', '$state', '$stateParams', '$q'];

angular
    .module('app.formbuilders', [
        'eda.easyformGen.stepway', 'ui.router' //injects easy form generator-step way
    ])
    .config(configFct)
    .controller('FormbuilderCtrl', FormbuilderCtrl);
