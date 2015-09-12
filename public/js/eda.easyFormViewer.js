/** 
  *easyFormViewer 
  *Version 1.0.17 
  *Author : Erwan Datin (MacKentoch) 
  *Link: https://github.com/MacKentoch/easyFormGenerator 
  *License : MIT (2015) 
 **/ 
 ;(function(){
 	'use strict';
/**
 *  -----------------------------------------------------------------------
 *  application module of easy form viewer
 *  -----------------------------------------------------------------------
 *  
 *   
 *     
 *
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
;(function(){
	'use strict';
	
	angular
		.module('eda.easyFormViewer', [
			'textAngular',  
			'formly',  
			'formlyBootstrap', 
			'ui.bootstrap', 
			'nya.bootstrap.select', 
			'eda.easyFormViewer.Directive'		
		]);
	
})();
/**
 *  -----------------------------------------------------------------------
 *  config module of easy form viewer
 *  -----------------------------------------------------------------------
 *  
 *   
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
;(function(){
	'use strict';
	
	angular
		.module('eda.easyFormViewer')
		.config(configFct);
		
		function configFct(formlyConfigProvider){
			
          formlyConfigProvider.setType( 
            { 
              name: 'richEditor', 
              template: '<text-angular class="richTextAngular" ng-model="model[options.key || index]"></text-angular>' 
            } 
          ); 
          formlyConfigProvider.setType( 
            { 
              name: 'blank', 
              template: '<div></div>' 
            } 
          ); 
          var subTitleTemplate = '<div class="row"><div class=""><h4 class="text-center">{{options.templateOptions.placeholder}}<h4><hr/></div></div>'; 
          formlyConfigProvider.setType( 
            { 
              name: 'subTitle', 
              template: subTitleTemplate 
            } 
          ); 
        var basicSelectTemplate =   ' <ol   class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12" ' +  
                                    '   ng-model="model[options.key || index]"  ' +  
                                    '   id="{{id}}"  ' +  
                                    '   disabled="options.templateOptions.options.length === 0"> ' +  
                                    '   <li class="nya-bs-option" nya-bs-option="option in options.templateOptions.options"> ' +  
                                    '     <a>{{option.name}}</a> ' +  
                                    '   </li> ' +  
                                    ' </ol>     ' ; 
         formlyConfigProvider.setType( 
            { 
              name: 'basicSelect', 
              template: basicSelectTemplate 
            } 
          ); 
          var groupedSelectTemplate =   '  <ol class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12" ' + 
                                        '    ng-model="model[options.key || index]" ' + 
                                        '       data-live-search="true" ' + 
                                        '       disabled="options.templateOptions.options.length === 0">' + 
                                        '       <li nya-bs-option="option in  options.templateOptions.options group by option.group"  ' + 
                                        '       >' + 
                                        '         <span class="dropdown-header">{{$group}}</span>' +  
                                        '         <a>' + 
                                        '           <span>{{option.name}}</span>' + 
                                        '           <span class="glyphicon glyphicon-ok check-mark"></span>' + 
                                        '         </a>' + 
                                        '       </li>' + 
                                        '     </ol>'; 
         formlyConfigProvider.setType( 
            { 
              name: 'groupedSelect', 
              template: groupedSelectTemplate 
            } 
          ); 
         // angular UI date picker 
         // thx Kent C. Dodds 
        var attributes = [ 
          'date-disabled', 
          'custom-class', 
          'show-weeks', 
          'starting-day', 
          'init-date', 
          'min-mode', 
          'max-mode', 
          'format-day', 
          'format-month', 
          'format-year', 
          'format-day-header', 
          'format-day-title', 
          'format-month-title', 
          'year-range', 
          'shortcut-propagation', 
          'datepicker-popup', 
          'show-button-bar', 
          'current-text', 
          'clear-text', 
          'close-text', 
          'close-on-date-selection', 
          'datepicker-append-to-body' 
        ]; 
        var bindings = [ 
          'datepicker-mode', 
          'min-date', 
          'max-date' 
        ]; 
        var ngModelAttrs = {}; 
        angular.forEach(attributes, function(attr) { 
          ngModelAttrs[camelize(attr)] = {attribute: attr}; 
        }); 
        angular.forEach(bindings, function(binding) { 
          ngModelAttrs[camelize(binding)] = {bound: binding}; 
        }); 
        formlyConfigProvider.setType({ 
          name: 'datepicker', 
          template: '<input  id="{{id}}" class="form-control" ng-click="open($event)" ng-model="model[options.key  || index]" is-open="to.isOpen" ng-click="to.isOpen = true" datepicker-options="to.datepickerOptions" />', 
          wrapper: ['bootstrapLabel', 'bootstrapHasError'], 
          controller: ['$scope', function($scope) { 
             $scope.open = function($event) { 
              $event.preventDefault(); 
              $event.stopPropagation(); 
              $scope.opened = true; 
            }; 
           }], 
          defaultOptions: { 
            ngModelAttrs: ngModelAttrs, 
            templateOptions: { 
              addonLeft: { 
                class: 'glyphicon glyphicon-calendar', 
                onClick: function(options, scope) { 
                  options.templateOptions.isOpen = !options.templateOptions.isOpen; 
                } 
              },        
              onFocus: function($viewValue, $modelValue, scope) { 
                scope.to.isOpen = !scope.to.isOpen; 
              }, 
              datepickerOptions: {} 
            } 
          } 
        }); 
        function camelize(string) { 
          string = string.replace(/[-_s]+(.)?/g, function(match, chr) { 
            return chr ? chr.toUpperCase() : ''; 
          }); 
          // Ensure 1st char is always lowercase 
          return string.replace(/^([A-Z])/, function(match, chr) { 
            return chr ? chr.toLowerCase() : ''; 
          }); 
        }  
       			
			
		}
	
})();
angular.module("eda.easyFormViewer").run(["$templateCache", function($templateCache) {$templateCache.put("eda.easyFormViewer.Template.html","<div class=easyFormViewer><form ng-submit=vm.onSubmit() name=vm.form novalidate=\"\"><formly-form model=vm.model fields=vm.fields options=vm.options form=vm.form><button type=submit class=\"btn btn-primary submit-button pull-right\" ng-disabled=vm.form.$invalid>{{vm.submitText}}</button> <button type=button class=\"btn btn-primary pull-right\" ng-click=vm.options.resetModel()>{{vm.cancelText}}</button></formly-form></form></div>");}]);
/**
 *  -----------------------------------------------------------------------
 *   easy form viewer directive
 *  -----------------------------------------------------------------------
 *  
 *   
 *     
 *
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
(function(){
	'use strict';
	
	angular
		.module('eda.easyFormViewer.Directive', [])
		.directive('edaEasyFormViewer', edaEasyFormViewer);
		
		edaEasyFormViewer.$inject = [];
		
		function edaEasyFormViewer(){
			var directive = {
				restrict : 'E',
				scope : {
					
          edaEasyFormViewerDataModel 				: '=?',
					edaEasyFormViewerFieldsModel 			: '=?',
					
					edaEasyFormViewerSubmitButtonText : '=?',
					edaEasyFormViewerCancelButtonText : '=?',
					
          edaEasyFormViewerSubmitFormEvent  : '&?',
					edaEasyFormViewerCancelFormEvent	: '&?'
        },
				replace 			: false,
				
				controller		: edaEasyFormViewerCtrl,
				controllerAs 	: 'vm',
				templateUrl 	: 'eda.easyFormViewer.Template.html',
				
				link : linkFct
			};
			return directive;
			
			
			
			function linkFct(scope, element, attrs){
				
				console.info('edaEasyFormViewer directive loaded');

				scope.vm.model 			= {};
				scope.vm.fields 			= {};
				scope.vm.submitText 	= 'Submitjhkjh';
				scope.vm.cancelText 	= 'Cancel';				
				
				scope.$watch(fieldsModelToWatch, fieldsModelWatcher, true);
				
				function fieldsModelToWatch(){
					return scope.vm.fields;
				}
				
				function fieldsModelWatcher(newFieldsModel, oldFieldsModel){
					console.info('fieldsModel Changed');
					console.dir(newFieldsModel);
					
					loadExistingConfigurationModel();
				}
				
				
				function loadExistingConfigurationModel(){
					
				}
				
			}
			
			/**
			 * directive's controller : controllerAs syntax
			 */
			function edaEasyFormViewerCtrl(){
				var vm = this;
				vm.model 			= {};
				vm.fields 			= {};
				vm.submitText 	= 'Submit';
				vm.cancelText 	= 'Cancel';				
			}
			
			
			
		}
		
})();
})(this);