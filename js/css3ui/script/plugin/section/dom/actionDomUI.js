
$(document).ready(function () {

    $.fn.selDom = function () {



        $(this).toggleClass('light');

        console.log('création de la rule SelDom');

        i = 0; var tampon = ''; var ruleHtml = '';
        var countLight = $('A.light').length;

        if (countLight > 0) {
            console.log('Select DOM activer');
            $('A.light').each(function () {

                var rule = $(this).attr('href'); id = $(this).parent().attr('id'); type = $(this).data('type');

                if (type === 'myClass' || type === 'id') {
                    if (id === tampon) {
                        ruleHtml = ruleHtml + rule;
                    } else if (id !== tampon) {
                        if (i === 0) { ruleHtml = rule; }
                        else { ruleHtml = ruleHtml + ' ' + rule; }
                    }
                } else {
                    if (id === tampon) {
                        ruleHtml = ruleHtml + rule;
                    } else if (id !== tampon) {
                        if (i === 0) {
                            ruleHtml = rule;
                        } else { ruleHtml = ruleHtml + ' ' + rule; }
                    }
                }
                tampon = id; i++;
            });

        } else {
            ruleHtml = '';
            $(this).vidangeUI();
        }



        //$(ruleHtml).not('.css3ui , .css3ui *').addClass('views');
        $(this).displayDomEl(ruleHtml);
        $.cookie('ruleHtml', ruleHtml, { expires: 70 });

        dataPrev.ruleHtml = $.cookie('ruleHtml');
        dataPrev.projectID = $.cookie('idProject');
        dataPrev.idSheet = $.cookie('idSheet');

        $('#newRule').val($.cookie('ruleHtml'));
        $(this).resizeTextarea('19', '#newRule');
        console.log('****************************' + ruleHtml);
        if (countLight > 0) {
            $(this).searchData('selDom', ruleHtml);
        }

        $(this).flashUI('rule', 'alert', 'Your work in : ' + ruleHtml);




    };

});