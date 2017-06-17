'use strict';
angular.module('usersApp')
.directive('listDirective',['$parse','$compile',function($parse,$compile){
  //local helper functions
  function groupData(list_data,list_field){
    var char_arr =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var grouped_data = {};
    for(let i=0;i<list_data.length;i++){
      let group_letter = list_data[i][list_field];
      group_letter = (group_letter!==null && group_letter!=='' && !angular.isUndefined(group_letter)) ? group_letter.charAt(0).toUpperCase():'';
      if(char_arr.indexOf(group_letter)>=0){
        if(angular.isUndefined(grouped_data[group_letter]))
          grouped_data[group_letter] = [].concat(list_data[i]);
        else
         grouped_data[group_letter].push(list_data[i]);
      }
    }
    return grouped_data;
  }

  function prepareSections(grouped_arr){
    var sections = {};
    var char_arr =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    for(let i=0;i<char_arr.length;i++){
      Object.keys(grouped_arr).forEach(function(key){
        if(key.toUpperCase() === char_arr[i]){
          if(Array.isArray(grouped_arr[key]) && grouped_arr[key].length>0){
            sections[key] = (grouped_arr[key]);
            sections[key].hide = true;
          }
        }
      });
    }
    return sections;
  }

  //DDO
  return {
    restrict :'A',
    //creating isolated scope. We can do this with out isolated scope as well.
    scope: {
      listDirective :'=',
      groupField :'@'
    },
    templateUrl:'js/modules/users/list-index.html',
    compile: function bindListCompile(el,attr){
      //dummy compile just for future
      return function listLink(scope,element,attrs){
        //get the list field to group by.
        //scope.list_field = attrs['groupField'];
        //thought of making this a variable by usines $attr.$parse. its a overkill
        scope.list_field = scope.groupField;
        scope.$watch('listDirective',function(val){
          var list_data = scope.listDirective;
          if(!angular.isUndefined(list_data) && !angular.isUndefined(scope.list_field) && list_data !== null && list_data.length>0){
            var grouped_arr = groupData(list_data,scope.list_field);
            scope.sections = prepareSections(grouped_arr);
          }
        });
        scope.collapseSection = function(key) {
          scope.sections[key].hide = (scope.sections[key].hide) ?false:true;
        }

      };

    }
  };

}]);
