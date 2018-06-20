setInterval(function () {
   jQuery.ajax({
       'type': 'POST',
       'url': '/ajaxservice/get',
       'data': {'from': 101, 'to': 102, 'message': 'bla­bla..'},
       'cache': false,
       'success': function (mess) {
                if (mess) {
                    render(mess); //    необходимо реализовать
                }
         }})
}, 4000);

function render(mess)  {
    var data = {
        repo: JSON.parse(mess)
    };
    template = "{{#repo}}<p>name: {{name}}, data: {{data}}</p>{{/repo}}";
    result = Mustache.render(template, data);
    document.getElementById('contener').innerHTML = result;
}
    