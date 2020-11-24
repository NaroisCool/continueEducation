<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <%@include file="../jspf/head.jspf" %>
        <script src="assets/js2/${action}.js" type="text/javascript"></script>  
        <title>${title}</title>
        <style type="text/css">
            .setting{
                float: left;
                min-width: 155px;
            }
            .setting2{
                float: left;
                min-width: 250px;
            }
            .setting3{
                float: left;
                min-width: 250px;
            }
            .setting span,.setting2 span,.setting3 .sp{ 
                float:left;
                margin: 5px;
                width:80px; 
                text-align: right;
            }
            .setting input[name]{
                width: 60px;
            }
            .alert{
                border: none;
                background-color: #dfe8f6;
                line-height: 24px;
                letter-spacing: 2px;
            }
        </style>
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
                                <img src="assets/images/s.gif" class="x-panel-inline-icon codes"><span class="x-panel-header-text">${title}</span>
                            </div>
                            <div class="box-content">
                                <div class="alert">
                                    <h4 class="alert-heading">步骤</h4>
                                    1.点击[ 生成 ]会按照长度和个数生成<b>激活码</b><br>
                                    2.生成完毕后自动逐条<b>校验</b>是否唯一<br>
                                    3.校验完毕后，点击[ 保存 ]会提交到数据库
                                </div>
                                <div id="filter" class="row-fluid">
                                    <div class="setting"><span>激活码长度:</span><input type="text" class="input-medium" name="len" value="10" maxlength="2"></div>
                                    <div class="setting"><span>产生个数:</span><input type="text" class="input-medium" name="siz" value="100" maxlength="3"></div>
                                    <div class="setting2"><span>可用字符:</span><input type="text" class="input-medium" name="chrs" value="0123456789abcdef"></div>
                                    <div class="setting3">
                                        <a id="generate" class="btn">生成</a>
                                        <a id="addBatch" class="btn btn-info" disabled>保存</a>
                                        <span id="addSuccessMsg" class="label label-success" style="display: none;">保存成功</span>
                                        <span id="addFailMsg" class="label label-important" style="display: none;"></span>
                                    </div>
                                </div>
                                <div id="result"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <%@include file="../jspf/foot.jspf" %>
    </body>
</html>
