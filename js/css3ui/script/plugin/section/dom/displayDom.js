$(document).ready(function() {
    
    
    $.fn.displayDomEl = function (el) {    
         //console.error('On visualise le tag pointé avec la souris');
         //el = localStorage.getItem('domPath');
     $(el).each(function(key){ 
     if ($(this).css) {

            var elMargin = {}, elPadding = {}, elBorder = {}, elPos = {};

            var elW, elH;
            
            
            $(this).css('margin-top')     ? elMargin.top = parseFloat($(this).css('margin-top').substring(0, $(this).css('margin-top').length - 2))          : elMargin.top = 0;
            $(this).css('margin-right')   ? elMargin.right = parseFloat($(this).css('margin-right').substring(0, $(this).css('margin-right').length - 2))    : elMargin.right = 0;
            $(this).css('margin-bottom')  ? elMargin.bottom = parseFloat($(this).css('margin-bottom').substring(0, $(this).css('margin-bottom').length - 2)) : elMargin.top = 0;
            $(this).css('margin-left')    ? elMargin.left = parseFloat($(this).css('margin-left').substring(0, $(this).css('margin-left').length - 2))       : elMargin.top = 0;


            $(this).css('padding-top')    ?  elPadding.top = parseFloat($(this).css('padding-top').substring(0, $(this).css('padding-top').length - 2))          : elPadding.top = 0;
            $(this).css('padding-right')  ?  elPadding.right = parseFloat($(this).css('padding-right').substring(0, $(this).css('padding-right').length - 2))    : elPadding.right = 0;
            $(this).css('padding-bottom') ?  elPadding.bottom = parseFloat($(this).css('padding-bottom').substring(0, $(this).css('padding-bottom').length - 2)) : elPadding.bottom = 0;
            $(this).css('padding-left')   ?  elPadding.left = parseFloat($(this).css('padding-left').substring(0, $(this).css('padding-left').length - 2))       : elPadding.left = 0;

            /// Usage de la prop border-???-width car firefox ne trouve pas de border dedié type border-top quand la valeur est simplement attribué à border ex: border : 4px solid black

            $(this).css('border-top-width')     ?  elBorder.top = parseFloat($(this).css('borderTopWidth').substring(0, $(this).css('borderTopWidth').length - 2))          : elBorder.top = 0;
            $(this).css('border-right-width')   ?  elBorder.right = parseFloat($(this).css('border-right-width').substring(0, $(this).css('border-right-width').length - 2))    : elBorder.right = 0;
            $(this).css('border-bottom-width')  ?  elBorder.bottom = parseFloat($(this).css('border-bottom-width').substring(0, $(this).css('border-bottom-width').length - 2)) : elBorder.bottom = 0;
            $(this).css('border-left-width')    ?  elBorder.left = parseFloat($(this).css('border-left-width').substring(0, $(this).css('border-left-width').length - 2))       : elBorder.left = 0 ;
            
            
          

            $(this).position() ? elPos = $(this).position() : elPos = {top : 0 , left : 0};

            $(this).css('width') ? elW = parseFloat($(this).css('width').substring(0, $(this).css('width').length - 2))  : elW = 0;
            $(this).css('height') ? elH = parseFloat($(this).css('height').substring(0, $(this).css('height').length - 2)):elH =0;




            var padding = {
                type : 'padding' ,
                top: {
                    W: elPadding.left + elW + elPadding.right,
                    H: elPadding.top,
                    posY: elPos.top + elMargin.top + elBorder.top,
                    posX: elPos.left + elMargin.left + elBorder.left,
                    color: ' rgba(120,255,0,0.4)'

                },
                bottom: {
                    W: elPadding.left + elW + elPadding.right,
                    H: elPadding.bottom,
                    posY: elPos.top + elMargin.top + elBorder.top + elPadding.top + elH,
                    posX: elPos.left + elMargin.left + elBorder.left,
                    color: ' rgba(120,255,0,0.4)'
                },
                left: {
                    W: elPadding.left,
                    H: elH,
                    posY: elPos.top + elMargin.top + elBorder.top + elPadding.top,
                    posX: elPos.left + elMargin.left + elBorder.left,
                    color: ' rgba(120,255,0,0.4)'
                },
                right: {
                    W: elPadding.right,
                    H: elH,
                    posY: elPos.top + elMargin.top + elBorder.top + elPadding.top,
                    posX: elPos.left + elMargin.left + elBorder.left + elPadding.left + elW,
                    color: ' rgba(120,255,0,0.4)'
                }


            };
            var border = {
                
                type : 'border',
                top: {
                    W: elBorder.left + elPadding.left + elW + elPadding.right + elBorder.right,
                    H: elBorder.top,
                    posY: elPos.top + elMargin.top,
                    posX: elPos.left + elMargin.left,
                    color: ' rgba(255,255,80,0.4)'

                },
                bottom: {
                    W: elBorder.left + elPadding.left + elW + elPadding.right + elBorder.right,
                    H: elBorder.bottom,
                    posY: elPos.top + elMargin.top + elBorder.top + elPadding.top + elH + elPadding.bottom,
                    posX: elPos.left + elMargin.left,
                    color: ' rgba(255,255,80,0.4)'
                },
                left: {
                    W: elBorder.left,
                    H: elH + elPadding.top + elPadding.bottom,
                    posY: elPos.top + elMargin.top + elBorder.top,
                    posX: elPos.left + elMargin.left,
                    color: ' rgba(255,225,80,0.4)'
                },
                right: {
                    W: elBorder.right,
                    H: elH + elPadding.top + elPadding.bottom,
                    posY: elPos.top + elMargin.top + elBorder.top,
                    posX: elPos.left + elMargin.left + elBorder.left + elPadding.left + elW + elPadding.right,
                    color: ' rgba(255,255,80,0.4)'
                }


            };
            var margin = {
                type : 'margin',
                top: {
                    W: elMargin.left + elBorder.left + elPadding.left + elW + elPadding.right + elBorder.right + elMargin.right,
                    H: elMargin.top,
                    posY: elPos.top,
                    posX: elPos.left,
                    color: ' rgba(255,0,0,0.4)'

                },
                bottom: {
                    W: elMargin.left + elBorder.left + elPadding.left + elW + elPadding.right + elBorder.right + elMargin.right,
                    H: elMargin.bottom,
                    posY: elPos.top + elMargin.top + elBorder.top + elPadding.top + elH + elPadding.bottom + elBorder.bottom,
                    posX: elPos.left,
                    color: ' rgba(255,0,0,0.4)'
                },
                left: {
                    W: elMargin.left,
                    H: elH + elPadding.top + elPadding.bottom + elBorder.bottom + elBorder.top,
                    posY: elPos.top + elMargin.top,
                    posX: elPos.left,
                    color: ' rgba(255,0,0,0.4)'
                },
                right: {
                    W: elMargin.right,
                    H: elH + elPadding.top + elPadding.bottom + elBorder.bottom + elBorder.top,
                    posY: elPos.top + elMargin.top,
                    posX: elPos.left + elMargin.left + elBorder.left + elPadding.left + elW + elPadding.right + elBorder.right,
                    color: ' rgba(255,0,0,0.4)'
                }
            };
            
        
            let element = {
                type : 'element',
                W : elW,
                H : elH,
                posY : elPos.top + elMargin.top + elPadding.top + elBorder.top,
                posX : elPos.left + elMargin.left + elPadding.left + elBorder.left,
                color : ' rgba(60,180,255,0.4)'
            };    
            
            
            let container = {
                type : 'container',
                W : elMargin.left + elPadding.left + elMargin.left + elW + elMargin.right + elPadding.right + elMargin.right ,
                H : elMargin.top + elPadding.top + elMargin.top + elH + elMargin.bottom + elPadding.bottom + elMargin.bottom ,
                posY : elPos.top,
                posX : elPos.left
            }

            ///Dysgap///
            //Affiche des marge dans son lot de span //

               //      $(el).addClass('CMA-displayDom');
               
              
            function drawGap(data) {
                
              
                
                if(data.type === 'container'){
                    
                   let  viewGap = '<span class="displayDom displayContainer_'+key+' EX-UI" style="background:rgba(0.0.0.0.4) position:absolute; min-width:'+ data.W + 'px; min-height:' + data.H + 'px; left:' + data.posX + 'px; top:' + data.posY + 'px; content : " "; " ></span>';
                        $('body').append(viewGap);
                        viewGap = '';                      
                }
                else if(data.type === 'element'){
                    
                   let  viewGap = '<span class="displayDom displayEl EX-UI" style=" background:' + data.color + '; position:absolute; min-width:'+ data.W + 'px; min-height:' + data.H + 'px; left:' + data.posX + 'px; top:' + data.posY + 'px; content : " "; " ></span>';
                        $('.displayContainer_'+key+'').append(viewGap);
                        viewGap = '';
                    
                    
                }else{                
                $.each(data, function (x, gap) {
                    var viewGap;
                    if (gap.W > 0 && gap.H > 0) {
                        viewGap = '<span class="displayDom EX-UI" style=" background:' + gap.color + '; position:absolute; min-width:'+ gap.W + 'px; min-height:' + gap.H + 'px; left:' + gap.posX + 'px; top:' + gap.posY + 'px; content : " "; " ></span>';
                        $('.displayContainer_'+key+'').append(viewGap);
                        viewGap = '';
                    }
                });
            }

            };
            drawGap(container);
           drawGap(element);
            drawGap(margin);
            drawGap(border);
            drawGap(padding);
          
        }
        });
    };
    
    
  

  
    
    
    
});

