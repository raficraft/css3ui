$(document).ready(function () {
    /*********************DOM**********************************************/
    /************************************************/


    $.fn.viewDom = function () {
        console.log('viewDom')

        $('body').toggleClass('activeSyd')

        if ($('body').hasClass('activeSyd')) {


            dataJQ = D.param.plugName

            ///Variable pour le click
            incTag = 0
            // Variable des différents renvoies des elements HTML
            //cible -> tag de l'element (DIV , UL , A , INPUT , FORM ect...)
            //buildPath les ID , les class et les attributs.
            //buildId , renvoie l'id du TAG
            //buildClass , renvoie la class du TAG
            //buildData est un tableau contenant les attributs DATA du TAG
            let cible, buildTag = '', buildID = '', buildClass = '', buildData = [], exClass = []
            tabClass = []
            //thisID Stock l'id du TAG
            //thisClass stock la class du TAG
            let thisID = '', thisClass = ''
            //dataArray est un tableau contenue les attribue data- et la valeur de cette attribue 
            let dataArray = new Array
            //buildAll est la compilation de cible+buildTag+buildClass+buildData
            buildAll = []


            let cibleOver, pathOver;

            let buildOver = [];
            let tabClassOver = {};

            let incOver = 0;







            $("BODY, BODY *").not(".css3ui ,.css3ui *").on("click", function (e) {

            //Cette verification de la longueur du tableau
            //Permet desactiver certains input de l'interface (input[type=""], checkbox, bouton radio)
            //Car ils sont eux même compris dans le body.
            if(buildAll.length>0){
                event.preventDefault();
            }
                cible = $(this).tagName();
                console.log(cible);

                // Construit la totalité des attributs d'un TAG ex body#tag.class

                switch (cible) {

                    default:
                        //Construit la balise HTML pour le TAG de la cible
                        if (cible !== 'BODY') {
                            buildTag = '<a href="' + cible + '" data-' + dataJQ + '="selCss" data-tag="' + cible + '">' + cible + '</a>';

                            //Construit la balise HTML pour l'ID de la cible
                            if ($(this).attr("id")) {

                                thisID = '#' + $(this).attr('id');

                                buildID = '<a href="' + thisID + '" data-' + dataJQ + '="selCss" data-id="' + thisID + '">' + thisID + '</a>';

                            } else { buildID = ''; thisID = ''; }

                            //Construit la balise HTML pour la class de la cible
                            if ($(this).attr('class')) {

                                thisClass = $(this).attr('class');
                                //Enlève les caratères blanc
                                tabClass = thisClass.split(/\s/);

                                $.each(tabClass, function (key, val) {

                                    if(val !== 'CMA-displayDom'){
                                    thisClass = '.' + val;
                                    exClass[key] = '<a href="' + thisClass + '"  class="selCss" data-type="class" data-action="createRule">' + thisClass + '</a>';
                                    }

                                });

                                buildClass = exClass.join('');
                                exClass = [];
                                tabClass = [];

                            } else { buildClass = ''; }

                            //console.log(buildTag + buildID + buildClass + buildData);
                            //  console.log('Numero : ' + incTag)
                            buildAll[incTag] = '<p id=""selec' + incTag + '" class="blocRule">' + buildTag + buildID + buildClass + '</p>';
                            incTag++;
                            //   console.log(buildAll)


                            $('#selAdd > p').remove();

                        } else if (cible === 'BODY') {

                            //On crée manuellement la valeur HTML ET BODY
                            //  console.log('Numero : ' + incTag)

                            // console.log(buildAll);

                            buildAll.reverse();
                            //  console.log(buildAll);
                            console.error(buildAll);
                            console.error(buildAll.length);
                            //AJouter le limitateur d'affichage au cas ou l'element pointé ce trouve dans énormement de parent.
                            $('#selAdd').append(buildAll);
                            buildAll = [];
                            incTag = 0;

                        }
                        break;

                }

            }).mouseover(function (event) {
                event.preventDefault();
           
            $('.CMA-displayDom').removeClass('CMA-displayDom');  
                // On retire tous les elements qui affiche les marges/bordures/marges intérieur
                $('.displayDom').each(function () { $(this).remove(); });


                cibleOver = $(this).tagName();
                if (cibleOver !== 'BODY') {
                    buildOver[incOver] = $(this).tagName();
                    if ($(this).attr('id')) {
                        buildOver[incOver] += "#" + $(this).attr('id');
                    }
                    if ($(this).attr('class')) {
                        
                        tabClassOver = $(this).attr('class').split(/\s/);;

                        $.each(tabClassOver, (key, val) => {
                             if(val !== 'CMA-displayDom'){
                            buildOver[incOver] += "." + val;
                             }
                        })
                        
                    }

                    incOver++;
                }

                if (cibleOver === 'BODY') {
                    pathOver = buildOver.reverse().join(' ');
                  
                    $(this).displayDomEl($(pathOver));
                    
                    //En fin de chaine on reinitialise les variables et les tableau
                    cibleOver =''
                    pathOver=''
                       incOver = 0;
                       
                    buildOver = []
                    tabClassOver = {};
                 
                }
            })


        } else {

    
 $('.displayDom').each(function () { $(this).remove(); });

            $("BODY, BODY *").not(".css3ui ,.css3ui *").unbind('click');
           $("BODY, BODY *").not(".css3ui ,.css3ui *").unbind('mouseleave');
            $("BODY, BODY *").not(".css3ui ,.css3ui *").unbind('mouseover');
        }

    };



    $(document).on('mouseover', '.itemData-ruleHtml:not(.itemData-comment)', function () {

        $('html, html *').removeClass('views');
        var ui = $(this).children('A').data('groupname');
        var thisRule = $(this).splitRuleHtml(ui);
        console.log('/****/');
        console.log(thisRule);
        $(thisRule).addClass('views');
        console.log($(this));

    }).on('mouseleave', '.itemData-ruleHtml', function () {

        $('html, html *').removeClass('views');

    });
    /*
    
    $(document).on('mouseover','.itemData-comment:not(.itemData-ruleHtml)',function(){
    
            console.log('on survol');
              console.log('Global');
    
    
          var askGlob = function(method,el){
    
                switch (method){
                    
                    
                    case 'findAllRuleHtml':
                        
                        
                        console.log('Commande ASk : >>>> findAllRuleHtml');
                        
                   
                        $('html, html *').removeClass('views');
          
                  
                      
                        
                        $.each(maGlob.style,function(k,style){
                            
                            
                            if(style.idSheet === $.cookie('idSheet')){
                                
                               
                            if(style.group){
                                
                              
                                var loopGroup = function(group,type){
    
                                    $('html, html *').removeClass('views');
                                            console.log('looGroup');
                                            console.log(group);
                                    $.each(group,function(x,groupe){
    
                                    if(groupe.myParent > 0){  
                                         if(groupe.format === 'ruleHtml'){
    
                                           console.log('onStock dans la global');
                                                    console.log(group);
                                                 
                                                var rule = groupe.groupName;
                                                var buffer = O.buffer;
                                                
                                                //passer Dans le split Rule
                                            if(rule === 'html'||
                                                    rule === 'body'||
                                                    rule === 'html,body '){
                                                
                                                buffer = '';
                                                    }        
                                                    console.log(rule);  
                                           $(buffer+' '+rule).addClass('views');
                                           
                                           console.log(groupe.groupName);
                                       }
                                    } 
                                            console.log(el.data('groupname'));
                                       if(type==='first'){
                                    if(groupe.groupName === el.data('groupname')) {
                                        console.log('oui oui oui');
                                        console.log('oui oui oui');
                                        console.log('oui oui oui');
                                        console.log('oui oui oui');
    
                                       if(groupe.child === true){
                                            console.log('on Boucle');
                                            loopGroup(groupe.group,'child');
                                           
                                       } 
                                    }    
                                    }else if(type==='child'){
                                        
                                         if(groupe.child === true){
                                            console.log('on Boucle');
                                            loopGroup(groupe.group,'child');
                                           
                                       } 
                                        
                                    }
                                    
    
    
    });
                                };
                            
                            loopGroup(style.group,'first');
                            
                           
                            } 
                            }
                            
                            
                            
                        });
                        
                       
                        
                        
                    break;
                    
                }
                
            };
            console.log($(this).data());
            askGlob('findAllRuleHtml',$(this));
            
            
    }).on('mouseleave','.itemData-comment,.itemData-media',function(){
        
        $('html, html *').removeClass('views');
        
    });
    
    */


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
