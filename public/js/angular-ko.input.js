/**
 * Created by hp on 2016-04-09.
 */

angular.module("kr-input",[]).directive("krInput",[function(){
    return {
        restrict:"A",
        compile:function(element) {
            element.on("compositionstart",function(e) {
                e.stopImmediatePropagation();
                //console.log("compositionstart");
            });
        }
    }
}]);