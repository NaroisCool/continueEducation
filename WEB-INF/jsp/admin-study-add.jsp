<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <%@include file="../jspf/head.jspf" %>
        <script src="assets/js2/${action}.js" type="text/javascript"></script>  
        <script src="assets/js/ajaxfileupload.js" type="text/javascript"></script>
        <link rel="stylesheet" href="assets/flexpaper/css/flexpaper.css">      
        <script src="assets/flexpaper/js/flexpaper.js"></script>
        <script src="assets/flexpaper/js/flexpaper_handlers.js"></script>
        <title>${title}</title>
        <style type="text/css">
            #preview{
                height: 700px;
            }
            #uploadHelp img{
                margin-top: 4px;
                margin-bottom: 20px;
            }
            #result{
                margin-top: 20px;
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
                                <img src="assets/images/s.gif" class="x-panel-inline-icon preview"><span class="x-panel-header-text">${title}</span>
                            </div>
                            <div class="box-content">  
                                <div class="help">
                                    <a href="javascript:void(0);" id="uploadHelper" >查看帮助</a>                                
                                    <a href="download/SaveAsPDFandXPS.exe" >下载Office 2007转PDF插件</a>                        
                                    <a href="download/pdf-converter.exe" >PDF转换工具</a>
                                    <div id="uploadHelp" style="display: none;">
                                        复制视频地址【优酷】（注意地址一般为embed开头）：<br>
                                        <img src="assets/images/video.png"><br>
                                        复制视频地址【酷六】（注意地址一般为embed开头）：<br>
                                        <img src="assets/images/video2.png"><br>
                                        Word另存为PDF：<br>
                                        <img src="assets/images/step1.png"><br>
                                        PPT另存为PDF：<br>
                                        <img src="assets/images/step2.png"><br>
                                        PDF转换工具使用：<br>
                                        <img src="assets/images/PdfToSwf.png"><br>
                                    </div>
                                </div>
                                <input type="file" id="file" name="file" class="hidden"/>
                                <div id="result"></div>
                            </div>
                        </div>
                    </div>

                    <div class="row-fluid">
                        <div class="box span12">
                            <div class="box-header well">
                                <img src="assets/images/s.gif" class="x-panel-inline-icon preview"><span class="x-panel-header-text"> 培训资料预览(文档：上传后自动显示；视频：保存后自动显示)</span>
                            </div>
                            <div class="box-content">
                                <div id="preview"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div id="uploadIE" class="modal fade"> 
            <div class="modal-header"> 
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h3>上传文件</h3>
            </div>
            <div class="modal-body">
                <div class="control-group"><label class="control-label">选择文件：</label><div class="controls"><input type="file" id="fileIE" name="file"></div></div>
            </div>
            <div class="modal-footer">
                <span id="uploadIEFailMsg" class="label label-important" style="display: none;"></span>
                <span id="uploadIEMsg" class="label label-success" style="display: none;"></span>
                <a id="uploadIEOk" class="btn btn-primary"><i class="icon-submit"></i> 保存</a>
            </div>
        </div>
    </div>
    <%@include file="../jspf/foot.jspf" %>
</body>
</html>
