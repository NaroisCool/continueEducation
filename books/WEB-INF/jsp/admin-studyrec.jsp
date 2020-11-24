<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <%@include file="../jspf/head.jspf" %>
        <script src="assets/js2/${action}.js" type="text/javascript"></script>  
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
                                        <div class="filter"><span>姓名:</span><input type="text" class="input-medium" name="filter.userName"></div>
                                        <div class="filter"><span>从业资格证:</span><input type="text" class="input-medium" name="filter.userTon"></div>
                                        <div class="filter"><span>身份证:</span><input type="text" class="input-medium" name="filter.userIdCard"></div>
                                        <div class="filter"><span>激活码:</span><input type="text" class="input-medium" name="filter.code"></div>
                                        <div class="filter"><span>所属驾校:</span><input type="text" class="input-medium" name="filter.agencyId"></div>
                                        <div class="filter"><span>培训课程:</span><input type="text" class="input-medium" name="filter.studyId"></div>
                                        <div class="filter"><span>培训课程(模糊):</span><input title="模糊匹配" type="text" class="input-medium" name="filter.studyName"></div>
                                        <div class="filter moreq"><span>培训使用IP:</span><input type="text" class="input-medium" name="filter.ip"></div>
                                        <div class="filter moreq"><span>开始培训时间(起始):</span><input time="time" type="text" class="input-medium" name="filter.studyBeginTimeBegin"></div>
                                        <div class="filter moreq"><span>开始培训时间(结束):</span><input time="time" type="text" class="input-medium" name="filter.studyBeginTimeEnd"></div>
                                        <div class="filter moreq"><span>开始结束时间(起始):</span><input time="time" type="text" class="input-medium" name="filter.studyEndTimeBegin"></div>
                                        <div class="filter moreq"><span>开始结束时间(起始):</span><input time="time" type="text" class="input-medium" name="filter.studyEndTimeEnd"></div>
                                        <div class="filter moreq"><span>培训时长(起始,分):</span><input title="分钟，整数" type="text" class="input-medium" name="filter.studyUseTimeBegin"></div>
                                        <div class="filter moreq"><span>培训时长(结束,分):</span><input title="分钟，整数" type="text" class="input-medium" name="filter.studyUseTimeEnd"></div>
                                        <div class="filter"><span>操作:</span>
                                            <a id="query" class="btn btn-info">查询</a> 
                                            <input type="reset" class="btn" value="重置">
                                            <a id="more" class="btn">更多</a>
                                        </div> </form>
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
