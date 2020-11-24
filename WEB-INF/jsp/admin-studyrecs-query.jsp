<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <%@include file="../jspf/head.jspf" %>
        <script src="assets/js2/${action}.js" type="text/javascript"></script>   
        <script src="assets/js2/filter.js" type="text/javascript"></script>  
        <title>${title}</title>
        <style type="text/css">
            iframe{
                width: 640px;
                height: 725px;
                border: 0px;
                background-color: #ffffff;
            }
            #printer{
                text-align: center;
            }
            .help{
                padding: 10px;
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
                                        <div class="filter"><span>学员姓名:</span><input type="text" class="input-medium" name="filter.name"></div>
                                        <div class="filter"><span>身份证号:</span><input type="text" class="input-medium" name="filter.idCard"></div>
                                        <div class="filter"><span>联系电话:</span><input type="text" class="input-medium" name="filter.tel"></div>
                                        <div class="filter"><span>从业证号:</span><input type="text" class="input-medium" name="filter.ton"></div>
                                        <div class="filter"><span>激活码:</span><input type="text" class="input-medium" name="filter.code"></div>
                                    </form>
                                </div>  
                                <div id="result">

                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="box span12">
                                    <div class="box-header well">
                                        <img src="assets/images/s.gif" class="x-panel-inline-icon print"><span class="x-panel-header-text"> 打印预览</span>
                                    </div>
                                    <div class="box-content">      
                                        <div id="printer">
                                            <iframe id="printframe" src="" ></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <%@include file="../jspf/foot.jspf" %>
    </body>
</html>
