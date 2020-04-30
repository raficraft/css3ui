$(document).ready(function() { 
    
window.onresize = function() {
    if (window.innerWidth <= 640) { /*alert('hé ho!');*/}
  
};
    
    
/// Fichier charger en premier les 
tabListOpen = [];    
dataPrev = [];
maGlob = [];
moveMultiBack = false;

loadUI = true;


thisWorkContext = 'standart';

 
if(!$.cookie('viewUI')){
     
    $.cookie('viewUI','false');
}


callToActive = false;


$.fn.loadDefaultGlobal = function(type){   
        console.log('Load Default Global');
    
    switch (type){        
        case 'listSelect' :  
            if(tabListOpen.length===0){               
                
            dataListSelect = {idlinkgroup : 0,level : 0, position : false , groupformat : 'comment'};
       
            
            }       
            
            //Plante le ruleHtml $.cookie('ruleHtml',''); ?????
        
        break;        
    }    
};




    
    
    
// Ce fichier contient tout les elements necessaire à la preview
    
$(document).loadDefaultGlobal('listSelect');    
    
$.fn.checkPadlock = function(){

        
          /**On gère les padlocks*/
                                
                        switch(dataPrev.supp){
                            case 'x':
                            case 'y':
                         if(dataPrev.supp === 'x'){  axys = 'y'; }else{axys = 'x';}
                         console.log('On gère les padlocks');
                         console.log(dataPrev);
                         
                         var input,padLock,otherInput;
                         
                         switch(dataPrev.format){
                             
                             
                            case 'customRadius' : 
                                /*_'+dataPrev.inc*/
                                 console.log(' padLock custom-radius');
                                
                                    input = dataPrev.name+'_'+dataPrev.supp ;
                                    padLock = 'switch-'+dataPrev.name ;
                                    otherInput = dataPrev.name+'_'+axys;  
                                
                            break;
                            
                            
                            case 'transform' : 
                                 
                                var upAxys  = axys.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                                                return letter.toUpperCase();
                                });

                                 input = dataPrev.name+'_'+dataPrev.supp;
                                 padLock = 'switch-'+dataPrev.name.substring(0,dataPrev.name.length-1);
                                 otherInput = dataPrev.name.substring(0,dataPrev.name.length-1)+upAxys+'_'+axys; 


                            break;
                            
                            case  'origin':

                                 
                                  input = dataPrev.name+'_'+dataPrev.supp ;
                                  padLock = 'switch-'+dataPrev.name ;
                                  otherInput = dataPrev.name+'_'+axys ; 

                            break;
                            
                            default :     
                                
                                console.log(' padLock default');
                            
                                    input = dataPrev.name+'_'+dataPrev.supp+'_'+dataPrev.inc ;
                                    padLock = 'switch-'+dataPrev.name+'_'+dataPrev.inc ;
                                    otherInput = dataPrev.name+'_'+axys+'_'+dataPrev.inc ;  
                                 
                            break;  
                             
                         }                 

                         console.log(padLock+'  '+input+'  '+otherInput);

                         firstVal = $(this).oneDigit($('input[name="'+input+'"]').val());
                 
                         /*On verifie que la checkbox est bien cocher*/

                                if($('input[name="'+padLock+'"]:checked').length > 0){  
                                    console.log('yep checked');
                                   $('input[name="'+otherInput+'"]').val(firstVal); 
                                   
                                }else{
                                    
                                    //
                                    if(dataPrev.format === 'customRadius'){
                                    if($('input[name="'+otherInput+'"]').val() === ''){
                                        $('input[name="'+otherInput+'"]').val(firstVal); 
                                    }
                                    }
                                    
                                } 
                           
                            
                        break;
                            case 'z':                               
                                
                                
                            break;
                        }        
};



