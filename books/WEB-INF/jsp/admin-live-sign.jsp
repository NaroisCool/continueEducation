<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <%@include file="../jspf/head.jspf" %>
        <script src="assets/js2/${action}.js" type="text/javascript"></script>  
        <script src="assets/js2/filter.js" type="text/javascript"></script>   
        <title>${title}</title>
        <script type="text/javascript">
            var sign, chg, val, t;
        </script>  
        <script language="javascript" for="Biokey" event="OnCapture(ActionResult,ATemplate)" type="text/javascript">
            if (val != void 0 && t != void 0 && Biokey.VerFinger(Biokey.DecodeTemplate1(sign), ATemplate, false, chg)) {
                var $msg = $('#result [name="toolBar"] [name="msg"]'), cd = val, tp = t;
                val = void 0;
                t = void 0;
                $.post('action-admin-studyrec-live', {code: cd, signType: tp}, function(ret) {
                    if (ret.resultCode === '0' || ret.resultCode === 0) {
                        $msg.text('签到成功').delay(2000).fadeOut();
                    } else {
                        $msg.text(retcode[ret.resultCode]).delay(2000).fadeOut();
                    }
                    var $table = $('#result table');
                    $.tableRefresh({table: $table});
                });
            } else {

            }
        </script>  
    </head>
    <body>
        <%@include file="../jspf/toolbar.jspf" %>
        <div class="container-fluid">
            <div class="row-fluid">                
                <%@include file="../jspf/leftMenu-admin.jspf" %>
                <div id="content" class="span10">  
                    <%@include file="../jspf/site.jspf" %>                      
                    <div class="row-fluid">
                        <div class="box span12">
                            <div class="box-header well">
                                <img src="assets/images/s.gif" class="x-panel-inline-icon users"><span class="x-panel-header-text">${title}</span>
                            </div>
                            <div class="box-content">  
                                <div id="filter" class="row-fluid">
                                    <form>                           
                                        <div class="filter op">
                                            <a id="query" class="btn btn-small"><i class="icon-search"></i> 查询</a> 
                                            <input type="reset" class="btn btn-small" style="display:none;" value="重置">
                                            <a id="reset" class="btn btn-small"><i class="icon-reset"></i> 重置</a>
                                        </div>
                                        <div class="filter"><span>身份证号:</span><input type="text" class="input-medium" name="filter.idCard"></div>
                                        <div class="filter"><span>学员姓名:</span><input type="text" class="input-medium" name="filter.name"></div>
                                        <div class="filter"><span>联系电话:</span><input type="text" class="input-medium" name="filter.tel"></div>
                                        <div class="filter"><span>从业证号:</span><input type="text" class="input-medium" name="filter.ton"></div>
                                        <div class="filter"><span>激活码:</span><input type="text" class="input-medium" name="filter.code"></div>
                                    </form>
                                </div>  
                                <div id="result"></div>
                                <object classid="clsid:CA69969C-2F27-41D3-954D-A48B941C3BA7" id="Biokey" width="0" height="0"></object>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <%@include file="../jspf/foot.jspf" %>
    </body>
</html>
