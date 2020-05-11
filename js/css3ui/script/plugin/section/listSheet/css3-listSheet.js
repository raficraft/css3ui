$(document).ready(function() {  
    
                
//Passages des éléments au vues

$.fn.listProject  = function(R){
        console.log(R);
 
 
    var myHtml ='';
    var cible = $('#tabProject');
      
cible.empty();      
 if(R.Allproject){                   
                   /*Construction du TABLEAU*/ 
              
                    
    myHtml+='<ul class="ULProject flexColumn-noWrap EX-UI">';
                $.each(R.Allproject, function(k,v) { 
                    
                    console.log('hou hou');
                    
                myHtml += '<li data-action="open" '+
                            'data-table="project" data-id="'+v.idProject+'" '+
                            'data-projectName="'+v.project+'" data-rightClick="true" class="EX-UI" >'+
                            
                            '<a class="thisProject EX-UI" href="project_'+v.idProject+'" '+
                            'data-action="open" '+
                            'data-table="project" data-id="'+v.idProject+'" '+
                            'data-projectname="'+v.project+'" data-rightClick="true" '+
                            '>'+v.project+'</a>\n\
                            </li>';                               
                });
    myHtml += '</ul>';

               //*On insère le tableau*/   
    $(myHtml).appendTo(cible);                    

    }else{

        myHtml += '<ul class="EX-UI" ><li>Aucun projet enregistrer dans la base de données. '+
                    'Pour créer un projet, faites un clic droit '+
                    'sur l\'icone en forme de cerveau. '+
                     '</br>Puis selectionné \' New-project \'.</li></ul>';
        $(myHtml).appendTo(cible);          
    }    
  };  
  
  
  
///////////////////////////////////////////////////
///////////////////////////////////////////////////


$.fn.createListData = function(choice,el){
  
var addClass ='';
var haveRuleCss = '';
        console.log(el);
     
$.each(el,function(key,thisEl){  
            
    if(thisEl.level > 0){addClass='hidden';}
    
 
    switch(choice){                
        
        case 'group': 
            
            var stateGroup ='';
            
            if(thisEl.actif==='0'){
                        console.log('inactif');
                        stateGroup = 'disableGroup';
            }
            
            if(thisEl.format === 'ruleHtml'){
                       
                if(thisEl.isrule === true){  
                    haveRuleCss = 'data-haverule="true"';
                }
                
            }
          
            //On affiche le group          
            listEl +='<li class="itemData '+stateGroup+' itemData-'+thisEl.format+' blankLine-right EX-UI"  \n\
                        data-table="group"  data-rightClick="true" \n\
                        data-idgroup="'+thisEl.idGroup+'" \n\
                        data-groupformat="'+thisEl.format+'" \n\
                        data-level="'+thisEl.level+'" \n\
                        data-position="'+thisEl.position+'" \n\
                        data-child="'+thisEl.child+'" \n\
                        data-groupname="'+thisEl.groupName+'" \n\
                        data-idlinkgroup="'+thisEl.idToGroup+'" \n\
                        data-state="'+thisEl.actif+'" \n\
                        '+haveRuleCss+' \n\
                        data-myparent="'+thisEl.myParent+'">\n\
                        <a class="EX-UI" data-css3ui="openGroup" data-el="clickArrow_'+thisEl.idToGroup+'" \n\
                        data-table="group" \n\
                        data-idgroup="'+thisEl.idGroup+'" \n\
                        data-groupformat="'+thisEl.format+'" \n\
                        data-level="'+thisEl.level+'" \n\
                        data-position="'+thisEl.position+'" \n\
                        data-child="'+thisEl.child+'" \n\
                        data-groupname="'+thisEl.groupName+'" \n\
                        data-idlinkgroup="'+thisEl.idToGroup+'"\n\
                        data-state="'+thisEl.actif+'" \n\
                        '+haveRuleCss+' \n\
                        data-myparent="'+thisEl.myParent+'">&#9654</a>\n\
                        <a class="EX-UI" data-css3ui="listRule"  data-el="clickGroup_'+thisEl.idToGroup+'" \n\
                        data-table="group" \n\
                        data-idgroup="'+thisEl.idGroup+'" \n\
                        data-groupformat="'+thisEl.format+'" \n\
                        data-level="'+thisEl.level+'" \n\
                        data-position="'+thisEl.position+'" \n\
                        data-child="'+thisEl.child+'" \n\
                        data-groupname="'+thisEl.groupName+'" \n\
                        data-idlinkgroup="'+thisEl.idToGroup+'"\n\
                        data-state="'+thisEl.actif+'" \n\
                        '+haveRuleCss+' \n\
                        data-myparent="'+thisEl.myParent+'">'+thisEl.groupName+'</a>\n\
                        <a class="EX-UI" data-css3ui="addRule"  data-el="clickGroup_'+thisEl.idToGroup+'" \n\
                        data-table="group" \n\
                        data-idgroup="'+thisEl.idGroup+'" \n\
                        data-groupformat="'+thisEl.format+'" \n\
                        data-level="'+thisEl.level+'" \n\
                        data-position="'+thisEl.position+'" \n\
                        data-child="'+thisEl.child+'" \n\
                        data-groupname="'+thisEl.groupName+'" \n\
                        data-idlinkgroup="'+thisEl.idToGroup+'"\n\
                        data-state="'+thisEl.actif+'" \n\
                        '+haveRuleCss+' \n\
                        data-myparent="'+thisEl.myParent+'">+</a>'; 
            
       
            
                if(thisEl.format === 'ruleHtml'){
                     
                    //On envoie le tableau rule+values
                    if(thisEl.rule){
                      
                            
                    listEl +='<ul class="hidden listData listData-rule EX-UI" data-table="rule" >';                
                    $.each(thisEl.rule,function(k,zeRule){
                    
                        var ruleIMP = '';
                          
                        if(zeRule.important === '1'){
                            ruleIMP = 'itemData-rule-important';
                        }
                        if(zeRule.actif === '0'){
                            ruleIMP = 'itemData-rule-disable';
                        }
                        
                    listEl +=   '<li class="itemData-rule '+ruleIMP+' EX-UI" data-table="rule" \n\
                                data-idlinkrule="'+zeRule.id_linkRule+'" \n\
                                data-el="rule_'+zeRule.id_linkRule+'" \n\
                                data-rightClick="true" \n\
                                data-rulecss="'+zeRule.rule+'" \n\
                                data-valcss="'+zeRule.css+'" \n\
                                data-myparent="'+thisEl.idToGroup+'" >\n\
                                <a class="EX-UI">'+zeRule.rule+' :</a><a class="EX-UI">'+zeRule.css+'</a>\n\
                                </li>';     
                   
                    });
                    listEl +='</ul>';
                    }else{
                           listEl += '<ul class="'+addClass+' listData listData-group listData-group-empty EX-UI"><li class="EX-UI"><a class="item-data EX-UI">Groupe empty</a></li></ul>';
                
                    }
                }

                //On test si il y as un noeud
                
                if(thisEl.group){                           
                    listEl +='<ul class="'+addClass+' listData listData-group EX-UI" \n\
                               data-level="'+thisEl.level+'" data-table="group">';
                    $(this).createListData('group',thisEl.group);
                    listEl +='</ul>';
                    
                }
                
                if(thisEl.format !== 'ruleHtml' && thisEl.child === false){
                  listEl += '<ul class="'+addClass+' listData listData-group listData-group-empty EX-UI"><li class="EX-UI"><a class="item-data EX-UI">Groupe empty</a></li></ul>';
                
            } 
             
            listEl +='</li>';
            
            
        break;
   
    }    
   
});   
   return  listEl;   
};


$.fn.listSheet  = function(R){
    
        console.log(R);
    
    maGlob= [];
    ///Avant suppression du listing 
    //On recupére la position du scroll
    
    var scroll = $('.styleSheet').scrollTop();
    $.cookie('posList',scroll, { expires: 70});
    console.log('------->>>>>>>scroll du listing :',$.cookie('posList'));
      
   
    var selectFirst = false;
     
        maGlob=R;
        
      
$('#styleDb,#css3ui-listData').empty();       
          
            if(R.style){
         
                
                if($.cookie('idSheet')===null){$.cookie('idSheet', R.style[0].idSheet , { expires: 70});}
                if($.cookie('sheet')===null){console.log('+++++++++++++++++++++++++++++');$.cookie('sheet', R.style[0].sheet , { expires: 70});}
                if($.cookie('lastOpen')===null){$.cookie('lastOpen', 'root_0' , { expires: 70});}
                
                var myHtml = '';
                
              
                
                //On construit la structure de la navigation par onglets.
                myHtml +=' <h1 class="legendInside EX-UI">Feuille de style.</h1>'+
                         '<ul id="css3ui-tabListData" class="listSheet tabBasic EX-UI">';
                
                $.each(R.style,function(k,v){
                    
                //On renomme les variables de la feuilles des styles                
                var idSheet = v.idSheet , sheet = v.sheet;
                myHtml += '<li class="EX-UI"><a href="#'+sheet+'" data-sheetname="'+sheet+'" class="EX-UI"';
                if(sheet===$.cookie('sheet')){
                  
                        myHtml += 'class="css3ui-tabListData_active EX-UI" '; selectFirst=false;}
                else{
                     
                    if(k===R.style.length){    
                        selectFirst=true; 
                    }
                    
                }
                myHtml +='data-rightClick="panelOption" data-id="'+idSheet+'" data-action="open" data-table="sheet" data-el="item-sheet">'+sheet+'</a></li>';
                });
                myHtml += '</ul>';  
                $(myHtml).appendTo('#styleDb');
                
               if(selectFirst===true){
                
                  $('[data-el="item-sheet"]:first').addClass("css3ui-tabListData_active");
               
               }
                
                
                var to = 
                        '<div id="css3ui-listData" class="groupSortable EX-UI">\n\
                        <div id="styleSheet" class="styleSheet EX-UI"></div>\n\
                        </div>\n\
                        <div class="css3ui-db bottom-panel EX-UI">\n\
                        <span class="bottom-input EX-UI">\n\
                            <span class="input EX-UI"><textarea id="newRule" placeholder="make rule" class="EX-UI"></textarea></span>\n\
                            <span class="input EX-UI"><input class="EX-UI" id="css3ui-search" type="text" placeholder="&#128270 Search"></span>\n\
                        </span>\n\
                        <span class="bottom-icon EX-UI">\n\
                        <a href="#callTo" data-action="callTo" data-text="add-group" data-switch="create" data-table="group" class="EX-UI">\n\
                        <img src="/css3ui/js/css3ui/img/base/icon_css/css3ui-addFolder.png" alt="css3ui-addFolder" title="css3ui-addFolder" class="img32 EX-UI">\n\
                        </a>\n\
                        </span>\n\
                        </div>';
                $(to).appendTo('#styleDb');
     
       
        
         
                $.each(R.style,function(keyStyle,style){
                   
                 listEl = '';
                 
                 if(style.group){ child= 'data-child="true"'; }else{child= 'data-child="false"';}
                
                    //Création de la div contenant les données de la feuille de style
                     var listHtml ='<ul id="'+style.sheet+'" class="tabBasic listData listData-group EX-UI"  \n\
                                   data-sheet="'+style.sheet+'" data-id="'+style.idSheet+'" \n\
                                   data-table="sheet" data-level="0" data-el="root_0" \n\
                                   data-idlinkgroup="0" data-position="0" data-myparent="0" '+child+'  data-groupformat="comment">\n\
                                   <ul class="listData listData-group EX-UI" \n\
                                   data-el="root" data-idlinkgroup="0"data-groupformat="comment">';
                   
                   
                    if(style.group){  
                        //On check les groupes                        
                        listHtml += $(this).createListData('group',style.group);
                    }
                             
                    
                     listHtml +='</ul></ul>';
                     
                    
                     $(listHtml).appendTo('#styleSheet');
                   
                });//fin de la boucle sur les feuilles de style
               
                $(this).viewStyleSheet();
               
            }else{
                
                var  advert =' <h1 class="legendInside EX-UI"></h1><p class="paBasic EX-UI">Votre projet ne contient aucune feuille de style \n\
                </br>Pour ajouter une feuille de style . Faites un click droit sur l\'icone ""</br></br>\n\
                Vous pouvez créer autant de feuille de style que vous le souhaitez\n\
                </p>';
        
                $(advert).appendTo('#styleDb');
                $.removeCookie('sheet');
                $.removeCookie('idSheet');
                
            }  
            
            /*Affichage dans les bibliothèques*/
            
            if(R.biblio){
                
                
                console.log('yes affichages des biblio');
                console.log(R.biblio);
                /*BiblioColor*/
                
                   $('#biblio-color UL.thisBiblio').empty();               
                   
                   $.each(R.biblio.color,function(k,color){
                       
                       console.log(color);
                   
                    myHtml = '<li class="EX-UI">'+color.css+'</li>';
                   
                    console.log(color.css);
                        $('#biblio-color UL.thisBiblio.thisBiblio').append('<li class="flex EX-UI" \n\
                        style="background-image : url('+O.dirPlug+'/img/base/icon_css/opacity.png);">\n\
                        <a href="#" class="aColor EX-UI" data-css="'+color.css+'" \n\
                        title="'+color.css+'"\n\
                        style="background : '+color.css+';">'+' '+'</a>\n\
                        </li>');  
                       
                   });
                   
                /*BiblioBackground*/
                
                   $('#biblio-background UL.thisBiblio').empty();               
                   
                   $.each(R.biblio.background,function(k,background){
                       
                        $('#biblio-background UL.thisBiblio').append('<li class="flex EX-UI" \n\
                        style="background-image : url('+O.dirPlug+'/img/base/icon_css/opacity.png);">\n\
                        <a href="#" class="aColor EX-UI" data-css="'+background.css+'" \n\
                        title="'+background.css+'"\n\
                        style="background : '+background.css+';">'+' '+'</a>\n\
                        </li>');  
                       
                   });
                   
                /*BiblioMultiBackground*/
                
                   $('#biblio-multiBack UL.thisBiblio').empty();               
                   
                   $.each(R.biblio.multiBack,function(k,multiBack){
                       
                        $('#biblio-multiBack UL.thisBiblio').append('<li class="flex EX-UI" \n\
                        style="background-image : url('+O.dirPlug+'/img/base/icon_css/opacity.png);">\n\
                        <a href="#" class="aColor EX-UI" data-css="'+multiBack.css+'" \n\
                        title="'+multiBack.css+'"\n\
                        style="background-image : '+multiBack.css+';">'+' '+'</a>\n\
                        </li>');  
                       
                   });
                   
                /*BiblioMultiBackground ALL*/
                
                   $('#biblio-multiBack UL.allBiblio').empty();               
                   
                   $.each(R.biblioAll.multiBack,function(k,multiBack){
                       
                        $('#biblio-multiBack UL.allBiblio').append('<li class="flex EX-UI" \n\
                        style="background-image : url('+O.dirPlug+'/img/base/icon_css/opacity.png);">\n\
                        <a href="#" class="aColor EX-UI" data-css="'+multiBack.css+'" \n\
                        title="'+multiBack.css+'"\n\
                        style="background-image : '+multiBack.css+';">'+' '+'</a>\n\
                        </li>');  
                       
                   });
                
            }
            
            
            
            
            //Parcours de la global tabListOpen et affichage en conséquence
            
            $('[title="css3ui-ui"]').trigger('click');
          
            $("ul#"+$.cookie('sheet')+"").show().siblings().hide();            
            
            console.log('fin du chargement de la feuille de style');
            if($.cookie('ruleHtml')){
                 $('#newRule').val($.cookie('ruleHtml'));
                 $(this).resizeTextarea('19','#newRule');
            }
            $(this).tmpCss(R,'tmpCss'); 
            $(this).finalCss(R,'finalCss'); 
             
           /* $(this).checkSizeOfListing();*/
           
           console.log(tabListOpen.length);
           if($.cookie('lastOpen')&&tabListOpen.length === 0){               
             
                //function qui boucle de l'enfant juqu'a lelemenent ayant un parent 0 
                if($.cookie('lastOpen')!=='root_0'){
                var thisEl = $('[data-el="clickArrow_'+$.cookie('lastOpen')+'"]');
                var loopMyParent = function(el){                   
                    console.log('--------------------------------------->>>>');
                    console.log(el.data('idlinkgroup'));
                    tabListOpen.push(el.data('idlinkgroup'));                     
                    
                    if(el.data('myparent') > 0){
                        console.log('newLoop');                        
                        var newEl = $('[data-el="clickArrow_'+el.data('myparent')+'"]');
                        loopMyParent(newEl);                        
                    }
                };
               
                    loopMyParent(thisEl);
                }
           }else{               
               console.log('echec');
           }
        
};


$.fn.openGroup = function(thisTab,findData){
     if(!findData){ close = true;}
        console.log(thisTab);
    
    if(thisTab.length>0){
        console.log('on ouvre les groupe stocker');
        console.log(thisTab);
        var lgt = thisTab.length-1;
        var styleSheet = '#'+$.cookie('sheet');
            $.each(thisTab,function(k,el){ console.log(el);       
                
            /*  var viewThis = $(styleSheet+' [data-el="clickArrow_'+el+'"]');*////test
              var viewThis = $('[data-el="clickArrow_'+el+'"]');
                console.log('OpenGROUPOpenGROUPOpenGROUPOpenGROUPOpenGROUPOpenGROUPOpenGROUP');
              viewThis.trigger('click',false);
              
              
            });
     }else{console.log('le tabelau transmit est vide');
         
    $(this).loadDefaultGlobal('listSelect');
            
            zeChildren = $('UL#'+$.cookie('sheet')+'').children('ul').children(); 
            console.log(zeChildren.length);
            var position = zeChildren.length;            
            console.log('nombre d enfants '+position);
            dataListSelect.position = position;            
            console.log(dataListSelect); 
    } 
    
            //lorsque l'on ferme un groupe le cookie lastOpen doit revenir au groupe superieur.
      
};



$.fn.incrementTabListOpen = function(thisData){
    
       if(thisData.child===true){
                    console.log("j'ai des enfants");
                    //on supprime le groupe et ses enfants
                    $.each(tabListOpen,function(key,val){                                        
                    if (val===thisData.idlinkgroup) {                                        
                        //On supprime l'élément parent 
                        $(this).excludeChildListArray(val);
                        $(this).excludeValArray(val);                                                                      
                    }
                });

                }else{
                    console.log('pas denfants');
                    //-on supprime le groupe seul
                    $.each(tabListOpen,function(key,val){
                        if (val===thisData.idlinkgroup) {
                          $(this).excludeValArray(val);                                         
                        }
                    });
       }    
    
};


//refabrique le tableau des group ouverts quand on change de feuille de style


$.fn.sheetOpenGroup = function(sheet){
    
tabListOpen = []; 
        console.log($.cookie());
        
        
         console.log('exeptions level 0');                             
                        

        console.log('refabrique le tableau des group ouverts quand on change de feuille de style');
        console.log(sheet);
        
        var lgt =$('#'+sheet+' [data-css3ui="openGroup"].illuminate').length;
        
        if(lgt>0){
        $('#'+sheet+' [data-css3ui="openGroup"].illuminate').each(function(){
            
            
            console.log($(this).data());
            var thisData = $(this).data();            
            tabListOpen.push(thisData.idlinkgroup); 
            
            var myBrother = $(this).siblings('A[data-css3ui="listRule"]');
            
            if(myBrother.hasClass('illuminate')){
                console.log("je suis le dernier group ouvert");
                console.log(myBrother.data());
                $.cookie('lasOtpen', myBrother.data('idlinkgroup'));
            }
            
            
        });
        console.log('il y à '+lgt+ 'group ouvert');
        
      
        console.log(tabListOpen);
        }else{
                        
            $(this).loadDefaultGlobal('listSelect');
            
            zeChildren = $('UL#'+$.cookie('sheet')+'').children('ul').children(); 
            console.log(zeChildren.length);
            var position = zeChildren.length;            
            console.log('nombre d enfants '+position);
            dataListSelect.position = position;            
            console.log(dataListSelect);            
            console.log('aucun group ouvert');
        }
    
};



});

