// 登录注册链接
var barRightRegister = $('.bar-right-register')[0]
var barRightLogin = $('.bar-right-login')[0]
var infoClose = $('.info-title-close')[0]
var infoCover = $('.info-cover')[0]

// 跳转登录界面
var jumpLogin = function () {
  $('.info-board')[0].style.display = 'block'
  $('.info-title-word').html('登录')
  $('.info-register')[0].style.display = 'none'
  $('.info-login')[0].style.display = 'block'
  $('.info-message-register')[0].style.display = 'none'
  $('.info-message-login')[0].style.display = 'block'
}
// 跳转注册界面
var jumpRegister = function () {
  $('.info-board')[0].style.display = 'block'
  $('.info-title-word').html('注册')
  $('.info-register')[0].style.display = 'block'
  $('.info-login')[0].style.display = 'none'
  $('.info-message-register')[0].style.display = 'block'
  $('.info-message-login')[0].style.display = 'none'
}
// 点击注册链接
barRightRegister.addEventListener('click', function () {
  $('.info-cover')[0].style.display = 'block'
  jumpRegister()
})
$('.info-message-login a')[0].addEventListener('click', function () {
  jumpRegister()
})
// 点击登录链接
barRightLogin.addEventListener('click', function () {
  $('.info-cover')[0].style.display = 'block'
  jumpLogin()
})
$('.info-message-register a')[0].addEventListener('click', function () {
  jumpLogin()
})
// 清除未填完信息
var infoClear = function () {
  $('.info-cover')[0].style.display = 'none'
  $('.info-board')[0].style.display = 'none'
  $('.info-register input').val('')
  $('.info-login input').val('')
}
// 点击叉号
infoClose.addEventListener('click', function () {
  infoClear()
})
// 点击登录注册页面的背景
infoCover.addEventListener('click', function (e) {
  if (e.target.className === 'info-cover') {
    infoClear()
  }
})
// 验证邮箱函数
var checkMail = function(email){ 
  var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
  var res = reg.test(email);
  return res; 
} 
$('.info-submit')[0].addEventListener('click', function () {
  if (register.rpassword.value !== register.rconfirm.value) {
    alert('两次密码不一样！')
    return false
  } else if (register.rusername.value === '' || register.rpassword.value === '' || register.remail.value === '') {
    alert('信息没有填写完整！')
    return false
  }
  if (!checkMail(register.remail.value)) {
    alert('邮箱错误，请重填！')
    return false
  }
  $.ajax({
    type: 'POST',
    url: '/register',
    dataType: 'json',
    'contentType': 'application/json',
    data: JSON.stringify(
      {
        'username': register.rusername.value,
        'password': register.rpassword.value,
        'email': register.remail.value
      }
    ),
    success: function (data) {
      if (data.result === 0) {
        alert('成功')
        infoClear()
      } else {
        alert('注册出错，请重试！')
      }
    }
  })
})
$('.info-submit')[1].addEventListener('click', function() {
  $.ajax({
    type: 'POST',
    url: '/login',
    dataType: 'json',
    'contentType': 'application/json',
    data: JSON.stringify(
      {
        'username': login.lusername.value,
        'password': login.lpassword.value
      }
    ),
    success: function (data) {
      if (data.result === 0) {
        alert('成功')
        infoClear()
      } else {
        alert('您尚未注册，请注册！')
      }
    }
  })
})
// 给搜索栏设置样式变化
$('.search-bar-container input')[0].addEventListener('focus', function () {
  $('.search-bar-container input')[0].className = 'search-input1'
})
$('.search-bar-container input')[0].addEventListener('blur', function () {
  $('.search-bar-container input')[0].className = 'search-input'
})
// 给语言选择区设置样式变化
$('.language-default-bar')[0].addEventListener('click', function (e) {
  if (e.target.className === 'language-default-bar' || e.target.parentNode.className === 'language-default-bar' || e.target.parentNode.parentNode.className === 'language-default-bar') {
    $('.language-choice')[0].style.display = 'block'
  }
})
$('body')[0].addEventListener('click', function (e) {
  if(!(e.target.className === 'language-default-bar' || e.target.parentNode.className === 'language-default-bar' || e.target.parentNode.parentNode.className === 'language-default-bar')) {
    $('.language-choice')[0].style.display = 'none'
  }
})
$('.language-choice li').on('click', function (e) {
  $('.language-default')[0].innerHTML = e.target.innerHTML
  for (let _i = 0; _i < 3; _i ++) {
    $('.language-choice li i')[_i].className = 'fa'
    if($('.language-choice li span')[_i].innerHTML === e.target.innerHTML) {
      $('.language-choice li i')[_i].className = 'fa fa-check'
    }
  }
})