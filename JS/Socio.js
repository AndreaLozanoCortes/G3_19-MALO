var URLSocios = 'http://52.152.236.67:90/G3_19/controller/socios_negocio.php?op=GetSocios';
var URLPostSocio = 'http://52.152.236.67:90/G3_19/controller/socios_negocio.php?op=InsertSocio';
var URLGetSocio = 'http://52.152.236.67:90/G3_19/controller/socios_negocio.php?op=GetSocio';
var URLPutSocio = 'http://52.152.236.67:90/G3_19/controller/socios_negocio.php?op=UpdateSocio';
var URLDeleteSocio = 'http://52.152.236.67:90/G3_19/controller/socios_negocio.php?op=DeleteSocio';

$(document).ready(function(){
CargarSocios();
});

function CargarSocios(){
    $.ajax({
        url: URLSocios,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = ' ';

            for(i=0; i<MiItems.length; i++){
                Valores += '<tr>' +
                '<td>'+ MiItems[i].ID +'</td>' +
                '<td>'+ MiItems[i].NOMBRE +'</td>' +
                '<td>'+ MiItems[i].RAZON_SOCIAL +'</td>' +
                '<td>'+ MiItems[i].DIRECCION +'</td>' +
                '<td>'+ MiItems[i].TIPO_SOCIO +'</td>' +
                '<td>'+ MiItems[i].CONTACTO +'</td>' +
                '<td>'+ MiItems[i].EMAIL +'</td>' +
                '<td>'+ MiItems[i].FECHA_CREADO +'</td>' +
                '<td>'+ MiItems[i].ESTADO +'</td>' +
                '<td>'+ MiItems[i].TELEFONO +'</td>'+ 
                '<td>' +
                '<button class="btn btn-outline-primary" onclick="CargarSocio('+ MiItems[i].ID +')">Editar</button>' +
                '<button class="btn btn-outline-danger" onclick="EliminarSocio('+ MiItems[i].ID +')">Eliminar</button>' +
                '</td>'+
                '</tr>';
            $('.Socios').html(Valores);
            }
        }
    });
}

function CargarSocio(idsocio){
    var datossocio = {
        ID: idsocio
    };

    var datossociojson = JSON.stringify(datossocio);

    $.ajax({
        url: URLGetSocio,
        type: 'POST',
        data: datossociojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            var MiItems = reponse;
            
            $('#NOMBRE').val(MiItems[0].NOMBRE);
            $('#RAZON_SOCIAL').val(MiItems[0].RAZON_SOCIAL);
            $('#DIRECCION').val(MiItems[0].DIRECCION);
            $('#TIPO_SOCIO').val(MiItems[0].TIPO_SOCIO);
            $('#CONTACTO').val(MiItems[0].CONTACTO);
            $('#EMAIL').val(MiItems[0].EMAIL);
            $('#FECHA_CREADO').val(MiItems[0].FECHA_CREADO);
            $('#ESTADO').val(MiItems[0].ESTADO);
            $('#TELEFONO').val(MiItems[0].TELEFONO);
            
             //Actualizar
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarSocio('+ MiItems[0].ID +')" '+
            'value="Actualizar Socio" class="btn btn-success"></input>';
            $('.btnSocio').html(btnactualizar);
            }
        });
}

function AgregarSocio(){
    var datossocio={
        NOMBRE:$('#NOMBRE').val(),
        RAZON_SOCIAL:$('#RAZON_SOCIAL').val(),
        DIRECCION:$('#DIRECCION').val(),
        TIPO_SOCIO:$('#TIPO_SOCIO').val(),
        CONTACTO:$('#CONTACTO').val(),
        EMAIL:$('#EMAIL').val(),
        FECHA_CREADO:$('#FECHA_CREADO').val(),
        ESTADO:$('#ESTADO').val(),
        TELEFONO:$('#TELEFONO').val()
    };
    var datossociojson = JSON.stringify(datossocio);
    $.ajax({ 
        url: URLPostSocio,
        type: 'POST',
        data: datossociojson, 
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
        },
        error: function(){
            alert('Error al Agregar Socio')
        }
    });
    alert('Socio de Negocio Agregado Éxitosamente');
}

function ActualizarSocio(idsocio){
    var datossocio = {
        ID: idsocio,

        NOMBRE: $('#NOMBRE').val(),
        RAZON_SOCIAL: $('#RAZON_SOCIAL').val(),
        DIRECCION: $('#DIRECCION').val(),
        TIPO_SOCIO: $('#TIPO_SOCIO').val(),
        CONTACTO: $('#CONTACTO').val(),
        EMAIL: $('#EMAIL').val(),
        FECHA_CREADO: $('#FECHA_CREADO').val(),
        ESTADO: $('#ESTADO').val(),
        TELEFONO: $('#TELEFONO').val()
    };

    var datossociojson = JSON.stringify(datossocio);

    $.ajax({
        url: URLPutSocio,
        type: 'PUT',
        data: datossociojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            }
        });
        alert('Socio Actualizado Éxitosamente');
}

function EliminarSocio(idsocio){
    var datossocio = {
        ID: idsocio
    };

    var datossociojson = JSON.stringify(datossocio);

    $.ajax({
        url: URLDeleteSocio,
        type: 'DELETE',
        data: datossociojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);

        $(document).ready(function(){
                CargarSocios();
        });
        }
        });
        alert('Socio Eliminado Éxitosamente');
}