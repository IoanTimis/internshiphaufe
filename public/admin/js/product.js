$(document).ready(function() {
	var form = $('#Form');
	var modal = $('#Modal');
	var csrf_token = form.find('input[name=csrf_token]').val();

	$(form).on('submit', function(e) {
		e.preventDefault();
		var url = form.attr('action');
		var method = form.attr('method');

		var name = form.find('input[name=name]').val();
		var price = form.find('input[name=price]').val();

		$.ajax({
			url: url,
			method: method,
			data: {
				name: name,
				price: price,
				csrf_token: csrf_token
			},
			success: function(response) {
				if(method === 'POST') {
					let tr = `<tr data-id="${response.id}">
									<td><span>${response.id}</span></td>
									<td><span>${response.name}</span></td>
									<td><span>${response.price}</span></td>
									<td><span>${response.user_id}</span></td>
									<td><span>${new Date(response.createdAt).toLocaleString()}</span></td>
									<td><span>${new Date(response.updatedAt).toLocaleString()}</span></td>
									<td>
											<button class="btn btn-info" data-id="${response.id}">Editare</button>
											<button class="btn btn-danger" data-id="${response.id}">Stergere</button>
									</td>
							</tr>`;
					$('table tbody').append(tr);
				}			
				else {
					let line = $(`tr[data-id=${response.id}]`);
					line.find('td:eq(1) span').text(response.name);
					line.find('td:eq(2) span').text(response.price);
					alert('Product editat cu succes');
				}
				modal.modal('hide');
			},error: function(response) {
				alert(response.responseJSON.message);
			}
		});
	});

	$('.addBtn').on('click', function() {
		modal.find('.modal-title').text('Adauga Produs');
		modal.find('.modal-footer button[type=submit]').text('Adauga');

		form.attr('action', '/admin/product/add');
		form.attr('method', 'POST');

		form.find('input[name=name]').val('');
		form.find('input[name=price]').val('');

		modal.modal('show');
	});

	$('.btn-info').on('click', function() {
		modal.find('.modal-title').text('Editeaza Produs');
		modal.find('.modal-footer button[type=submit]').text('Editeaza');

		let id = $(this).data('id');
		let name = $(this).closest('tr').find('.name').text();
		let price = $(this).closest('tr').find('.price').text();

		form.find('input[name=name]').val(name);
		form.find('input[name=price]').val(price);

		form.attr('action', `/admin/product/update/${id}`);
		form.attr('method', 'PUT');

		modal.modal('show');
	});

	$('.btn-danger').on('click', function() {
		let id = $(this).data('id');
		let tr = $(this).closest('tr');

		$.ajax({
				url: `/admin/product/delete/${id}`,
				method: 'DELETE',
				data: {
						csrf_token: csrf_token
				},
				success: function(response) {
						tr.remove();
				}
		});
	});

});
