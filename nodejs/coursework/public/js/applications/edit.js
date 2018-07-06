onload = () => {
  $(".FIO").autocomplete({
    type: "POST",
    serviceUrl: "/searech/fio",
    onSelect: function(suggestion) {
      var arr = suggestion.data.split(",");
      switch (this.id) {
        case "fromWhom":
          document.getElementById("fromWhomPosition").value = arr[2].split(
            "/"
          )[1];
          break;
        case "forWhom":
          document.getElementById("forWhomPosition").value = arr[0];
          break;
        default:
          break;
      }
    }
  });
};

function editApplication(data) {
  var $that = $(data),
    formData = new FormData($that.get(0));
  $.ajax({
    type: "POST",
    url: "/applications/edit", // async: true,
    processData: false,
    contentType: false,
    cache: false,
    dataType: "json",
    data: formData,
    success: response => {
      if (response.result) {
        location.href = "#openModal";
        document.getElementById("info").textContent = `Заявка отредактирована.`;
      } else {
      }
    },
    error: response => {}
  });
}
