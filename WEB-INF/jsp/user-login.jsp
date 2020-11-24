<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link href="assets/css/ext.css" rel="stylesheet">
        <script src="assets/plugin/jquery/jquery.js" type="text/javascript"></script>  
        <script src="assets/js2/admin-login.js" type="text/javascript"></script>  
        <script src="assets/js2/const.js" type="text/javascript"></script> 
        <script type="text/javascript" src="assets/js/ext-base.js"></script>
        <script type="text/javascript" src="assets/js/ext-all.js"></script>
        <script type="text/javascript" src="assets/js/ext-lang-zh_CN.js"></script>
        <script type="text/javascript" src="assets/js/loginexamples.js"></script>
        <script type="text/javascript" src="assets/js/extlogin.js"></script>
        <title>道路运输从业人员继续教育培训网</title>
        <script>
            // 浏览器检测
            var userAgent = navigator.userAgent.toLowerCase();
            var check = function(regex) {
                return regex.test(userAgent);
            },
                    isStrict = document.compatMode === "CSS1Compat",
                    version = function(is, regex) {
                var m;
                return (is && (m = regex.exec(userAgent))) ? parseFloat(m[1]) : 0;
            },
                    docMode = document.documentMode,
                    isOpera = check(/opera/),
                    isIE = !isOpera && check(/msie/),
                    isIE7 = isIE && ((check(/msie 7/) && docMode != 8 && docMode != 9 && docMode != 10) || docMode == 7),
                    isIE8 = isIE && ((check(/msie 8/) && docMode != 7 && docMode != 9 && docMode != 10) || docMode == 8),
                    isIE9 = isIE && ((check(/msie 9/) && docMode != 7 && docMode != 8 && docMode != 10) || docMode == 9),
                    isIE10 = isIE && ((check(/msie 10/) && docMode != 7 && docMode != 8 && docMode != 9) || docMode == 10),
                    isIE6 = isIE && check(/msie 6/),
                    ieVersion = version(isIE, /msie (\d+\.\d+)/);

            // 如果是IE6
            if (isIE && ieVersion <= 7) {
                window.location.href = "ie.html";
            }

        </script>
        <script type="text/javascript">
            Ext.EventManager.onWindowResize(function() {
                var w = Ext.query('.x-window');
                Ext.each(w, function(item) {
                    Ext.getCmp(item.id).center();
                });
            });
        </script>
        <style type="text/css" media="all">
            .x-toolbar-right-row .x-btn-tl,.x-toolbar-right-row .x-btn-tr,.x-toolbar-right-row .x-btn-tc,.x-toolbar-right-row .x-btn-ml,.x-toolbar-right-row .x-btn-mr,.x-toolbar-right-row .x-btn-mc,.x-toolbar-right-row .x-btn-bl,.x-toolbar-right-row .x-btn-br,.x-toolbar-right-row .x-btn-bc{background:none;}
            body { background: #cfe7ff url(assets/images/bg.jpg) repeat-x 0 0;overflow:hidden; }
            .x-form-item LABEL.x-form-item-label { Z-INDEX: 2; position: relative; padding: 3px 5px 3px 0; width: 300px; height: 28px; display: block; float: left; clear: left; font-size: 14px;font-weight: bold; color: #5a5e61; }
            #ext-comp-1002 .x-window-tc,#ext-comp-1002 .x-window-tl,#ext-comp-1002 .x-window-tr,#ext-comp-1002 .x-window-bc,#ext-comp-1002 .x-window-bl,#ext-comp-1002 .x-window-br,#ext-comp-1002 .x-window-mr,#ext-comp-1002 .x-window-ml,#ext-comp-1002 .x-window-mc,#ext-comp-1002 .x-tool, #ext-comp-1002 .x-panel-mr{background:none; border:0;padding:0;}
            .x-panel-tl,.x-panel-tc,.x-panel-tr,.x-panel-bc,.x-panel-bl,.x-panel-br,.x-panel-ml,.x-panel-mc,.x-panel-mr{background:none;border:0}
            #loginForm { width: 235px; float: right; margin: 244px 170px 0 0; }
            .x-ie-shadow,.x-shadow .xsml,.x-shadow .xsmc,.xsbc{background:none;}
            .x-window-tl .x-window-header { padding:0 0 4px 0;}
            .x-date-mp-ybtn a,.x-tool{height:0; display:none;}
            .ext-ie .x-form-text{margin:0 0;}

        </style>	
    </head>
    <body>
        <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">

            <tbody><tr>
                    <td>
                        &nbsp;
                    </td>
                    <td width="260" height="155" align="center">
                        <div id="login" align="center"></div>
                    </td>
                    <td>
                        &nbsp;
                    </td>
                </tr>

            </tbody></table>


</html>