$.fn.createRule = function(method,el){
    
        console.log('createRule');
        console.log('createRule');
        console.log('createRule');
        console.log('createRule');
    
       
        if(method!== 'listRule'){el = false;}
        console.log(el);
        switch(method){
            
            case 'listRule':                
                   console.log(el);
                if(el.itsMe.data('groupformat')==='ruleHtml'){                
                  
                var rule = $(el.itsMe).data('groupname');
                $.cookie('ruleHtml',rule);                 
                var rulePosition = el.itsMe.parent('li').data('position');                   
                $.cookie('rulePosition',rulePosition, { expires: 70});
           
                $('#newRule').val(rule);
                     
                     $(this).searchData('listRule',el.itsMe.data());
                     $(this).flashUI('rule','alert','You work in : '+rule); 
                     $(this).resizeTextarea('19','#newRule');
                     
                }else{
                    $.removeCookie('ruleHtml');
                    $(this).createRule('selDom');
                }
                
                var mySelect = $(this).parent('li').data('el');
                $.cookie('thisContext',el.itsMe.data('groupformat'));
              
                
              
                
               /* $(this).dataRule();*/
                
            break;

            case 'newRule': 
                
                
                
                var rule = $('#newRule').val();
                console.log('newRule  '+rule);
                var ruleTab = [];
                    ruleTab = rule.split(',');
                var tabRules = [];

                    var ruleLgt = ruleTab.length;

                         for(var i = 0; i<ruleLgt; i++){
                              tabRules[i] = ruleTab[i].trim();
                         }   

                   rule = tabRules.join(',');
                    
                    /*Procedure de fin*/
                    $.cookie('ruleHtml',rule, { expires: 70});
                    dataPrev.ruleHtml = $.cookie('ruleHtml');
                    $('.light').each(function(){    $(this).removeClass('light');   });
                   
                
            console.log('check NEWRULE**********************************');
            $(this).searchData('newRule',rule);
            
             $(this).flashUI('rule','alert','You work in : '+rule); 

            break;

            case 'selDom':
              console.log('création de la rule SelDom');
                
                     i= 0; var tampon = ''; var ruleHtml = '';        
                        var countLight= $('A.light').length;

                        if(countLight > 0){ 
                                console.log('Select DOM activer');
                                $('A.light').each(function(){  

                                    var rule = $(this).attr('href');  id = $(this).parent().attr('id'); type = $(this).data('type');

                                    if (type === 'myClass'||type === 'id'){    
                                        if(id === tampon){ ruleHtml = ruleHtml+rule;            
                                        }else  if(id !== tampon){  if(i === 0){ruleHtml = rule;}
                                         else{ruleHtml = ruleHtml+' '+rule;}
                                        }              
                                    }else{        
                                        if(id === tampon){  
                                            ruleHtml = ruleHtml+rule;            
                                        }else  if(id !== tampon){
                                            if(i === 0){ ruleHtml = rule; 
                                            }else{ ruleHtml = ruleHtml+' '+rule; }
                                        }  
                                    }        
                                    tampon = id;    i++;
                                });
                        
                        }else{
                            ruleHtml = '';
                            $(this).vidangeUI();
                        }
                      
                        /*Procedure de fin*/
                        $('.views').removeClass('views');
                        $(ruleHtml).not('.css3ui , .css3ui *').addClass('views');
                        $.cookie('ruleHtml',ruleHtml , { expires: 70});

                        dataPrev.ruleHtml = $.cookie('ruleHtml');
                        dataPrev.projectID = $.cookie('idProject');
                        dataPrev.idSheet = $.cookie('idSheet');                        

                        $('#newRule').val($.cookie('ruleHtml'));
                         $(this).resizeTextarea('19','#newRule');
                        console.log('****************************'+ruleHtml);
                        if(countLight > 0){ 
                        $(this).searchData('selDom',ruleHtml);
                        }

                          $(this).flashUI('rule','alert','Your work in : '+ruleHtml); 
            break;
             
        }
        
        
};


    /***********************************/       
   /****  Ecoute pour la preview   ****/
  /***********************************/
  
  
  
  /****Permet de creer la global de preview en passant un input à la valeur***/     
$.fn.constructPrev = function(thisObj){
        
        dataPrev = $(thisObj).data();
        
        
        w = $(thisObj).attr('name');
        work = w.split('_');              
        dataPrev.name=work[0]  ;
        dataPrev.preview=''  ;
        dataPrev.ajax=''  ;    
       
        if(work[1]){dataPrev.supp =  work[1]; }else{dataPrev.supp =  'false';}
        if(work[2]){dataPrev.inc =  work[2]; }else{dataPrev.inc =  'false';}

        /**Check unity**/

       if(dataPrev.format !== 'alpha'){  
        if($(thisObj).attr('data-unity')){dataPrev.unity =  $(thisObj).data('unity');  }
        else{ dataPrev.unity =  O.unity;  }
       }
        
}; 

$('[data-uiJQ="preview"]').each(function () { 

  $(this).focus(function () {                               

      $(this).constructPrev($(this));});
      $(this).change(function (e) { 
          
         $(this).preview(true);     });
         

  });
  
  
  
$('input[data-inc="true"]').each(function(){
    
        var map = {39: false,37:false,38: false,40:false};
        
                    $(this).keydown(function(e) {
                         if (e.keyCode in map) {
                            map[e.keyCode] = true;
                            
                            if (map[38]){
                                
                         
                                $(this).increment('up'); 
                                $(this).preview(false); ;                           
                                return false;  
                                
                            }else if (map[40]) { 
                                
                         
                                $(this).increment('down');
                                $(this).preview(false);
                                return false; 
                                
                            }   
                    }   
                    }).keyup(function(e) {  if (e.keyCode in map) { 
                            map[e.keyCode] = true;
                            
                            if (map[38]||map[40]){
                           
                                $(this).preview(true);
                            }
                            
            map[e.keyCode] = false;  }   });                  
});
  
