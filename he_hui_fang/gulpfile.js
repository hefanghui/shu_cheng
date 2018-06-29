var gulp = require('gulp');
var server = require('gulp-webserver');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mock = require('./mock/');
var sass = require('gulp-sass');
var userdata = require('./mock/user/user').userInfo;
gulp.task('sass', function() {
    gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
});
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                if (req.url === "/favicon.ico") {
                    return;
                }
                var pathname = url.parse(req.url).pathname;
                pathname = pathname === '/' ? '/index.html' : pathname;
                if (/\/api\//.test(pathname)) {
                    if (pathname === "/api/login" || pathname === "/api/reglogin") {
                        //post
                        var arr = [];
                        req.on('data', function(chunk) {
                            arr.push(chunk)
                        });
                        req.on('end', function() {
                            var data = Buffer.concat(arr).toString();
                            data = require('querystring').parse(data);
                            console.log(data);
                            if (pathname === "/api/login") {
                                //查找
                                var resule = userdata.some(function(v) {
                                    return v.user == data.user && v.pwd == data.pwd
                                });
                                if (resule) {
                                    res.end('{"res":1,"mes":"登陆成功"}');
                                } else {
                                    res.end('{"res":0,"mes":"用户名或密码输入有误"}');
                                }
                            } else {
                                console.log(data);
                                //添加
                                // userdata.push(data);
                                // var userObj = {
                                //     userInfo: userdata
                                // };
                                // fs.writeFileSync('./mock/user/user.json', JSON.stringify(userObj));
                                // res.end('{"res":1,"mes":"注册成功"}');
                            }
                        })
                        return false;
                    }
                    res.end(JSON.stringify(mock(req.url)));
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});

gulp.task('change', function() {
    gulp.watch('src/sass/*.scss', ['sass'])
});

gulp.task('default', ['sass', 'change', 'server']);