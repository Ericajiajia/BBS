var barRightRegister = $('.bar-right-register')[0]



barRightRegister.addEventListener('click', function () {
  $('.info-cover').style.display = 'block'
  $('.info-board').style.dispaly = 'block'
})

$('.info-submit')[0].addEventListener('click', function () {
  $.ajax({
    type: 'POST',
    url: 'http://localhost/register',
    dataType: 'json',
    'Content-Type': 'application/json;charset=utf-8',
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
      } else if (data.result === 1) {
        alert('')
      }
    }
  })
})