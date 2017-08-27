class Calendar {
	constructor(parent='body'){
		this.parent = document.querySelector(parent);
		this.year = new Date().getFullYear();
		this.month = new Date().getMonth()+1;
		this.monthData = null;
		this.isOpen = false;
		this.oInput = null;
		this.init();

	}
	// 初始化
	init() {
		this.monthData = this.getMounthData(this.year,this.month);
 		  this.build(this.monthData);
			this.updateEvent();
	}
	// 创建模版
	build(monthData) {
		let bodyHtml = this.rendDate(monthData);
		let html = `
		<input class="datepicker" type="text" name="input">
			<div class="picker">
				<div class="picker-header">
					<div class="year">
						<span class="btn year-pre">&lt;</span>
						<span class="year-current">${this.year}年</span>
						<span class="btn year-next">&gt;</span>
					</div>
					<div class="month">
						<span class="btn month-pre">&lt;</span>
						<span class="month-current">${this.month}月</span>	
						<span class="btn month-next">&gt;</span>
					</div>
				</div>
				<div class="picker-body">
					<div class="picker-day">
						<ul>
							<li>日</li>
							<li>一</li>
							<li>二</li>
							<li>三</li>
							<li>四</li>
							<li>五</li>
							<li>六</li>
						</ul>
					</div>
					<div class="picker-date">
						${bodyHtml}
					</div>
				</div>
			</div>
		`;
		// let html =`<span class="year-pre">点我！</span>`
		this.parent.innerHTML = html;
	}
	// 获取某一个月的数据
	getMounthData(year,month) {
		let ret=[];
		let firstDay=new Date(year,month-1,1);
		let firstDayWeekDay=firstDay.getDay();
		if(firstDayWeekDay===0)
		{
			firstDayWeekDay=7;
		}
		let lastDayOfLastMonth = new Date(year,month-1,0);
		let lastDateOfLastMonth = lastDayOfLastMonth.getDate();
		let preMonthDayCount=firstDayWeekDay-1;
		let lastDay = new Date(year,month,0);
		let lastDate=lastDay.getDate();

		for(let i=0;i<7*6;i++)
		{
			let date = i-preMonthDayCount;
			let showDate = date;
			let thisMonth = month;
			if(date<=0)
			{
				thisMonth=month-1;
				showDate = lastDateOfLastMonth+date;
			}else if(date>lastDate)
			{
        thisMonth=month+1;
        showDate=showDate-lastDate;
      }
      if(thisMonth===0) 
      	thisMonth=12;
      if(thisMonth===13) 
      	thisMonth=1;
      ret.push({
      	month:thisMonth,
        date:date,
        showDate:showDate
      })
		}
		return {
			year:year,
			month:month,
			days:ret
		}

	}
	// 添加插件的事件
	updateEvent() {
		const yearPre = this.parent.querySelector('.year-pre');
		const yearNext = this.parent.querySelector('.year-next');
		const monthPre = this.parent.querySelector('.month-pre');
		const monthNext = this.parent.querySelector('.month-next');
		const aDate = this.parent.querySelector('.picker-date');
		this.oInput = this.parent.querySelector('.datepicker');
		// console.log(this.oInput);

		yearPre.onclick = this.changeYear.bind(this,-1);
		yearNext.onclick = this.changeYear.bind(this,1);
		monthPre.onclick = this.changeMonth.bind(this,-1);
		monthNext.onclick = this.changeMonth.bind(this,1);
		aDate.onclick = this.pickerDate.bind(this);
		this.oInput.onclick = this.picker.bind(this);
	}
	// 更改年份
	changeYear(num) {
		this.year += num;
		this.monthData = this.getMounthData(this.year,this.month);
		this.render(this.monthData);
	}
	// 更改月份
	changeMonth(num) {
			this.month += num;
			if(this.month === 13){
				this.month = 1;
				this.year += 1;
			}
			if(this.month === 0){
				this.month = 12;
				this.year -= 1;
			}
			this.monthData = this.getMounthData(this.year,this.month);
			this.render(this.monthData);
		}
	// 显示日期选择div
	picker(ev) {
		if(this.isOpen) {
			this.parent.querySelector('.picker').classList.remove("picker-show");
			this.isOpen = false;
		}else{
			this.parent.querySelector('.picker').classList.add("picker-show");
			const left = ev.target.offsetLeft;
			const top = ev.target.offsetTop;
			const inputH = ev.target.offsetHeight;
			this.parent.querySelector('.picker').style.left = left + 'px';
			this.parent.querySelector('.picker').style.top = top+inputH + 'px';
			this.isOpen = true;
		}
	}
	// 选择日期
	pickerDate(ev) {
		var $target = ev.target;
		if(!$target.classList.contains('disable')){	
			this.parent.querySelector('.picker').classList.remove("picker-show");
			this.oInput.value = this.format($target.dataset.date)
			this.isOpen  = false;
		}

	}
	// 渲染数据到模版
	render(monthData) {
		let bodyHtml = this.rendDate(monthData);
		
		let rendDOM = this.parent.querySelector('.picker-date');
		let yearCurrentDOM = this.parent.querySelector('.year-current');
		let monthCurrentDOM = this.parent.querySelector('.month-current');
		rendDOM.innerHTML = bodyHtml;
		yearCurrentDOM.innerHTML = `${this.year}年`;
		monthCurrentDOM.innerHTML = `${this.month}月`;

	}
	// 添加日期数据
	rendDate(monthData) {
		let bodyHtml = '';
		for(let i=0;i<(monthData.days.length)/7;i++)
		{
			let aLi = '';
			for(let j=0;j<7;j++)
			{
				let date = monthData.days[j + (7 * i)].showDate;
				if(monthData.month == monthData.days[j + (7 * i)].month){
					aLi += `<li data-date="${monthData.days[j + (7 * i)].date}">${date}</li>`;
				}else{
					aLi += `<li class="disable" data-date="${monthData.days[j + (7 * i)].date}">${date}</li>`
				}
			}
			bodyHtml += `<ul>${aLi}</ul>`;
		}
		return bodyHtml;
	}
	// 选择出来的数据
	format(date) {
		let inputData = `${this.monthData.year}-${this.monthData.month}-${date}`;
		return inputData;
	}

}