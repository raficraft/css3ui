$(document).ready(function() {
    
    
    $.fn.displayDomEl = function (el) {    
        
     if ($(el).css) {

       var elMargin = {}, elPadding = {}, elBorder = {}, elPos = {};

            var elW, elH;
            
            
            $(el).css('margin-top')     ? elMargin.top = parseFloat($(el).css('margin-top').substring(0, $(el).css('margin-top').length - 2))          : elMargin.top = 0;
            $(el).css('margin-right')   ? elMargin.right = parseFloat($(el).css('margin-right').substring(0, $(el).css('margin-right').length - 2))    : elMargin.right = 0;
            $(el).css('margin-bottom')  ? elMargin.bottom = parseFloat($(el).css('margin-bottom').substring(0, $(el).css('margin-bottom').length - 2)) : elMargin.top = 0;
            $(el).css('margin-left')    ? elMargin.left = parseFloat($(el).css('margin-left').substring(0, $(el).css('margin-left').length - 2))       : elMargin.top = 0;


            $(el).css('padding-top')    ?  elPadding.top = parseFloat($(el).css('padding-top').substring(0, $(el).css('padding-top').length - 2))          : elPadding.top = 0;
            $(el).css('padding-right')  ?  elPadding.right = parseFloat($(el).css('padding-right').substring(0, $(el).css('padding-right').length - 2))    : elPadding.right = 0;
            $(el).css('padding-bottom') ?  elPadding.bottom = parseFloat($(el).css('padding-bottom').substring(0, $(el).css('padding-bottom').length - 2)) : elPadding.bottom = 0;
            $(el).css('padding-left')   ?  elPadding.left = parseFloat($(el).css('padding-left').substring(0, $(el).css('padding-left').length - 2))       : elPadding.left = 0;

            /// Usage de la prop border-???-width car firefox ne trouve pas de border dedié type border-top quand la valeur est simplement attribué à border ex: border : 4px solid black

            $(el).css('border-top-width')     ?  elBorder.top = parseFloat($(el).css('borderTopWidth').substring(0, $(el).css('borderTopWidth').length - 2))          : elBorder.top = 0;
            $(el).css('border-right-width')   ?  elBorder.right = parseFloat($(el).css('border-right-width').substring(0, $(el).css('border-right-width').length - 2))    : elBorder.right = 0;
            $(el).css('border-bottom-width')  ?  elBorder.bottom = parseFloat($(el).css('border-bottom-width').substring(0, $(el).css('border-bottom-width').length - 2)) : elBorder.bottom = 0;
            $(el).css('border-left-width')    ?  elBorder.left = parseFloat($(el).css('border-left-width').substring(0, $(el).css('border-left-width').length - 2))       : elBorder.left = 0 ;
            
            
          

            $(el).position() ? elPos = $(el).position() : elPos = {top : 0 , left : 0};

            $(el).css('width') ? elW = parseFloat($(el).css('width').substring(0, $(el).css('width').length - 2))  : elW = 0;
            $(el).css('height') ? elH = parseFloat($(el).css('height').substring(0, $(el).css('height').length - 2)):elH =0;




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
     
              $(el).addClass('CMA-displayDom');

            ///Dysgap///
            //Affiche des marge dans son lot de span //


            function drawGap(data) {

                $.each(data, function (x, gap) {
                    var viewGap;
                    if (gap.W > 0 && gap.H > 0) {
                        viewGap = '<span class="displayDom" style="z-index=944540; background:' + gap.color + '; position:absolute;\
                               min-width:'+ gap.W + 'px; min-height:' + gap.H + 'px; left:' + gap.posX + 'px; top:' + gap.posY + 'px; content : " "; " ></span>';
                        $('body').append(viewGap);
                        viewGap = '';
                    }
                });

            };

            drawGap(padding);
            drawGap(border);
            drawGap(margin);
        }

    };

  $.fn.wrapImg = function (el, action) {



    tag = $(el)
    let valImg = {}

    valImg = {

        path: el,
        H: tag.css('height'),
        W: tag.css('width'),
        Zdown: tag.css('z-index') === 'auto' ? 0 : tag.css('z-index'),
        Zup: 10
    }

    console.log(valImg.Zdown);

    console.table(valImg)
    
    $(this).displayDomEl(tag);

    switch (action) {

        case 'wrap':
            tag.css({ 'z-index': valImg.Zdown, 'display': 'block', 'position': 'relative' })
            tag.wrap('<div class="wrapperDomImg" data-pathDom="' + el + '"></div>')
            console.log('On emglobe limage');

            break;
        case 'unWrap': break;

    }

  };
  
  
  $('.wrapperDomImg').trigger("mouvemove",function(){
      
        console.log('leave');
     
      
  })
  
  $(document).on('mouseleave', '.wrapperDomImg', function(){
    alert("Leaving demo");
    });
    
    
});

