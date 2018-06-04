
/*
* 根据当前日期，获取制定日期
* 2018.4
* lgk
* 上一天，下一天:@getNext @getPrev
* 上一周，下一周:@getWeek
* 上一月，下一月:@getMonthDate
* 上一年，下一年:@getYearDate
**/


var getDate = function(){
	
	function getPrev(dateArr){
		var prevMonthDate = '';
		var nowYear = new Date().getFullYear();
		if(dateArr&&dateArr.length==2){
			prevMonthDate = new Date(dateArr[0]);
		}else{
			prevMonthDate = new Date();
		}
		prevMonthDate.setDate(1);
		prevMonthDate.setMonth(prevMonthDate.getMonth()-1);
		
		//return prevYear
		var prevYear = new Date(dateArr[0]).getFullYear()-1;
		var prevYearArr = [formatDate(new Date(prevYear,0,1)),formatDate(new Date(prevYear,11, getMonthDays(prevYear,11)))];
		
		//return prevMonth
		var prevMonth = prevMonthDate.getMonth()+1;
		var strMonth = prevMonth+'';
		var curYear = new Date(dateArr[0]).getFullYear();
		if(strMonth.length==1){
			strMonth = '0'+strMonth;
		}
		if(prevMonth==12){
			curYear = curYear -1;
		}
		var monthEndDate = curYear+'-'+strMonth+'-'+getMonthDays(curYear,prevMonth);
		var lastMonthStartDate = curYear+'-'+strMonth+'-'+'01';
		var prevMonthArr = [lastMonthStartDate,monthEndDate];
		
		//return prevWeek
		var prevWeek = [formatDate(new Date(dateArr[0]).getTime()- 7 * 86400000),formatDate(new Date(dateArr[0]).getTime()- 1 * 86400000)];
		return [prevYearArr,prevMonthArr,prevWeek]
	}
	
	function getNext(dateArr){
		var nextMonthDate = new Date();
		var nowYear = new Date().getFullYear();
		if(dateArr&&dateArr.length==2){
			nextMonthDate = new Date(dateArr[0]);
		}else{
			nextMonthDate = new Date();
		}
		nextMonthDate.setDate(1);
		nextMonthDate.setMonth(nextMonthDate.getMonth()+1);
		
		//return nextYear
		var nextYear = new Date(dateArr[0]).getFullYear()+1;
		var nextYearArr = [formatDate(new Date(nextYear,0,1)),formatDate(new Date(nextYear,11, getMonthDays(nextYear,11)))];
		
		//return nextMonth
		var nextMonth = nextMonthDate.getMonth()+1;
		var curYear = new Date(dateArr[0]).getFullYear();
		var strMonth = nextMonth+'';
		if(strMonth.length==1){
			strMonth = '0'+strMonth;
		}
		if(nextMonth==1){
			curYear = curYear +1;
		}
		var monthEndDate = curYear+'-'+strMonth+'-'+getMonthDays(curYear,nextMonth);
		var lastMonthStartDate = curYear+'-'+strMonth+'-'+'01';
		var nextMonthArr = [lastMonthStartDate,monthEndDate];
		
		//return nextWeek
		var nextWeek = [formatDate(new Date(dateArr[1]).getTime()+ 1 * 86400000),formatDate(new Date(dateArr[1]).getTime()+ 7 * 86400000)];
		return [nextYearArr,nextMonthArr,nextWeek]
	}
	
	function getCurDate(){
		var now = new Date(); //当前日期
		return[formatDate(now),formatDate(now)]
	}
	
	function getWeek(){
		var now = new Date(); //当前日期
		var nowDayOfWeek = now.getDay(); //今天本周的第几天
		var nowDay = now.getDate(); //当前日
		var nowMonth = now.getMonth(); //当前月
		var nowYear = now.getFullYear(); //当前年
		nowYear += (nowYear < 2000) ? 1900 : 0;
		
		var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
		var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
		return[formatDate(weekStartDate),formatDate(weekEndDate)]
	}
	
	function getMonthDate(){
		var now = new Date(); //当前日期
		var nowDayOfWeek = now.getDay(); //今天本周的第几天
		var nowDay = now.getDate(); //当前日
		var nowMonth = now.getMonth(); //当前月
		var nowYear = now.getFullYear(); //当前年
		nowYear += (nowYear < 2000) ? 1900 : 0;
		
		var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowYear,nowMonth));
		var lastMonthStartDate = new Date(nowYear, nowMonth, 1); 
		return[formatDate(lastMonthStartDate),formatDate(monthEndDate)]
	}
	
	function getYearDate(){
		var now = new Date(); //当前日期
		var nowDayOfWeek = now.getDay(); //今天本周的第几天
		var nowDay = now.getDate(); //当前日
		var nowMonth = now.getMonth(); //当前月
		var nowYear = now.getFullYear(); //当前年
		nowYear += (nowYear < 2000) ? 1900 : 0;
		
		var yearStartDate = new Date(nowYear,0,1); 
		var yearEndDate = new Date(nowYear,11, getMonthDays(nowYear,11));
		return[formatDate(yearStartDate),formatDate(yearEndDate)]
	}
	
	function formatDate(dd){
		var date = new Date(dd);
		var myyear = date.getFullYear();
		var mymonth = date.getMonth()+1;
		var myweekday = date.getDate();
		if(mymonth < 10){
			mymonth = "0" + mymonth;
		}
		if(myweekday < 10){
			myweekday = "0" + myweekday;
		}
		return (myyear+"-"+mymonth + "-" + myweekday);
	}
	
	function getMonthDays(nowYear,myMonth){
		var monthStartDate = new Date(nowYear, myMonth, 1);
		var monthEndDate = new Date(nowYear, myMonth + 1, 1);
		var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24);
		return days;
	}
	
	return{
		getNext:getNext,
		getPrev:getPrev,
		getCurDate:getCurDate,
		getWeek:getWeek,
		getMonthDate:getMonthDate,
		getYearDate:getYearDate
	}
}()
