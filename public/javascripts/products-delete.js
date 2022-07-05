$("[data-action='delete']").click(function(){
    Swal.fire({
        title: 'Do you want to save the changes?',
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        // denyButtonText: `Don't save`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success').then((result) => {
                window.location.reload();
            })
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    })
});
