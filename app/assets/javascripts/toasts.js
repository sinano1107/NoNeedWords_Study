$(document).on('turbolinks:load', function() {
  var toasts = $('#js_toasts').text();
  if (toasts == "true") {
    M.toast({html: 'Successfully saved !!'})
  } else if (toasts == "false") {
    M.toast({html: '<i class="material-icons left red-text accent-2">error</i><span>Saving failed</span><button class="btn-flat toast-action">Redo?</button>'});
  }
});