$.fn.constructDataPrev = function(){
    
       
        
        switch(dataPrev.format){            
            case 'digit':           dataPrev.preview = $(this).oneDigit($(this).val());      break;
            case 'alpha':           dataPrev.preview = $(this).val();                        break;
            case 'select':          dataPrev.preview = $(this).checkSelect($(this).val());   break;
            case 'fourDigit':       dataPrev.preview = $(this).fourDigit($(this).val());     break;
            case 'box-shadow':      dataPrev.preview = $(this).multiData('box-shadow');      break;
            case 'text-shadow':     dataPrev.preview = $(this).multiData('text-shadow');     break;
            case 'border':          dataPrev.preview = $(this).border();                     break;
            case 'color':           dataPrev.preview = $(this).background();                 break;
            case 'customRadius':    dataPrev.preview = $(this).customRadius();               break;
            case 'transform':       dataPrev.preview = $(this).transform();                  break;           
            case 'filter':          dataPrev.preview = $(this).imgFilter();                  break;
            case 'transition':      dataPrev.preview = $(this).transition();                 break;
            case 'multiBack':       dataPrev.preview = $(this).multiBack();                  break;
            case 'flex':            dataPrev.preview = $(this).flex();                       break;
            case 'origin':          dataPrev.preview = $(this).origin();                     break;
            case 'imageXY':         dataPrev.preview = $(this).imageXY();                    break;
        }        
          
        if(dataPrev.format === 'regularPolygon'){ $(this).customPolygon(); 
        }else if(dataPrev.format === 'regularShape'){ $(this).customShape(); 
        }         
        //filtre différence PREV / AJAX
        
        dataPrev.ajax = dataPrev.preview;
        
        
        console.log('dans CONSTRUCTDATAREV');
        console.log(dataPrev);
        
};  

    
$.fn.justPrev = function(){
    
    if(dataPrev.ajax===''){}else{
    
        if(dataPrev.name === 'clip-path'){dataPrev.name='-webkit-clip-path';}
        if(dataPrev.name === 'shape-outside'){dataPrev.name='-webkit-shape-outside';}
        if(dataPrev.name === 'filter'){dataPrev.name='filter';}
        if(dataPrev.format === 'transform'){ 
            var oldName =dataPrev.name;
            dataPrev.name='transform';}
        
            if(dataPrev.format === 'multiBack'){
                
                  dataPrev.name = 'background-image';
                  dataPrev.format = 'multiBack'; 
                
            }
            
            console.log('-------------------------->.....PASSAGE A LA PREVIEW.....<-------------------------');  
            
            //Verifie si le name demander pour la preview doit appliquer le webkit
            // Modification direct de la valeur de preview dans la fonction elle meme
            
            
            var checkInGlobalIsKit = function(){ 
                $.each(maGlob.kit,function(key,val){ 
                        if(val.rule === dataPrev.name){
                            if(val.kit=== '1'){ 
                            dataPrev.preview =   $.cookie('kit')+dataPrev.preview;
                            }
                        }
                });                
            };
            
            checkInGlobalIsKit();            
            var thisRuleHtml = $(this).splitRuleHtml($.cookie('ruleHtml'));
         
            console.log(dataPrev.preview+'     '+dataPrev.name);
            
            console.log('dans JUSTPREV');
            console.log(dataPrev);

            $($.cookie('ruleHtml')).not('.css3ui,.css3ui *').css(dataPrev.name,dataPrev.preview);
            if(oldName){dataPrev.name = oldName; }
            
    }
  };

  /*************************************/

$.fn.preview = function(transmit){
        
       
        console.log(dataPrev.ruleHtml);
        console.log($.cookie('ruleHtml'));
       
                if(transmit === 'undefined'){ transmit=true;}
                //Contro le du cookie
                  console.log('transmit : '+transmit);
                if($.cookie('ruleHtml')){
                    dataPrev.ruleHtml = $.cookie('ruleHtml');
                }

if(dataPrev.ruleHtml){
         
    //Verifie si l'input de changement de style gére le padlock
    $(this).checkPadlock();
    //Recuperer les data de l'input de changement de style
    $(this).constructDataPrev();
      //Effectue la preview
   $(this).justPrev();                 


if(dataPrev.format === 'transform'){ 
            var oldName =dataPrev.name;
            dataPrev.name='transform';}        
        
                   if(transmit===true){                    
                        $(this).ajaxPrev();
                    }
 if(oldName){dataPrev.name = oldName; }
}else{  alert('veuillez choisir une cible HTML');    } 

           
    };
    
});