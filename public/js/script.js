$(document).ready(function() {
    
    $('.buyBtn').on('click', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/account/BoughtProduct',
            type: 'post',
            data: {
                    name: $(this).parent().find('strong').html(),
                    price: $(this).parent().find('span').html()
             },
            success: function(response) {
                console.log(response);
                alert('Produs Cumparat cu succes!');
            }, 
            error: function(error) {
                console.log(error);
                alert('Produsul nu a putut fi cumparat!');
            }
        });
    });

});
