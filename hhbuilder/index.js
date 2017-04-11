var hh = {
  head: null,
  members: [],
}
var counter = 0;

var Member = function (age, rel, smoker) {
  this.id = counter;
  this.age = age;
  this.rel = rel;
  this.smoker = smoker;
  this.head = false;
  counter++;
}

// add household member list
var heading = document.createElement('div');
heading.append(document.createTextNode('Household Members'));
document.body.append(heading);
var hhList = document.createElement('ul');
var subBtn =  document.querySelectorAll('submit');
document.body.append(hhList);

// add display element for dummy output
var debug = document.getElementsByClassName('debug')[0];
var info = document.createElement('span');
var data = document.createTextNode('');
info.append(data);
debug.insertBefore(info, null);

function validateForm(age, rel) {
  if (age === '') {
    alert ('Age cannot be blank');
  }
  if (rel === '') {
    alert ('Relationship cannot be blank')
  }
  if (age === '' || rel === '') {
    return false;
  } else {
    return true;
  }
};

function showMember(member) {
  var memberLi = document.createElement('li');
  var smoker = member.smoker ? 'smoker' : 'nonsmoker';
  var memberInfo = member.rel + ', ' + member.age + ', ' + smoker + ' ';
  memberLi.append(document.createTextNode(memberInfo));
  var delBtn = document.createElement('button');
  delBtn.addEventListener('click', function() {
    removeMember(member, memberLi);
  });
  var text = document.createTextNode('Remove member');
  delBtn.appendChild(text);
  memberLi.append(delBtn);
  hhList.appendChild(memberLi);
};

function removeMember(member, memberLi) {
  if (member.head === true) {
    hh.head = null;
  }
  // remove from array of members and from display
  var position = hh.members.findIndex(function(element) {
    return element.id === member.id;
  });
  hh.members.splice(position, 1);
  hhList.removeChild(memberLi);
};

var add = document.getElementsByClassName('add')[0];
var hhform = document.getElementsByTagName('form')[0];

add.addEventListener('click', function(event) {
  event.preventDefault();
  var age = hhform.elements['age'].value;
  var rel = hhform.elements['rel'].value;
  var smoke = hhform.elements['smoker'].checked;
  var valid = validateForm(age, rel);
  if (valid === true) {
    var newMember = new Member(age, rel, smoke);
    if (rel === 'self') {
      hh.head = newMember;
      newMember.head = true;
    }
    showMember(newMember);
    hh.members.push(newMember);
    hhform.reset();
  }
});

// update and display dummy data on submit
hhform.addEventListener('submit', function(event) {
  event.preventDefault();
  data.nodeValue = JSON.stringify(hh);
  debug.style.display = 'block';
  hhform.reset();
})

//create inline age validation element
var ageField = document.getElementsByName('age')[0];
var ageLabel = document.getElementsByTagName('label')[0];
var ageValidate = document.createElement('span');
ageValidate.append(document.createTextNode('Age cannot be blank'));
ageValidate.style.color = 'red';
ageValidate.style.display = 'none';
ageValidate.className = 'error';
ageLabel.parentNode.insertBefore(ageValidate, ageLabel.nextSibling);

ageField.addEventListener('blur', function(event) {
  if (ageField.value === '') {
    ageValidate.style.display = 'inline';
  } else {
    ageValidate.style.display = 'none';
  }
})

//create inline relationship validation element
var relField = document.getElementsByName('rel')[0];
var relLabel = document.getElementsByTagName('label')[1];
var relValidate = document.createElement('span');
relValidate.append(document.createTextNode('Relationship cannot be blank'));
relValidate.style.color = 'red';
relValidate.style.display = 'none';
relValidate.className = 'error';
relLabel.parentNode.insertBefore(relValidate, relLabel.nextSibling);

var relField = document.getElementsByName('rel')[0];
relField.addEventListener('blur', function(event) {
  if (relField.value === '') {
    relValidate.style.display = 'inline';
  } else {
    relValidate.style.display = 'none';
  }
})






