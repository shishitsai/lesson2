(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4bec8d34"],{"1dde":function(e,t,n){var r=n("d039"),o=n("b622"),a=n("2d00"),c=o("species");e.exports=function(e){return a>=51||!r((function(){var t=[],n=t.constructor={};return n[c]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},8418:function(e,t,n){"use strict";var r=n("c04e"),o=n("9bf2"),a=n("5c6c");e.exports=function(e,t,n){var c=r(t);c in e?o.f(e,c,a(0,n)):e[c]=n}},"99af":function(e,t,n){"use strict";var r=n("23e7"),o=n("d039"),a=n("e8b5"),c=n("861d"),s=n("7b0b"),i=n("50c4"),u=n("8418"),d=n("65f0"),l=n("1dde"),f=n("b622"),p=n("2d00"),b=f("isConcatSpreadable"),m=9007199254740991,h="Maximum allowed index exceeded",w=p>=51||!o((function(){var e=[];return e[b]=!1,e.concat()[0]!==e})),v=l("concat"),g=function(e){if(!c(e))return!1;var t=e[b];return void 0!==t?!!t:a(e)},j=!w||!v;r({target:"Array",proto:!0,forced:j},{concat:function(e){var t,n,r,o,a,c=s(this),l=d(c,0),f=0;for(t=-1,r=arguments.length;t<r;t++)if(a=-1===t?c:arguments[t],g(a)){if(o=i(a.length),f+o>m)throw TypeError(h);for(n=0;n<o;n++,f++)n in a&&u(l,f,a[n])}else{if(f>=m)throw TypeError(h);u(l,f++,a)}return l.length=f,l}})},a55b:function(e,t,n){"use strict";n.r(t);var r=n("7a23"),o={class:"container mt-5"},a={class:"form-signin"},c={class:"form-floating mb-3"},s=Object(r["h"])("label",{for:"username"},"Email address",-1),i={class:"form-floating"},u=Object(r["h"])("label",{for:"password"},"Password",-1);function d(e,t,n,d,l,f){return Object(r["t"])(),Object(r["e"])("div",o,[Object(r["h"])("form",a,[Object(r["h"])("div",c,[Object(r["N"])(Object(r["h"])("input",{type:"email",class:"form-control",id:"username",placeholder:"name@example.com",required:"",autofocus:"","onUpdate:modelValue":t[1]||(t[1]=function(e){return l.username=e})},null,512),[[r["I"],l.username]]),s]),Object(r["h"])("div",i,[Object(r["N"])(Object(r["h"])("input",{type:"password",class:"form-control",id:"password",placeholder:"Password",required:"","onUpdate:modelValue":t[2]||(t[2]=function(e){return l.password=e})},null,512),[[r["I"],l.password]]),u]),Object(r["h"])("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"button",onClick:t[3]||(t[3]=function(){return f.login&&f.login.apply(f,arguments)})}," 登入 ")])])}n("99af");var l={data:function(){return{username:"",password:""}},methods:{login:function(e){var t=this;e.preventDefault();var n={username:this.username,password:this.password};this.$http.post("".concat("https://vue3-course-api.hexschool.io","/admin/signin"),n).then((function(e){if(e.data.success){var n=e.data,r=n.token,o=n.expired;document.cookie="hexToken=".concat(r,";expires=").concat(new Date(o),";"),t.$router.push("/admin/products")}else alert(e.data.message)}))}}};l.render=d;t["default"]=l}}]);
//# sourceMappingURL=chunk-4bec8d34.22bd80e8.js.map