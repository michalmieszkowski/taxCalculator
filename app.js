
var app = angular.module("mainApp", []);

app.controller("rowController", function ($scope) {

    $scope.vat = [23, 7, 0];
    $scope.inputsArray = [];
    $scope.taxFree = 0;
    $scope.totalTaxFree = 0;

    $scope.taxSelector = function (x, index) {
        if (x == $scope.vat[0]) {
            $scope.vatRate = 0.23;
        } else if (x == $scope.vat[1]) {
            $scope.vatRate = 0.07;
        } else {
            $scope.vatRate = 0;
        }
        $scope.calculateForTaxChange($scope.vatRate, index);
    };
    
    $scope.addNewRow = function () {
        $scope.vatRate = 0.23;
        $scope.taxFree = 0;
        $scope.inputsArray.push({
            'taxFree': $scope.taxFree,
            'vatRate': $scope.vatRate,
            'valueOfVat': $scope.valueOfVat,
            'valueWithVat': $scope.valueWithVat,
        })
          
    };

    $scope.calculateForTaxFreeChange = function (netto, index) {
        if (netto == '') {
            netto = 0;
        }
        $scope.inputsArray[index].taxFree = netto;
        $scope.inputsArray[index].valueOfVat = netto * $scope.vatRate;
        $scope.inputsArray[index].valueWithVat = (netto * $scope.vatRate) + netto;
        netto = 0;
    };
          
    $scope.calculateForTaxChange = function (vat, index) {
        $scope.inputsArray[index].valueOfVat = $scope.inputsArray[index].taxFree * vat;
        $scope.inputsArray[index].valueWithVat = ($scope.inputsArray[index].taxFree * vat) + $scope.inputsArray[index].taxFree;
    }; 
    
    $scope.deleteRow = function (index) {
        $scope.inputsArray.splice(index, 1)
        $scope.calculateTotalTaxFree();
        $scope.calculateTotalTax();
        $scope.calculateTotalValue();
    };

    $scope.checkInput = function (netto) {
        if (netto == '') {
            return 0;
        } else {    
            return netto;
        }
    };

    $scope.calculateTotalTaxFree = function () {
        $scope.totalTaxFree = 0;
        for (var i = 0; i < $scope.inputsArray.length; i++) {
            $scope.totalTaxFree = $scope.totalTaxFree + $scope.inputsArray[i].taxFree;    
        }
        return $scope.totalTaxFree;
    }

    $scope.calculateTotalTax = function () {
        $scope.totalTaxValue = 0;    
        for (var i = 0; i < $scope.inputsArray.length; i++) {
            $scope.totalTaxValue = $scope.totalTaxValue + $scope.inputsArray[i].valueOfVat;
        }
        return $scope.totalTaxValue;
    }

    $scope.calculateTotalValue = function () {
        $scope.totalValue = 0;
        for (var i = 0; i < $scope.inputsArray.length; i++) {
            $scope.totalValue = $scope.totalValue + $scope.inputsArray[i].valueWithVat;
        }
        return $scope.totalValue;
    }

})


   








