$(document).ready(function() {
    // account--------------------------------------------------------------
    var modal = $('#partyModal');
    var partyForm = $('#partyForm');

    // Submit handler pentru partyForm
    partyForm.on('submit', function(e) {
        e.preventDefault();

        var name = partyForm.find('input[name="name"]').val();
        var date = partyForm.find('input[name="date"]').val();
        var address = partyForm.find('input[name="address"]').val();
        console.log(address);
        var description = partyForm.find('input[name="description"]').val();
        console.log(description);
        var max_entries = partyForm.find('input[name="max_entries"]').val();
        var entry = partyForm.find('input[name="entry"]').val();
        var csrf_token = partyForm.find('input[name="csrf_token"]').val();
        
        var method = partyForm.attr('method');
        var status = (method === 'POST') ? 'active' : partyForm.find('input[name="status"]').val();
        var url = partyForm.attr('action');

        $.ajax({
            url: url,
            method: method,
            data: {
                name: name,
                date: date,
                address: address,
                description: description,
                max_entries: max_entries,
                entry: entry,
                status: status,
                csrf_token: csrf_token
            },
            success: function(response) {
                console.log(response);
                if(response.message === 'Party created') {
                    alert('Party created');
                    window.location.href = '/account/my-parties';
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

    // Configurare modal pentru adăugare petrecere
    $('.newParty .btn-primary').on('click', function() {
        partyForm.attr('action', '/account/party/add');
        partyForm.attr('method', 'POST');

        partyForm.find('input[name="name"]').val('');
        partyForm.find('input[name="date"]').val('');
        partyForm.find('input[name="address"]').val('');
        partyForm.find('input[name="description"]').val('');
        partyForm.find('input[name="max_entries"]').val('');
        partyForm.find('input[name="entry"]').val('');

        modal.find('.modal-title').text('Adauga petrecere');
        modal.find('.btn-primary').text('Adauga');
    });

    $('.card-footer')

    // Register form validation----------------------------------------------
    var $registerForm = $('#registerForm');

    $registerForm.on('submit', function(e) {
        var password = $registerForm.find('input[name="password"]').val();
        var passwordConfirm = $registerForm.find('input[name="passwordConfirm"]').val();

        if(password.length < 6) {
            alert('Parola trebuie sa fie de minim 6 caractere!');
            return false;
        }
        if(password !== passwordConfirm) {
            alert('Parolele nu coincid!');
            return false;
        }
        return true;
    });
});
