/**
 * Created by darshik on 2017-01-12.
 */
'use strict';


angular.module('app.formbuilder').controller('CreateCtrl', [
  '$rootScope',
  '$scope',
  '$q',
  '$state',
  '$stateParams',
  'cacheservice',
  'DTOptionsBuilder',
  'DTColumnDefBuilder',
  'Button',
  'resourceutils',
  'Forms',
  function(
    $rootScope,
    $scope,
    $q,
    $state,
    $stateParams,
    cacheservice,
    DTOptionsBuilder,
    DTColumnDefBuilder,
    Button,
    resourceutils,
    Forms

  ) {
    var self = this;
    var addFSButton;

    self.frms = [];
    self.contractors = [];

    resourceutils.all(Forms).then(function(data) {
      self.frms = data;
      console.log(data);
    });


    cacheservice.contractors().then(function(data) {
      self.contractors = data.contractors;
    });

    self.addForm = function() {
      $state.go('app.formbuilder.empty', {
        redirect: true
      });
    };

    self.deleteForm = function(frm, idx) {
      new Forms(frm).$delete()
      .then(function () {
        self.frms.splice(idx, 1);
      });
    };

    self.standardOptions = DTOptionsBuilder
      .newOptions()
      // .withDOM('pitrfl')
      //Add Bootstrap compatibility
      .withDOM('<\'dt-toolbar\'<\'col-xs-12 col-sm-6\'f><\'col-sm-6 col-xs-12 hidden-xs\'l>r>' +
        't' +
        '<\'dt-toolbar-footer\'<\'col-sm-6 col-xs-12 hidden-xs\'i><\'col-xs-12 col-sm-6\'p>>')
      .withBootstrap();

    self.standardColumns = [
      DTColumnDefBuilder.newColumnDef(0),
      DTColumnDefBuilder.newColumnDef(1),
      DTColumnDefBuilder.newColumnDef(2),
      DTColumnDefBuilder.newColumnDef(3),
      DTColumnDefBuilder.newColumnDef(4).notSortable()
    ];

    // Page Buttons
    addFSButton = new Button();
    addFSButton.name = 'Create New Form';
    addFSButton.classes = 'btn-primary';
    addFSButton.icon = 'fa-plus';
    addFSButton.visible = true;
    addFSButton.enabled = true;
    addFSButton.click = self.addForm;

    $rootScope.PageHeaderButtons = [addFSButton];

}]);

