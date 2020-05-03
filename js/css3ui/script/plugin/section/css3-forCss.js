$(document).ready(function () {

    function rgb2hex(rgb) {
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
    };


    $.fn.dataRule = function (thisData) {


        console.log('on recupére les data de la rule ' + thisData.groupname);
        console.log(thisData);

        //vidange de tous les champs de saisie

        $(this).vidangeUI();


        tabRule = [];
        if (maGlob.style) {
            var lgtStyle = maGlob.style.length;
            for (var i = 0; i < lgtStyle; i++) {


                var thisStyle = maGlob.style[i];



                if (thisStyle.sheet === $.cookie('sheet')) {

                    if (thisStyle.group) {

                        $(this).checkRuleInGlob(thisStyle.group, thisData);



                        console.log(tabRule);

                        if (tabRule) {


                            $.each(tabRule, function (key, ruleCss) {


                                var myRule = ruleCss.rule;
                                var myFormat = ruleCss.types;
                                var myVal = ruleCss.css;

                                console.log(myFormat);


                                if (myFormat === "digit" || myFormat === "alpha") {


                                    $('input[name="' + myRule + '"]').val(myVal);

                                } else if (myFormat === "fourDigit") {

                                    $('input[name="' + myRule + '"]').val(myVal);

                                } else if (myFormat === "select") {



                                    if (myRule === 'font-family') {

                                        var tabFont = myVal.split(' , ');
                                        console.log(tabFont);
                                        var fontLength = tabFont.length;
                                        console.log(fontLength);
                                        if (fontLength > 1) {

                                            var limit = tabFont.length - 1;
                                            $.each(tabFont, function (k, v) {
                                                console.log(v);
                                                if (k < limit) {
                                                    $('[data-group="font-family"][data-inc="' + k + '"] [href="add-rule"]').trigger('click');
                                                }
                                                $('select[name="' + myRule + '_' + k + '"]').val(v);

                                            });


                                        } else if (fontLength === 1) {
                                            $('select[name="' + myRule + '_0"]').val(myVal);
                                        }

                                    } if (myRule === 'flex') {

                                        if (myVal === '1' || myVal === '0 1 auto' || myVal === '1 1 auto' || myVal === '0 0 auto') {
                                            $('select[name="' + myRule + '"]').val(myVal);
                                        }

                                        var thisVal = myVal.split(' ');
                                        $('input[name="flex-grow"]').val(thisVal[0]);
                                        $('input[name="flex-shrink"]').val(thisVal[1]);
                                        $('input[name="flex-basis"]').val(thisVal[2]);


                                    } else {
                                        $('select[name="' + myRule + '"]').val(myVal);
                                    }

                                } else if (myFormat === "border") {

                                    var myCss = myVal;
                                    var splitCss = myCss.split(' ');

                                    var width = splitCss[0]; var style = splitCss[1]; var hex = rgb2hex(splitCss[2]);
                                    var opacity = splitCss[2].split(',');
                                    var Opacity = opacity[3].slice(0, -1);

                                    $('input[name="' + myRule + '"]').val(width); $('select[name="' + myRule + '_select"]').val(style); $('input[name="' + myRule + '_color"]').val(hex); $('input[name="' + myRule + '_opacity"]').val(Opacity);


                                } else if (myFormat === "customRadius") {
                                    var myCss = myVal;
                                    var splitCss = myCss.split(' '); var axisX = splitCss[0];
                                    var axisY = splitCss[1];
                                    $('input[name="' + myRule + '_y"]').val(axisY); $('input[name="' + myRule + '_x"]').val(axisX);


                                } else if (myFormat === "color") {

                                    var opacity = myVal.split(',');
                                    var Opacity = opacity[3].slice(0, -1);
                                    var myCss = rgb2hex(myVal);
                                    $('input[name="' + myRule + '"]').val(myCss);
                                    $('input[name="' + myRule + '_opacity"]').val(Opacity);


                                } else if (myFormat === 'box-shadow') {



                                    var zeBloc = $('#css3ui-boxShadow');
                                    var zeClick = zeBloc.find('.add-data');
                                    console.log(myVal);
                                    var m = myVal.split(' , ');
                                    var lgtM = m.length - 1;

                                    for (var b = 0; b < lgtM; b++) {
                                        zeClick.trigger('click', false);
                                        $(this).incrementGroup('box-shadow');
                                    }

                                    var lgtM = m.length;
                                    for (var b = 0; b < lgtM; b++) {

                                        var my = m[b].split(' ');
                                        console.log(my);
                                        var hex = rgb2hex(my[4]);

                                        var shadowX = my[0];
                                        var shadowY = my[1];
                                        var shadowBlur = my[2];
                                        var shadowSpread = my[3];
                                        var opacity = my[4].split(',');

                                        if (my[5] === 'inset') {
                                            $('select[name="box-shadow_select_' + b + '"]').val('inset');
                                        }

                                        $("input[name=box-shadow_color_" + b + "]").val(hex);
                                        $("input[name=box-shadow_opacity_" + b + "]").val(opacity[3].slice(0, -1));
                                        $("input[name=box-shadow_x_" + b + "]").val(shadowX);
                                        $("input[name=box-shadow_y_" + b + "]").val(shadowY);
                                        $("input[name=box-shadow_blur_" + b + "]").val(shadowBlur);
                                        $("input[name=box-shadow_spread_" + b + "]").val(shadowSpread);
                                    }

                                } else if (myFormat === 'text-shadow') {


                                    var zeBloc = $('#css3ui-textShadow');
                                    var zeClick = zeBloc.find('.add-data');
                                    var m = myVal.split(' , ');
                                    var lgtM = m.length - 1;

                                    for (var b = 0; b < lgtM; b++) {
                                        zeClick.trigger('click', false);
                                        $(this).incrementGroup('text-shadow');
                                    }


                                    var lgtM = m.length;
                                    for (var b = 0; b < lgtM; b++) {

                                        var my = m[b].split(' ');
                                        var hex = rgb2hex(my[3]);
                                        var textX = my[0];

                                        var textY = my[1];
                                        var textBlur = my[2];
                                        var opacity = my[3].split(',');
                                        var Opacity = opacity[3].slice(0, -1);

                                        $("input[name=text-shadow_x_" + b + "]").val(textX);
                                        $("input[name=text-shadow_y_" + b + "]").val(textY);

                                        $("input[name=text-shadow_color_" + b + "]").val(hex);
                                        $("input[name=text-shadow_opacity_" + b + "]").val(Opacity);

                                        $("input[name=text-shadow_blur_" + b + "]").val(textBlur);
                                    }



                                } else if (myFormat === 'transition') {

                                    var mix = [];
                                    mix = myVal.split(',');
                                    var myHtml = $('#transition_0').clone(true);
                                    $('.transition').remove();

                                    var lgtM = mix.length;


                                    for (var b = 0; b < lgtM; b++) {
                                        d = parseInt(b) - 1;
                                        if (b !== 0) {
                                            myHtml = $('#transition_0').clone(true);



                                            $('#transition_' + d + '').after(myHtml);
                                            $(this).incTransition('transition');
                                        } else if (b === 0) {

                                            $('#css3ui-transition legend').after(myHtml);

                                        }
                                        var tabData = [];
                                        tabData = mix[b].split(' ');

                                        $('select[name="transition-property_' + b + '"]').val(tabData[0]);
                                        $("input[name=duration_" + b + "]").val(tabData[1]);
                                        $("select[name=timing-function_" + b + "]").val(tabData[2]);
                                        $("input[name=delay_" + b + "]").val(tabData[3]);
                                        $('select[name="box-shadow_select_0"]').val('no');
                                    }
                                } else if (myFormat === 'filter') {

                                    var splitData = '';
                                    splitData = myVal.split(' ');

                                    var splitThis = [];
                                    $.each(splitData, function (k, v) {


                                        splitThis = splitData[k].split('(');

                                        var myCible = splitThis[0];
                                        var value = splitThis[1];
                                        var thisVal = value.substring(0, value.length - 1);
                                        $('input[name="' + myCible + '"]').val(thisVal);

                                    });


                                } else if (myFormat === 'transform') {


                                    var splitTrans = [];
                                    splitTrans = myVal.split(' ');
                                    var lgtSplit = splitTrans.length;
                                    for (var incX = 0; incX < lgtSplit; incX++) {


                                        var splitThis = [];
                                        splitThis = splitTrans[incX].split('(');
                                        console.log(splitThis);
                                        var myCible = splitThis[0];

                                        var low = (splitThis[0].substring(splitThis[0].length - 1).toLowerCase());
                                        var value = splitThis[1];
                                        var thisVal = value.substring(0, value.length - 1);
                                        $('input[name="' + myCible + '_' + low + '"]').val(thisVal);
                                    }
                                } else if (myFormat === 'origin') {


                                    console.log(myVal);
                                    console.log(myRule);

                                    var thisSplit = myVal.split(' ');

                                    $('input[name="' + myRule + '_x"]').val(thisSplit[0]);
                                    $('input[name="' + myRule + '_y"]').val(thisSplit[1]);

                                } else if (myFormat === "fileImg") {

                                    console.log('------------------MULTIBACK-----------------------');


                                    var tabBackground = myVal.split(' , ');
                                    console.log(tabBackground);




                                    $.each(tabBackground, function (key, data) {
                                        console.log(key + '--------------' + data);

                                        if (data.match(/gradient/)) {

                                            console.log('+++++++++++++++++gradient+++++++++++++++++++');
                                            console.log('+++++++++++++++++gradient+++++++++++++++++++');
                                            console.log('on entre dans la boucle ' + data);

                                            $('[href="gradient"]').trigger('click', false);

                                            var typeANDgradient = data.split(', ');
                                            var type = typeANDgradient[0];
                                            if (type.match(/linear/)) {

                                                if (type.match(/repeating/)) {
                                                    $('SELECT[name="gradient-repeat_' + key + '"]').val('repeating');
                                                }

                                                var typeANDangle = type.split('(');
                                                type = typeANDangle[0];
                                                var angle = typeANDangle[1];

                                                console.log(typeANDgradient);

                                                console.log('DEGRADER LINEAR');
                                                $('SELECT[name="gradient-type_' + key + '"]').val('linear');
                                                $('INPUT[name="gradient-delta_' + key + '"]').val(angle);

                                            }


                                            if (type.match(/circle/)) {

                                                if (type.match(/repeating/)) {
                                                    $('SELECT[name="gradient-repeat_' + key + '"]').val('repeating');
                                                }

                                                console.log('DEGRADER CIRCLE');
                                                $('SELECT[name="gradient-type_' + key + '"]').val('circle');
                                                $('SELECT[name="gradient-type_' + key + '"]').parent().next('.bloc-input').addClass('hidden');
                                                $('SELECT[name="gradient-limit_' + key + '"]').parent().removeClass('hidden');

                                                var tabOption = type.split('(');

                                                var backOption = tabOption[1];
                                                var tabOpt = backOption.split(',');


                                                var tabPosition = tabOpt[0];
                                                var tabXY = tabPosition.split(' ');
                                                var positionX = tabXY[0];
                                                var positionY = tabXY[1];

                                                $('.css3ui-gradient-position').removeClass('hidden');

                                                $('INPUT[name="gradPosition_x_' + key + '"]').val(positionX);
                                                $('INPUT[name="gradPosition_y_' + key + '"]').val(positionY);



                                                var tabLimit = tabOpt[1].split(' ');
                                                var limitGradient = tabLimit[1];
                                                $('SELECT[name="gradient-limit_' + key + '"]').val(limitGradient);
                                            }
                                            if (type.match(/ellipse/)) {
                                                console.log('ellipse');
                                                console.log(type);
                                                if (type.match(/repeating/)) {
                                                    $('SELECT[name="gradient-repeat_' + key + '"]').val('repeating');
                                                }

                                                console.log('DEGRADER ellipse');
                                                $('SELECT[name="gradient-type_' + key + '"]').val('ellipse').parent().next('.bloc-input').addClass('hidden');

                                                $('.css3ui-gradient-position').removeClass('hidden');

                                                $('SELECT[name="gradient-limit_' + key + '"]').parent().removeClass('hidden');


                                                var tabOption = type.split('(');

                                                var backOption = tabOption[1];
                                                var tabOpt = backOption.split(',');

                                                var tabPosition = tabOpt[0];
                                                var tabXY = tabPosition.split(' ');
                                                var positionX = tabXY[0];
                                                var positionY = tabXY[1];


                                                $('INPUT[name="gradPosition_x_' + key + '"]').val(positionX);
                                                $('INPUT[name="gradPosition_y_' + key + '"]').val(positionY);


                                                var tabLimit = tabOpt[1].split(' ');
                                                var limitGradient = tabLimit[1];

                                                $('SELECT[name="gradient-limit_' + key + '"]').val(limitGradient);


                                                console.log(limitGradient);
                                            }

                                            //Affiche des dégrader 

                                            var allGradient = typeANDgradient[1];
                                            console.log(allGradient);
                                            var tabGradient = allGradient.split(' ,');

                                            var lgtGrad = tabGradient.length - 1;

                                            $.each(tabGradient, function (k, gradient) {
                                                if (k === 0 || k === lgtGrad) {
                                                    console.log('on click pas');
                                                } else {
                                                    console.log('On click : clef -' + k);
                                                    $('#multiBack_' + key + ' [data-inc="0"] A[href="add-rule"]').trigger('click', false);
                                                }

                                            });

                                            $.each(tabGradient, function (k, gradient) {

                                                console.log('gradient N°:' + k + ' - ' + gradient + ' - clef : ' + k);

                                                var gradientANDpos = gradient.split(')');
                                                var rgba = gradientANDpos[0] + ')';
                                                var position = gradientANDpos[1];



                                                var hex = rgb2hex(rgba);
                                                var tabAlpha = gradientANDpos[0].split(',');
                                                var alpha = $(this).findLastElArray(tabAlpha);




                                                console.log('clef - ' + k + '---' + hex + '---------------' + position);

                                                $('#multiBack_' + key + ' #gradient-position_' + k).val(position);
                                                $('#multiBack_' + key + ' #gradient_color_' + k).val(hex);
                                                $('#multiBack_' + key + ' #gradient_opacity_' + k).val(alpha);
                                            });


                                        } else if (data.match(/url/)) {

                                            $('[href="file"]').trigger('click');
                                            console.log(data);

                                            var tabUrl = data.split('/');
                                            var thisRes = $(this).findLastElArray(tabUrl);
                                            var thisImg = thisRes.substring(0, thisRes.length - 1);
                                            console.log(thisImg);
                                            //On affiche la miniature
                                            //B:\wamp\www\css3ui\js\css3ui\img\base\UI
                                            $('#prevImg_' + key + '').css('background-image',
                                                'url(' + O.dirBackImg + '/tmp/thumb_' + thisImg + ')');
                                            $('#checkImg_' + key + '').val(thisImg);
                                            //On ecrit dans le champs caché

                                        }

                                    });




                                } else if (myFormat === "imageXY") {


                                    var tabVal = myVal.split(',');


                                    $.each(tabVal, function (k, valXY) {

                                        var thisVal = valXY.split(' ');

                                        var valX = thisVal[0];
                                        var valY = thisVal[1];



                                        var elX = $('[name="' + myRule + '_x' + '_' + k + '"]');
                                        var elY = $('[name="' + myRule + '_y' + '_' + k + '"]');

                                        elX.val(valX);
                                        elY.val(valY);

                                    });



                                }
                                //////////////////////////////
                            });
                        }

                    }
                }
            }
        }

    };

    $.fn.checkRuleInGlob = function (thisGroup, thisData) {


        console.log('checkRuleInglob');



        console.log(thisGroup);
        console.log(thisData);

        console.log('A la recherche de données dans la globale');

        ///Parcour complétement la feuille de style pour trouver la rule correspondante demander
        /// Voir si une méthode direct n'existe pas pour trouver l'info


        var ruleHtml = $.cookie('ruleHtml');


        $.each(thisGroup, function (key, thisEl) {

            console.log(thisEl.format);

            if (thisEl.format === 'ruleHtml') {

                console.log('on teste le nom de la rule');
                if (thisEl.groupName === ruleHtml && parseInt(thisEl.idToGroup) === thisData.idlinkgroup) {
                    console.log($.cookie());
                    console.log(thisEl);
                    console.log('bingo');
                    tabRule = thisEl.rule;

                }

            } else {

                if (thisEl.child === true) {
                    $(this).checkRuleInGlob(thisEl.group, thisData);
                }

            }



        });



    };



    /**************  TMP CSS  *******************/

    $.fn.tmpMakeRule = function (zeGroup) {

        makeThis = '';
        $.each(zeGroup.rule, function (z, zeRule) {

            var ruleIMP = '';
            if (zeRule.important === '1') {
                ruleIMP = ' !important';
            }

            //////////////////////////////////

            var actifRuleStart = ''; var actifRuleEnd = '';
            if (zeRule.actif === '0') {
                actifRuleStart = '/*'; actifRuleEnd = '*/';
            }

            //Filtrage des values renvoyant un resultat diffÃ©rent de celle transmise

            if (zeRule.rule === 'content') {
                console.log(zeRule.rule);
                if (zeRule.css === 'blank') {

                    zeRule.css = '\" \"';
                }
            }



            if (zeRule.kit === '1' && O.prefixCss === true) {


                if (zeRule.types === 'fileImg') {
                    makeThis += '\n' + actifRuleStart + zeRule.rule + ' : -webkit-' + zeRule.css + ruleIMP + ';' + actifRuleEnd;
                    makeThis += '\n' + actifRuleStart + zeRule.rule + ' : -moz-' + zeRule.css + ruleIMP + ';' + actifRuleEnd;
                    makeThis += '\n' + actifRuleStart + zeRule.rule + ' : -o-' + zeRule.css + ruleIMP + ';' + actifRuleEnd;
                    makeThis += '\n' + actifRuleStart + zeRule.rule + ' : -ms-' + zeRule.css + ruleIMP + ';' + actifRuleEnd;
                    makeThis += '\n' + actifRuleStart + zeRule.rule + ' : ' + zeRule.css + ruleIMP + ';' + actifRuleEnd;

                } else {
                    makeThis += '\n' + actifRuleStart + '-webkit-' + zeRule.rule + ' : ' + zeRule.css + ruleIMP + ';' + actifRuleEnd;
                    makeThis += '\n' + actifRuleStart + '-moz-' + zeRule.rule + ' : ' + zeRule.css + ruleIMP + ';' + actifRuleEnd;
                    makeThis += '\n' + actifRuleStart + '-o-' + zeRule.rule + ' : ' + zeRule.css + ruleIMP + ';' + actifRuleEnd;
                    makeThis += '\n' + actifRuleStart + '-ms-' + zeRule.rule + ' : ' + zeRule.css + ruleIMP + ';' + actifRuleEnd;
                    makeThis += '\n' + actifRuleStart + zeRule.rule + ' : ' + zeRule.css + ruleIMP + ';' + actifRuleEnd;


                }
            } else {
                makeThis += '\n' + actifRuleStart + zeRule.rule + ' : ' + zeRule.css + ruleIMP + ';' + actifRuleEnd;
            }
            // on gère les excptions                  


        });
        return makeThis;

    };

    $.fn.tmpReadGroup = function (thisGroup) {

        $.each(thisGroup, function (x, zeGroup) {

            var format = zeGroup.format;
            ////////////////////////////////////////////
            if (format === 'comment') {

                makeThisCss += '\n/*' + zeGroup.groupName + '*/\n';
                if (zeGroup.group) { $(this).tmpReadGroup(zeGroup.group); }

            } else if (format === 'media') {

                makeThisCss += '\n' + zeGroup.groupName + '{';
                if (zeGroup.group) { $(this).tmpReadGroup(zeGroup.group); }
                makeThisCss += '\n}';

            } else if (format === 'keyframes') {

                makeThisCss += '\n' + zeGroup.groupName + '{';
                makeThisCss += '\n}';

            } else if (format === 'ruleHtml') {

                var actifGroupStart = ''; var actifGroupEnd = '';
                if (zeGroup.actif === '0') {
                    actifGroupStart = '/*'; actifGroupEnd = '*/';
                }

                makeThisCss += '\n' + actifGroupStart + $(this).splitRuleHtml(zeGroup.groupName) + '{';
                if (zeGroup.rule) {
                    makeThisCss += $(this).tmpMakeRule(zeGroup);
                }
                makeThisCss += actifGroupStart + '\n}' + actifGroupEnd;
            }

        });



        return makeThisCss;
    };

    $.fn.tmpCss = function (R, mode) {

        switch (mode) {
            case 'tmpCss':

                $('' + O.buffer + ',' + O.buffer + ' *,html,body').removeAttr('style');

                myCss = '';
                myCss += '\n/* Projet : ' + $.cookie('project') + ' */\n';

                if (R.style) {


                    $.each(R.style, function (k, style) {
                        makeThisCss = '';
                        myCss += '\n/*Feuille de style : ' + style.sheet + '*/';

                        if (style.group) {
                            myCss += $(this).tmpReadGroup(style.group);
                        }

                    });

                    ////*******************************************************

                    if ($('link[title="css3uisheet"]').length == false ||
                        R.project !== $.cookie('project')) {
                        console.log('pas de css charger dans le corps du document');
                        var oldName = 'none';
                    } else {
                        console.log('css existant');
                        var oldName = $('link[title="css3uisheet"]').attr('name');
                        console.log(oldName);
                    }
                    //Verife si une feuille de style existe déjà

                    rand = 100000000;
                    var myRandom = Math.round(Math.random() * rand);
                    var tmpSheet = 'tmp-' + myRandom;
                    var thisData = [];
                    thisData = { action: 'tmpCss', tmpSheet: tmpSheet, myCss: myCss, oldName: oldName };
                    $(this).ajaxTmpCss(thisData);

                }


                break;
        }




    };

    /************* final Css ************/

    $.fn.finalMakeRule = function (zeGroup) {

        finalThis = '';
        $.each(zeGroup.rule, function (z, zeRule) {

            var ruleIMP = '';
            if (zeRule.important === '1') {
                ruleIMP = ' !important';
            }

            //////////////////////////////////

            var actifRuleStart = ''; var actifRuleEnd = '';
            if (zeRule.actif === '0') {
                actifRuleStart = '/*'; actifRuleEnd = '*/';
            }
            
            //Filtrage des values renvoyant un resultat diffÃ©rent de celle transmise

            if (zeRule.rule === 'content') {
                console.log(zeRule.rule);
                if (zeRule.css === 'blank') {

                    zeRule.css = '\" \"';
                }
            }
            
            



            if (zeRule.kit === '1' && O.prefixCss === true) {


                if (zeRule.types === 'fileImg') {

                    console.log('rule a filtrer');
                    console.log(zeRule.css);
                    var ex = O.dirProject + $.cookie('project');
                    zeRule.css = zeRule.css.replace(ex, '');


                    var replaceAll = function (machaine, chaineARemaplacer, chaineDeRemplacement) {
                        return machaine.replace(new RegExp(chaineARemaplacer, 'g'), chaineDeRemplacement);
                    };


                    replaceAll(zeRule.css, ex, '');

                    console.log(O.dirProject + $.cookie('project'));
                    console.log(zeRule.css);


                    finalThis += '\n' + actifRuleStart + zeRule.rule + ' : ' + zeRule.css + ruleIMP + ';' + actifRuleEnd;

                } else {

                    finalThis += '\n' + actifRuleStart + zeRule.rule + ' : ' + zeRule.css + ruleIMP + ';' + actifRuleEnd;


                }
            } else {
                finalThis += '\n' + actifRuleStart + zeRule.rule + ' : ' + zeRule.css + ruleIMP + ';' + actifRuleEnd;
            }
            // on gère les excptions                  


        });
        return finalThis;

    };

    $.fn.finalReadGroup = function (thisGroup) {

        $.each(thisGroup, function (x, zeGroup) {

            var format = zeGroup.format;
            ////////////////////////////////////////////
            if (format === 'comment') {

                finalThisCss += '\n/*' + zeGroup.groupName + '*/\n';
                if (zeGroup.group) { $(this).finalReadGroup(zeGroup.group); }

            } else if (format === 'media') {

                finalThisCss += '\n' + zeGroup.groupName + '{';
                if (zeGroup.group) { $(this).finalReadGroup(zeGroup.group); }
                finalThisCss += '\n}';

            } else if (format === 'keyframes') {

                finalThisCss += '\n' + zeGroup.groupName + '{';
                finalThisCss += '\n}';

            } else if (format === 'ruleHtml') {

                var actifGroupStart = ''; var actifGroupEnd = '';
                if (zeGroup.actif === '0') {
                    actifGroupStart = '/*'; actifGroupEnd = '*/';
                }

                finalThisCss += '\n' + actifGroupStart + zeGroup.groupName + '{';
                if (zeGroup.rule) {
                    finalThisCss += $(this).finalMakeRule(zeGroup);
                }
                finalThisCss += actifGroupStart + '\n}' + actifGroupEnd;
            }

        });



        return finalThisCss;
    };

    $.fn.finalCss = function (R, mode) {

        switch (mode) {
            case 'finalCss':

                $('' + O.buffer + ',' + O.buffer + ' *,html,body').removeAttr('style');

                myCss = '';
                myCss += '\n/* Projet : ' + $.cookie('project') + ' */\n';

                if (R.style) {


                    $.each(R.style, function (k, style) {
                        finalThisCss = '';
                        myCss += '\n/*Feuille de style : ' + style.sheet + '*/';

                        if (style.group) {
                            myCss += $(this).finalReadGroup(style.group);
                        }

                    });

                    ////*******************************************************

                    var thisData = [];
                    thisData = { action: 'finalCss', myCss: myCss };
                    $(this).ajaxFinalCss(thisData);

                }


                break;
        }




    };





});

