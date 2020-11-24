<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<s:set name="atype" value="login.loginTypeName" /> 
<!DOCTYPE html>
<html lang="en">
    <head>
        <%@include file="../jspf/head.jspf" %><s:if test="#atype == '系统管理员'">  
            <script src="assets/js2/${action}2.js" type="text/javascript"></script>  
        </s:if>
        <s:else>
            <script src="assets/js2/${action}.js" type="text/javascript"></script>  
        </s:else>
        <script src="assets/js2/filter.js" type="text/javascript"></script>  
        <title>${title}</title>
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
                                <img src="assets/images/s.gif" class="x-panel-inline-icon house_star"><span class="x-panel-header-text">${title}</span>
                            </div>
                            <div class="box-content">  
                                <div id="filter" class="row-fluid">
                                    <form>                          
                                        <div class="filter op">
                                            <a id="query" class="btn btn-small"><i class="icon-search"></i> 查询</a> 
                                            <input type="reset" class="btn btn-small" style="display:none;" value="重置">
                                            <a id="reset" class="btn btn-small"><i class="icon-reset"></i> 重置</a>
                                        </div>
                                        <div class="filter"><span>姓名:</span><input type="text" class="input-medium" name="filter.name"></div>
                                        <div class="filter"><span>身份证:</span><input type="text" class="input-medium" name="filter.idCard"></div>
                                        <div class="filter"><span>从业证号:</span><input type="text" class="input-medium" name="filter.ton"></div>
                                        <div class="filter"><span>班级名称:</span><input type="text" class="input-medium" name="filter.className"></div>
                                        <div class="filter"><span>所属驾校:</span><input type="text" class="input-medium" name="filter.agencyId"></div>
                                        <div class="filter"><span>培训类型:</span><input type="text" class="input-medium" name="filter.studyType"></div>
                                        <div class="filter"><span>教学类型:</span><input type="text" class="input-medium" name="filter.studyTypes"></div>
                                        <div class="filter"><span>是否结业:</span><input type="text" class="input-medium" name="filter.isCompleted"></div>
                                        <div class="filter"><span title="签到日期(起始)">签到起始:</span><input time="time" type="text" class="input-medium" name="filter.signupRecDayBegin"></div>
                                        <div class="filter"><span title="签到日期(结束)">签到结束:</span><input time="time" type="text" class="input-medium" name="filter.signupRecDayEnd"></div>
                                    </form>
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
