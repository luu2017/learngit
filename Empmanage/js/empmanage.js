window.onload = function() {
	// 	var dataTableEle = document.getElementById("dataTable");

	//获取tbody
	// var tbodyEle = dataTableEle.tBodies[0];

	var addBtnEle = document.getElementById("addBtn");

	//获取到搜索框
	var searchInput = document.getElementById("search");

	//获取用户id 用户姓名 和 薪资
	var userIdEle = document.getElementsByName("userId")[0];
	var realNameEle = document.getElementsByName("realName")[0];
	var SalaryEle = document.getElementsByName("Salary")[0];

	// alert(SalaryEle.placeholder);
	// var realName = document.getElementById("")

	var tbodyEle = document.getElementById("tbody1");

	//获取到遮罩层
	var mask = document.getElementById("mask");

	//获取到更新面板
	var updataPanel = document.getElementById("updataPanle");


	//获取面板关闭按钮
	var closeSpan = document.getElementById("closeSpan");

	//获取更新表单内容
	var updateId = document.getElementById("updateId");

	var updateName = document.getElementById("updateName");

	var updateSalary = document.getElementById("updataSalary");

	//获取更新按钮
	var updateBtn = document.getElementById("updateBtn");








	//数据渲染模块
	
	for (var i = 0; i < empData.length; i++) {


		var newtr = tbodyEle.insertRow(i);

		//获取到每个员工对象
		var empObj = empData[i];
		setTd(empObj, newtr);



	}






	//	数据添加模块
	addBtnEle.onclick = function() {
		var userIdEleValue = userIdEle.value;
		var realNameEleValue = realNameEle.value;
		var SalaryEleValue = SalaryEle.value;

		if (userIdEleValue == "" || realNameEleValue == "" || SalaryEleValue == "") {
			alert("员工不能为空");
		} else {
			var newEmpObj = {
				id: userIdEleValue,
				name: realNameEleValue,
				salary: SalaryEleValue,
				createtime: new Date().toLocaleDateString()
			}
			empData.push(newEmpObj);

			var newTr = tbodyEle.insertRow(tbodyEle.rows.length);

			setTd(newEmpObj, newTr);

			setUpdateDlelteEvent(); //重新赋予删除和修改事件
			// console.log("hah"+empData.length);
		}

	}

    //数据写入模块
	function setTd(empObj, trEle) {

		trEle.insertCell(0).innerText = empObj.id;
		trEle.insertCell(1).innerText = empObj.name;
		trEle.insertCell(2).innerText = empObj.salary;
		trEle.insertCell(3).innerText = empObj.createtime;
		trEle.insertCell(4).innerHTML = "<button>修改</button> <button>删除</button>";



	}



	//获取到所有的tbody中的按钮元素
	var tbodyAllbtns = tbodyEle.getElementsByTagName("button");


	//给修改和删除按钮添加鼠标单击事件
	function setUpdateDlelteEvent() {
		
		// console.log(tbodyAllbtns.length);
		for (var i = 0; i < tbodyAllbtns.length; i++) {
			
			if (i % 2 == 0) {
				
				//传值模块（并未实现修改)				
				tbodyAllbtns[i].onclick = function() {
					mask.style.display = "block";
					updataPanle.style.display = "block";
					updataPanle.style.left = (window.innerWidth - 300) / 2 + "px";
					updataPanle.style.top = (window.innerHeight - 300) / 2 + "px";
					//分别获取到修改按钮行的第一个和第三个内容
					var updateTr = this.parentNode.parentNode;
					//旧id
					var oldId = updateTr.cells[0].innerText;

					//旧name
					var oldName = updateTr.cells[1].innerText;
					//旧salary
					var oldSalary = updateTr.cells[2].innerText;

					//把旧的值设置给表单控件 
					updateId.value = oldId;
					updateName.value = oldName;
					updateSalary.value = oldSalary;
				}
			} else {
				//删除模块(通过外部调用实现删除)
				tbodyAllbtns[i].onclick = function() {
					var tf = confirm("Are you sure to delete it?")
					if (tf) {
						var deleteTr = this.parentNode.parentNode;
						// 从数组里删除
						// 获取删除行的id
						var deleteId = deleteTr.cells[0].innerText;
						tbodyEle.removeChild(deleteTr);

						deleteEmpById(deleteId);
					}
				}
			}
		}
	}






	setUpdateDlelteEvent();



	//	定义根据id删除用户的方法

	function deleteEmpById(deleteId) {
		for (var i = 0; i < empData.length; i++) {
			//拿到每一个员工对象
			if (empData[i].id == deleteId) {

				empData.splice(i, 1);
				console.log("删除成功，目前员工数量是：" + empData.length);

			}
		}

	}




	//给搜索框添加事件 change和input

	searchInput.oninput = function() {

		//获取搜索框的值
		var searchValue = this.value;

		tbodyEle.innerHTML = "";

		var count = 0; //用来作为可显示符合要求数据的下标



		for (var i = 0; i < empData.length; i++) {


			var empObj = empData[i];
			//通过js判断字段是否包含要查询的值

			if (empObj.id.indexOf(searchValue) != -1 || empObj.name.indexOf(searchValue) != -1 || empObj.salary.indexOf(
					searchValue) != -1 || empObj.createtime.indexOf(searchValue) != -1)

			// if (empObj.id.indexOf(searchValue) != -1 || empObj.salary.indexOf(searchValue) != -1 ||
			// 	empObj.name.indexOf(searchValue) != -1 || empObj.createtime.indexOf(searchValue) != -1
			// ) 

			{


				var newTr = tbodyEle.insertRow(count);


				setTd(empObj, newTr);

				setUpdateDlelteEvent();


			} else {


			}

			//如何通过js判断字段是否包含要查询的值
		}

	}



	//点击按钮关闭

	closeSpan.onclick = closeMaskAndUpdatePanel;


	function closeMaskAndUpdatePanel() {
		mask.style.display = "none";
		updataPanel.style.display = "none";

	}


	//关闭遮罩功能模块
	
	closeSpan.onclick = function() {
		mask.style.display = "none";
		updataPanel.style.display = "none";

	}

	//给修改按钮添加鼠标事件

	updateBtn.onclick = function() {

		var newId = updateId.value;
		var newName = updateName.value;
		var newSalary = updateSalary.value;

        // alert(newName.value);

		// alert(empData.length);
		for (var i = 0; i < empData.length; i++) {
			//拿到每一个员工对象
			// console.log(empData[i].id);
			
			if (empData[i].id == newId) {
				//这个i表示数组的下标，一个tbody要修改tr的下标

				var updateTr = tbodyEle.rows[i];
				
				
				
				
				updateTr.cells[1].innerText = newName;
				updateTr.cells[2].innerText = newSalary;

				empData[i].name = newName;
				empData[i].salary = newSalary;

				closeMaskAndUpdatePanel();


 			}
		}

		

	}


}
