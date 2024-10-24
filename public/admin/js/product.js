$(document).ready(function() {
  // Products -----------------------------------------------------------------------------------------------------
  $(".addForm").on('submit', function(e) {
      e.preventDefault();

      var form = $(this);
      var url = form.attr('action');
      var type = form.attr('method');
      var data = form.serialize();
      
      $.ajax({
          url: url,
          type: type,
          data: {
              name: $(this).find('input[name="name"]').val(),
              price: $(this).find('input[name="price"]').val()
          },
          success: function(response) {
              var html = 
              `<li class="liProduct">
                  <strong>${response.name}</strong>,
                  price: <span>${response.price}</span>
                  <button class="btn editBtn" data-toggle="modal" data-target="#editModal" data-id="${response.id}">Edit</button>
                  <button class="btn deleteBtn" data-id="${response.id}">Delete</button>
              </li>`;
              $('#ulProducts').append(html);
              console.log(response);
          }, 
          error: function(error) {
              console.log(error);
          }
      });
  });

  $(".editForm").on('submit', function(e) {
      e.preventDefault();
  
      var form = $(this);
      var url = form.attr('action');
      var type = form.attr('method');
      var data = form.serialize();
      
      $.ajax({
          url: url + '/' + $(this).find('input[name="id"]').val(),
          type: type,
          data: {
              name: $(this).find('input[name="name"]').val(),
              price: $(this).find('input[name="price"]').val()
          },
          success: function(response) {
              $(`#ulProducts li button[data-id=${response.id}]`).parent().find('strong').html(response.name);
              $(`#ulProducts li button[data-id=${response.id}]`).parent().find('span').html(response.price);
              console.log(response);
          }, 
          error: function(error) {
              console.log(error);
          }
      });
  });

  $('#ulProducts').on('click', '.deleteByAdminBtn', function() {
      var id = $(this).data('id');
      var li = $(this).parent();
      
      $.ajax({
          url: '/admin/products' + '/' + id,
          type: 'delete',
          data: {},
          success: function(response) {
              li.remove();
              console.log(response);
          }, 
          error: function(error) {
              console.log(error);
          }
      });
  });

  $('#ulProducts').on('click', '.editBtn', function() {
      var id = $(this).data('id');
      
      $('#editModal').find('.editForm input[name="id"]').val(id);
      $('#editModal').find('.editForm input[name="name"]').val($(this).parent().find('strong').html());
      $('#editModal').find('.editForm input[name="price"]').val($(this).parent().find('span').html());
  });

});
