import angular from 'angular';
import { react2angular } from 'react2angular';

import Header from './Components/Header'
import InfoArea from './Components/InfoArea';
import ItemTable from './Components/ItemTable';
import ActionArea from './Components/ActionArea';
import Credits from './Components/Credits';

import store from './store';

angular.module('invoicing', [])
	.constant('store', store)
	.component('header', react2angular(Header, []))
	.component('infoArea', react2angular(InfoArea, []))
	.component('itemTable', react2angular(ItemTable, []))
	.component('actionArea', react2angular(ActionArea, []))
	.component('credits', react2angular(Credits, []))


	// Main application controller
	.controller('InvoiceCtrl', ['$scope', '$http',
		function ($scope, $http, LocalStorage) {

			// Runs on document.ready
			angular.element(document).ready(function () {
				// Set focus
				document.getElementById('invoice-number').focus();
			});

		}])
