var app = angular.module('master', []);

app.directive('inputForm', function () {

    return {
        controller: 'inputController',
        templateUrl: './inputRow.html',
        restrict: 'E'

    }
})

    .controller('inputController', ['$rootScope', '$scope', function ($rootScope, $scope) {

        $scope.vat = ['23%', '7%', '0%'];
        $scope.tempVat;
        $scope.finalCleanValue = 0;
        $scope.finalTaxValue = 0;
        $scope.finalValue = 0;

        $rootScope.doc = {
            invoiceNumber: '',
            companyName: '',
            rows: [{
                cleanValue: '',
                taxRate: '',
                taxValue: '',
                totalValue: ''
            }]
        }

        $scope.taxChange = function (x, index) {
            if (x == '7%') {
                $rootScope.doc.rows[index].taxRate = 0.07;
            } else if (x == '0%') {
                $rootScope.doc.rows[index].taxRate = 0;
            } else {
                $rootScope.doc.rows[index].taxRate = 0.23;
            }

            $scope.calculateForTaxRate($rootScope.doc.rows[index].taxRate, index)
        }


        $scope.addNewRow = function () {
           
            
            $rootScope.doc.rows.push({
                'cleanValue': $rootScope.doc.rows.cleanValue,
                'taxRate':    $rootScope.doc.rows.taxRate,
                'taxValue':   $rootScope.doc.rows.taxValue,
                'totalValue': $rootScope.doc.rows.totalValue
            })
            
        };

        $scope.removeRow = function (index) {
            $rootScope.doc.rows.splice(index, 1);
            $scope.finalCleanValueSum();
            $scope.finalTaxValueSum();
            $scope.finalValueSum();
        };

        $scope.save = function () {
            window.alert("Check prepared JSON in browser console")
            console.log($rootScope.doc)
        };
        

        $scope.calculateForCleanValue = function (cleanValue, index) {
            if (cleanValue == '') {
               $rootScope.doc.rows[index].cleanValue = 0;
            }
            $rootScope.doc.rows[index].taxValue = cleanValue * $rootScope.doc.rows[index].taxRate;
            $rootScope.doc.rows[index].totalValue = (cleanValue * $rootScope.doc.rows[index].taxRate) + cleanValue;
        };

        $scope.calculateForTaxRate = function (taxRate, index) {
            $rootScope.doc.rows[index].taxValue = $rootScope.doc.rows[index].cleanValue * taxRate;
            $rootScope.doc.rows[index].totalValue = ($rootScope.doc.rows[index].cleanValue * taxRate) + $rootScope.doc.rows[index].cleanValue;
        };

        $scope.calculateForTaxValue = function (taxValue, index) {
            if (taxValue == '') {
                $rootScope.doc.rows[index].taxValue = 0;
            }
            $rootScope.doc.rows[index].cleanValue = taxValue / $rootScope.doc.rows[index].taxRate;
            $rootScope.doc.rows[index].totalValue = (taxValue / $rootScope.doc.rows[index].taxRate) + taxValue;
        };

        $scope.calculateForTotalValue = function (totalValue, index) {
            if (totalValue == '') {
                $rootScope.doc.rows[index].totalValue = 0;
            }
            $rootScope.doc.rows[index].cleanValue = totalValue / (1 + $rootScope.doc.rows[index].taxRate);
            $rootScope.doc.rows[index].taxValue = totalValue - (totalValue / (1 + $rootScope.doc.rows[index].taxRate));
        };

        $scope.finalCleanValueSum = function () {
            $scope.finalCleanValue = 0;
            for (var i = 0; i < $rootScope.doc.rows.length; i++) {
               
                $scope.finalCleanValue = $scope.finalCleanValue + $rootScope.doc.rows[i].cleanValue;
            }
            return $scope.finalCleanValue;
        }

        $scope.finalTaxValueSum = function () {
            $scope.finalTaxValue = 0;
            for (var i = 0; i < $rootScope.doc.rows.length; i++) {
                $scope.finalTaxValue = $scope.finalTaxValue + $rootScope.doc.rows[i].taxValue;
            }
            return $scope.finalTaxValue;
        }

        $scope.finalValueSum = function () {
            $scope.finalValue = 0;
            for (var i = 0; i < $rootScope.doc.rows.length; i++) {
                $scope.finalValue = $scope.finalValue + $rootScope.doc.rows[i].totalValue;
            }
            return $scope.finalValue;  
        }

        

        




       



    }])






