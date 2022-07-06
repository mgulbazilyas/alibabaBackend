$("[data-action='delete']").click(function(){
    // debugger
    const productId = $(this).data('id');
    Swal.fire({
        title: 'Do you want to save the changes?',
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        // denyButtonText: `Don't save`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            $.post('/products/delete/' + productId.toString()).then((result) => {


                Swal.fire('Deleted!', '', 'success').then((result) => {
                    window.location.reload();
                })
            }
            );
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    })
});

$("[data-action='delete-all']").click(function(){
    Swal.fire({
        title: 'are you sure to delete all?',
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'yes',
        // denyButtonText: `Don't save`,s
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            $.post('/products/delete-all/').then((result) => {


                    Swal.fire('Deleted!', '', 'success').then((result) => {
                        window.location.reload();
                    })
                }
            );
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    })
});
