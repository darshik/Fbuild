angular.module('app.finance').controller('FormCtrl', [
  '$rootScope',
  '$q',
  '$state',
  'Button',
  'Forms',
  '$stateParams',
  '$scope',
  'Contractor',
  'resourceutils',
  'commonService',
  'cacheservice',
  function(
    $rootScope,
    $q,
    $state,
    Button,
    Forms,
    $stateParams,
    $scope,
    Contractor,
    resourceutils,
    commonService,
    cacheservice
  ) {

  var self = this;
  self.choices = {};
  self.id = $stateParams.id;
  window.edafields=[];
  if (self.id) {
    Forms.get({id: self.id}, function (data) {
      self.frm = data;
      window.fields = self.frm.eda_fields_model;
      window.form_name=self.frm.form_name;
      console.log(window.form_name);
    });
  } else {

    self.frm = new Forms({type: 'user_generated'});
    self.frm.form_name = '';
    window.form_name=self.frm.form_name;
    //default value to generate empty form
    self.frm.eda_fields_model = [
        {
          'line':-1,'activeColumn':1,'columns':[
            {'numColumn':1,'exist':true,'control':{'type':'none','key':'none'}}
          ]
        }
    ];
  }

  $scope.isEditable = function() {
    return self.frm && self.frm.type === 'user_generated';
  };

  cacheservice.fetch(['contractors'])
  .then(function(data) {
    self.contractors = data.contractors;
  });

  function openFormbuilder () {
    var iframe = $('#openFormbuilder');
    iframe.attr('src', iframe.data('src'));
  }
  window.onload=openFormbuilder();

  function saveGenForm() {

    if (self.frm.id) {
      self.frm.$update()
      .then(function() {
        commonService.showAlert(
          'Information',
          'Statement Saved',
          commonService.statuses.success
        );
      });
    } else {
       self.frm.form_name = window.edafields.formName;
       self.frm.eda_fields_model = window.edafields.edaFieldsModel;
      self.frm.$create()
      .then(function(data) {
        $stateParams.id = data.id;
        $state.go('app.formbuilder.empty', { id: data.id });
      });
    }
  }

  window.notifySaved = function (data) {
      window.edafields = data;
       console.log(window.edafields);
        saveGenForm();
  };

}]);
