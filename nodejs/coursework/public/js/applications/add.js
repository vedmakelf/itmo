onload = () => {
  // $(".FIO").autocomplete({
  //   type: "POST",
  //   serviceUrl: "/searech/fio", // Страница для обработки запросов автозаполнения
  //   minChars: 1, // Минимальная длина запроса для срабатывания автозаполнения
  //   delimiter: /(,|;)\s*/, // Разделитель для нескольких запросов, символ или регулярное выражение
  //   maxHeight: 400, // Максимальная высота списка подсказок, в пикселях
  //   width: 300, // Ширина списка
  //   zIndex: 9999, // z-index списка
  //   deferRequestBy: 0, // Задержка запроса (мсек), на случай, если мы не хотим слать миллион запросов, пока пользователь печатает. Я обычно ставлю 300.
  //   params: { country: "Yes" }, // Дополнительные параметры
  //   onSelect: function(data, value) {}, // Callback функция, срабатывающая на выбор одного из предложенных вариантов,
  //   lookup: [] // Список вариантов для локального автозаполнения
  // });
  // $(".FIO").autocomplete({
  //   type: "POST",
  //   serviceUrl: "/searech/fio",
  //   minLength: 2
  // });

  /**
   * подстановка текущйи даты
   */
  new Vue({
    el: "#nowDate",
    data: {
      nowDate: () => {
        var date = new Date();
        return date.format("yyyy-mm-dd");
      }
    }
  });

  /**
   * обработка живого поиска
   */
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

/**
 * обработка отправки заявки
 * @param {*} data 
 */
function addApplication(data) {
  var $that = $(data),
    formData = new FormData($that.get(0));
  $.ajax({
    type: "POST",
    url: "/applications/add", // async: true,
    processData: false,
    contentType: false,
    cache: false,
    dataType: "json",
    data: formData,
    success: response => {
      if (response.result) {
        idApplications = response.info.insertId;
        location.href = "#openModal";
        document.getElementById(
          "info"
        ).textContent = `Заявка зарегистрированаю.`;
      } else {
      }
    },
    error: response => {}
  });
}
var idApplications = null;

function locationEdit() {
  location.href = `/applications/edit?item=${idApplications}`;
}