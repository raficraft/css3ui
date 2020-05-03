$(document).ready(function() {
    
 $.cookie('kit','' , { expires: 70});
 $.cookie('browser','' , { expires: 70});
 
//Check du navigateur et initialisation du cookie qui definie le prefixe à utiliser lors des previews
function getNavigateur() {
var txtAgent = navigator.userAgent.toLowerCase();
var chro=txtAgent.indexOf("chrome");
var iePos = txtAgent.indexOf("msie");
var operaPos = txtAgent.indexOf("operax");
var nsPos = txtAgent.indexOf("netscape");
var ffPos = txtAgent.indexOf("firefox");
var saf=txtAgent.indexOf("safari");
var trident=txtAgent.indexOf("trident");



var version = parseFloat(navigator.appVersion);
if (iePos>=0) {
version=txtAgent.substring(iePos+5,txtAgent.indexOf(" ; ",iePos));
$.cookie('kit','-ms-');

return [["Internet Explorer"],[version]];

}
if (trident>=0) {
version=txtAgent.substring(iePos+5,txtAgent.indexOf(" ; ",iePos));
$.cookie('kit','-ms-');

return [["Internet Explorer"],[version]];
}

if (chro>=0){
version=txtAgent.substring(chro+7,txtAgent.indexOf( " " ,(chro+9)));
$.cookie('kit','-webkit-');

return [["Chrome"],[version]];
}

if (saf>=0){
version=txtAgent.substring(saf+7);
$.cookie('kit','-webkit-');
return [["Safari"],[version]];
}

if (ffPos>=0) {
version=txtAgent.substring(ffPos+8);
$.cookie('kit','-moz-');
return [["Firefox"],[version]];
}
if (operaPos>=0) {
version=txtAgent.substring(operaPos+6,txtAgent.indexOf( " " ,operaPos));
$.cookie('kit','-o-');
return [["Opera"],[version]];
}
if (nsPos>=0) {
version=txtAgent.substring(nsPos+9);
$.cookie('kit','-moz-');
return [["Netscape"],[version]];
}

var msg= "!!! Navigateur inconnu !!! SI VOUS EN ÊTES CAPABLE, VOUS POUVEZ AJOUTER CE NAVIGATEUR DANS LA LISTE DÉTECTÉE PAR: identifie_navigateur.js " ;
msg+= ""+ navigator.userAgent+ "Je vous serais reconnaissant de bien vouloir m’envoyer tout le texte que vous voyez à l’écranafin que je puisse l’ajouter à la liste pour les autres utilisateurs à : info@aiguilleart.comJe vous en retournerai une version mise à jour. " ;

return [[msg],[]];
}


var retour=getNavigateur();
$.cookie('browser',retour[0]);
console.log(retour[0]+ " " +retour[1]);

$.fn.resetCookie = function(){
 
        $.removeCookie('idProject');   
        $.removeCookie('project');       
        $.removeCookie('idSheet');
        $.removeCookie('sheet');
        $.removeCookie('ruleHtml');        
        console.log($.cookie());
        
        
       //work desactiver
        tabListOpen = []; 
        $(this).loadDefaultGlobal('listSelect');    
    
};
 
             
/***********************************/       
/****   MATHEMATIQUES    ****/
/***********************************/ 


$.fn.roundNumber = function(num, dec) {
   var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
   return result;
};

/*convertit valeur rgba*/

$.fn.findRgba = function(Hex,opacity){
      
                                if(opacity === ''){var opacity = '1';}
                                var colorRgb = '';
                                var redHex = Hex.substring(1, 3);       
                                var greenHex = Hex.substring(3, 5);
                                var blueHex = Hex.substring(5, 7);                
                                var redDec = parseInt(redHex, 16);
                                var greenDec = parseInt(greenHex, 16);
                                var blueDec = parseInt(blueHex, 16);                
                                var colorRgb = 'rgba('+ redDec + ',' + greenDec + ',' + blueDec + ',' + opacity +')';
                               
                                process = colorRgb;
                                workRgb = colorRgb;
                                preview = colorRgb;
                              
                                return preview;
 };
  
function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}
    
    
    /***********************************/       
/****   varChar    ****/
/***********************************/ 

$.fn.lastCharac = function(varChar){
    
    var splitChar = varChar.split('_');
   
    result = splitChar[1];
      
    return result;

    
};

$.fn.splitUndescore = function(varChar){
    
    var splitChar = varChar.split('_');
    result = splitChar[1];
       
    return result;

    
};
    
/********* INCREMENT *//////////////


$.fn.increment = function(type){
               
     var unity =[];
    var inc = 1; 
    if(dataPrev.supp==='opacity'){var inc = 0.05;}
    var calc='';
    var v ='';
    if ( $(this).val() === "" ){  $(this).val(0); }
    var v =$(this).val();
          /*  console.log(dataPrev);*/
 
             /*  console.log(unity); */
             if(v.match(/em|rem|px|%|pt|deg|ms|s|vw|vh|vmin|vmax/)){
              
                    unity = v.match(/em|rem|px|%|pt|deg|ms|s|vw|vh|vmin|vmax/);                   
                    digit = v.split(unity);              
             }else{
                      
                 digit = v;                 
                 if(dataPrev.unity){unity=dataPrev.unity;}else{unity=O.unity;}
                
             } 

 
        if(dataPrev.format==='alpha'){ digit = v; unity = '';}
        if(dataPrev.name==='scaleY'){ digit = v; unity = '';}
        if(dataPrev.name==='scaleX'){ digit = v; unity = '';}
        if(dataPrev.name==='flex-grow'){ digit = v; unity = '';}
        if(dataPrev.name==='flex-shrink'){ digit = v; unity = '';}
        if(dataPrev.name==='line-height'){ digit = v; unity = '';}
         
         if(unity[0]==='em'||unity[0]==='rem'||unity[0]==='vmax'
          ||unity[0]==='vmin'||unity[0]==='vw'||unity[0]==='vh'){ inc=0.125;}
  
         if(unity[0]==='ms'){ inc=100;}
         
         if(dataPrev.name==='scaleX'||dataPrev.name==='scaleY'){digit = v; unity = '';inc=0.005;}
         if(dataPrev.supp==='opacity'){digit = v; unity = '';inc=0.05;}
          /*  console.log(unity);*/
    if(type === 'up'){
                
            calc = $(this).roundNumber((parseFloat(digit)+parseFloat(inc)),4)+unity;            
            $(this).val(calc); 
        
    }else if (type === 'down'){
               calc = $(this).roundNumber((parseFloat(digit)-parseFloat(inc)),4)+unity;            
                $(this).val(calc); 
               
    }
}; 

$.fn.incrementGroup = function(format){
    
        console.log();

    var zeCible = $('[data-group="'+format+'"]');

    if(format === 'gradient'){            

        var zeParent = $(this).parents('[data-group="multi-background"]').attr('id');
        zeCible = $('#'+zeParent+' [data-group="'+format+'"]');
    }

        i=0;
        zeCible.each(function(){

            $(this).attr('data-inc', i);

          /*  console.log(format);*/
            switch(format){

                case 'text-shadow':
                case 'box-shadow':
              

                var zeBloc = $(this).children('.bloc-duplicate');

                    var zeLabel = $(zeBloc).children('.switch-label');
                    var oldLabel =  $(zeLabel).attr('for').substring(0,$(zeLabel).attr('for').length-1);
                    var incLabel = oldLabel+i;
                    $(zeLabel).attr({'for':incLabel});

                 var zeBox = $(zeLabel).children('.switchbox');
                 var zeInput = $(zeBox).children('INPUT');

                 var zeName = $(zeInput).attr('name').substring(0,$(zeInput).attr('name').length-1);                     
                  
                        var incName = zeName+i;
                        $(zeInput).attr({'name':incName,'id':incName});

                break;

            }

           

            
            $(this).find('[data-uijq="preview"]').each(function(){

                if(i === 0){dataPrev = $(this).data();}
                        var zeName = $(this).attr('name').substring(0,$(this).attr('name').length-1);
                  
                        var incName = zeName+i;
                        $(this).attr({'name':incName,'id':incName});

            });
            i++;
        });   


};

$.fn.incLinkMultiBack = function(data){

    var zeLI;

        zeLI = $('#css3ui-tab-background .clone-tabMulti');
    
            var inc = 0;
            zeLI.each(function(){
          
            if(inc===data.lgtLI){
                    var zeLink = $(this).children('a');
                    zeLink.attr({'href':'#multiBack_'+inc+''}).text(data.zeCible+' '+inc);
                    zeLink.addClass('css3ui-tab-background_active');
                   var z=0;
                   $(this).find('.test-inc').each(function(){
                       $(this).attr('data-multi','multiBack_'+inc);
                      
                      z++;
                   });
                    
                }
             
            inc++;
            });
            
            
     
};

$.fn.incGroupMultiBack = function(data){
    
        console.log(data);
    
      
  
    
    /*On incremente les blocs*/
    var zeMulti;  
        zeMulti = $('[data-group="views-background"] [data-group="multi-background"]');
        
        
        console.log('control MultiBack');
        console.log('control MultiBack');
        console.log('control MultiBack');
        console.log('control MultiBack');
    
        console.log(zeMulti.length);
    
   
    $(zeMulti).each(function(x,v){
       
        
        $(this).find('.manda-inc INPUT, .manda-inc SELECT').each(function(){             
             
            
               
                var tabName = $(this).attr('name').split('_');
                if(tabName.length === 2){
                     var thisName = tabName[0]+'_'+x; 
                }else if(tabName.length === 3){
                     var thisName = tabName[0]+'_'+tabName[1]+'_'+x; 
                }
                
                 $(this).attr({'name':thisName,'id':thisName});
      
        });
        
        
         $(this).find('[data-uijq="padLock"]').each(function(){             
             
              
                var tabName = $(this).attr('name').split('_');
                var thisName = tabName[0];
                $(this).parents('.switch-label').attr('for',thisName+'_'+x);               
                $(this).attr({'id':thisName+'_'+x});  
            
        });
        
        
         $(this).find('.background-option LABEL:not(.label-externe,label.multi-child-cell)').each(function(){
                        
            var tabFor = $(this).attr('for').split('_');
            var newFor = tabFor[0]+'_'+x;
            $(this).attr('for',newFor);
                        
               
        });
        
        
        
        $(this).attr({'data-inc':x,'id':'multiBack_'+x});
           
            
            
        /***************************************/
                console.log('*****0000000000000000000************');
                console.log(data.zeCible);
        
         if(data.zeCible==='file'){  
           
           
                    console.log('On incremente les elements des bloc fichier');
                
                zeFile =  $(this).find('.fileManager');
                
                var transmit = [];             
                    
                     var changeLastCharac = function(data){
                         
                         var tabName = data.nameO.split('_');
                         var newName = tabName[0]+'_'+data.new;
                         return newName;
                         
                     };
                
                zeFile.each(function(){
                   
                   
                   
                        transmit.nameO =$(this).attr('id');                     
                        transmit.new = x;
                           
                        $(this).attr('id',changeLastCharac(transmit));
                            
                            
                 
                    $(this).children().each(function(){
                           
                            console.log($(this).attr('id'));
                           
                        transmit.nameO =$(this).attr('id');
                        transmit.new = x;
                           
                        $(this).attr('id',changeLastCharac(transmit));
                        if($(this).tagName() === 'input'){

                              $(this).attr('name',changeLastCharac(transmit));
                        }  
                            console.log('***********************');
                            console.log($(this).attr('id'));
                    });
                    
                 
                });
                    
        }
    
      
    });
    
    var buffer = zeMulti.length-1;



     
     
     
};

//Affichage d'élements d'interaction



$.fn.flash = function(type,message){ 
            
            var el,myHtml,lgtFlash;    
            el = $('[data-3ui="message-flash"]');lgtFlash= el.length;if(lgtFlash>0){} 

            myHtml = '<div class="FCW-center-center flash flash-'+type+' EX-UI" data-3ui="message-flash"><h4>'+message+'</h4></div>';
            $('body').append(myHtml);             
            
            setTimeout(function () { $('[data-3ui="message-flash"]').remove(); }, 2000); 

};
$.fn.flashUI = function(box,type,message){ 
          
          var myHtml;
          
          myHtml = '<p class="flashUI flashUI-'+type+' flashUI-'+box+' EX-UI">'+message+'<p>';
          switch(box){
              
                case 'action': 
                    
                    $('#infoAction P').remove();
                    $('#infoAction').append(myHtml);
                     setTimeout(function () { $('.flashUI-'+box+'').remove();}, 2000); 
                break;
                case 'project': 
                    
                    
                    $('#infoProject P').remove();
                    $('#infoProject').append(myHtml);
                    
                    if(message === ''){ 
                        $('#infoProject P').remove();
                        $('#infoStyle P').remove();
                        $('#infoRule P').remove();
                        
                        $(this).resetCookie();
                    }
                   
                break;
                case 'style':                     
                    
                    console.log(message);
                    
                    $('#infoStyle P').remove();
                    $('#infoStyle').append(myHtml);  
                    
                     if(message === ''){ 
                        $('#infoStyle P').remove();
                        $('#infoRule P').remove();
                        
                       
                    }
                    
                break;
                case 'rule': 
                    $('#infoRule P').remove();
                    $('#infoRule').append(myHtml); 
                    
                    if(message === ''){                        
                        $('#infoRule P').remove(); 
                        
                        $.cookie('ruleHtml','');
                    }
                    
                break;
              
          }
          

};
    
////////////////////////////////////////////////////////////////////////////
        
$.fn.myLightBox = function(thisHtml){ 
              
              $('#css3ui-lightBox').remove();
            
            //On Prend les dimensions de la fenetre
            var sW = $(window).width();
            var sH = $(window).height();
            
            
            console.log(sH);
            console.log($('html').css('height'));
            console.log($('body').scrollTop());
            
            var scrollH = $('body').scrollTop();
            
            myHtml = '<div class="css3ui-lightBox css3ui EX-UI" id="css3ui-lightBox"></div>';
            
            
            mTotal = scrollH+sH;
            centerScreen =  mTotal-(sH/2);
            
            $(myHtml).appendTo('body');
             
            elBox = $('#css3ui-lightBox');
            elBox.css({'width' : '100%', 'height' : sH , 'background' : 'rgba(71,71,71,0.4)','display':'flex','flex':'1','padding-top':scrollH, 
            'position' : 'absolute' , 'top' : '0px' ,'left' : '0px', 'bottom' : '0px', right : '0px'});
    
            $(thisHtml).appendTo(elBox);           
            
            thisEl = $('#css3ui-callTo');
            thisEl.css({'width' : '50%','margin' : 'auto auto'});            
            
            
            $('#css3ui-lightBox [data-focus="true"]').focus();
            
            
            // On Affiche la lightBox
            //On insère le contenue dans la lightBox   
    
};    

//Manipulation de tableau

$.fn.excludeValArray = function (ex){
     
       
    tabListOpen = jQuery.grep(tabListOpen, function(value) {
      return value !== ex;
    });

    //Verifiel si le tableau n'est pas vide
    if(tabListOpen.length===0){
        console.log(tabListOpen);
        console.log('Hé ho la list est vide');
        $.cookie('lastOpen','root_0');
        
          $(this).loadDefaultGlobal('listSelect');
            
            zeChildren = $('UL#'+$.cookie('sheet')+'').children('ul').children(); 
            console.log(zeChildren.length);
            var position = zeChildren.length;            
            console.log('nombre d enfants '+position);
            dataListSelect.position = position;            
            console.log(dataListSelect);     
            
            
               $('[data-css3ui="listRule"].illuminate').each(function(){
                    $(this).toggleClass('illuminate');
                });
                
                $(this).vidangeUI();
                
                  $(this).flashUI('rule','alert','You work at the root of the style sheet'); 
       
    }
           
    if(ex===$.cookie('lastOpen')){
        console.log('yas plus de cookie!!!!!!!');
    }
};

$.fn.excludeChildListArray = function (el){
    
        console.log('EXCLUSIONEXCLUSIONEXCLUSIONEXCLUSIONEXCLUSIONEXCLUSIONEXCLUSION');

    
    thisEl = $('.listData [data-idlinkgroup="'+el+'"]  UL ');
    
    //On parcours les ul Imbriquer jusqu'au level 3
    //Si ou ouvert on ckeck l'id, on check si dans le tableau puis on supprime
     
   $(thisEl).each(function(){
            console.log(thisEl);
        if($(this).css('display') !== 'none'){
                    console.log('filtre');
                    var checkTab = $(this).children('li').data('idlinkgroup');
                    //On check dans le tableau
                    console.log(checkTab);
                    
                       if($.inArray(checkTab,tabListOpen) !== -1){ 
                        $(this).excludeValArray(checkTab);  
                        console.log('on supprime');                        
                       }
        }
    });

};

$.fn.findLastElArray = function(tab){    
    var limit = tab.length-1; 
    
    
    
    
    return tab[limit];
};

///////////////////////////////////////////////////////////

$.fn.viewStyleSheet = function(){
        console.log('Affichage de la feuille de style');
        console.log($.cookie());
    if($('a[href="#'+$.cookie('sheet')+'"]').length>0){
        //si pas de cookie on pointe la première feuille de style
        console.log('click');
        console.log($.cookie('sheet'));
            console.log($('a[href="#'+$.cookie('sheet')+'"]'));
        $('a[href="'+$.cookie('sheet')+'"]').trigger('click');
        $('a[href="'+$.cookie('sheet')+'"]').addClass('css3ui-tabListData_active');
        
     $(this).flashUI('style','success','StyleSheet : '+$.cookie('sheet'));
         
        
    }else{
            console.log('aucun cookie');
        var firstLI = $('#css3ui-tabListData').find('li:first');
        console.log(firstLI);
        var link = firstLI.find('a');
        var thisHref = link.attr('href');
        console.log(link);
        $(link).trigger('click');
            console.log(thisHref);
        $.cookie('sheet',thisHref.substring(1));    
          
      
        
    }
    
      
};

//Traite le tableau des onglets ouverts du listing CSS


$.fn.closeToCall = function(){
            if(callToActive === true){           
                $('.css3ui-lightBox').remove();
                callToActive = false;
            }
};

$.fn.checkMyFamilly = function(thisData){
    
        console.log($(this).findLastElArray(tabListOpen));
        thisArrow = $('[data-el="clickArrow_'+thisData.idlinkgroup+'"]');
        var zeData = thisArrow.data();
  
       
    if(zeData.groupformat==='ruleHtml'){ 
    var findRuleEl = function(thisEl){
     
        zeContentRule = thisEl.siblings('ul');
        zeRule        = zeContentRule.children('li');
                console.log(zeRule);
        zeRule.each(function(){
            
                console.log($(this).data());
                var dataRule = $(this).data();
               //??????
            
        });
    };
    
    findRuleEl(thisArrow);
    }
    
        //on exclue l'ID des groupe ouverts du tableau
        $(this).incrementTabListOpen(thisData);      
       
        console.log(zeData);     

        if(zeData.child=== true){        
                console.log('jai un enfants');
                console.log('data de lenfants');
                var zeUl = thisArrow.siblings('UL');
                console.log(zeUl);
                var zeChild = zeUl.children('li');
                var newData = zeChild.data();
                console.log(newData);
                $(this.checkMyFamilly(newData));
                console.log(zeChild);
        }else{
         
            //ONWORK
            
            console.log('on as finit le traitement');
            //COmparaison avec exclusion du tableau
                        var newId= $(this).findLastElArray(tabListOpen); 
                        console.log(newId);
                        var styleSheet = '#'+$.cookie('sheet');
                        var thisArrow = $(styleSheet+' [data-el="clickArrow_'+newId+'"]');
                        var newData = thisArrow.data();
                        console.log(newData);
                        
                dataListSelect = $.extend({}, dataListSelect,newData); 
            
        }        
        
        
        console.log($.cookie('lastOpen')+' ---Comparaison--- '+thisData.idlinkgroup);
        if($.cookie('lastOpen')==thisData.idlinkgroup){
            
        console.log('le dernier dossier ouvert à été supprimer');
            
        }       
};
/*INUTILE
$.fn.defaultCss = function(thisRule,ruleHtml){
    
    if(ruleHtml=== false){
        ruleHtml === $.cookie('ruleHtml');
    }
    
        console.log('defaultCSs---->'+ruleHtml);
    
        console.log(thisRule);
        console.log(maGlob);
      var saveData =[];
     $.each(maGlob.kit, function(key, val) {
          if(thisRule===val.rule){  
              
              if(thisRule === 'filter'){thisRule = '-webkit-filter';};
                  
                $(ruleHtml).not('.css3ui *').css(thisRule,val.def);
              
             
            }
     });    
};
*/
    
    
$.fn.vidangeUI = function(){
        
           $('#3ui-panelControl input,#3ui-panelControl select').each(function(){
            console.log('vidange');
             var myInput = $(this).data();
                    var n = $(this).prop('name');                    
                    var work = n.split('_');
                    var count = work.length;
                  
                    if(count>1){
                        myInput.name = work[0];
                        myInput.supp = work[1];
                    }else{
                        myInput.name = n;
                    }
                    
                    if(myInput.format === 'digit' ||myInput.format === 'fourDigit'||myInput.format === 'customRadius'|| myInput.format === 'select' || myInput.format === "alpha"){
                       
                        $(this).val('');  
                        
                     }else if(myInput.format === 'color' ){  
                      
                        if(myInput.supp === 'opacity' ){  
                        $(this).val('1');
                        }else {
                        $(this).val('#000000');    
                        }
                    }else if(myInput.format === 'border' ){
                        $("input[name="+myInput.name+"]").val('');
                        $("input[name="+myInput.name+"_select]").val('');
                        $("input[name="+myInput.name+"_color]").val('#000000');
                        $("input[name="+myInput.name+"_opacity]").val(1);                    
                    
                    
                    }else if(myInput.format === 'transition' ){
                        myHtml = $('#transition_0').clone(true);  
                        
                        $('.transition').remove();
                        $('#css3ui-transition h1').after(myHtml);

                        $("select[name=transition_property_0]").val('');
                        $("input[name=duration_0]").val('');
                        $("select[name=timing_function_0]").val('');
                        $("input[name=delay_0]").val('');
                                        
                     }else if(myInput.format === 'transform' ){ $(this).val(''); 
                     }else if(myInput.format === 'filter' ){ $(this).val(''); }
     });
     
                    //Purge text-shadow
                        var zeClone = $('[data-group="text-shadow"][data-inc="0"]').clone(true);                     
                        $('[data-group="text-shadow"]').remove();
                        $('#css3ui-textShadow .multi-label').after(zeClone);                                     

                                 $("input[name=text-shadow_color_0]").val('#000000');
                                 $("input[name=text-shadow_opacity_0]").val('1');
                                 $("input[name=text-shadow_y_0]").val('');
                                 $("input[name=text-shadow_x_0]").val('');
                                 $("input[name=text-shadow_blur_0]").val('');                                  
                    
                    //Purge box-shadow
                        
                        var zeClone = $('[data-group="box-shadow"][data-inc="0"]').clone(true);
                     
                        $('[data-group="box-shadow"]').remove();
                        $('#css3ui-boxShadow .multi-label').after(zeClone);  
                        
                                  $("input[name=box-shadow_color_0]").val('#000000');
                                  $("input[name=box-shadow_opacity_0]").val(1);
                                  $("input[name=box-shadow_x_0]").val('');
                                  $("input[name=box-shadow_y_0]").val('');
                                  $("input[name=box-shadow_blur_0]").val('');
                                  $("input[name=box-shadow_spread_0]").val('');
                                  $('select[name="box-shadow_select_0]').val('no');
                          
    
                    //Vidange des multiBackground 
                    
                    $('.nav-tab-background li:nth-child(n+2)').remove();
                    $('.nav-tab-background li').addClass('hidden model-li');
                    $('[data-group="views-background"]').empty();   
                    
                    $('#3ui-panelControl input').val('');
                    
    };
    
$.fn.countRule = function(rule){
        
        
        var x=0;
        $('[data-css3ui="openGroup"][data-groupname="'+rule+'"]').each(function(){
            console.log('yep');
            console.log($(this).data());
            x++;
        });
        
        return x;
        
    };
    
    
$.fn.alertMultiRule = function(rule){
        
       console.log('Gestion des rule multiples');
       
        var warningLgt =  $('.itemData-ruleHtml').length;
        //Boucle les feuilles de styles ???
        var styleSheet = $.cookie('styleSheet');
        var checkRule = [];
       
       $('.itemData-ruleHtml').each(function(key){
            console.log(key);
           if($(this).data('groupname')!==rule){               
                console.log('toi tu dégage');
                $(this).addClass('hidden');               
           }else{
               
                console.log('toi je te garde');
                var thisCheck = $(this).data('idlinkgroup');
                checkRule[key] = thisCheck;
           }  
           
           if(key===warningLgt-1){
                console.log($(this).data());
                console.log(checkRule);
                 var lastEntry =   $(this).findLastElArray(checkRule);
           
                 console.log(lastEntry);
               
                
                   var thisArrow = $('[data-el="clickArrow_'+lastEntry+'"]');   
                   var thisRule = $('[data-el="clickGroup_'+lastEntry+'"]');                    
                
               
                   if(thisArrow.hasClass('illuminate')===false){
                       console.log('pas ALLUMER');
                       console.log(thisArrow);
                       //Ouverture des parents et en dernier de la cible
                       //OpenMe and my parent
                      
                       thisArrow.trigger('click');
                   }
                   
                   if(thisRule.hasClass('illuminate')===false){
                       console.log('pas ALLUMER');
                       console.log(thisRule);
                       //Ouverture des parents et en dernier de la cible
                       //OpenMe and my parent
                       
                       thisArrow.trigger('click');
                   }
           }
        
       });
       
        //on place une fausse feuille de style dans le listting
           //si click sur la croix de fermeture rebalance un coup d'ajax fullData
           //
       
        $('#css3ui-tabListData A[href="#css3uiWarning"]').parent().remove();       
        var myHtml = '<li><a href="#css3uiWarning" class="css3uiWarning EX-UI">! Warning !</a></li>';
           $('#css3ui-tabListData').append(myHtml);        
    };
    
    
//Force le passage de la dernière valeur du tableau tabLisopen commen valeur courante .
    
    
$.fn.zeRuleIsTheLast = function(){
        console.log('laaaaaaaaaaaaaaaaaaaaaaaaa');
        console.log(tabListOpen);
        if(tabListOpen.length>0){  

                var lastEntry =   $(this).findLastElArray(tabListOpen);
                console.log(lastEntry);
                var thisArrow = $('[data-el="clickArrow_'+lastEntry+'"]');
                console.log(thisArrow);
                var checkData = thisArrow.data();
                console.log(checkData);
                $.cookie('ruleHtml',checkData.groupname);      


           if(checkData.groupformat==="ruleHtml"){
               console.log('case ruletml Position pris au parent');
               $('#newRule').val($.cookie('ruleHtml'));
                $(this).resizeTextarea('19','#newRule');

           }else{
               console.log('reset Position to false');
               $('#newRule').val('');  
               $(this).vidangeUI();
           }            
           dataListSelect.position = checkData.position;

       }else{

       //new
        zeChildren = $('UL#'+$.cookie('sheet')+'').children('ul').children(); 
       console.log(zeChildren.length);
       var position = zeChildren.length;            
       console.log('nombre d enfants '+position);
       dataListSelect.position = position;            
       console.log(dataListSelect);            
       console.log('aucun group ouvert');
       }
            
        
};
    
    
$.fn.defineWorkContext = function(thisData){
    
        console.log('/**********    Definition du context   ********************/');
        console.log('definie le context de travail @media @keyframes Standart');
        
        console.log(thisData);
        
        var thisArrow = $('[data-el="clickArrow_'+thisData.idlinkgroup+'"]');
        var thisGroup = $('[data-el="clickGroup_'+thisData.idlinkgroup+'"]');
        var format = thisArrow.data('groupformat');
        var level = thisArrow.data('level');
        var parentId = thisArrow.data('myparent');
        var objParent = $('[data-el="clickArrow_'+parentId+'"]');
        
        var parentData = objParent.data();
        console.log(format+'   '+level);
        
        
        switch (format){
            
            case 'ruleHtml': 
                
                console.log('CONTEXT RULE');
               
                if(level > 1){
                $(this).defineWorkContext(parentData);
                }else{
                    thisWorkContext = 'standart';             
                }
                
               
            break;
            
            case 'comment':
                
                console.log('CONTEXT COMMENT');
                
                if(level > 1){
                    console.log('superieur on reboucle');
                    $(this).defineWorkContext(parentData);
                }else{
                    console.log('inferieur on vide');
                    thisWorkContext = 'standart';
                    $('#newRule').val('');
                    dataPrev.ruleHtml='';
                }
                
                $(this).resizeTextarea('19','#newRule');
                
            break;
            
            case 'media': 
                
                  console.log('CONTEXT MEDIA');
               
                thisWorkContext = 'media';            
                console.log(thisGroup.text()); 
                 $('#newRule').empty();
                    dataPrev.ruleHtml='';
                    $('.light').each(function(){
                    $(this).removeClass('light');
                        
                    });
                
            break;
             
            case 'keyframes':
                
                 console.log('CONTEXT KEYFRAMES');
               
                     $('#newRule').empty();
                    dataPrev.ruleHtml='';
                    $('.light').each(function(){
                        $(this).removeClass('light');
                        
                    });
               
            break;
            
        }

 
        console.log(thisWorkContext);        
        
    };
    
    
    
    
 //Creation d'une fonction splitant le regle html et appliquant le buffer 

$.fn.splitRuleHtml = function(thisRule){

        console.log('spliRuleHtml');
        var thisTab = [];    
        thisRule = thisRule.replace(/[, ][ ,][ , ]/g,",");
        
        thisTab = thisRule.split(',');
          
        var newTab= [];        
        
        $.each(thisTab,function(k,val){
            
            
            if (val.match(/::after/) || val.match(/::before/)) {
                newTab[k] = val ;
            } else {
                newTab[k] = val+':not(.EX-UI)';  
            }
            
      
            
         
        
        });
        
        newRule = newTab.join(',');    
    
        return newRule;
            
  
        


};

$.fn.constructDataListSheet = function(thisObj){
    
        console.log(thisObj);
        thisData = [];
                thisData         = thisObj.data();               
                thisData.itsMe       = thisObj;  
                thisData.thisAction  = thisObj.data('css3ui');
                              
                if(thisData.myparent === 0){  
                    console.log('level0');
                thisData.groupParent = $('UL#'+$.cookie('sheet')+'');
                }else{
                thisData.groupParent = $('[data-idlinkgroup="'+thisData.myparent+'"]');  
                }
                
                
                if(thisData.thisAction === 'openGroup'){
                      thisData.myBroth     = $('[data-el="clickGroup_'+thisData.idlinkgroup+'"]');
                }else  if(thisData.thisAction === 'listRule'){
                      thisData.myBroth = $('[data-el="clickArrow_'+thisData.idlinkgroup+'"]'); 
                }
    
    return thisData;
    
};


$.fn.updateListSelect = function(elData){
    
        console.log('??????????????????????');
        console.log(elData);
    
          if(elData.groupformat === 'ruleHtml'){
                console.log('On click sur une coordonée HTML');
                //Si le groupe pointer est une rule html les info du datalistselect 
                //Correspond au parent de la rule.
                //La position d'Insertion ce situe un cran après celle de l'élément

                console.log("Je viens de séléctionner le nom de l\'élément \n\
                position de l élément : "+elData.position+"\n\
                si j\'insère un group ou une autre coord html sa position sera à "+(elData.position+1)+"\'\n\
                Et serat inclus dans le parent suivant "+elData.groupParent.data('idlinkgroup')+"'\n\
                ");

                dataListSelect = {idlinkgroup : elData.groupParent.data('idlinkgroup'),
                level : elData.level, position : elData.position , groupformat : elData.groupParent.data('groupformat')};                             

            }else{
                
                console.log('On click sur un Group');
                //On compte le nombre d'enfants et l'insertion ce situe un cran après le dernier enfant
                console.log(elData.groupParent.data());
              
                ///On peut considéré deux possibilités à ce niveau  
              
                    var countMyChild = function (el){
                            zeChildren = el.itsMe.siblings('ul').children();
                            console.log('On compte le nombre d\'enfants'+zeChildren.length);
                            return zeChildren.length;                            
                    };
              
                if(elData.myBroth.hasClass('illuminate')){                    

                  //Le group est ouvert.
                  //On insère à l'intérieur.
                  //Code ci-dessous.
                  
                    console.log('Mon frangin est allumé donc group ouvert');
                    console.log(elData);                 
                  
                    if(elData.child === true){
                        
                        console.log('on compte le nombre d\'enfants');
                        elData.newInsert = countMyChild(elData); 
                        
                    }else{
                        
                        console.log('pas d enfants');
                        elData.newInsert = false;
                        
                    }
                    
                 

                    console.log("Je viens d'ouvrir  un group \n\
                    position du group : "+elData.position+"\n\
                    si j\'insère un group ou une autre coord html il seront crer à l'intérieur de ce dossier\n\
                    id : "+elData.idlinkgroup+" le nouveau élément créer ce situe au bout de l'arbre \n\
                    (nombre d'enfants +1) "+elData.newInsert+"");               

                    dataListSelect = {idlinkgroup : elData.idlinkgroup,
                    level : elData.level, position : elData.newInsert , groupformat : elData.groupformat}; 

                }else{  
                    
                    console.log('je selectionne que le listRule group fermer');
                        //On selectionne que la rule le group n'est pas ouvert
                        //On ce positionne au niveau du group +1
                    dataListSelect = {idlinkgroup : elData.groupParent.data('idlinkgroup'),
                    level : elData.level, position : elData.position , groupformat : elData.groupParent.data('groupformat')};                      
                }
            }
    
    
};

$.fn.lightGroup = function(elData){
    
     $('[data-css3ui="listRule"].illuminate').each(function(){
                    $(this).toggleClass('illuminate');
                });
                
                elData.itsMe.toggleClass('illuminate');
                
                if(close===true){                    
                    if(elData.itsMe.hasClass('illuminate')){
                       elData.itsMe.toggleClass('illuminate'); 
                    }                    
                    console.log('ordre reçue d éteindre la listRule');
                }
    
    
};

$.fn.pushAndNotClick = function(elData){
    
        if($.inArray(elData.idlinkgroup,tabListOpen) === -1){ 
            
                    console.log('ouverture du group');
                    tabListOpen.push(elData.idlinkgroup); 
                    //on ouvre le groupe
                    $.cookie('lastOpen',elData.idlinkgroup); 
        }  
};






$.fn.optionBackground = function(choice){
    
    switch(choice){
        
        case 'delThis':
            console.log('on Supprime un element du multi background');

            var thisDel;
            var transmit = [];
            

            thisDel = $(this).attr('data-multi').substring(1);
            transmit.zeCible = $(this).attr('data-type');
             
                console.log(transmit.zeCible);

            var lgtLI = $('#css3ui-tab-background .clone-tabMulti').length;

                console.log('Nombre de lien '+lgtLI);
                console.log('Nombre de lien '+lgtLI);
                console.log('Nombre de lien '+lgtLI);
                console.log('Nombre de lien '+lgtLI);
                console.log('Nombre de lien '+lgtLI);
                console.log('Nombre de lien '+lgtLI);

            if(lgtLI>1){   

            var delThis = $('#css3ui-tab-background a[href="#'+thisDel+'"]').parents('.clone-tabMulti');
            delThis.remove();
            $('#'+thisDel).remove();        

            var zeLI = $('#css3ui-tab-background .clone-tabMulti');



            var inc = 0;
            zeLI.each(function(){

                var zeText = $(this).text();
                var stock = zeText.split(' ');
                var zeCible = stock[0];         


                var zeLink = $(this).children('a');
                zeLink.attr({'href':'#multiBack_'+inc+''}).text(zeCible+' '+inc);

                var zeSpan = $(this).children('span');
                zeSpan.attr({'data-multi':'multiBack_'+inc+''});

                $(this).find('.test-inc').each(function(){
                $(this).attr('data-multi','multiBack_'+inc);
                });
                inc++;
            });     

            transmit.multiLgt = $('[data-group="views-background"] [data-group="multi-background"]').length; 

            var thisSplit1 = thisDel.split('_');
            var thisNumber = thisSplit1[1];
            var thisLast  = thisNumber-1;  

            if(thisLast<1){ thisLast = 0; }
            console.log(thisLast);
            
            //click forcer
            $('[href="#multiBack_'+thisLast+'"]').trigger('click');
            $('#multiBack_'+thisLast).show().siblings().hide();
            
            
            
            }else{      
                   
                    
            var delThis = $('#css3ui-tab-background a[href="#'+thisDel+'"]').parents('.clone-tabMulti');
            delThis.remove();
            $('#'+thisDel).remove();  
            
            var myHtml = '<li class="hidden model-li ui-sortable-handle EX-UI"><a href="multiBack_a" data-rightclick="true" data-table="multiBack" class="EX-UI">multi-background_a</a>';
            
            $('.nav-tab-background').append(myHtml);
            
                
            }            
          
            ///On force le passage à la preview 
        
            $(this).incGroupMultiBack(transmit); 
            
            
           
            
            dataPrev.name = 'background-image';
            dataPrev.format = 'multiBack';
            $(this).preview(true);

           
             

               

        break;
        
        case 'before':
        case 'after':
            
            console.log('duplication before');
            var thisHref = $(this).attr('data-multi');
            var thisBefore = $(this).attr('data-multi').substring(1);
            var zeCible = $(this).attr('data-origintext');


            if(zeCible.match(/gradient/gi)){

                cible = 'gradient';
            }else if(zeCible.match(/file/gi)){

                 cible = 'file';            
            }

                var thisLink = $('[href="'+thisHref+'"]').parent('li');
                var newLink = thisLink.clone(true); 
                
                ///////////////////////////////////
                
                var thisGroup = $(thisHref);
                var newGroup = thisGroup.clone(true); 
                
                if (choice === 'before') {               
                //Insertion du nouveau lien
                newLink.insertBefore(thisLink);
                //Insertion du nouveau group
                newGroup.insertBefore(thisGroup);
                }else if (choice === 'after') {               
                //Insertion du nouveau lien
                newLink.insertAfter(thisLink);
                //Insertion du nouveau group
                newGroup.insertAfter(thisGroup);
                }
            
            //Increment des liens
            console.log('compte le nombre de lien de navigation de background');            
            console.log($('.nav-tab-background li').length);
            $('.nav-tab-background li').each(function(k,v){
                console.log(k);console.log(v);console.log($(this));
                thisChild = $(this).children('A');
               var zeText = thisChild.text(); 
               var zeHref = thisChild.attr('href').substring(1); 
                    console.log(zeText);
                    console.log(zeHref);
                    
                    if(zeText.match(/gradient/gi)){

                       thisChild.text('gradient '+k);
                       
                    }else if(zeText.match(/file/gi)){

                       thisChild.text('file '+k);
                                    
                    }
                    
                     thisChild.attr('href' ,'#multiBack_'+k);
                
            });
            
                console.log('on vient de duplique sur l\'element portant le numéro '+$(this).data('inc'));
                console.log('action demander = '+choice);
            
            //newIncrement des box et de leurs attributs
            
            zeMulti = $('[data-group="views-background"] [data-group="multi-background"]');
            zeMulti.each(function(ke,v){
              
                $(this).attr('data-inc',ke);
                $(this).attr('id','multiBack_'+ke+'');
                
                console.log($(this).children('.manda-inc'));
                    
                    
                //newIncrement des SELECT                
                $(this).find('SELECT').each(function(){
                var tabName =$(this).attr('name').split('_'); 
            
           
                if(tabName.length === 2){
                     var thisName = tabName[0]+'_'+ke; 
                }else if(tabName.length === 3){
                     var thisName = tabName[0]+'_'+tabName[1]+'_'+ke; 
                }
                
                 $(this).attr({'name':thisName,'id':thisName});
                });
                
                    //newIncrement des INPUT
                    $(this).find('INPUT').each(function(){
                    var tabName =$(this).attr('name').split('_'); 


                    if(tabName.length === 2){
                         var thisName = tabName[0]+'_'+ke; 
                    }else if(tabName.length === 3){
                         var thisName = tabName[0]+'_'+tabName[1]+'_'+ke; 
                    }

                     $(this).attr({'name':thisName,'id':thisName});
                    });
                
                //newIncrement des LABEL                
                $(this).find('.background-option LABEL:not(.label-externe,label.multi-child-cell)').each(function(){
                                   
                        var tabFor = $(this).attr('for').split('_');
                        var newFor = tabFor[0]+'_'+ke;                        
                        $(this).attr('for',newFor);
               
                });
                
                //newIncrement des padlock                
                $(this).find('[data-uijq="padLock"]').each(function(){  
              
                var tabName = $(this).attr('name').split('_');
                var thisName = tabName[0];
                $(this).parents('.switch-label').attr('for',thisName+'_'+ke);               
                $(this).attr({'id':thisName+'_'+ke});  
            
                });
                
                
                if(cible==='file'){
                
                    zeFile =  $(this).find('.fileManager');

                         var transmit = [];             

                         var changeLastCharac = function(data){

                             var tabName = data.nameO.split('_');
                             var newName = tabName[0]+'_'+data.new;
                             return newName;

                         };

                    zeFile.each(function(){

                        transmit.nameO =$(this).attr('id');
                        transmit.new = ke;   
                            $(this).attr('id',changeLastCharac(transmit));

                        $(this).children().each(function(){

                           transmit.nameO =$(this).attr('id');
                           transmit.new = ke;                           
                           $(this).attr('id',changeLastCharac(transmit));

                        if($(this).tagName() === 'input'){

                             $(this).attr('name',changeLastCharac(transmit));
                        }  
                        });

                    });   
                }
                
              
               
            });         
            
            //click sur le nouvelle element créer et switch de la class active
            
                console.log('NOMBRE DU CLICK');
            
                var thisInc = $(this).lastCharac(thisHref);
            
            if(choice === 'before'){
                
                var numberClic = thisInc -1;
                if(numberClic <0){
                    numberClic = 0;
                }
                
                
            }else  if(choice=== 'after'){
                var numberClic = parseFloat(thisInc) +1;
            }             
            
            $('[href="#multiBack_'+numberClic+'"]').trigger('click');
            
             //on force le passage à la preview

            dataPrev.name = 'background-image';
            dataPrev.format = 'multiBack';
            $(this).preview(true);
        
            
            
            
            
            
            
        break;
        
    }
    
    
    
};


$.fn.resizeTextarea = function (limit, id){

          
      var currLength = $(id).val().length; 
    
      
      if(currLength >= limit){  
            console.log('on depasse la l');
          
          var ratio = currLength/limit;
          var fontSize = $(id).css('font-size');         
          var check = fontSize.match(/[0-9]+/);
          var newH = check[0]*ratio;    
          
          Math.round(newH);
          
          console.log(ratio+'   '+check+'  '+newH);
          
          $(id).css('height',newH);
          
          var otherH = 660-newH;
          
          $('#styleSheet').css('max-height',otherH);
          
       
      }else{
         $(id).css('height','32px');
      }
      
      
      
    
};


//eteint le padlock envoyer à la fonction;

  $.fn.turnOffPad = function(cible){
                
                
                   var thisPadLock = $('#switch-'+cible+' ~ .switch-container');
                   var thisCible =$('#switch-'+cible);
                   console.log(thisPadLock);
                   var backPad = thisPadLock.css('background');
                   
                   if(backPad.match(/rgb\(250/)){
                       
                        console.log('light');
                       thisCible.trigger('click');
                   }
                   
                
};


$.fn.checkSizeOfListing = function(){
    
    
 
        
        console.log($(window).height()+'px');
        console.log($(window).width()+'px');
        



        
    
};
/*
$(window).resize(function() {
$(this).checkSizeOfListing();

});
*/
});
