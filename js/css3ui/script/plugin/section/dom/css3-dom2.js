$(document).ready(function () {




    $.fn.viewDom = function () {
        console.log('viewDom');
        dataJQ = D.param.plugName
        $('body').toggleClass('activeSyd');
        if ($('body').hasClass('activeSyd')) {


            domSelec = [];
            pathDom = [];
            inc = 0;


            browseDomClick = [];
            incClick = 0;





            $(document).on("mouseover", "BODY:not(.EX-UI),BODY *:not(.EX-UI)", function (event) {

                //console.log(domSelec);
                // console.log(pathDom);
       

                event.preventDefault();
                let cible = $(this).tagName();
                
                console.log('mouseover : ' + cible);
                if (cible !== 'BODY') {
                    domSelec[inc] = '<p id=""selec' + inc + '" class="blocRule EX-UI"><a href="' + cible + '" data-' + dataJQ + '="selCss" data-tag="' + cible + '" class="EX-UI">' + cible + '</a>';
                    pathDom[inc] = cible;

                    if ($(this).attr('id')) {
                        let thisID = '#' + $(this).attr('id').replace(/\s/g, '');
                        //console.log('ID du selecteur : '+thisID);
                        domSelec[inc] += '<a href="' + thisID + '" data-' + dataJQ + '="selCss" data-id="' + thisID + '" class="EX-UI">' + thisID + '</a>';
                        pathDom[inc] += thisID;

                    }

                    if ($(this).attr('class')) {

                        let thisClass = $(this).attr('class');
                        //Enlève les caractères blanc 
                        let tabClass = thisClass.split(/\s/g);
                        let exClass = [];
                        let pathClass = [];
                        $.each(tabClass, function (key, val) {
                            if (val !== 'CMA-displayDom' || val !== 'activeSyd' || val !== 'ui-droppable' || val !== 'droppable') {
                                thisClass = '.' + val;
                                exClass[key] = '<a href="' + thisClass + '"  class="selCss EX-UI" data-type="class" data-action="createRule">' + thisClass + '</a>';
                                pathClass[key] = '.' + val;
                            }
                        });

                        domSelec[inc] += exClass.join('');
                        pathDom[inc] += pathClass.join('');

                        thisClass = '';
                        tabClass = [];
                        exClass = [];
                        pathClass = [];
                    }

                  
                    //console.log(domSelec);
                    //console.log(pathDom);
                    domSelec[inc] += '</p>';
                    inc++;
                
                }

                if (cible === 'BODY' && domSelec.length > 0) {
                    
              

                    domSelec.reverse();
                    pathDom.reverse();
                    let domSelector = domSelec.join('');
                    let domPath = pathDom.join(' ');

                    D.dom.domPath = domPath;
                    D.dom.domSelector = domSelector;

                    ////////////////////////
                    console.log('je traite');
                    if (D.dom.fixSelector === false) {
                        //console.table(localStorage);
                        //Doit ce faire au clic dans l'element créer par displayDomEl
                        //On passe à dysplaydomEl

                        console.error(domPath);    
                        $(this).displayDomEl(domPath+':not(.EX-UI)');

                    }
                    thisId = '';
                    domSelec = [];
                    pathDom = [];
                    inc = 0;

                    domSelector = '';
                    domPath = '';

                } else if (cible === "BODY" && domSelec.length === 0) {

                    D.dom.domPath = '';
                    D.dom.domSelector = '';
                }


            }).on('click', "BODY:not(.EX-UI), BODY *:not(.EX-UI)", function (event) {


                let cible = $(this).tagName();
                if (cible !== 'BODY') {

                    // console.error("mouseOut -> "+cible);
                    browseDomClick[incClick] = cible;
                    //console.error(browseDomClick.length);
                }
                if (cible === "BODY" && browseDomClick.length > 0) {

                    $('#selAdd > p').remove();

                  
                        $('#selAdd').append(D.dom.domSelector);
                    

                    browseDomClick = [];
                    incClick = 0;

                    //Quand on clic sur un élement dans le DOM du site web. On fixe l'affichage de cette élement 
                    //Ce qui annule l'affichage au survol

                    //Quand on reclic sur cette élément cela réactive l'affichage au survol

                    if( D.dom.fixSelector === false ){ $(this).bindORunbindViewDom('unbind'); }else{ 
                        
                        
                        $(this).displayDomEl(D.dom.domPath+':not(.EX-UI)');
                        $(this).bindORunbindViewDom('bind');
                    }
             
             

                } else if (cible === "BODY" && browseDomClick.length === 0) {
                    //console.error('//On supprime le localStorage');
                    D.dom.domSelector = '';
                    D.dom.domPath = '';
                }


            });

        } else {


            $('.displayDom').each(function () { $(this).remove(); });

            $(document).off('mouseover', "BODY:not(BODY .EX-UI),BODY *:not(BODY .EX-UI)");
            $(document).off('click', "BODY:not(BODY .EX-UI),BODY *:not(BODY .EX-UI)");

        }

    };

    $.fn.bindORunbindViewDom = function (way) {

        switch (way) {
            case 'bind':

                console.log('On idéfixe ;)');
                D.dom.fixSelector = false;                
                $('.displayEl').css('background-image', '');
                $('.displayEl').css('background', 'rgba(60,180,255,0.4)');
 
            break;

            case 'unbind':
                console.log('On fixe');
                $('.displayEl').css('background', '');
                $('.displayEl').css('background-image', 'url(' + D.param.dirImg + '/base/ui/cross.png)');
                console.log($('.displayEl').css('background-image'));
                D.dom.fixSelector = true;
            break;
            
            ///////////////////////////////////////
            
            case 'bindAndUnbLock' : 
                
                 console.log('On défixe');
                D.dom.fixSelector = false;
                D.dom.blockSelector = false;
                
            break;
            
            case 'unbindAndBLock' : 
         
                 console.log('On fixe');
                $('.displayEl').css('background-image', 'url(' + D.param.dirImg + '/base/ui/cross.png)');
                D.dom.fixSelector = true;
                D.dom.blockSelector = true;
                
            break;
            
          
        }

    };



    $(document).on('mouseover', '.itemData-ruleHtml:not(.itemData-comment)', function () {
        
         console.error(D.dom.fixSelector);
/*
        if( D.dom.fixSelector === true){
            $(this).bindORunbindViewDom('bind'); 
        }
   */         var ui = $(this).children('A').data('groupname');
            var thisRule = $(this).splitRuleHtml(ui);       
            $(this).displayDomEl(thisRule);
        

    });

    $(document).on('mouseover', '.itemData-comment:not(.itemData-ruleHtml)[data-level="1"] > A', function () {

        console.log('on survol');
        console.log('Global');
        console.log('On lance la fonction pour le level1');
        $(this).askGlobal('findAllRuleHtml', '1');

    });
    $(document).on('mouseover', '.itemData-comment:not(.itemData-ruleHtml)[data-level="2"] > A', function () {

        console.log('on survol');
        console.log('Global');
        console.log('On lance la fonction pour le level2');
        $(this).askGlobal('findAllRuleHtml', '2');
    });
    $(document).on('mouseover', '.itemData-comment:not(.itemData-ruleHtml)[data-level="3"] > A', function () {

        console.log('on survol');
        console.log('Global');
        console.log('On lance la fonction pour le level3');
        $(this).askGlobal('findAllRuleHtml', '3');
    });


    $.fn.askGlobal = function (method, param) {

        console.log('ASKGLOBAL');

        switch (method) {
            case 'findAllRuleHtml':
                el = $(this).data();
                console.log($(this).data());
                console.log(el);
                console.log('level de reference+ > ' + el.level);
                var refLevel = el.level;
                console.log('work level ' + param);
                $('html, html *').removeClass('views');

                $.each(maGlob.style, function (k, style) {


                    if (style.idSheet === $.cookie('idSheet')) {

                        if (style.group) {

                            $('html, html *').removeClass('views');

                            var loopGroup = function (group, type) {

                                console.log('type de boucle > ' + type);


                                $.each(group, function (x, groupe) {





                                    if (type === 'first') {
                                        console.log(groupe.groupName + ' ------ ' + el.groupname);


                                        if (groupe.groupName === el.groupname) {
                                            if (groupe.child === true) {
                                                console.log('on reboucle');
                                                console.log('-------------<<<<<<<<<<<   BINGO  first>>>>>>>>>>>>>-----------');

                                                loopGroup(groupe.group, 'snd');
                                            }
                                        } else {
                                            if (groupe.child === true) {
                                                console.log('on reboucle');
                                                loopGroup(groupe.group, 'first');
                                            }

                                        }
                                    }

                                    if (type === 'snd') {
                                        if (groupe.format === 'ruleHtml' && groupe.level > refLevel) {
                                            console.log(groupe.groupName);
                                            console.log('-------------<<<<<<<<<<<   BINGO ON STOCK ruleHtml ' + groupe.groupName + ' level ' + groupe.level + ' >>>>>>>>>>>>>-----------');
                                            var newRule = $(this).splitRuleHtml(groupe.groupName);

                                            //$('' + newRule + '').addClass('views');

                                        }

                                        if (groupe.child === true) {
                                            loopGroup(groupe.group, 'snd');
                                        }

                                    }

                                });
                            };

                            loopGroup(style.group, 'first');
                        }
                    }
                });

                break;

                $(this).askGlob('findAllRuleHtml', $(this));

        }

    };

});