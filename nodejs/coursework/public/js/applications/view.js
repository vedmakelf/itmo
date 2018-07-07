onload = () => {};

/**
 * функция поиска по таблице
 */
function search() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("searchText");
  filter = input.value.toUpperCase();
  table = document.getElementById("application");
  tr = table.getElementsByTagName("tr");
  var j = 0;
  switch (document.getElementById("collumn").options.selectedIndex) {
    case 0:
      j = 0;
      break;
    case 1:
      j = 1;
      break;
    case 3:
      j = 2;
      break;
    case 4:
      j = 3;
      break;
    case 6:
      j = 4;
      break;
    case 7:
      j = 5;
      break;
    default:
      break;
  }
  for (i = 2; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[j];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
