

document.addEventListener('DOMContentLoaded', function() {

    function total(cantidad, categoria) {
        let precio = 200;
        let descuento = 0;

        switch (categoria) {
            case 'estudiante':
                descuento = 0.8;
                break;
            case 'trainee':
                descuento = 0.5;
                break;
            case 'junior':
                descuento = 0.15;
                break;
            default:
                descuento = 0;
        }

        const total = cantidad * precio * (1 - descuento);
        return total.toFixed(2);
    }

    function mostrarTicket(nombre, apellido, correo, cantidad, categoria, totalPago) {
        // Generar el contenido del ticket
        const ticketContent = `
            <h2>Gracias por su Compra !!!</h2>
            <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
            <p><strong>Correo:</strong> ${correo}</p>
            <p><strong>Cantidad:</strong> ${cantidad}</p>
            <p><strong>Categoría:</strong> ${categoria}</p>
            <p><strong>Total a Pagar:</strong> $ ${totalPago}</p>
        `;

        // Mostrar el ticket en una ventana emergente o en algún elemento del DOM
        // Aquí se utiliza SweetAlert2 para mostrar el ticket en una ventana emergente
        Swal.fire({
            title: 'SU TICKET',
            html: ticketContent,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    }

    function envioForm(e) {
        e.preventDefault();

        const form = document.getElementById('form');
        const nombre = document.getElementById('name').value;
        const apellido = document.getElementById('lastName').value;
        const correo = document.getElementById('correo').value;
        const cantidad = parseInt(document.getElementById('cantidad').value);
        const categoria = document.getElementById('categoria').value;

        if (nombre !== '' && apellido !== '' && cantidad > 0 && categoria !== '' && correo !== '') {
            const totalPago = total(cantidad, categoria);
            const totalSpan = document.getElementById('total');
            totalSpan.innerText = "Total a Pagar: $ " + totalPago;
            form.classList.add('needs-validation');
            form.classList.remove('was-validated');
            mostrarTicket(nombre, apellido, correo, cantidad, categoria, totalPago);
            form.reset();
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            });

            Toast.fire({
                icon: 'warning',
                title: 'Upps!!',
                text: 'Tienes que completar todos los campos vacíos'
            });

            form.classList.add('was-validated');
            form.classList.remove('needs-validation');
        }
    }

    document.getElementById('btnResumen').addEventListener('click', function (e) {
        e.preventDefault();

        const form = document.getElementById('form');

        if (form.checkValidity() === false) {
            e.stopPropagation();
            form.classList.add('was-validated');
        } else {
            form.classList.remove('was-validated');
            envioForm(e);
        }
    });

    document.getElementById('btnBorrar').addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('name').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('correo').value = '';
        document.getElementById('cantidad').value = '';
        document.getElementById('categoria').selectedIndex = 0;
        document.getElementById('total').textContent = 'Total a Pagar: $';

        // Reiniciar la validación del formulario
        const form = document.getElementById('form');
        form.classList.remove('was-validated');
    });
});