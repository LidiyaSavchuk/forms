	var userId='test'
	//список анкет
	document.getElementById('open-profile-edit').addEventListener('click',onOpenProfileEdit)
	function onOpenProfileEdit(){
		document.getElementById('profile-edit').classList.remove('hidden')
		document.getElementById('form-list').classList.add('hidden')
	}
	 
	firebase.database().ref('users').on('value', onFormsListLoaded)
	function onFormsListLoaded(snapshot){
		//отчистка, чтобы не было дублирования
		document.getElementById('forms-list-content').innerHTML=''
		snapshot.forEach(addFormToList)
	}
	
	function addFormToList(snapshot){
		var form=snapshot.val()
		var el=document.createElement('div')
		el.classList.add('form-item')
		el.innerText=form.profile.about.title1
		document.getElementById('forms-list-content').appendChild(el)
	}
	//редактирование профиля
	document.getElementById('question-save').addEventListener('click', function (){
	var title=document.getElementById('question-title').value

	var question={'title': title}
	var list=firebase.database().ref('users/'+ userId+'/form')
	var newitem=list.push()
	newitem.set(question,onSaveComplete)
	
	document.getElementById('loader').setAttribute('style', 'display:block')
});
firebase.database().ref('users/'+ userId+'/form').on('value', onQuestionsLoad)
function onQuestionsLoad(snapshot){
	var questions=snapshot.val()
	document.getElementById('questions-container').innerHTML='' //отчистка
	//for(var key in questions){
		snapshot.forEach(function(snapshot){
		var question=snapshot.val()
		var key=snapshot.key
	
		var el=document.createElement('div')
		var titleEl=document.createElement('textarea')
		titleEl.value=question.title
		
		var saveEl=document.createElement('button')
		saveEl.innerText='Сохранить'
		saveEl.addEventListener('click', function(){
			firebase.database().ref('users/'+ userId+'/form/'+key).update({title:titleEl.value})
		})
		var removeEl=document.createElement('button')
		removeEl.innerText='Удалить'
		removeEl.addEventListener('click', function(){
			firebase.database().ref('users/'+ userId+'/form/'+key).remove()
		
		})
		el.appendChild(titleEl)
		el.appendChild(saveEl)
		el.appendChild(removeEl)
		document.getElementById('questions-container').appendChild(el)
	//}
})
}
function onSaveComplete(err){
	if(err){
		document.getElementById('message').innerText='Ошибка при сохранении'	
	}else{
		document.getElementById('message').innerText='Вопрос сохранен!'
	}
	document.getElementById('loader').setAttribute('style', 'display:none')
}
document.getElementById('about-save').addEventListener('click', function (){
	var title1=document.getElementById('about-title').value
	var about={'title1': title1}
	firebase.database().ref('users/'+userId+'/profile/about').set(about,onSave)
	document.getElementById('loader').setAttribute('style', 'display:block')
});
firebase.database().ref('users/'+userId+'/profile/about').on('value', onLoading)
function onLoading(snapshot){
	var about=snapshot.val()
	document.getElementById('about-title').value=about.title1
}
function onSave(err){
	if(err){
		document.getElementById('message').innerText='Ошибка при сохранении'
	}else{
		document.getElementById('message').innerText='Данные сохранены!'
	}
	document.getElementById('loader').setAttribute('style', 'display:none')
}
