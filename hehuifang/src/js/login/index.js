define(['jquery'], function($) {
    var Storage = window.localStorage;
    $('button').on('click', function() {
        var user = $('.text').val().trim();
        var pwd = $('.pwd').val().trim();
        var errorMes = '';
        if (user == '' || pwd == '') {
            errorMes = '用户名或密码不能为空';
        } else {
            var phonereg = /^1[34578]\d{9}$/;
            var emialreg = /^\w+@\w+\.[com|cn|net]$/;
            if (!(phonereg.test(user) || emialreg.test(user))) {
                errorMes = '用户名格式有误'
            }
            var pwdreg = /[^a-a0-9]/i;
            //出现非数字和字母
            if (pwdreg.test(pwd) || pwd.length < 5 || pwd.length > 10) {
                errorMes = '密码格式有误';
            } else {
                //没有出现非数字和字母
                var numreg = /^\d{5,10}$/;
                var codereg = /^[a-z]{5,10}$/i;
                // consoel.log(numreg.test(pwd), codereg.test(pwd));
                if (numreg.test(pwd) || codereg.test(pwd)) {
                    errorMes = '密码格式有误';
                }
            }
        }

        if (errorMes) {
            $('.tip').html(errorMes);
        } else {
            if ($(this).hasClass('log')) {
                //登录发送密码
                $.ajax({
                    url: "/api/login",
                    type: "post",
                    data: {
                        user: user,
                        pwd: pwd
                    },
                    dataType: "json",
                    success: function(data) {
                        //console.log(res)
                        if (data.res) {
                            history.go(-1);
                            Storage.setItem('userinfo', 1);
                        } else {
                            alert(data, mes)
                        }
                    }
                })
            } else {
                //console.log(111)
                $.ajax({
                    url: "/api/reslogin",
                    type: "post",
                    data: {
                        user: user,
                        pwd: pwd
                    },
                    dataType: "json",
                    success: function(data) {
                        if (data.res) {
                            alert('恭喜你注册成功');
                        }
                    }
                })
            }
        }
        return false;
    });
    //眼睛
    $('.eye').on('click', function() {
        $(this).toggleClass('.active');
        if ($(this).hasClass('.active')) {
            $('.pwd').attr('type', 'text')
        } else {
            $('.pwd').attr('type', 'password')
        }
        4
    })
});