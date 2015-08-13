var pizzaApp = angular.module('pizzaApp', []);

pizzaApp.controller('designPizza', ['$scope', function($scope) {
	$scope.step = ['Select base and size', 'Choose your toppings', 'Checkout'];

	$scope.process = [
		{
			base: {
				type: 'radio',
				required: true,
				width: 4,
				data: [
					{ name: 'Thin & crispy', price: 0 },
					{ name: 'Deep pan', price: 0 },
					{ name: 'Stuffed crust', price: 2 }
				]
			},
			size: {
				type: 'radio',
				required: true,
				width: 3,
				data: [
					{ name: 'Small', price: 6 },
					{ name: 'Medium', price: 9 },
					{ name: 'Large', price: 12 },
					{ name: 'XL', price: 15 }
				]
			}
		},
		{
			topping: {
				type: 'checkbox',
				required: true,
				minimum: 1,
				width: 2,
				data: [
					{ name: 'Bacon', price: 0.75 },
					{ name: 'Pineapple', price: 0.75 },
					{ name: 'Pepperoni', price: 0.75 },
					{ name: 'Chicken', price: 0.75 },
					{ name: 'Onions', price: 0.75 },
					{ name: 'Sweetcorn', price: 0.75 },
					{ name: 'Mushrooms', price: 0.75 },
					{ name: 'Ham', price: 0.75 },
					{ name: 'Olives', price: 0.75 },
					{ name: 'Tomato', price: 0.75 }
				]
			},
			cheese: {
				type: 'radio',
				required: true,
				width: 3,
				data: [
					{ name: 'Mozzarella cheese', price: 0 },
					{ name: 'Low fat cheese', price: 0 },
					{ name: 'No cheese', price: 0 }
				]
			},
			sauce: {
				type: 'radio',
				required: true,
				width: 4,
				data: [
					{ name: 'Tomato base', price: 0 },
					{ name: 'BBQ base', price: 0 }
				]
			}
		}
	];

	$scope.model = [];
	$scope.currentStep = 0;

	$scope.responsive = {
		optionWidth: function(option) {
			return 'col-md-' + process[currentStep][option].width;
		},

		calculateExtra: function(option) {
			var fit = 12 / $scope.process[$scope.currentStep][option].width;
			var items = $scope.process[$scope.currentStep][option].data.length;
			var remain = items % fit;

			return (fit - remain) * $scope.process[$scope.currentStep][option].width;
		}
	};

	$scope.stepTitle = function() {
		return 'Step ' + ($scope.currentStep + 1) + ': ' +
			$scope.step[$scope.currentStep];
	};

	$scope.stepPercentage = function() {
		return ($scope.currentStep + 1) / $scope.step.length * 100;
	};

	$scope.nextStep = function() {
		if ($scope.currentStep < $scope.step.length - 1) {
			$scope.currentStep += 1;
		}
	};

	$scope.prevStep = function() {
		if ($scope.currentStep > 0) {
			$scope.currentStep -= 1;
		}
	};

	$scope.stepProcess = function() {
		return $scope.process[$scope.currentStep];
	};

	$scope.validate = {
		errorCount: function() {
			var err = 0;

			for (var p in $scope.process[$scope.currentStep]) {
				if ($scope.process[$scope.currentStep][p].required) {
					if (!$scope.model[$scope.currentStep] || 
						!$scope.model[$scope.currentStep][p])
						err++;
				}
			}

			return err;
		}
	};

	$scope.displayResult = function(type) {
		var i, j, k;

		for (i in $scope.model) {
			for (j in $scope.model[i]) {
				if (j === type) {
					var l = '';

					if (typeof $scope.model[i][j] === 'object') {
						for (k in $scope.model[i][j]) {
							if ($scope.model[i][j][k]) l += k + ', ';
						}
					}

					return l || $scope.model[i][j];
				}
			}
		}
	};

	$scope.lookupPrice = function(key) {
		var i, j, k;

		for (i in $scope.process) {
			for (j in $scope.process[i]) {
				for (k in $scope.process[i][j].data) {
					if ($scope.process[i][j].data[k].name === key)
						return $scope.process[i][j].data[k].price;
				}
			}
		}

		return 0;
	};

	$scope.displayTotal = function() {
		var i, j, k, l, total = 0;

		for (i in $scope.model) {
			for (j in $scope.model[i]) {
				if (typeof $scope.model[i][j] === 'object') {
					for (k in $scope.model[i][j]) {
						if ($scope.model[i][j][k]) total += $scope.lookupPrice(k);
					}
				}
				else {
					total += $scope.lookupPrice($scope.model[i][j]);
				}
			}
		}

		return '£' + total.toFixed(2);
	};
}]);