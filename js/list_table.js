
class tablelist
{
    constructor(table_p) {
        this.data = []
        this.table = table_p
        this.loading = $('#loading')

        // Oculta el cargador
        this.loading.hide()
    }

    // Este metodo obtiene la información desde el controlador y se almacena en this.data
    queryAjax(){
        let cont = this

        // Muestra el cargador
        this.loading.show()

        $.ajax({
            url: 'http://taller.local/logic/controller.php',
            success: function(respuesta) {
                cont.data = respuesta
                cont.renderTable()
            },
            error: function() {
                console.log("No se ha podido obtener la información");
            }
        });
    }

    // Este metodo se encarga de listar la información en la tabla
    renderTable(){
        this.table.find('tbody').find('tr').remove();
        let cont = this
        $.each(this.data, function(key, value){
            cont.table.append(`<tr><td>${value.id}</td><td>${value.name}</td><td>${value.image}</td><td>${value.created_at}</td></tr>`);
        })

        this.loading.hide()
    }
}

let table_data = new tablelist($('#table_products'));
table_data.queryAjax()