var driver = require('../../');
var domready = require('domready');

domready(function () {
    var log = (function () {
        var elem = document.querySelector('#console');
        return function (msg) {
            var div = document.createElement('div');
            div.textContent += msg;
            elem.appendChild(div);
        };
    })();
    
    var uri = 'http://' + window.location.host + '/test-form/';
    var d = driver(uri, function (win, $) {
        log('href[0]=' + win.location.href);
        
        var form = $('#form')[0];
        $('input[name=login]').val('testling');
        $('input[name=passw]').val('qwerty');
        $('form').submit();
    }, { log : log });
    
    d.next(function (win, $) {
        log('href[1]=' + win.location.href);
        log($('#welcome p:first').text());
    });
    
    d.appendTo(document.body);
});
