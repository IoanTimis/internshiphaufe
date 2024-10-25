$(document).ready(function() {
    
    $('.buyBtn').on('click', function(e) {
        e.preventDefault();
        var name = $(this).parent().find('strong').html();
        var price = $(this).parent().find('span').html();
        var csrf_token = $('#csrf_token').val();
        $.ajax({
            url: '/account/purchase/add',
            type: 'post',
            data: {
                    name: name,
                    price: price,
                    csrf_token: csrf_token
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

    var $form = $('#registerForm');

    $form.on('submit', function(e) {
        if($form.find('input[name="password"]').val().length < 6) {
            alert('Parola trebuie sa fie de minim 6 caractere!');
            return false;
        }
        if($form.find('input[name="password"]').val() !== $form.find('input[name="passwordConfirm"]').val()) {
            alert('Parolele nu coincid!');
            return false;
        } else {
            return true;
        }
    });
});
