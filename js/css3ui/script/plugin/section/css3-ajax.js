$(document).ready(function() { 
    

$.fn.constructDataCall =  function(thisData,addCookie){  
    /*Utiliser pour faire transiter les options et les cookies dans les requêtes Ajax*/
           
    var dataCookie = [];
    if(addCookie===null){addCookie = false;}    
    if(addCookie===true){
           
        if($.cookie('idProject'))       {thisData.id           = $.cookie('idProject');}
        if($.cookie('idSheet'))         {thisData.idSheet      = $.cookie('idSheet');}
        if($.cookie('project'))         {thisData.project      = $.cookie('project');}
        if($.cookie('sheet'))           {thisData.sheet        = $.cookie('sheet');}       
        if($.cookie('lastOpen'))        {thisData.group        = $.cookie('lastOpen');}else{thisData.group='root_0';}
  
    }   
        
    var dataCall = []; var json; 
    //On fusionne le tableau des options   
    
    dataCall = $.extend({}, dataCall,dataListSelect);     
    dataCall = $.extend({}, dataCall, thisData);     
    dataCall = $.extend({}, dataCall, O);        
    console.log('----------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>données avant stringify');
    
    json =JSON.stringify(dataCall);         
    return json;              

};
        
////////////////////////////////////////
        
$.fn.postAjax = function(url,json,callback){
    
    var thisScroll = $(window).scrollTop();
    console.log('scroll window '+thisScroll);
    $.cookie('scrollWindow',thisScroll);
    console.log($.cookie());
    
    
   
          $.ajax({ url : url,type: 'POST',dataType : "json",
            data: {json:json},
            success:function(R)  {
                console.log('0000000000000000000000000000>>>>>>>>>>>>>>>>>renvoie BDD : '+R.action);
                console.log(R);
                callback(R); 
            
   setTimeout(function(){
    if(   $.cookie('scrollWindow')){
    console.log('Avant echange '+$.cookie('scrollWindow'));
    $('body').scrollTop($.cookie('scrollWindow'));
    }
    }, 100);  
            
            
            },
            error:  function(R)  { 
                console.log(R);
                console.log(R.responseText);
           
            console.error('Erreur SQL. Contacter votre admin, case :'+R.action); }
            });       
        };     
    
//Chargement du system
    
$.fn.loadSys = function(){     

    var dataSql = {action : 'findAll',table : 'project'};  
    var json = $(this).constructDataCall(dataSql);
       
    $(this).postAjax(''+O.dirPlug+'/script/plugin/JSON/loadSys.php',json,function(R){
          
        if(R.project === false){
          /*  $(this).flash('alert',"Aucun projet enregistrer");*/
        }else{ 
            $(this).listProject(R);
        }
    });

};      


//PROJET--PROJET--PROJET--PROJET--PROJET--PROJET--PROJET--PROJET--PROJET--PROJET--PROJET--PROJET--PROJET--PROJET--
//PROJET--PROJET--PROJET--PROJET--PROJET--PROJET--PROJET--PROJET--PROJET--PROJET--PROJET--PROJET--PROJET--PROJET--
        
$.fn.openProject =  function(thisData){
    console.log('ouverture du projet');
    thisData.table = 'project';
    

                var json = $(this).constructDataCall(thisData,true);
                $(this).postAjax(''+O.dirPlug+'/script/plugin/JSON/loadSys.php',json,function(R){

                        if(R.error){ /*   $(this).flash('alert',R.error); */
                        }else{          
                        
                        $(this).flashUI('project','valid','Project open : '+R.thisProject.project);   
                        $('link[title="css3uisheet"]').remove();
                            //Check des cookies minimum
                         
                        $.cookie('idProject',R.thisProject.idProject, { expires: 70});
                        $.cookie('project',R.thisProject.project, { expires: 70});   
                        $('.tabProject-active').each(function(){
                            $(this).removeClass('tabProject-active');
                        });
                        
                        
                        $('[data-projectname="'+$.cookie('project')+'"]').addClass('tabProject-active');                         
                        //Passe l'interface sur les feuilles de style                     
                        $(this).listSheet(R);                     
                        $(this).openGroup(tabListOpen);
                        $(this).zeRuleIsTheLast();//???
                  
                    }
                }); 
}; 

////////////////////////////////////////////////////////////////////
        
$.fn.createProject =  function(thisData){ 
      
        thisData.table = 'project';
            
            if(thisData.newProject.match(/^[a-z0-9\^s*]+$/gi)){ 

               var json = $(this).constructDataCall(thisData,true);

               $(this).postAjax(''+O.dirPlug+'/script/plugin/JSON/loadSys.php',json,function(R){

                       if(R.error){ /*   $(this).flash('alert',R.error);*/
                       }else{   /*       $(this).flash('valid','projet Ajouter');  */
                   
                       
                       R.action = 'open'; 
                       $(this).resetCookie();
                       $(this).listProject(R);
                       thisData.action = 'open';
                       thisData.table = 'project';
                    
                       thisData.id = R.id;
                       $.cookie('idProject',R.id);
                       $.cookie('project',R.newProject);
                         $('[data-projectname="'+$.cookie('project')+'"]').addClass('tabProject-active');                         
                      
                  
                       $(this).openProject(thisData);                     
                       $(this).closeToCall();
                   
                      }
                });      

            }else{
                    $(this).flash('alert','Vous ne pouvez utiliser que des caractères alphanumérique'); 
            } 
        };
 
 $.fn.editName =  function(thisData){ 
       
            
          

               var json = $(this).constructDataCall(thisData,true);
               $(this).postAjax(''+O.dirPlug+'/script/plugin/JSON/loadSys.php',json,function(R){

                       if(R.error){ /*   $(this).flash('alert',R.error);*/
                       }else{        /*  $(this).flash('valid','Le nom  été mis à jour ['+R.table+']');  */  
                     
                       
                       switch (R.table){
                           
                        case 'project' :                               
                          
                            $('#tabProject A[href="project_'+R.idproject+'"]').text(R.newData);
                            $('#tabProject A[href="project_'+R.idproject+'"]').data('projectname',R.newData);
                            $.cookie('project', R.newData);
                               
                        break;
                        case 'sheet' :                            
                            
                            $(this).listSheet(R);
                             $(this).openGroup(tabListOpen);
                            $.cookie('sheet', R.newData);
                               
                        break;
                        
                        case 'group' :                                
                            
                           
                            
                            if(R.groupformat==='ruleHtml'){
                                 $('TEXTAREA[name="editGroup"]').val(R.newData);
                                 $.cookie('ruleHtml',R.newData);
                                
                            
                            }
                            
                             $(this).listSheet(R);
                             $(this).openGroup(tabListOpen);
                             
                        break;
                        
                           
                       }
                       
                       if(R.table==="project"){                       
                        }
                       $(this).closeToCall();                   
                      }
                });      

          
        };
        
////////////////////////////////////////////////////       
        
$.fn.delProject =  function(thisData){        

    //**On prepare **//
    var json = $(this).constructDataCall(thisData,true);

     $(this).postAjax(''+O.dirPlug+'/script/plugin/JSON/loadSys.php',json,function(R){

    /*Si le projet est créer on l'ouvre*/
    if(R.messageError){alert(R.messageError);}

      if(R.error){  /*  $(this).flash('alert',R.error); console.log(R.responseText);*/
      }else{      /*    $(this).flash('valid','Suppression réussie');*/

          console.log(R);
          $(this).loadSys();
          
          $('#css3ui-tabListData').remove();
          $('#css3ui-listData').remove();
          $('#styleDb P').remove();
          $('.css3ui-db bottom-panel').remove();          
                console.log($.cookie('project') );
                console.log(R.project);
         
          if($.cookie('project')=== R.project){
                   
             /*  $(this).flashUI('project','valid',''); */
              
          }
          if($.cookie('project')){
               console.log($.cookie('project'));                 
               $('[data-projectname="'+$.cookie('project')+'"]').trigger('click');                         
                   
          } 
             $(this).closeToCall();  
      
          
          
       }
    });
    
}; 
        
$.fn.duplicateProject =  function(thisData){        

        //**On prepare **//
        var json = $(this).constructDataCall(thisData,true);

         $(this).postAjax(''+O.dirPlug+'/script/plugin/JSON/loadSys.php',json,function(R){

        /*Si le projet est créer on l'ouvre*/
        if(R.messageError){alert(R.messageError);}

            if(R.error){ /*   $(this).flash('alert',R.error); console.log(R.responseText);*/
            }else{          
           /* $(this).flash('valid','Duplication du projet reussie');*/
                console.log('avant tout');
            $(this).loadSys(); 

            R.action = 'open';    
                console.log('just avant');
            $(this).listProject(R);
            thisData.action = 'open';
            thisData.table = 'project';
                console.log('just après');
            thisData.id = R.newId;
            $.cookie('idProject',R.newId);
                console.log('un peu plus loin');
            $(this).openProject(thisData);                     
            $(this).closeToCall();

            }
        });
}; 
        
//STYLE--STYLE--STYLE--STYLE--STYLE--STYLE--STYLE--STYLE--STYLE--STYLE--STYLE--STYLE--STYLE--STYLE--STYLE--STYLE--        
        
$.fn.createStyle =  function(thisData){ 
            
            if(thisData.newStyle.match(/^[a-z0-9\^s*]+$/gi)){ 

               var json = $(this).constructDataCall(thisData,true);
                $(this).postAjax(''+O.dirPlug+'/script/plugin/JSON/loadSys.php',json,function(R){

                    if(R.error){ /*   $(this).flash('alert',R.error);*/
                    }else{   
                    
                        $(this).listSheet(R);
                        $(this).loadDefaultGlobal('listSelect');

                        $.cookie('idSheet',R.idSheet);
                        $.cookie('sheet',R.newStyle);

                        $(this).flashUI('style','success','StyleSheet : '+$.cookie('sheet'));
                        $('[data-sheetname="'+R.newStyle+'"]').trigger('click');
                    }
                    
                });      

            }else{
                  /*  $(this).flash('alert','Vous ne pouvez utiliser que des caractères alphanumérique'); */
            } 
};
        
$.fn.delSheet =  function(thisData){
         

                //**On prepare **//
                var json = $(this).constructDataCall(thisData,true);

                 $(this).postAjax(''+O.dirPlug+'/script/plugin/JSON/loadSys.php',json,function(R){

                /*Si le projet est créer on l'ouvre*/
                if(R.messageError){alert(R.messageError);}

                  if(R.error){  /*  $(this).flash('alert',R.error); console.log(R.responseText);*/
                  }else{        /*  $(this).flash('valid','Suppression de la feuille de style réussie');    */                      

                            $(this).listSheet(R);      
                            $(this).closeToCall();                                
                     $(this).flashUI('style','valid','');

                     $(this).viewStyleSheet();

                            }
                });
}; 


$.fn.disableSheet =  function(thisData){
         

                //**On prepare **//
                    var json = $(this).constructDataCall(thisData,true);
        
                     $(this).postAjax(''+O.dirPlug+'/script/plugin/JSON/loadSys.php',json,function(R){

                    /*Si le projet est créer on l'ouvre*/
                    if(R.messageError){alert(R.messageError);}

                      if(R.error){   /* $(this).flash('alert',R.error); console.log(R.responseText);*/
                      }else{          /*$(this).flash('valid','desactive la feuille de style');*/
                          
                        console.log(R);
                        $(this).listSheet(R); 
                        $(this).openGroup(tabListOpen);
                        $('.styleSheet').scrollTop($.cookie('posList'));        
                      }
                    });
}; 
        
//GROUP--GROUP--GROUP--GROUP--GROUP--GROUP--GROUP--GROUP--GROUP--GROUP--GROUP--GROUP--GROUP--GROUP--        
        
$.fn.createGroup =  function(thisData){ 
     
        thisData.table = "group";
           /* if(thisData.newData.match(/^[a-z0-9\^s*]+$/gi)){ */

               var json = $(this).constructDataCall(thisData,true);             
            
               $(this).postAjax(''+O.dirPlug+'/script/plugin/JSON/loadSys.php',json,function(R){

                       if(R.error){   /* $(this).flash('alert',R.error);*/
                       }else{        /*  $(this).flash('success','Group Ajouter'); */  
                      
                       $(this).listSheet(R);  
                       $(this).openGroup(tabListOpen);                       
                 
                    
                    var thisEl = $('[data-el="clickArrow_'+R.idNewGroup+'"]');
                    thisEl.trigger('click');
                    
                  }                  
                  $.cookie('lastOpen',R.idNewGroup); 
                  
          
                });    



};

$.fn.delGroup =  function(thisData){
         thisData.table = "group";

    //**On prepare **//

        var json = $(this).constructDataCall(thisData,true);

         $(this).postAjax(''+O.dirPlug+'/script/plugin/JSON/loadSys.php',json,function(R){

        /*Si le projet est créer on l'ouvre*/
        if(R.messageError){alert(R.messageError);}

            if(R.error){   /* $(this).flash('alert',R.error); console.log(R.responseText);*/
            }else{       
                 /* $(this).flash('valid','Suppression réussie '+R.idlinkgroup);*/
                  $(this).listSheet(R);   
                  $(this).openGroup(tabListOpen);

                  console.log('deleteGroup');

                    // si le group supprimer
                    if(tabListOpen === ''){

                        $(this).loadDefaultGlobal('listSelect');  

                    }else{

                        var lastEntry = $(this).findLastElArray(tabListOpen);
                        var thisEl = $('#'+$.cookie('sheet')+' [data-el="clickGroup_'+lastEntry+'"]');
                        if(thisEl.hasClass('illuminate')===false){
                            thisEl.trigger('click');
                        }
                    }
                    
  
                console.log('on check le scroll des coord html');
                if($.cookie('posList')){ 
               $('.styleSheet').scrollTop($.cookie('posList'));    
                }         
   
            }
        });
}; 

$.fn.changePosition =  function(thisData){  
    
    thisData.action = "changePosition";
    thisData.table  = "group";
    

    var json = $(this).constructDataCall(thisData,true);

       $(this).postAjax(''+O.dirPlug+'/script/plugin/JSON/loadSys.php',json,function(R){

               if(R.error){ /*   $(this).flash('alert',R.error);*/
               }else{        /*  $(this).flash('success','position modifier'); */
               console.log(R);

                $(this).listSheet(R);   
                $(this).openGroup(tabListOpen);
                
                 console.log('on check le scroll des coord html');
                if($.cookie('posList')){ 
               $('.styleSheet').scrollTop($.cookie('posList'));    
                }  

              }
        });  
};



$.fn.disableGroup =  function(thisData){  

        console.log(thisData);

    var json = $(this).constructDataCall(thisData,true);

       $(this).postAjax(''+O.dirPlug+'/script/plugin/JSON/loadSys.php',json,function(R){

               if(R.error){  /*  $(this).flash('alert',R.error);*/
               }else{        /*  $(this).flash('success','enable/disable'); */
               console.log(R);
               $(this).listSheet(R); 
               $(this).openGroup(tabListOpen);
                
$('.styleSheet').scrollTop($.cookie('posList'));   
              }
        });  
};

//Rule----Rule----Rule----Rule----Rule----Rule----Rule----Rule----Rule----Rule----Rule----

$.fn.delRule =  function(thisData){

    //**On prepare **//
        var json = $(this).constructDataCall(thisData,true);

         $(this).postAjax(''+O.dirPlug+'/script/plugin/JSON/loadSys.php',json,function(R){

        /*Si le projet est créer on l'ouvre*/
        if(R.messageError){alert(R.messageError);}

        if(R.error){  /*  $(this).flash('alert',R.error); console.log(R.responseText);*/
        }else{        /*  $(this).flash('valid','Suppression de rule réussie');*/

            $(this).listSheet(R); 
            $(this).openGroup(tabListOpen);
            $(this).closeToCall();
            
            }
        });
}; 



$.fn.disableRule =  function(thisData){

    //**On prepare **//
        var json = $(this).constructDataCall(thisData,true);

         $(this).postAjax(''+O.dirPlug+'/script/plugin/JSON/loadSys.php',json,function(R){

        /*Si le projet est créer on l'ouvre*/
        if(R.messageError){alert(R.messageError);}

            if(R.error){  /*  $(this).flash('alert',R.error); console.log(R.responseText);*/
            }else{        /*  $(this).flash('valid','Enable/Disable RULE');*/
                
                $(this).listSheet(R); 
                $(this).openGroup(tabListOpen);
                $(this).closeToCall();            
            $('.styleSheet').scrollTop($.cookie('posList'));   
            }
        });
}; 






$.fn.ruleImportant =  function(thisData){

    //**On prepare **//
        var json = $(this).constructDataCall(thisData,true);

         $(this).postAjax(''+O.dirPlug+'/script/plugin/JSON/loadSys.php',json,function(R){

        /*Si le projet est créer on l'ouvre*/
        if(R.messageError){alert(R.messageError);}

        if(R.error){   /* $(this).flash('alert',R.error); console.log(R.responseText);*/
        }else{         /* $(this).flash('valid','Cette valeur css est importante');*/
            $(this).listSheet(R); 
            $(this).openGroup(tabListOpen);
            $(this).closeToCall();
           
            $('.styleSheet').scrollTop($.cookie('posList'));   
            }
        });
}; 

//Preview--Preview--Preview--Preview--Preview--Preview--Preview--Preview--Preview--Preview--Preview--Preview
 
 $.fn.ajaxTmpCss =  function(thisData){
     
       console.log('envoie des données  au script de creation du fichier css');

                var json = $(this).constructDataCall(thisData,true);
              

                $(this).postAjax(''+O.dirPlug+'/script/plugin/JSON/loadSys.php',json,function(R){

                        if(R.error){   /* $(this).flash('alert',R.error);*/
                        }else{   
                     
                    var url = O.dirProject+'/'+$.cookie('project')+'/css/tmp/'+R.tmpSheet+'.css';            
            
            
                            //On charge le fichier css

                            if($('link[title="css3uisheet"]').length == false){
                                //On insére un nouveau fichier css  


                            $("head").append($(document.createElement("link"))
                            .attr({ rel:"stylesheet",type:"text/css",title:'css3uisheet',href:url,name:R.tmpSheet}) ); 

                            }else{

                                //On met a jour les attributs du lien css

                            $('link[title="css3uisheet"]').attr({'name':R.tmpSheet,'href':url});

                            }  
                 
                       }
                }); 
 
 };
 $.fn.ajaxFinalCss =  function(thisData){
     
       console.log('envoie des données  au script de creation du fichier css');

                var json = $(this).constructDataCall(thisData,true);
              

                $(this).postAjax(''+O.dirPlug+'/script/plugin/JSON/loadSys.php',json,function(R){

                        if(R.error){   /* $(this).flash('alert',R.error);*/
                        }else{   
                     
                     console.log('final Css OK');
                 
                       }
                }); 
 
 };
 
 $.fn.ajaxPrev =  function(){ 
     
        dataPrev.action = 'subAjax';

        var json = $(this).constructDataCall(dataPrev,true);


        $(this).postAjax(''+O.dirPlug+'/script/plugin/JSON/loadSys.php',json,function(R){

            if(R.error){  /*  $(this).flash('alert',R.error);*/
            }else{   

               $(this).listSheet(R);                       
         
               
              
             thisObj = $('[data-el="clickArrow_'+R.idNewGroup+'"]');
                console.log('Bug ici ??');
                console.log(thisObj);  
             //On construit la data
             var thisData = $(this).constructDataListSheet(thisObj);
            
                console.log(thisData);
              //On push sans click
             $(this).pushAndNotClick(thisData);
               
                console.log(tabListOpen);
                
             //on switch sur le petit frere
              thisBroth = $('[data-el="clickGroup_'+R.idNewGroup+'"]');
             
             //On construit la data
             var thisData = $(this).constructDataListSheet(thisBroth);
             
               $(this).lightGroup(thisData);
               $(this).updateListSelect(thisData);               
               $(this).defineWorkContext(thisData);
               
               thisBroth.toggleClass('illuminate');
               
            $.each(tabListOpen,function(k,v){
               
             thisObj = $('[data-el="clickArrow_'+v+'"]');
             
             //On construit la data
             var thisData = $(this).constructDataListSheet(thisObj);
                    console.log(thisData);
                    console.log(thisData.idlinkgroup);
               $(this).justOpenGroup(thisData);
            });

        console.log('on check le scroll des coord html');
        if($.cookie('posList')){  
               
                    $('.styleSheet').scrollTop($.cookie('posList'));    
        }  
        
       
        //exceptions faites lorsque un element de multibackground est déplacé
        //On redemande les informations lier au $.cookie('ruleHtml')
                
        if(moveMultiBack === true){
                
        var el = $('[data-css3ui="openGroup"][data-groupName="'+$.cookie('ruleHtml')+'"]');   
        var thisObj = $(this).constructDataListSheet(el);   
        $(this).dataRule(thisObj);
        
        
        moveMultiBack = false;
        
       }
    


             }
        });   
};




 $.fn.searchData =  function(method,thisData){ 
     
       
     
     
        console.log('pouet');
        console.log(thisData);
        console.log(method);
        
        switch (method){
            
         case  'listRule':             
             
                console.log('listRule+x0/');
                $(this).dataRule(thisData);
             
         break;
         
         
         case  'selDom':
             
             
             console.log('NewRule doit verifier si la coord " '+thisData+' " demander n est pas multiple');
               
              var countThis=$(this).countRule(thisData); 
              console.log('la rule est compter : '+countThis+' fois');
                 console.log($.type(countThis));
                var thisEl = $('[data-css3ui="openGroup"][data-groupname="'+thisData+'"]'); 
                var dataEl = thisEl.data();
                console.log(dataEl);
                
        if(countThis>0){
            if(dataEl.groupformat === 'ruleHtml'){
                if(countThis === 1){
                    console.log("pas de problème la rule existe une seule fois");
                      $(thisEl).trigger('click');
                }else if (countThis > 1){                    
                    console.log("Hop hop hop , on lève une alert la rule existe plus d'une fois");
                    //On construit un nouveau tableau
                    //Et on l'inject dans la global 
                    $(this).alertMultiRule(thisData);
                }
            }
        }else{
            console.log('la rule nexiste pas');
            $(this).vidangeUI();
            
        }
             
         break;
         
          case  'newRule':
             
                console.log('NewRule doit verifier si la coord " '+thisData+' " demander n est pas multiple');
               
            
               
                var countThis=$(this).countRule(thisData); 
                console.log('la rule est compter : '+countThis+' fois');
                 console.log($.type(countThis));
               var thisEl = $('[data-css3ui="openGroup"][data-groupname="'+thisData+'"]'); 
                var dataEl = thisEl.data();
             
            if(countThis>0){
            
                if(dataEl.groupformat === 'ruleHtml'){

                   if(countThis === 1){
                        
                        console.log('***********************');
                       console.log("pas de problème la rule existe une seule fois");
                       //On doit verifier si la feuille de style est bien la feuille de sytle en cours
                       //Sinon click sur la feuille de styles correspondante                    
                         $(thisEl).trigger('click');
                        
                   }else if (countThis > 1){                    
                       console.log("Hop hop hop , on lève une alert la rule existe plus d'une fois");
                       //On construit un nouveau tableau
                       //Et on l'inject dans la global 
                       $(this).alertMultiRule(thisData);
                   }
               }
            }else{
                    console.log('la rule nexiste pas');
                    $(this).vidangeUI();
            }
             
         break;
         case  'search':
             
             $(this).listSheet(maGlob);
          
        var req = $(this).val();
        var searchInGlob = function(search, groupe){   
            
             var pattern = new RegExp(""+search+"",'i');                     
           
                $.each(groupe, function(k,group){
                        
                    //On check dans le nom du groupe
                    var loopMyParent = function(el){                   
                            console.log('debut de la boucle');
                            console.log(el);
                            if($.inArray(el.data('idlinkgroup'),tabListOpen) === -1){  
                             tabListOpen.push(el.data('idlinkgroup'));                              
                            }
                            el.removeClass('hidden');
                         
                          
                            /**  newEl.trigger('click',false); **/
                          
                            if(el.data('myparent') > 0){
                                 console.log('on remonte sur le parent '+el.data('myparent'));                   
                                var newEl = $('li[data-idlinkgroup="'+el.data('myparent')+'"]');
                             
                                loopMyParent(newEl);                        
                            }
                        };
                    
                    thisEl = $('li[data-idlinkgroup="'+group.idToGroup+'"]');
                    
                    if(group.groupName.match(pattern)){
                    
                            console.log('--------BINGO le pattern correspond------');
                            loopMyParent(thisEl);
                            incResult++;
                    }else{
                        
                        thisEl.addClass('hidden');
                        
                    }
                      
                    if(group.format==='ruleHtml'){
                           
                   
                            console.log('On tombe sur une ruleHtml, on verifie si la valeur nest pas une valeur ou une prop css');
                        //On check dans la rules
                        
                        if(group.rule){
                            
                          
                            
                            $.each(group.rule,function(x,rule){
                                
                                 if(rule.rule.match(pattern)||rule.css.match(pattern)){
                                    incResult++;
                                     console.log('--------BINGO val ou rule Css------'); 
                                   
                                    var newEl = $('li[data-idlinkrule="'+rule.id_linkRule+'"]').data('myparent');
                                    $('li[data-idlinkrule="'+rule.id_linkRule+'"]').addClass('lightSearch');
                                    if($.inArray(newEl,tabListOpen) === -1){
                                     thisEl = $('li[data-idlinkgroup="'+newEl+'"]');                                  
                                     loopMyParent(thisEl); 
                                    }
                                }
                                
                            });
                           }         
                        } 
                     
                    
                    if(group.group){                        
                         searchInGlob(req,group.group);                        
                    }

                 
                });
           
        };
           
            $.each(maGlob.style, function(k,style){ 
                
                incResult = 0;
                   
            
                console.log('debut de la recherche sur la feuille de style');
                console.log(style);
                searchInGlob(req, style.group);
                
              
                    
                    newText = $('li A[data-table="sheet"][data-id="'+style.idSheet+'"]').data('sheetname')+' ('+incResult+')';
                    $('li A[data-table="sheet"][data-id="'+style.idSheet+'"]').text(newText);
            });
      
           
            //Open group dedier
          
               
               //On boucle sur les resultats
            $.each(tabListOpen,function(k,v){
                  
             thisObj = $('[data-el="clickArrow_'+v+'"]');             
             //On construit la data
           var thisData = $(this).constructDataListSheet(thisObj);
           $(this).justOpenGroup(thisData);
             
            });
            
            /*Gestion du warning*/
            
            $('#css3ui-tabListData A[href="#css3uiWarning"]').parent().remove();       
            var myHtml = '<li><a href="#css3uiWarning" class="css3uiWarning">! Search !</a></li>';
            $('#css3ui-tabListData').append(myHtml); 
            
            tabListOpen.length = 0;
             
             
             
         break;
            
        }
        
     
        /*      var thisData = [];
                thisData.action = 'reqSearch';
                thisData.thisSearch = val;
                thisData.method = method;
              
                var json = $(this).constructDataCall(thisData,true);
                $(this).postAjax(''+O.dirPlug+'/script/plugin/JSON/loadSys.php',json,function(R){

                    if(R.error){    $(this).flash('alert',R.error);
                    }else{                         
                    }
              });  */
           
};


});