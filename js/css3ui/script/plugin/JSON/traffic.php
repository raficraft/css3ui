<?php 


$user = 'root';
$pass = '';

$pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
$CFdesign = new PDO('mysql:host=localhost;dbname=web2016', $user, $pass, $pdo_options);

/****

features:
 * 
 * support des responsive design
 * support des formule de type calc( 100% - 26px);
    
    ****//*
    animation : none;
    animation-delay : 0;
    animation-direction : normal;
    animation-duration : 0;
    animation-fill-mode : none;

    animation-name : none;
    animation-play-state : running;
    animation-timing-function : ease;
  
 
  
    border-image : none; 
    border-spacing : 0; 
    caption-side : top;----  element de tableau  
    clip : auto;  ---------- permet de cropper une image dans son container  
    column-fill : balance;

    counter-increment : none;
    counter-reset : none;
    direction : ltr;  
    empty-cells : show;
    font-variant : normal;  
    hyphens : none;  
    list-style-image : none;
    list-style-position : outside; 
    opacity : 1;
    orphans : 0;
    outline : 0;
    outline-color : invert;
    outline-style : none;
    outline-width : medium;   
  
    page-break-after : auto;
    page-break-before : auto;
    page-break-inside : auto; 
    quotes : '\201C' '\201D' '\2018' '\2019';
    resize : ?????
    tab-size : 8;
    table-layout : auto; 
    text-align-last : auto; 
    text-decoration-color : inherit;
    text-decoration-line : none;
    text-decoration-style : solid;
 
    transform-style : flat;
    
    unicode-bidi : normal;  
    visibility : visible;
 
    widows : 0;   
    word-spacing : normal;   
   
 *  */
