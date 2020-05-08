$(document).ready(function() {
    
    


$.fn.oneDigit = function(dataBrut){   
         
    var digit =[];


    if (dataBrut){
           if (dataBrut === '0'){construct = '0';} else{
         if(dataBrut.match(/em|rem|px|%|pt|deg|ms|s|vw|vh|vmin|vmax/)){
             var unity =[];
             unity = dataBrut.match(/em|rem|px|%|pt|deg|ms|s|vw|vh|vmin|vmax/);
             digit = dataBrut.split(unity);                                  
             construct = digit[0]+unity;                                    
         }else if($.isNumeric(dataBrut)){  
             if(dataPrev.unity){var unity = dataPrev.unity;}else{var unity = 'px';}
             digit[0] = dataBrut+unity;
             construct = dataBrut+unity;/*données Ajax*/                                        
         }else if(dataBrut.match(/cover|auto|inherit|dashed|dotted|double|groove|hidden|inset|none|outset|solid|ridge|top|bottom|left|right|center|content|transparent/)/*Value Css authoriser*/){   
             digit[0] = dataBrut;
             construct = digit[0];/*données Ajax*/
         }else{
             alert('la donnés '+dataBrut+' n\'est pas valide. [input]'); /*Error*/ 
             $(this).val('');
             return false;                                    
         }
         } 
    }else{
       /*Renvoie la value d'annulation preview de la fonction CSS appeler*/
       construct = '';
    } 

    return construct;  
};


/**********************************************************************************/

$.fn.fourDigit = function(dataBrut){
   
            if(dataBrut.match(/0 auto/)){

               construct = dataBrut;               

            }else {

               splitData =[]; 
               compil=[];
               splitData = dataBrut.split(' ');                       
               var lgtSplit = splitData.length;                                                        
               for(var i=0;i<lgtSplit;i++){
                   $(this).oneDigit(splitData[i]);                                
                   compil[i] = construct;                               
               }                              
               construct = compil.join(' ');
          
               return construct; 
        }
          
   return construct;
};


/**********************************************************************************/
/*Gestion des input de type select*/
 
$.fn.checkSelect = function(dataBrut){
    
    var dataMulti = false;
    
        console.log('new Select');
        if($(this).data('multi')){
            dataMulti = true;
        }
        
        
        console.log('/////////////////////'+$(this).data('multi'));
        if(dataMulti===false){
            if(dataBrut !==''){
                    if(dataBrut.match(/[A-Z0-9]/i)){ 

                        var construct = dataBrut;    

                    }else{
                        alert('la donnés '+dataBrut+' n\'est pas valide [select].'); /*Error*/ 
                        $(this).val('');
                        return false;
                    }

            }else{ construct = '';}
            
          
        if(dataPrev.name === 'flex'){
            
            thisData = dataBrut.split(' ');
            
              $('input[name="flex-grow"]').val(thisData[0]);
              $('input[name="flex-shrink"]').val(thisData[1]);
              $('input[name="flex-basis"]').val(thisData[2]);
            
            
        }
            
            
            
        }else{
            if(dataBrut !==''){
                var dataWork = [];
                var lgt;
                var select = $(this).attr('name').split('_');
                var thisSelect = select[0];
            
                  console.log(thisSelect);
         
                if(thisSelect === 'font-family'){

                        console.log('/////////////////////Cas de particule');
                        lgt = $('[data-group="font-family"]').length;
                }else{ 
                    console.log('-----------------------------select multiple');
                    ///select multiple des degrader
                        lgt = $('[data-group="views-background"] [data-group="multi-background"]').length;
                 
                } 
                
                ////////////////////////////////////////////
                  for(i=0;i<lgt;i++){               

                       if($('select[name="'+thisSelect+'_'+i+'"]').val()!==''){

                            dataWork[i] = $('select[name="'+thisSelect+'_'+i+'"]').val();
                            console.log(dataWork[i]);                
                       }               
                   }

                    console.log(dataWork);

                    if(dataWork.length>1){
                        construct  = dataWork.join(' , ');
                    }else{
                       construct = dataWork[0];
                    }
            }else{ construct  = '';}
    }
            return construct;
};
               
     
                /**/
                
$.fn.background = function(){    
    
                            var thisReturn;                           
                            mire = $("input[name="+dataPrev.name+"]");
                            o = $("input[name="+dataPrev.name+"_opacity]");
                            if (o.val() === '' || o.val() > 1 ){ o.val(1);                                
                            }else if ( o.val() < 0){  o.val(0); }
                            hex = $(mire).val();                           
                            opacity = $(o).val();                            
                            $(this).findRgba(hex,opacity);
                            
                               
                            thisReturn=workRgb;
                            
                            return thisReturn;
                            
                           
                };


                
                
/**************************************************************************/
                
                
$.fn.imgFilter = function(){
    console.log('on filtre les effets');
    var thisReturn;
    
    var myCss = [];
    var HUE = $('input[name="hue-rotate"]');
    var grayscale = $('input[name="grayscale"]');
    var blur = $('input[name="blur"]');
    var brightness = $('input[name="brightness"]');
    var contrast = $('input[name="contrast"]');
    var invert = $('input[name="invert"]');    
    var saturate = $('input[name="saturate"]');
    var sepia = $('input[name="sepia"]');


            console.log(HUE.val());
    
    var x = 0;
   if((HUE).val()!==''){        myCss[x] = 'hue-rotate('+HUE.val()+')';         x++; }
   if((grayscale).val()!==''){        myCss[x] = 'grayscale('+grayscale.val()+')';         x++; }
   if((blur).val()!==''){        myCss[x] = 'blur('+blur.val()+')';         x++; }
   if((brightness).val()!==''){       myCss[x] = 'brightness('+$(this).oneDigit(brightness.val())+')';        x++;}
   if((contrast).val()!==''){       myCss[x] = 'contrast('+$(this).oneDigit(contrast.val())+')';        x++;}
   if((invert).val()!==''){       myCss[x] = 'invert('+$(this).oneDigit(invert.val())+')';        x++;}
   if((saturate).val()!==''){         myCss[x] = 'saturate('+$(this).oneDigit(saturate.val())+')';         x++;}
   if((sepia).val()!==''){         myCss[x] = 'sepia('+$(this).oneDigit(sepia.val())+')';         x++;}
  
    thisReturn = myCss.join(' ');
    
    /***/
    dataPrev.name = 'filter'; 
    
    return thisReturn;
    
};


/******************************************************************************/


    
$.fn.border = function(){
var thisReturn;
                            compil = [];
    
                            /*Les cibles Associées*/
                                                      
                            m = $("input[name="+dataPrev.name+"]");
                            c = $("input[name="+dataPrev.name+"_color]");
                            o = $("input[name="+dataPrev.name+"_opacity]"); 
                           
                            /*Les valeurs*/
    
                            var dataBrut = m.val();    
                         
                            var colorAssoc = c.val();
                            var opacity = o.val();
                            if(opacity === ''){o.val('1');}                           
                         
                            /*On reconstruit la données*/
                           if(dataPrev.format === 'border'){
                              s = $("select[name="+dataPrev.name+"_select]"); 
                              select = s.val(); 
                              construct = $(this).oneDigit(dataBrut); 
                             
                              
                              if(dataBrut !== '' && select === ''){
                                  s.val('solid');
                                  select = s.val(); 
                              }else if(dataBrut === '' && select !== ''){
                                  m.val(1);
                                   var dataBrut = m.val(); 
                              }
                             processValues = construct+' '+select;
                           }else{
                            build = [];
                            build = dataBrut.split(' ');
                            nbData = build.length;
                        
                            for (i=0;i<nbData;i++){                                                                 
                                 $(this).oneDigit(build[i]);                                
                                 compil[i] = construct; 
                            }   
                               
                            processValues = compil.join(' ');
                           }
                            /*on traite la couleur*/
                           var RGBA = $(this).findRgba(colorAssoc,opacity);
                           
                              s = $("select[name="+dataPrev.name+"_select]"); 
                              
                                if(m.val() === '' && s.val() === ''){
                                  
                                  thisReturn = '';
                                }else{
                                 thisReturn = processValues+' '+RGBA;
                                }         
                                
                         return thisReturn;
                                               
};

/************************************************************************************/

$.fn.customRadius = function(){
    
    var thisReturn;
                    if(dataPrev.supp === 'x'){  axys = 'y'; }else{axys = 'x';}
                    
                    var i = $(this).attr('name');
                    var t = i.split('_');
                    var input = t[0];
                    var otherInput = input+'_'+axys;
                    dataPrev.name= input;
                    var myThis =$(this);
                    firstVal = $(this).oneDigit(myThis.val());      
                    console.log(input);
                  
                    
                 if($('input[name="switch-'+input+'"]:checked').length > 0){
                          $('input[name="'+otherInput+'"]').val(firstVal); 
                    }else{
                        
                           if($('input[name="'+otherInput+'"]').val() === ''){
                       $('input[name="'+otherInput+'"]').val(firstVal); 
                    }
                 }
    
                    sndVal = $(this).oneDigit($('input[name="'+otherInput+'"]').val());
                    
                   
                    if(dataPrev.supp === 'x'){  
                    thisReturn = firstVal+' '+sndVal; 
                     }else{                         
                    thisReturn = sndVal+' '+firstVal ;     
                    }
                    if(firstVal === '' && sndVal ===''){thisReturn = '';}
        console.log(thisReturn);           
    
    return thisReturn;
    
};

/**************************************************************************************/

$.fn.transform = function(){
    
var thisReturn;


//prendre en compte 
// perspective-origin   transform-origin
    
    var myCss = [];
  
    
    var scaleX = $('input[name="scaleX_x"]');
    var scaleY = $('input[name="scaleY_y"]');
    var scaleZ = $('input[name="scaleZ_z"]');
    var rotateX = $('input[name="rotateX_x"]');
    var rotateY = $('input[name="rotateY_y"]');
    var rotateZ = $('input[name="rotateZ_z"]');
    
    var skewX = $('input[name="skewX_x"]');
    var skewY = $('input[name="skewY_y"]');
    var skewZ = $('input[name="skewZ_z"]');
   
    var translateX = $('input[name="translateX_x"]');
     var translateY = $('input[name="translateY_y"]');
    var translateZ = $('input[name="translateZ_z"]');   
    
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx '+dataPrev.name);
    
   var x = 0;
   
       
   if((scaleX).val()!==''){        myCss[x] = 'scaleX('+scaleX.val()+')';         x++; }
   if((scaleY).val()!==''){        myCss[x] = 'scaleY('+scaleY.val()+')';         x++; }
   if((scaleZ).val()!==''){        myCss[x] = 'scaleZ('+scaleZ.val()+')';         x++; }
   if((rotateX).val()!==''){       myCss[x] = 'rotateX('+$(this).oneDigit(rotateX.val())+')';        x++;}
   if((rotateY).val()!==''){       myCss[x] = 'rotateY('+$(this).oneDigit(rotateY.val())+')';        x++;}
   if((rotateZ).val()!==''){       myCss[x] = 'rotateZ('+$(this).oneDigit(rotateZ.val())+')';        x++;}
   if((skewX).val()!==''){         myCss[x] = 'skewX('+$(this).oneDigit(skewX.val())+')';         x++;}
   if((skewY).val()!==''){         myCss[x] = 'skewY('+$(this).oneDigit(skewY.val())+')';         x++;}
 
   if((translateX).val()!==''){    myCss[x] = 'translateX('+$(this).oneDigit(translateX.val())+')';    x++;}
   if((translateY).val()!==''){    myCss[x] = 'translateY('+$(this).oneDigit(translateY.val())+')';    x++;}
   if((translateZ).val()!==''){    myCss[x] = 'translateZ('+$(this).oneDigit(translateZ.val())+')';    x++;}
  
  
       console.log('transformation du nom');
  
       thisReturn = myCss.join(' ');
      
       console.log(thisReturn);
    
    return thisReturn;
    
};


/***************************************************************************************/


$.fn.origin = function(){
    
        console.log('gestion origin');
    
var thisReturn; 
var myCss = [];
    
        console.log(dataPrev.name);
   
    var originX = $('input[name="perspective-origin_x"]');
    var originY = $('input[name="perspective-origin_y"]');
    
    var transformOriginX = $('input[name="transform-origin_x"]');
    var transformOriginY = $('input[name="transform-origin_y"]');
    
    
   var x = 0;
   if(dataPrev.name==='perspective-origin'){
   if((originX).val()!==''){        myCss[x] = originX.val();         x++; }
   if((originY).val()!==''){        myCss[x] = originY.val();         x++; }
  
   
   }
   
   if(dataPrev.name==='transform-origin'){
   if((transformOriginX).val()!==''){        myCss[x] = transformOriginX.val();         x++; }
   if((transformOriginY).val()!==''){        myCss[x] = transformOriginY.val();         x++; }
   
   }
   
   thisReturn = myCss.join(' ');
    console.log(thisReturn);
   return thisReturn;
    
    
};







$.fn.multiData = function(format){
    
    
       var compil = [];
       var thisVal =[];
       var zeSupp ='';
       i = 0;
       var zeGroup = $('[data-group="'+format+'"]'); 
           
       zeGroup.each(function() {
           
           
           
        
                         var zeChild = $(this).children('.multi-child-cell');
            
                        $(zeChild).children('[data-uijq="preview"]').each(function(){
                           if($(this).val()===''){
                               
                               var unity = '';
                               console.log(dataPrev);
                               if($(this).attr('data-unity')&&dataPrev.supp !== 'opacity'){
                               unity = $(this).attr('data-unity');
                               }
                            console.log(unity);
                            var text = '1'+unity;
                            console.log(text);
                             var TAG = $(this).tagName();
                            if(TAG==='INPUT'){
                            $(this).val(text);}
                            
                            }
                        });
          
                        x=0;
                        zeChild.each(function() {
                            
                        var tag = $(this).children().get(0).tagName;
                        var  zeInput = $(this).children();
                        var  zeName = $(this).children().attr('name');
                        
                     /*  console.log(zeName);*/
                        if(tag === 'INPUT' && zeInput.attr('id')!== ''+format+'_opacity_'+i+''){
                            
                                                       
                                if(zeInput.attr('type')!== 'color'){
                                    if(zeInput.attr('type')!== 'undefined'){

                                        if(zeName !== ''+format+'_opacity_'+i+''){                              
                                           thisVal[x] = $(this).oneDigit($('input[name="'+zeName+'"]').val()); 
                                        }
                                    }
                                }
                            
                            
                            
                            if(zeInput.attr('type')=== 'color'){
                               
                                var color = $('input[name="'+zeName+'"]').val();
                                var valO = $('input[name="'+format+'_opacity_'+i+'"]').val();
                                /*   console.log(color+'  '+valO);*/

                            var redHex = color.substring(1, 3);       
                            var greenHex = color.substring(3, 5);
                            var blueHex = color.substring(5, 7);                
                            var redDec = parseInt(redHex,  16);
                            var greenDec = parseInt(greenHex, 16);
                            var blueDec = parseInt(blueHex, 16);

                            thisVal[x] = 'rgba(' + redDec + ',' + greenDec + ',' + blueDec+','+valO+')';
                            /*  console.log(thisVal+'   '+x);*/
                            }
                            x++; 
                        }else if(tag === 'SELECT'){       
                            
                                thisVal[x] = $('select[name="'+zeName+'"]').val(); 
                             x++; 
                        }
                    
                       
                        });   
     
            compil[i] = thisVal.join(' ');
       
            console.log(compil);

            i++;
            thisVal = [];
       });       
       
       /**Gestion d'un mono background avec seulement un degrader de couleur recupere les select et ajoute
        * le tableau de compilation*/

 if(compil.length > 1){ return compil.join(' , ');}else{ return compil.join();}
 dataPrev.name = format;
 
};



$.fn.flex = function(){
    
    var thisReturn;
    
        var grow,shrink,basis;
        
        grow =   $('input[name="flex-grow"]').val();
        shrink = $('input[name="flex-shrink"]').val();
        basis =  $('input[name="flex-basis"]').val();
    
    
    thisReturn = grow+' '+shrink+' '+basis;
    
    
    dataPrev.name   = 'flex';
    dataPrev.format = 'select';
    return thisReturn;
    
    
    
};


$.fn.multiBack= function(){
       

    console.log('Calcul des multiBackground'); 
 
    /*   on recupère les nom de la list et l'incremente. Et on filtre avec ces données     */
    var zeList = $('#css3ui-tab-background').children('li:not(.hidden)');


    var readTab = [];
    var readGrad = [];

     i=0;
    zeList.each(function(){

        var splitText = $($(this).children('a')).text().split(' ');
        var splitInc = $($(this).children('a')).attr('href').split('_');
        var format = splitText[0];
        var zeInc = splitInc[1];

        readTab[i] = [];
        readTab[i].format = format;
        readTab[i].inc = zeInc;
    i++;    
    });

    var l = readTab.length;
        console.log('On traite '+l+ 'éléments');
    var tabCompil = [];
    var tabO = [];
     tabO.att = [];
     tabO.clip = [];
     tabO.origin =[];
     tabO.repeat= [];
     tabO.position=[];
     tabO.size = [];

     for(var i=0;i< l;i++){

      /*  console.log(readTab[i].format);
        console.log(readTab[i].inc);*/

        var format = readTab[i].format;
        var inc = readTab[i].inc;
        var zeGroup = '#multiBack_'+inc;
       /* console.log(zeGroup);*/

        switch(format){                             
            case 'gradient':


                var valRepeat = '';
                if( $(zeGroup+' select[name="gradient-repeat_'+i+'"]').val()!== ''){
                  valRepeat = $(zeGroup+' select[name="gradient-repeat_'+i+'"]').val()+'-';
                }

                var typeGradient = $(zeGroup+' select[name="gradient-type_'+i+'"]').val();

                var divAngle = $(zeGroup+' input[name="gradient-delta_'+i+'"]').parent();
                var divLimit = $(zeGroup+' select[name="gradient-limit_'+i+'"]').parent();
                var divPos = $(zeGroup+' .css3ui-gradient-position');

                var inAngle = $(zeGroup+' input[name="gradient-delta_'+i+'"]');
                var inLimit = $(zeGroup+' select[name="gradient-limit_'+i+'"]');
                var inPosX  = $(zeGroup+' input[name="gradPosition_x_'+i+'"]');
                var inPosY  = $(zeGroup+' input[name="gradPosition_y_'+i+'"]');

                  
                    switch(typeGradient){

                    case 'linear':

                     
                        divAngle.removeClass('hidden');
                        divLimit.addClass('hidden');
                        divPos.addClass('hidden');

                        /*On check les valeur vide*/

                        if(inAngle.val()===''){inAngle.val('90deg');}

                        var myVal = inAngle.val();
                        var angle = $(this).oneDigit(myVal);   
                        var kit = [valRepeat+'linear-gradient('+angle+', '];

                    //    console.log(kit);

                    break;

                    case 'circle':
                    case 'ellipse':                   
                        
                        divAngle.addClass('hidden');
                            console.log(divLimit);
                            console.log(divPos);
                        
                        divLimit.removeClass('hidden');
                       /* divPos.css('display','flex');*/
                       
                       $('.css3ui-gradient-position').removeClass('hidden');

                            if(inPosX.val()=== ''){inPosX.val('center');}
                            if(inPosY.val()=== ''){inPosY.val('center');}


                            var valPosX =  $(this).oneDigit(inPosX.val());
                            var valPosY =  $(this).oneDigit(inPosY.val());
                            
                            var valLimit = '';
                            
                            if(inLimit.val()!==''){
                             valLimit = ', '+inLimit.val();            
                            }

                            var kit = [$.cookie('kit')+valRepeat+'radial-gradient('+valPosX+' '+valPosY+','+typeGradient+valLimit+', '];  

                        //    console.log(kit); 

                    break;

                    }

                       /*On construit la valeur du dégrader*/

                       var thisGroup = $(zeGroup+' [data-group="gradient"]');

                       var tabRgba = [];
                       x=0;
                       thisGroup.each(function(){

                 /*          console.log($(this).attr('data-inc')+'  '+x);*/
                           var zeChild = $(this).children('.multi-child-cell');
                           
                           var tabData = [];
                           var y=0;
                           zeChild.each(function(){
                               
                              /* console.log($(this).children('input').attr('name'));*/
                               
                               tabData[y] = $(this).children('input').val();
                           y++;    
                           }); 
                           
                       /*    console.log(tabData);    */                     
                           
                                var redHex = tabData[1].substring(1, 3);
                                var greenHex = tabData[1].substring(3, 5);
                                var blueHex = tabData[1].substring(5, 7);

                                var redDec = parseInt(redHex, 16);
                                var greenDec = parseInt(greenHex, 16);
                                var blueDec = parseInt(blueHex, 16);

                                tabRgba[x] = 'rgba('+ redDec + ',' + greenDec + ',' + blueDec + ',' + tabData[2] +')'+tabData[0];
            
                          
                       x++;

                       });
                       var joinRgba = tabRgba.join(' ,');
                       console.log(tabRgba);
                       tabCompil[i]=(kit+joinRgba+')');
                       console.log('???????');
                       console.log(tabCompil[i]);
                      // console.log(tabCompil);
                   // console.log(i);
             break;

                case 'file':
                    
                        console.log('on traite les images multiBack_'+i);                    
                        var fileInput = document.querySelector('#subFile_'+i+''),
                        progress = document.querySelector('#progress_'+i+''); 
                
                      
                            console.log($('#subFile_'+i+'').val());
                            console.log($('#checkImg_'+i+'').val());
                
                 
                        if ($('#subFile_'+i+'').val()){
                        
                        console.log('control on prend la valeur dans le selecteur de ficher');
                        
                  
                            var pathName = $('#subFile_'+i+'').val();
                         
                            var splitName = pathName.split('\\');
                            console.log(splitName);
                            var thisName = splitName[2].toLowerCase();;
                            console.log(thisName);

                            var file =  fileInput.files;
                            console.log(file);

                               var xhr = new XMLHttpRequest();
                                xhr.open('POST', ''+O.dirPlug+'/script/plugin/JSON/upImage.php',true);
                                 
                                xhr.upload.addEventListener('progress', function(e) {
                                    progress.value = e.loaded;
                                    progress.max = e.total;                                
                                }, false);
                                
                                inc = i;
                                
                                xhr.addEventListener('load', function() {
                                    /** A la find de l'upload on redefinit la valeur caché de l'input
                                     *  checkImg_0
                                     *  on passe la miniature à l'UI
                                     *  B:\wamp\www\css3ui\js\css3ui\img\base\UI
                                     **/
                                    $('#prevImg_'+inc+'').css('background-image', 
                                     'url('+O.dirBackImg+'tmp/thumb_'+thisName+')');
                                    $('#checkImg_'+inc+'').val(thisName);
                                
                                }, false);                           
                           
                                form = new FormData();
                                //Surcharge de l'objet FormData
                                form.append('urlWork', O.dirWorkImg);
                                form.append('urlImg',  O.dirBackImg);
                                form.append('image_file', fileInput.files[0]);                               
                                xhr.send(form);
                                
                                tabCompil[i]='url('+O.dirBackImg+thisName+')';
                       
                        }else{
                              
                            if($('#checkImg_'+i+'').val()!==''){
                                
                                console.log('on prend la valeur dans le champ cacher');
                                
                                thisName = $('#checkImg_'+i+'').val(); 
                                tabCompil[i]='url('+O.dirBackImg+thisName+')';                              
                            }else{
                                tabCompil[i] = '';
                                console.log('la champ caché est vide');
                         
                            }                               
                        
                        }     
                        $('#subFile_'+i+'').val('');
                 
                break;

     }    
            console.log(tabCompil);
        console.log('nombre de degrader'+tabCompil.length);
           
         //On conitnue avec les options de background
      
          var inOptAtt       = $(zeGroup+' select[name="background-attachement_'+i+'"]');
          var inOptClip      = $(zeGroup+' select[name="background-clip_'+i+'"]');
          var inOptOrigin    = $(zeGroup+' select[name="background-origin_'+i+'"]');
          var inOptRepeat    = $(zeGroup+' select[name="background-repeat_'+i+'"]');
          
          var inOptPositionX = $(zeGroup+' input[name="background-position_x_'+i+'"]');
          var inOptPositionY = $(zeGroup+' input[name="background-position_y_'+i+'"]');
          var inOptSizeX     = $(zeGroup+' input[name="background-size_x_'+i+'"]');
          var inOptSizeY     = $(zeGroup+' input[name="background-size_y_'+i+'"]');         
           
          if(inOptAtt.val()!=='')   {tabO.att[i] = inOptAtt.val();}
          if(inOptClip.val()!=='')  {tabO.clip[i] = inOptClip.val();}
          if(inOptOrigin.val()!==''){tabO.origin[i] = inOptOrigin.val();}
          if(inOptRepeat.val()!==''){ tabO.repeat[i] = inOptRepeat.val();}
          
        
          if(i>0){
                console.log('CONTROL --SIZE AND CHILDREN');
              
              
             var incVerif = i-1;
             
                console.log(incVerif);
                
                var newGroup = '#multiBack_'+incVerif
             
             var verifOptPositionX = $(newGroup+' input[name="background-position_x_'+incVerif+'"]');
             var verifOptPositionY = $(newGroup+' input[name="background-position_y_'+incVerif+'"]');
             
             
                console.log(verifOptPositionX);
                console.log(inOptPositionX);
             
                console.log(inOptPositionX.val()+'   '+inOptPositionY.val());
                console.log(verifOptPositionX.val()+'   '+verifOptPositionY.val());
             
             
             if((inOptPositionX.val()===''&&inOptPositionY.val()==='')
              &&(verifOptPositionX.val()!==''&&verifOptPositionY.val()!=='')){
                 
                    console.log('CONTROL ->>>>>>>>>POSITION');
                 
                 inOptPositionX.val(verifOptPositionX.val());
                 inOptPositionY.val(verifOptPositionY.val());
                 
                 //Force l'envoie à la preview
                 
                    var oldName   = dataPrev.name;   
                    var oldFormat = dataPrev.format;   
                    
                    dataPrev.name = 'background-position';
                    dataPrev.format = 'imageXY';
                    $(this).preview(true);
                    
                    dataPrev.name = oldName;
                    dataPrev.format =  oldFormat;
                 
             } 
             
             //***********************************
             
             var verifOptSizeX = $(newGroup+' input[name="background-size_x_'+incVerif+'"]');
             var verifOptSizeY = $(newGroup+' input[name="background-size_y_'+incVerif+'"]');
             
             if((inOptSizeX.val()===''&&inOptSizeY.val()==='')
              &&(verifOptSizeX.val()!==''&&verifOptSizeY.val()!=='')){
                 
                    console.log('CONTROL ->>>>>>>>>SIZE');
                 
                 inOptSizeX.val(verifOptSizeX.val());
                 inOptSizeY.val(verifOptSizeY.val());
                 
                 //Force l'envoie à la preview
                 
                    var oldName   = dataPrev.name;   
                    var oldFormat = dataPrev.format;   
                    
                    dataPrev.name = 'background-size';
                    dataPrev.format = 'imageXY';
                    $(this).preview(true);
                    
                    dataPrev.name = oldName;
                    dataPrev.format =  oldFormat;
                 
             } 
          }
       
          
        /*  if(inOptPositionX.val()!==''){tabO.position[i] = inOptPositionX.val()+' '+inOptPositionY.val();} 
          if(inOptPositionY.val()!==''){tabO.position[i] = inOptPositionX.val()+' '+inOptPositionY.val();} 
                   
          if(inOptSizeX.val()!==''){ tabO.size[i] = inOptSizeX.val()+' '+inOptSizeY.val();}
          if(inOptSizeY.val()!==''){ tabO.size[i] = inOptSizeX.val()+' '+inOptSizeY.val();}
*/
    } 
    
        console.log(tabCompil);  
        var thisPreview = tabCompil.join(' , ');
        
     
        console.log('DONNEE COMPILER');
     
        console.log(thisPreview);
    
            
    //Preview         
    $(dataPrev.ruleHtml).not('.EX-UI').css('background-image',thisPreview); 
     
     
    var prevAtt,prevClip,prevOrigin,prevRepeat,prevSize,prevPos = '';
    
    if(tabO.att.length>0){ if(tabO.att.length>1){prevSize=tabO.att.join(',');
    }else if(tabO.att.length===1){  prevAtt=tabO.att;  } 
    //Preview et envoie à la bdd  
    $(dataPrev.ruleHtml).not('.EX-UI').css('background-attachment',prevAtt);        
    }
        
    
    if(tabO.clip.length>0){ if(tabO.clip.length>1){prevSize=tabO.clip.join(',');
    }else if(tabO.clip.length===1){  prevclip=tabO.clip;   }      
    $(dataPrev.ruleHtml).not('.EX-UI').css('background-clip',prevClip);
    }
  
    
    if(tabO.origin.length>0){ if(tabO.origin.length>1){prevSize=tabO.origin.join(',');
    }else if(tabO.origin.length===1){  prevOrigin=tabO.origin; }      
    $(dataPrev.ruleHtml).not('.EX-UI').css('background-origin',prevOrigin);    
    }
    
    
    
    if(tabO.repeat.length>0){ if(tabO.repeat.length>1){prevSize=tabO.repeat.join(',');
    }else if(tabO.repeat.length===1){  prevRepeat=tabO.repeat; }      
    $(dataPrev.ruleHtml).not('.EX-UI').css('background-repeat',prevRepeat); 
    }
   
    
    if(tabO.size.length>0){ if(tabO.size.length>1){prevSize=tabO.size.join(',');
    }else if(tabO.size.length===1){  prevSize=tabO.size;}      
    $(dataPrev.ruleHtml).not('.EX-UI').css('background-size',prevSize);
    }
    
     
    
    if(tabO.position.length>0){ if(tabO.position.length>1){prevSize=tabO.position.join(',');
    }else if(tabO.position.length===1){  prevPos=tabO.position;}      
    $(dataPrev.ruleHtml).not('.EX-UI').css('background-position',prevPos); 
    }
 
    return thisPreview;

};   





$.fn.transition = function(){
   
        console.log('calcul des transition');
   
   
    var work =[];
    var thisReturn ;
    var countInput = $(".transition").length;
       for (var i = 0; i<countInput; i++) {
           
           work[i] = '';
           if($("select[name=transition-property_"+i+"]").val()!==''){ work[i] += $("select[name=transition-property_"+i+"]").val()+' '; } 
            else{work[i] += 'all ';      $("select[name=transition-property_"+i+"]").val('all');}
            
           if($("input[name=duration_"+i+"]").val()!==''){
                    console.log(dataPrev.unity);
               work[i] += $(this).oneDigit($("input[name=duration_"+i+"]").val())+' '; }
            else{work[i] += '0s ';      $("input[name=duration_"+i+"]").val('0s');}
            
           if($("select[name=timing-function_"+i+"]").val()!==''){ work[i] += $("select[name=timing-function_"+i+"]").val()+' '; }
            else{work[i] += 'linear ';       $("select[name=timing-function_"+i+"]").val('linear');}
            
           if($("input[name=delay_"+i+"]").val()!==''){ 
               work[i] += $(this).oneDigit($("input[name=delay_"+i+"]").val())+''; }
            else{work[i] += '0s';       $("input[name=delay_"+i+"]").val('0s');}
       
               
       }
       thisReturn = work.join(",");       
       dataPrev.name = 'transition'; 
        console.log(thisReturn);
       return thisReturn;
    
};

$.fn.imageXY = function(){
    
        console.log(dataPrev.name);
        
        var thisReturn;
        
        
           /*   on recupère les nom de la list et l'incremente. Et on filtre avec ces données     */
    var zeList = $('#css3ui-tab-background').children('li:not(.hidden)');


    var readTab = [];
    var readGrad = [];

     i=0;
    zeList.each(function(){

        var splitText = $($(this).children('a')).text().split(' ');
        var splitInc = $($(this).children('a')).attr('href').split('_');
        var format = splitText[0];
        var zeInc = splitInc[1];

        readTab[i] = [];
        readTab[i].format = format;
        readTab[i].inc = zeInc;
    i++;    
    });

    var l = readTab.length;
        console.log('On traite '+l+' éléments');    
        
       var thisTab = [] 
    for(var i=0;i< l;i++){
                
       
        
        var X = dataPrev.name+'_x'+'_'+i;
        var Y = dataPrev.name+'_y'+'_'+i;
        
        var valX = $('[name="'+X+'"]').val();
        var valY = $('[name="'+Y+'"]').val();
        
        
            console.log(valX+'---------------'+valY);
     if(valX !== '' && valY !== ''){
     
        thisTab[i] = $(this).oneDigit(valX)+' '+$(this).oneDigit(valY);   
            console.log('?????????????????????');
            console.log(thisReturn);       
        }
    }      
            
    
    
        console.log(dataPrev);
    if(l>1){
        thisReturn = thisTab.join(',');  
    }else if(l===1){
        thisReturn = thisTab[0];
    }
    return thisReturn;
    
     
    
};

       
/***********************************/       
/****  FIN DU TRAITEMENT DES DONNEES    ****/
/***********************************/ 

});