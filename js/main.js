import React, { Component, createRef } from 'react';
import angular from 'angular';
import { react2angular } from 'react2angular';

class Logo extends Component {

	constructor(props) {
		super(props);
		this.imgInp = createRef();
		this.state = {
			hide: false,
			logo: 'images/metaware_logo.png'
		};
	}

	componentDidMount() {
		if (this.hasLogo()) {
			this.setState({
				logo: localStorage['logo'],
			});
		}
	}

	hasLogo() {
		return !!localStorage['logo'];
	};

	toggleLogo() {
		this.setState({
			hide: !this.state.hide,
		});
	}

	editLogo() {
		this.imgInp.current.click();
	};

	readUrl(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = (e) => {
				this.setState({
					logo: e.target.result,
				});
				localStorage['logo'] = e.target.result;
			}
			reader.readAsDataURL(input.files[0]);
		}
	};

	render() {
		return (
			<div>
				<input
					type="file"
					ref={this.imgInp}
					id="imgInp"
					onChange={
						(e) => {
							this.readUrl(e.target)
						}} />
				{!this.state.hide && <img src={this.state.logo} width={this.props.width} />}
				<div>
					<a
						onClick={() => this.editLogo()}
						href='#'>Edit Logo </a>
					<a
						onClick={() => this.toggleLogo(false)}
						href='#'>{`${this.state.hide ? 'Show' : 'Hide'}`}logo</a>
				</div>
			</div>
		)
	}
}

angular.module('invoicing', [])
	.component('logo', react2angular(Logo, ['width']))

	// The default logo for the invoice
	.constant('DEFAULT_LOGO', 'images/metaware_logo.png')

	// The invoice displayed when the user first uses the app
	.constant('DEFAULT_INVOICE', {
		tax: 13.00,
		invoice_number: 10,
		customer_info: {
			name: 'Mr. John Doe',
			web_link: 'John Doe Designs Inc.',
			address1: '1 Infinite Loop',
			address2: 'Cupertino, California, US',
			postal: '90210'
		},
		company_info: {
			name: 'Metaware Labs',
			web_link: 'www.metawarelabs.com',
			address1: '123 Yonge Street',
			address2: 'Toronto, ON, Canada',
			postal: 'M5S 1B6'
		},
		items: [
			{ qty: 10, description: 'Gadget', cost: 9.95 }
		]
	})

	// Service for accessing local storage
	.service('LocalStorage', [function () {

		var Service = {};

		// Returns true if there is a logo stored
		var hasLogo = function () {
			return !!localStorage['logo'];
		};

		// Returns a stored logo (false if none is stored)
		Service.getLogo = function () {
			if (hasLogo()) {
				return localStorage['logo'];
			} else {
				return false;
			}
		};

		Service.setLogo = function (logo) {
			localStorage['logo'] = logo;
		};

		// Checks to see if an invoice is stored
		var hasInvoice = function () {
			return !(localStorage['invoice'] == '' || localStorage['invoice'] == null);
		};

		// Returns a stored invoice (false if none is stored)
		Service.getInvoice = function () {
			if (hasInvoice()) {
				return JSON.parse(localStorage['invoice']);
			} else {
				return false;
			}
		};

		Service.setInvoice = function (invoice) {
			localStorage['invoice'] = JSON.stringify(invoice);
		};

		// Clears a stored logo
		Service.clearLogo = function () {
			localStorage['logo'] = '';
		};

		// Clears a stored invoice
		Service.clearinvoice = function () {
			localStorage['invoice'] = '';
		};

		// Clears all local storage
		Service.clear = function () {
			localStorage['invoice'] = '';
			Service.clearLogo();
		};

		return Service;

	}])

	.service('Currency', [function () {

		var service = {};

		service.all = function () {
			return [
				{
					name: 'British Pound (£)',
					symbol: '£'
				},
				{
					name: 'Canadian Dollar ($)',
					symbol: 'CAD $ '
				},
				{
					name: 'Euro (€)',
					symbol: '€'
				},
				{
					name: 'Indian Rupee (₹)',
					symbol: '₹'
				},
				{
					name: 'Norwegian krone (kr)',
					symbol: 'kr '
				},
				{
					name: 'US Dollar ($)',
					symbol: '$'
				}
			]
		}

		return service;

	}])

	// Main application controller
	.controller('InvoiceCtrl', ['$scope', '$http', 'DEFAULT_INVOICE', 'DEFAULT_LOGO', 'LocalStorage', 'Currency',
		function ($scope, $http, DEFAULT_INVOICE, DEFAULT_LOGO, LocalStorage, Currency) {

			// Set defaults
			$scope.currencySymbol = '$';
			$scope.logoRemoved = false;
			$scope.printMode = false;

			(function init() {
				// Attempt to load invoice from local storage
				!function () {
					var invoice = LocalStorage.getInvoice();
					$scope.invoice = invoice ? invoice : DEFAULT_INVOICE;
				}();

				// Set logo to the one from local storage or use default
				!function () {
					var logo = LocalStorage.getLogo();
					$scope.logo = logo ? logo : DEFAULT_LOGO;
				}();

				$scope.availableCurrencies = Currency.all();

			})()
			// Adds an item to the invoice's items
			$scope.addItem = function () {
				$scope.invoice.items.push({ qty: 0, cost: 0, description: "" });
			}

			// Toggle's the logo
			$scope.toggleLogo = function (element) {
				$scope.logoRemoved = !$scope.logoRemoved;
				LocalStorage.clearLogo();
			};

			// Triggers the logo chooser click event
			$scope.editLogo = function () {
				// angular.element('#imgInp').trigger('click');
				document.getElementById('imgInp').click();
			};

			$scope.printInfo = function () {
				window.print();
			};

			// Remotes an item from the invoice
			$scope.removeItem = function (item) {
				$scope.invoice.items.splice($scope.invoice.items.indexOf(item), 1);
			};

			// Calculates the sub total of the invoice
			$scope.invoiceSubTotal = function () {
				var total = 0.00;
				angular.forEach($scope.invoice.items, function (item, key) {
					total += (item.qty * item.cost);
				});
				return total;
			};

			// Calculates the tax of the invoice
			$scope.calculateTax = function () {
				return (($scope.invoice.tax * $scope.invoiceSubTotal()) / 100);
			};

			// Calculates the grand total of the invoice
			$scope.calculateGrandTotal = function () {
				saveInvoice();
				return $scope.calculateTax() + $scope.invoiceSubTotal();
			};

			// Clears the local storage
			$scope.clearLocalStorage = function () {
				var confirmClear = confirm('Are you sure you would like to clear the invoice?');
				if (confirmClear) {
					LocalStorage.clear();
					setInvoice(DEFAULT_INVOICE);
				}
			};

			// Sets the current invoice to the given one
			var setInvoice = function (invoice) {
				$scope.invoice = invoice;
				saveInvoice();
			};

			// Reads a url
			var readUrl = function (input) {
				if (input.files && input.files[0]) {
					var reader = new FileReader();
					reader.onload = function (e) {
						document.getElementById('company_logo').setAttribute('src', e.target.result);
						LocalStorage.setLogo(e.target.result);
					}
					reader.readAsDataURL(input.files[0]);
				}
			};

			// Saves the invoice in local storage
			var saveInvoice = function () {
				LocalStorage.setInvoice($scope.invoice);
			};

			// Runs on document.ready
			angular.element(document).ready(function () {
				// Set focus
				document.getElementById('invoice-number').focus();

				// Changes the logo whenever the input changes
				// document.getElementById('imgInp').onchange = function () {
				//   readUrl(this);
				// };
			});

		}])
