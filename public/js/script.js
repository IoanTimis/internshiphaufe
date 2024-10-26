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
        var description = partyForm.find('textarea[name="description"]').val(); // folosește textarea
        console.log(description);
        var max_entries = partyForm.find('input[name="max_entries"]').val();
        var entry = partyForm.find('input[name="entry"]').val();
        var csrf_token = partyForm.find('input[name="csrf_token"]').val();
        
        var method = partyForm.attr('method');
        var status = (method === 'POST') ? 'active' : partyForm.find('select[name="status"]').val(); // folosește select
        console.log(status);
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

    $('.editPartyBtn').on('click', function() {
        const partyId = $(this).data('id');
    
        $.ajax({
            url: `/account/party/edit-info/${partyId}`, 
            method: 'GET',
            success: function(response) {
                const party = response.party;
    
                $('#partyForm').attr('action', `/account/party/edit/${partyId}`);
                $('#partyForm').attr('method', 'PUT');
                $('#partyForm').find('input[name="name"]').val(party.name);
                $('#partyForm').find('input[name="entry"]').val(party.entry);
                $('#partyForm').find('input[name="date"]').val(party.date);
                $('#partyForm').find('textarea[name="description"]').val(party.description);
                $('#partyForm').find('input[name="address"]').val(party.address);
                $('#partyForm').find('input[name="max_entries"]').val(party.max_entries);
                $('#partyForm').find('select[name="status"]').val(party.status);

                partyForm.attr('action', `/account/party/edit/${partyId}`);
                partyForm.attr('method', 'PUT');
    
                // Afișează modalul pentru editare
                $('#partyModal').modal('show');
            },
            error: function(error) {
                console.error('Error fetching party data:', error);
                alert('An error occurred while fetching party data.');
            }
        });
    });

    // Delete party
    $('.deletePartyBtn').on('click', function() {
        const partyId = $(this).data('id');
        var csrf_token = $('#partyForm').find('input[name="csrf_token"]').val();
    
        $.ajax({
            url: `/account/party/delete/${partyId}`,
            method: 'DELETE',
            data: {
                csrf_token: csrf_token
            },
            success: function(response) {
                if(response.message === 'Party deleted') {
                    alert('Party deleted');
                    window.location.href = '/account/my-parties';
                }
            },
            error: function(error) {
                console.error('Error deleting party:', error);
                alert('An error occurred while deleting party.');
            }
        });
    });

    // general--------------------------------------------------------------

    $('.reservationBtn').on('click', function() {
        console.log('Reservation button clicked');
        const partyId = $(this).data('id');
        var csrf_token = $('main').find('input[name="csrf_token"]').val();
    
        $.ajax({
            url: `/party/reserve/${partyId}`,
            method: 'POST',
            data: {
                csrf_token: csrf_token
            },
            success: function(response) {
                if(response.message === 'Reservation created') {
                    alert('Reservation created');
                }
            },
            error: function(error) {
                console.error('Error creating reservation:', error);
                alert('An error occurred while creating reservation.');
            }
        });
    });

    //Accept reservation--------------------------------------------------------------
    $('.reservationForm').on('submit', function(e) {
        e.preventDefault();
        var reservationId = $(this).find('input[name="reservation_id"]').val();
        var message = $(this).find('textarea[name="message"]').val();
        var csrf_token = $(this).find('input[name="csrf_token"]').val();

        var url = $(this).attr('action');
    
        $.ajax({
            url: url,
            method: 'PUT',
            data: {
                
                csrf_token: csrf_token,
                message: message
            },
            success: function(response) {
                if(response.message === 'Reservation accepted') {
                    alert('Reservation accepted');
                    window.location.href = '/account/my-reservations';
                }
            },
            error: function(error) {
                console.error('Error accepting reservation:', error);
                alert('An error occurred while accepting reservation.');
            }
        });
    });

    $('.acceptReservationBtn').on('click', function() {
        var reservationId = $(this).data('id');
        let form = $('#reservationForm');
        let modal = $('#reservationModal');
        form.attr('action', `/account/reservation/accept/${reservationId}`);
        modal.modal('show');
        
    });
    

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
