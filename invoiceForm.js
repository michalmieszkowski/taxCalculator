var app = angular.module('master', []);

app.directive('row', function () {

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
            row: [{
                cleanValue: '',
                taxRate: '',
                taxValue: '',
                totalValue: ''
            }]
        }

        $scope.taxChange = function (x, index) {
            if (x == '7%') {
                $rootScope.doc.row[index].taxRate = 0.07;
            } else if (x == '0%') {
                $rootScope.doc.row[index].taxRate = 0;
            } else {
                $rootScope.doc.row[index].taxRate = 0.23;
            }

            $scope.calculateForTaxRate($rootScope.doc.row[index].taxRate, index)
        }


        $scope.addNewRow = function () {
           
            
            $rootScope.doc.row.push({
                'cleanValue': $rootScope.doc.row.cleanValue,
                'taxRate':    $rootScope.doc.row.taxRate,
                'taxValue':   $rootScope.doc.row.taxValue,
                'totalValue': $rootScope.doc.row.totalValue
            })
            
        };

        $scope.removeRow = function (index) {
            $rootScope.doc.row.splice(index, 1);
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
               $rootScope.doc.row[index].cleanValue = 0;
            }
            $rootScope.doc.row[index].taxValue = cleanValue * $rootScope.doc.row[index].taxRate;
            $rootScope.doc.row[index].totalValue = (cleanValue * $rootScope.doc.row[index].taxRate) + cleanValue;
        };

        $scope.calculateForTaxRate = function (taxRate, index) {
            $rootScope.doc.row[index].taxValue = $rootScope.doc.row[index].cleanValue * taxRate;
            $rootScope.doc.row[index].totalValue = ($rootScope.doc.row[index].cleanValue * taxRate) + $rootScope.doc.row[index].cleanValue;
        };

        $scope.calculateForTaxValue = function (taxValue, index) {
            if (taxValue == '') {
                $rootScope.doc.row[index].taxValue = 0;
            }
            $rootScope.doc.row[index].cleanValue = taxValue / $rootScope.doc.row[index].taxRate;
            $rootScope.doc.row[index].totalValue = (taxValue / $rootScope.doc.row[index].taxRate) + taxValue;
        };

        $scope.calculateForTotalValue = function (totalValue, index) {
            if (totalValue == '') {
                $rootScope.doc.row[index].totalValue = 0;
            }
            $rootScope.doc.row[index].cleanValue = totalValue / (1 + $rootScope.doc.row[index].taxRate);
            $rootScope.doc.row[index].taxValue = totalValue - (totalValue / (1 + $rootScope.doc.row[index].taxRate));
        };

        $scope.finalCleanValueSum = function () {
            $scope.finalCleanValue = 0;
            for (var i = 0; i < $rootScope.doc.row.length; i++) {
               
                $scope.finalCleanValue = $scope.finalCleanValue + $rootScope.doc.row[i].cleanValue;
            }
            return $scope.finalCleanValue;
        }

        $scope.finalTaxValueSum = function () {
            $scope.finalTaxValue = 0;
            for (var i = 0; i < $rootScope.doc.row.length; i++) {
                $scope.finalTaxValue = $scope.finalTaxValue + $rootScope.doc.row[i].taxValue;
            }
            return $scope.finalTaxValue;
        }

        $scope.finalValueSum = function () {
            $scope.finalValue = 0;
            for (var i = 0; i < $rootScope.doc.row.length; i++) {
                $scope.finalValue = $scope.finalValue + $rootScope.doc.row[i].totalValue;
            }
            return $scope.finalValue;  
        }

        

        




       



    }])






