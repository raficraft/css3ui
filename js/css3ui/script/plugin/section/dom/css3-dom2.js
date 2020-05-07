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
          

            
            $(document).on("mouseover", "BODY:not(BODY .csss3ui,BODY css3ui *,BODY .EX-UI),BODY *:not(BODY .csss3ui,BODY css3ui *,BODY .EX-UI)", function (event) {

                console.log( domSelec);
                console.log(pathDom);

                event.preventDefault();
                let cible = $(this).tagName();
            //    console.log('mouseover : '+cible);
                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! =>'+cible);
                if (cible !== 'BODY') {
                    domSelec[inc] = '<p id=""selec' + inc + '" class="blocRule"><a href="' + cible + '" data-' + dataJQ + '="selCss" data-tag="' + cible + '">' + cible + '</a>';
                    pathDom[inc] = cible;

                    if ($(this).attr('id')) {
                        let thisID = '#' + $(this).attr('id');
                        domSelec[inc] += '<a href="' + thisID + '" data-' + dataJQ + '="selCss" data-id="' + thisID + '">' + thisID + '</a>';                      
                        pathDom[inc] += thisID;

                    }

                    if ($(this).attr('class')) {

                        let thisClass = $(this).attr('class');                       
                        //Enlève les caractères blanc 
                        let tabClass = thisClass.split(/\s/g, '');
                        let exClass = [];
                        let pathClass = [];
                        $.each(tabClass, function (key, val) {                        
                            if (val !== 'CMA-displayDom' || val !== 'activeSyd' || val !== 'ui-droppable' || val !== 'droppable') {
                                thisClass = '.' + val;
                                exClass[key] = '<a href="' + thisClass + '"  class="selCss" data-type="class" data-action="createRule">' + thisClass + '</a>';
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

                    domSelec[inc] += '</p>';
                
               
                    inc++;
                    validFunc = true;
                }
                
                if (cible === 'BODY' &&  domSelec.length > 0) {
                   
                        domSelec.reverse();
                        pathDom.reverse();
                        let domSelector = domSelec.join('');
                        let domPath = pathDom.join(' ');

                        localStorage.setItem('domSelector',domSelector);
                        localStorage.setItem('domPath',domPath);
                     
                        ////////////////////////

                      
                        //console.table(localStorage);
                        //Doit ce faire au clic dans l'element créer par displayDomEl
                         $('.displayDom').each(function () { $(this).remove(); });
                        //On passe à dysplaydomEl
                      
                            
                        //    console.error('numero de notre item -->>>' + key);
                            $(this).displayDomEl(domPath);
                   

                        thisId = '';
                        domSelec = [];
                        pathDom = [];
                        inc = 0;

                        domSelector = '';
                        domPath = '';
                 
                }else if(cible === "BODY" &&  domSelec.length  === 0){
                    
                    localStorage.removeItem('domSelector');
                    localStorage.removeItem('domPath');                    
                }
               

            }).on("click", "BODY:not(BODY .csss3ui,BODY css3ui *,BODY .EX-UI),BODY *:not(BODY .csss3ui,BODY css3ui *,BODY .EX-UI)", function (event) {
                
             
                let cible = $(this).tagName(); 
                if(cible !== 'BODY'){
               
                console.error("mouseOut -> "+cible);
                browseDomClick[incClick] = cible;
                console.error(browseDomClick.length);
                }
                if(cible === "BODY" && browseDomClick.length > 0){
                 
                $('#selAdd > p').remove(); 
                 
                if($(this).tagName() === "BODY"){
                 $('#selAdd').append(localStorage.getItem('domSelector'));
                }
                
                browseDomClick = [];
                incClick = 0;
                }else if(cible === "BODY" && browseDomClick.length  === 0){
                    console.error('//On supprime le localStorage');  
                    localStorage.removeItem('domSelector');
                    localStorage.removeItem('domPath');
                    
                }
                
                
            });

        }else {


            $('.displayDom').each(function () { $(this).remove(); });

                $(document).off("mouseover", "BODY:not(BODY .csss3ui,BODY css3ui *,BODY .EX-UI),BODY *:not(BODY .csss3ui,BODY css3ui *,BODY .EX-UI)");
                $(document).off("click", "BODY:not(BODY .csss3ui,BODY css3ui *,BODY .EX-UI),BODY *:not(BODY .csss3ui,BODY css3ui *,BODY .EX-UI)");
          
        }

    };
    


    $(document).on('mouseover', '.itemData-ruleHtml:not(.itemData-comment)', function () {


        var ui = $(this).children('A').data('groupname');
        var thisRule = $(this).splitRuleHtml(ui);
        console.log('/****/');
        console.log(thisRule);        
        $('.displayDom').each(function () { $(this).remove(); });
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

                                            $('' + newRule + '').addClass('views');

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