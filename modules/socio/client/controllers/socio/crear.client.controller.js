'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.Socio.CrearSocioController',
    function ($scope, $state, SGTipoDocumento, SGTipoPersona, toastr) {

        $scope.working = false;

        $scope.view = {
            tipoDocumento: SGTipoDocumento.$build()
        };

        $scope.combo = {
            tipoPersona: SGTipoPersona.$search().$object
        };
        $scope.combo.selected = {
            tipoPersona: undefined
        };

        $scope.save = function () {
            $scope.view.tipoDocumento.tipoPersona = $scope.combo.selected.tipoPersona;

            $scope.working = true;

            $scope.view.tipoDocumento.$save().then(
                function (response) {
                    toastr.success('Tipo documento creado');
                    $scope.working = false;
                    $state.go('^.editar', {documento: $scope.view.tipoDocumento.abreviatura});
                },
                function error(err) {
                    toastr.error(err.data.message);
                }
            );
        };

        $scope.cancel = function () {
            $state.go('^.buscar');
        };

    });