$R =[
    0=>['format'=>'digit','kit'=>false,'rule'=>'height','default'=>'auto',],
    1=>['format'=>'digit','kit'=>false,'rule'=>'min-height','default'=>'0'],
    2=>['format'=>'digit','kit'=>false,'rule'=>'max-height','default'=>'none'],
    3=>['format'=>'digit','kit'=>false,'rule'=>'width','default'=>'auto'],
    4=>['format'=>'digit','kit'=>false,'rule'=>'min-width','default'=>'0'],
    5=>['format'=>'digit','kit'=>false,'rule'=>'max-width','default'=>'none'],
    
    6=>['format'=>'fourDigit','kit'=>false,'rule'=>'margin','default'=>'0'],
    7=>['format'=>'digit','kit'=>false,'rule'=>'margin-top','default'=>'0'],
    8=>['format'=>'digit','kit'=>false,'rule'=>'margin-bottom','default'=>'0'],
    9=>['format'=>'digit','kit'=>false,'rule'=>'margin-left','default'=>'0'],
    10=>['format'=>'digit','kit'=>false,'rule'=>'margin-right','default'=>'0'],
    
    11=>['format'=>'digit','kit'=>false,'rule'=>'padding-top','default'=>'0'],
    12=>['format'=>'digit','kit'=>false,'rule'=>'padding-bottom','default'=>'0'],
    13=>['format'=>'digit','kit'=>false,'rule'=>'padding-left','default'=>'0'],
    14=>['format'=>'digit','kit'=>false,'rule'=>'padding-right','default'=>'0'],
    
    15=>['format'=>'digit','kit'=>false,'rule'=>'font-size','default'=>'medium'],
    16=>['format'=>'digit','kit'=>false,'rule'=>'text-indent','default'=>'0'],
    17=>['format'=>'digit','kit'=>false,'rule'=>'letter-spacing','default'=>'normal'],
    18=>['format'=>'digit','kit'=>false,'rule'=>'line-height','default'=>'normal'],
    
    19=>['format'=>'digit','kit'=>true,'rule'=>'border-radius','default'=>'0'],
    
    20=>['format'=>'digit','kit'=>false,'rule'=>'top','default'=>'auto'],
    21=>['format'=>'digit','kit'=>false,'rule'=>'bottom','default'=>'auto'],
    22=>['format'=>'digit','kit'=>false,'rule'=>'left','default'=>'auto'],
    23=>['format'=>'digit','kit'=>false,'rule'=>'right','default'=>'auto'],
    
    24=>['format'=>'digit','kit'=>false,'rule'=>'transition','default'=>'none'],
    
    25=>['format'=>'select','kit'=>false,'rule'=>'float','default'=>'none'],
    26=>['format'=>'select','kit'=>false,'rule'=>'clear','default'=>'none'],
    27=>['format'=>'select','kit'=>false,'rule'=>'overflow','default'=>'visible'],
    28=>['format'=>'select','kit'=>false,'rule'=>'display','default'=>'inline'],
    29=>['format'=>'select','kit'=>false,'rule'=>'position','default'=>'static'],
    30=>['format'=>'select','kit'=>true,'rule'=>'box-sizing','default'=>'content-box'],
    31=>['format'=>'select','kit'=>false,'rule'=>'font-family','default'=>'normal'],
    32=>['format'=>'select','kit'=>false,'rule'=>'text-align','default'=>'inherit'],
    33=>['format'=>'select','kit'=>false,'rule'=>'vertical-align','default'=>'baseline'],
    34=>['format'=>'select','kit'=>false,'rule'=>'text-transform','default'=>'none'],
    35=>['format'=>'select','kit'=>false,'rule'=>'list-style-type','default'=>'disc'],    
    
   
    
    
    36=>['format'=>'fourDigit','kit'=>false,'rule'=>'padding','default'=>'0'],
    37=>['format'=>'fourDigit','kit'=>false,'rule'=>'border-radius','default'=>'0'],  
  
    
    38=>['format'=>'color','kit'=>false,'rule'=>'background','default'=>'0'],
    39=>['format'=>'color','kit'=>false,'rule'=>'color','default'=>'inherit'],
    
    40=>['format'=>'border','kit'=>false,'rule'=>'border','default'=>'0'],
    41=>['format'=>'border','kit'=>false,'rule'=>'border-top','default'=>'0'],
    42=>['format'=>'border','kit'=>false,'rule'=>'border-left','default'=>'0'],
    43=>['format'=>'border','kit'=>false,'rule'=>'border-bottom','default'=>'0'],
    44=>['format'=>'border','kit'=>false,'rule'=>'border-right','default'=>'0'],
    
    45=>['format'=>'text-shadow','kit'=>true,'rule'=>'text-shadow','default'=>'none'],
    46=>['format'=>'box-shadow','kit'=>true,'rule'=>'box-shadow','default'=>'none'],
    47=>['format'=>'gradient','kit'=>true,'rule'=>'gradient','default'=>'none'],
    48=>['format'=>'customRadius','kit'=>true,'rule'=>'border-top-left-radius','default'=>'0'],
    49=>['format'=>'customRadius','kit'=>true,'rule'=>'border-top-right-radius','default'=>'0'],
    50=>['format'=>'customRadius','kit'=>true,'rule'=>'border-bottom-left-radius','default'=>'0'],
    51=>['format'=>'customRadius','kit'=>true,'rule'=>'border-bottom-right-radius','default'=>'0'],
    
    
    52=>['format'=>'alpha','kit'=>true,'rule'=>'column-count','default'=>'auto'],
    53=>['format'=>'digit','kit'=>true,'rule'=>'column-gap','default'=>'normal'],
    54=>['format'=>'select','kit'=>false,'rule'=>'text-decoration','default'=>'solid'],
    55=>['format'=>'border','kit'=>true,'rule'=>'column-rule','default'=>'none'],
    56=>['format'=>'select','kit'=>false,'rule'=>'list-style-type','default'=>'disc'],
   
    57=>['format'=>'select','kit'=>false,'rule'=>'background-repeat','default'=>'auto auto'],
   
    
    
    
    58=>['format'=>'select','kit'=>true,'rule'=>'flex-direction','default'=>'row'],
    59=>['format'=>'select','kit'=>true,'rule'=>'flex-wrap','default'=>'no wrap'],
    60=>['format'=>'select','kit'=>true,'rule'=>'justify-content','default'=>'flex-start'],
    61=>['format'=>'select','kit'=>true,'rule'=>'align-items','default'=>'stretch'],
    62=>['format'=>'select','kit'=>true,'rule'=>'align-content','default'=>'stretch'],
    63=>['format'=>'alpha','kit'=>true,'rule'=>'order','default'=>'0'],
    64=>['format'=>'alpha','kit'=>true,'rule'=>'flex-grow','default'=>'0'],
    65=>['format'=>'alpha','kit'=>true,'rule'=>'flex-shrink','default'=>'1'],
    66=>['format'=>'alpha','kit'=>true,'rule'=>'flex-basis','default'=>'auto'],
    67=>['format'=>'alpha','kit'=>true,'rule'=>'align-self','default'=>'auto'],
    68=>['format'=>'alpha','kit'=>false,'rule'=>'zoom','default'=>'1'],
    69=>['format'=>'alpha','kit'=>false,'rule'=>'z-index','default'=>'auto'],
    70=>['format'=>'select','kit'=>false,'rule'=>'font-weight','default'=>'normal'],
    71=>['format'=>'select','kit'=>false,'rule'=>'font-style','default'=>'normal'],
    
    72=>['format'=>'fileImg','kit'=>true,'rule'=>'background-image','default'=>'none'],
    73=>['format'=>'select','kit'=>false,'rule'=>'background-attachment','default'=>'scroll'],
    74=>['format'=>'select','kit'=>false,'rule'=>'background-clip','default'=>'border-box'],
    75=>['format'=>'select','kit'=>false,'rule'=>'background-origin','default'=>'padding-box'],
    
    
    76=>['format'=>'transform','kit'=>false,'rule'=>'transform','default'=>'none'],
    77=>['format'=>'digit','kit'=>false,'rule'=>'perspective','default'=>'none'],
    
    78=>['format'=>'origin','kit'=>false,'rule'=>'transform-origin','default'=>'50% 50%'],
    79=>['format'=>'digit','kit'=>false,'rule'=>'del-this-to-new-V','default'=>'none'],
    80=>['format'=>'origin','kit'=>false,'rule'=>'perspective-origin','default'=>'50% 50%'],
    
    81=>['format'=>'select','kit'=>false,'rule'=>'cursor','default'=>'auto'],
    
    82=>['format'=>'regularPolygon','kit'=>true,'rule'=>'clip-path','default'=>'normal'],
    83=>['format'=>'select','kit'=>false,'rule'=>'content','default'=>'normal'],
    84=>['format'=>'alpha','kit'=>false,'rule'=>'animation-iteration-count','default'=>'1'],
    85=>['format'=>'regularShape','kit'=>false,'rule'=>'shape-outside','default'=>'1'],   
    
  
    86=>['format'=>'select','kit'=>false,'rule'=>'oveflow-x','default'=>'none'],
    87=>['format'=>'select','kit'=>false,'rule'=>'oveflow-y','default'=>'none'],
    88=>['format'=>'digit','kit'=>false,'rule'=>'position-x','default'=>'none'],
    89=>['format'=>'digit','kit'=>false,'rule'=>'position-y','default'=>'none'],
    90=>['format'=>'select','kit'=>false,'rule'=>'shape-box','default'=>'none'],
    91=>['format'=>'select','kit'=>false,'rule'=>'overflow-x','default'=>'none'],
    92=>['format'=>'select','kit'=>false,'rule'=>'overflow-y','default'=>'none'],
    93=>['format'=>'uni','kit'=>false,'rule'=>'content-uni','default'=>'normal'],
    94=>['format'=>'filter','kit'=>true,'rule'=>'filter','default'=>'none'],
    95=>['format'=>'select','kit'=>true,'rule'=>'transform-style','default'=>'flat'],
    96=>['format'=>'select','kit'=>false,'rule'=>'word-wrap','default'=>'normal'],    
    97=>['format'=>'select','kit'=>false,'rule'=>'white-space','default'=>'normal'],    
    98=>['format'=>'digit','kit'=>false,'rule'=>'word-spacing','default'=>'normal'],    
    99=>['format'=>'select','kit'=>false,'rule'=>'backface-visibility','default'=>'visible'],    
    100=>['format'=>'alpha','kit'=>false,'rule'=>'opacity','default'=>'1'],    
    101=>['format'=>'select','kit'=>true,'rule'=>'flex','default'=>'0 1 auto'],    
    102=>['format'=>'select','kit'=>false,'rule'=>'word-break','default'=>'normal'],  
    103=>['format'=>'select','kit'=>false,'rule'=>'border-collapse','default'=>'separate'],  
    104=>['format'=>'select','kit'=>false,'rule'=>'caption-side','default'=>'bottom'],
    105=>['format'=>'imageXY','kit'=>false,'rule'=>'background-size','default'=>'auto'],
    106=>['format'=>'imageXY','kit'=>false,'rule'=>'background-position','default'=>'0% 0%'],
    
    
    107=>['format'=>'color','kit'=>false,'rule'=>'background-color','default'=>'0'],
  
    
 
    /**************************************/
    
    ];

   
    
  

   $find = $CFdesign->query("TRUNCATE TABLE `rule`");
    

 
    foreach ($R as $k => $otherArray) {
      
        $f = $otherArray['format'];
        
        $kit = $otherArray['kit'];
        if($kit==false){$kit=0;}
        $rule = $otherArray['rule'];
        $def = $otherArray['default'];
        echo $rule;
        
        echo $f;
         
          $find = $CFdesign->query("SELECT idType FROM type  WHERE  types = '".$f."' ");
         
                                    $req = ($find) or die('Erreur SQL <br> Vérifier votre table');
                           
                                    $readCoord = $find->fetch(PDO::FETCH_OBJ); 
                                    $fx = $readCoord->idType;
                              var_dump($readCoord);
          $edit = $CFdesign->query("INSERT INTO rule (rule,kit,def,id_to_format) VALUES ('$rule','$kit','$def','$fx')");
          
         
          
        
    
          
        
         
}