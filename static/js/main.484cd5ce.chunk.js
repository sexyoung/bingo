(this.webpackJsonpbingo=this.webpackJsonpbingo||[]).push([[0],{132:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(1),o=n(66),s=n.n(o),i=(n(78),n(15)),r=n(3),l=n(9),d=n.n(l);function u(){var e=Object(c.useRef)(),t=Object(r.g)();return Object(a.jsxs)("div",{className:d.a.HomePage,children:[Object(a.jsxs)("div",{className:d.a.slogan,children:[Object(a.jsxs)("div",{className:d.a.ballGroup,children:[Object(a.jsx)("div",{className:d.a.ball,children:"B"}),Object(a.jsx)("div",{className:d.a.ball,children:"I"}),Object(a.jsx)("div",{className:d.a.ball,children:"N"}),Object(a.jsx)("div",{className:d.a.ball,children:"G"}),Object(a.jsx)("div",{className:d.a.ball,children:"O"})]}),Object(a.jsx)("div",{className:d.a.subTitle,children:"ONLINE BATTLE"})]}),Object(a.jsxs)("div",{className:d.a.menu,children:[Object(a.jsx)("button",{className:d.a.create,onClick:function(){fetch("".concat("//bingo-server.sexyoung.tw","/new-room")).then((function(e){return e.json()})).then((function(e){t.push("/".concat(e,"/join"))}))},children:"CREATE"}),Object(a.jsx)("h3",{children:"OR"}),Object(a.jsxs)("form",{onSubmit:function(n){n.preventDefault(),t.push("/".concat(e.current.value,"/join"))},className:d.a.form,children:[Object(a.jsx)("input",{required:!0,type:"text",ref:e,maxLength:"4",pattern:"[0-9A-Z]{4}",placeholder:"ROOM ID"}),Object(a.jsx)("button",{children:"JOIN"})]})]}),Object(a.jsx)(i.b,{className:d.a.rule,to:"/rule",children:"HOW TO PLAY"})]})}var m=n(14),j=n(7),b=n(72),h=n(12),f=n.n(h),O=n(5),_=n(27),x=n.n(_);function p(e){var t,n=this,o=e.data,s=e.onClick,i=e.isActive,r=e.className,l=void 0===r?"":r,d=e.checkedList,u=void 0===d?[]:d,m=Object(c.useState)(-1),b=Object(O.a)(m,2),h=b[0],_=b[1],p=function(e){i&&(s(e),_(e))};return Object(c.useEffect)((function(){_(-1)}),[u]),Object(a.jsx)("div",{className:f()(x.a.BingoMatrix,(t={},Object(j.a)(t,x.a.active,i),Object(j.a)(t,l,Boolean(l)),t)),children:o.map((function(e,t){var c;return Object(a.jsx)("div",{className:f()(x.a.box,(c={},Object(j.a)(c,x.a.ing,h===t),Object(j.a)(c,x.a.checked,u.includes(o[t])),c)),onClick:p.bind(n,t),children:e},t)}))})}var v=n(8),g=n(68),y=n.n(g),w=(n(34),[].concat(Object(v.a)(Object(v.a)(Array(10).keys()).map((function(e){return e+48}))),Object(v.a)(Object(v.a)(Array(26).keys()).map((function(e){return e+65}))))),N=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t="",n=0;n<e;n++)t+=String.fromCharCode(w[~~(w.length*Math.random())]);return t},C={InfoReq:"RoomInfoReq",InfoRes:"RoomInfoRes",Denied:"RoomDenied",PlayerJoin:"RoomPlayerJoin",PlayerUpdate:"RoomPlayerUpdate",UpdateProcess:"RoomUpdateProcess",MessageSend:"RoomMessageSend",MessageUpdate:"RoomMessageUpdate",CountDown:"RoomCountDown",CountDownStop:"RoomCountDownStop",CountDownEnd:"RoomCountDownEnd",CountDownCancel:"RoomCountDownCancel",StartGame:"RoomStartGame",SaveMatrix:"RoomSaveMatrix",TriggerCountDown:"RoomTriggerCountDown",TriggerStartGame:"RoomTriggerStartGame"},k={InfoRes:"UserInfoRes",ChangeName:"UserChangeName"},D={InfoReq:"GameInfoReq",InfoRes:"GameInfoRes",GoJoin:"GameGoJoin",RePlay:"GameRePlay",Turn:"GameTurn",CheckNum:"GameCheckNum",SelfMatrix:"GameSelfMatrix",FetchMatrix:"GameFetchMatrix",UpdateChecked:"GameUpdateChecked"},R=n(2),S=n.n(R),M=function(e){var t=Object(c.createRef)(),n=Object(c.createRef)(),o=Object(r.g)(),s=Object(r.h)().roomID,i=Object(c.createRef)(),l=Object(c.useState)(5),d=Object(O.a)(l,2),u=d[0],b=(d[1],Object(c.createRef)([])),h=Object(c.useState)(""),_=Object(O.a)(h,2),x=_[0],p=_[1],g=Object(c.useState)(null),w=Object(O.a)(g,2),D=w[0],R=w[1],M=Object(c.useState)({}),I=Object(O.a)(M,2),P=I[0],q=I[1],B=Object(c.useState)({}),G=Object(O.a)(B,2),L=G[0],E=G[1],T=Object(c.useState)([]),U=Object(O.a)(T,2),A=U[0],H=U[1],J=Object(c.useState)(null),z=Object(O.a)(J,2),F=z[0],Y=z[1],Q=Object(c.useState)([]),K=Object(O.a)(Q,2),W=K[0],Z=K[1],X=Object(c.useState)(Array(Math.pow(u,2)).fill(0)),V=Object(O.a)(X,2),$=V[0],ee=(V[1],function(t){e.emit(C.UpdateProcess,s,t,t.filter((function(e){return e})).length/Math.pow(L.size,2))}),te=function(){e.emit(C.TriggerStartGame,s)};Object(c.useLayoutEffect)((function(){var t=localStorage.getItem("bingoUserID")||function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:32,t="",n=0;n<e;n++)t+=N(),n%8===7&&(t+="-");return t.slice(0,t.length-1)}();localStorage.setItem("bingoUserID",t),e.emit(C.PlayerJoin,s,t),e.emit(C.InfoReq,s),y.a.toDataURL("".concat(location.origin+location.pathname,"/#/").concat(s,"/join").replace("bingo//","bingo/"),{width:512,height:512},(function(e,t){if(e)return console.error(e);Y(t)}));var n=function(e){return q(e)},a=function(e){return E(e)},c=function(e){H(e.filter((function(e){return e})))},i=function(e){return Z((function(t){return[].concat(Object(v.a)(t),[e])}))},r=function(){o.push("/denied")},l=function(e){R(e)},d=function(){R(null)},u=function(){o.push("/".concat(s,"/game"))},m=function(){e.on(C.Denied,r),e.on(C.PlayerUpdate,c),e.on(k.InfoRes,n),e.on(C.InfoRes,a),e.on(C.MessageUpdate,i),e.on(C.CountDown,l),e.on(C.CountDownStop,d),e.on(C.CountDownEnd,te),e.on(C.StartGame,u)};return e.connected?m():e.on("connect",m),function(){e.off(k.InfoRes,n),e.off(C.InfoRes,a),e.off(C.Denied,r),e.off(C.CountDown,l),e.off(C.PlayerUpdate,c),e.off(C.MessageUpdate,i),e.off(C.CountDown,l),e.off(C.CountDownStop,d),e.off(C.CountDownEnd,te),e.off(C.StartGame,u)}}),[]),Object(c.useEffect)((function(){b.current.scrollTop=b.current.scrollHeight}),[W.length]);return{show:x,size:u,user:P,count:D,matrix:$,qrcode64:F,userList:A,roomInfo:L,chatHistory:W,handleSubmit:function(t){t.preventDefault(),e.emit(C.MessageSend,P.id,s,n.current.value),n.current.value="",p(""),function(){var e,t=!1;return e=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0),t}()&&n.current.blur()},handleRename:function(n){if(n.preventDefault(),t.current.value){var a=t.current.value;e.emit(k.ChangeName,s,a),q((function(e){return Object(m.a)(Object(m.a)({},e),{},{name:a})})),p("")}},handleStartCountDown:function(){e.emit(C.TriggerCountDown,s)},handleStartGame:te,resetMatrix:function(){var e=Array(Math.pow(u,2)).fill(0);ee(e)},randomMatrix:function(){var e=Object(v.a)(Array(Math.pow(u,2)).keys()).map((function(e){return e+1})).sort((function(){return.5-Math.random()}));ee(e)},handlePutNum:function(e){P.matrix[e]||(P.matrix[e]=P.matrix.filter((function(e){return e})).length+1,ee(P.matrix))},toggleShow:function(e){p(x===e?"":e)},handleCopyLink:function(){var e=document.createElement("input"),t=window.location.href;document.body.appendChild(e),e.value=t,e.select(),document.execCommand("copy"),document.body.removeChild(e),alert("Copied!")},handleCountDownCancel:function(){e.emit(C.CountDownCancel,s)},CanvasDOM:Object(a.jsx)("canvas",{ref:i,id:"canvas",className:S.a.qrcode}),NameDOM:Object(a.jsx)("input",{required:!0,type:"text",ref:t,className:S.a.name,placeholder:"your name",defaultValue:P.name}),InputDOM:Object(a.jsx)("input",{type:"text",ref:n,placeholder:"\u8f38\u5165\u8a0a\u606f",required:!0}),ChatHistoryDOM:Object(a.jsx)("div",{className:S.a.chatHistory,ref:b,children:W.map((function(e,t){var n,c,o,s,i;return Object(a.jsx)("div",{className:f()(S.a.msgBox,(o={},Object(j.a)(o,S.a.isMe,P.id===e.user.id),Object(j.a)(o,S.a.same,e.user.id===(null===(n=W[t-1])||void 0===n||null===(c=n.user)||void 0===c?void 0:c.id)),o)),children:Object(a.jsxs)("div",{className:S.a.msg,children:[P.id!==e.user.id&&e.user.id!==(null===(s=W[t-1])||void 0===s||null===(i=s.user)||void 0===i?void 0:i.id)&&Object(a.jsx)("div",{className:S.a.name,children:e.user.name}),Object(a.jsx)("div",{className:S.a.text,children:e.text})]})},t)}))})}};function I(e){var t=e.socket,n=M(t),c=n.NameDOM,o=n.roomInfo,s=n.InputDOM,i=n.ChatHistoryDOM,l=Object(b.a)(n,["NameDOM","roomInfo","InputDOM","ChatHistoryDOM"]);if(null===o||void 0===o?void 0:o.game)return Object(a.jsx)(r.a,{to:"/denied"});var d=Object(r.h)().room;return Object(a.jsxs)("div",{className:S.a.JoinPage,children:[Object(a.jsxs)("div",{className:S.a.header,children:[Object(a.jsx)("div",{className:S.a.qrcode,onClick:l.toggleShow.bind(this,"qrcode")}),Object(a.jsxs)("div",{className:S.a.playerCount,onClick:l.toggleShow.bind(this,"player"),children:[l.userList.length," Player"]}),Object(a.jsx)("div",{className:S.a.fit}),Object(a.jsx)("div",{className:S.a.userName,onClick:l.toggleShow.bind(this,"rename"),children:l.user.name}),Object(a.jsx)("div",{className:S.a.matrix,onClick:l.toggleShow.bind(this,"editor")})]}),Object(a.jsxs)("div",{className:S.a.content,children:[Object(a.jsx)("div",{className:f()([S.a.chatPane],Object(j.a)({},S.a.show,""===l.show)),children:i}),Object(a.jsx)("ul",{className:f()([S.a.playerPane],Object(j.a)({},S.a.show,"player"===l.show)),children:l.userList.map((function(e){return Object(a.jsxs)("li",{children:[Object(a.jsx)("div",{className:S.a.name,children:e.name}),Object(a.jsx)("div",{className:f()(S.a.percentage,Object(j.a)({},S.a.fin,1===e.percentage)),children:Object(a.jsx)("div",{className:S.a.bar,style:{width:"".concat(~~(100*e.percentage),"%")}})})]},e.id)}))}),Object(a.jsx)("div",{className:f()([S.a.renamePane],Object(j.a)({},S.a.show,"rename"===l.show)),children:Object(a.jsxs)("form",{onSubmit:l.handleRename,children:[c,Object(a.jsx)("button",{children:"Rename"})]})}),l.user.matrix&&Object(a.jsxs)("div",{className:f()([S.a.editorPane],Object(j.a)({},S.a.show,"editor"===l.show)),children:[Object(a.jsx)(p,Object(m.a)({},{data:l.user.matrix,onClick:l.handlePutNum,isActive:!0})),Object(a.jsxs)("div",{className:S.a.buttons,children:[Object(a.jsx)("button",{className:S.a.reset,onClick:l.resetMatrix,children:"RESET"}),Object(a.jsx)("button",{className:S.a.random,onClick:l.randomMatrix,children:"RANDOM"})]})]}),Object(a.jsxs)("div",{className:f()([S.a.qrcodePane],Object(j.a)({},S.a.show,"qrcode"===l.show)),children:[Object(a.jsx)("img",{src:l.qrcode64,width:"100%"}),Object(a.jsx)("div",{className:S.a.roomID,children:d}),Object(a.jsx)("div",{className:S.a.link,onClick:l.handleCopyLink,children:"Copy the Link"})]})]}),Object(a.jsxs)("form",{className:S.a.sendMsgBar,onSubmit:l.handleSubmit,children:[!l.userList.findIndex((function(e){return e.id===l.user.id}))&&Object(a.jsx)("button",{type:"button",className:S.a.startBtn,onClick:l.handleStartCountDown,disabled:l.userList.some((function(e){var t=e.percentage;return 1!==(void 0===t?0:t)})),children:"Start"}),s,Object(a.jsx)("button",{type:"submit",className:S.a.sendBtn,children:"\u3000"})]}),null!==l.count&&Object(a.jsxs)("div",{className:f()(S.a.countdown),children:[l.count,Object(a.jsx)("button",{className:S.a.stopBtn,onClick:l.handleCountDownCancel,children:"CANCEL"})]})]})}var P=n(69),q=n.n(P),B=n(70),G=n.n(B);function L(){var e=Object(r.i)().path,t=Object(c.useMemo)((function(){return q()("//bingo-server.sexyoung.tw")}),[]);return Object(c.useEffect)((function(){return function(){return t.close()}}),[]),Object(a.jsx)("div",{className:G.a.RoomPage,children:Object(a.jsxs)(r.d,{children:[Object(a.jsx)(r.b,{path:"".concat(e,"/join"),children:Object(a.jsx)(I,Object(m.a)({},{socket:t}))}),Object(a.jsx)(r.b,{path:"".concat(e,"/game"),children:Object(a.jsx)(H,Object(m.a)({},{socket:t}))}),Object(a.jsx)(r.b,{path:"*",children:Object(a.jsx)(z,{})})]})})}var E=n(6),T=n.n(E),U=0,A=function(e){var t=+e.split("").map((function(e){return e.charCodeAt()})).join(""),n=~~(t/24)%256,a=~~(t/25)%256;return"rgba(".concat(~~(t/23)%256,", ").concat(n,", ").concat(a,", .45)")};function H(e){var t,n=e.socket;if(!n.connected)return Object(a.jsx)(r.a,{to:"/denied"});var o=Object(r.g)(),s=Object(r.h)().roomID,l=Object(c.useState)({}),d=Object(O.a)(l,2),u=d[0],j=d[1],b=Object(c.useState)(""),h=Object(O.a)(b,2),f=h[0],_=h[1],x=Object(c.useState)([]),g=Object(O.a)(x,2),y=g[0],w=g[1],N=Object(c.useState)([]),R=Object(O.a)(N,2),S=R[0],M=R[1],I=Object(c.useState)([]),P=Object(O.a)(I,2),q=P[0],B=P[1],G=Object(c.useState)([]),L=Object(O.a)(G,2),E=L[0],H=L[1];Object(c.useLayoutEffect)((function(){var e=function(){o.push("/denied")},t=function(e){M(e.filter((function(e){return e})))},a=function(){return o.push("/".concat(s,"/join"))},c=function(e,t,a){var c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],o=arguments.length>4?arguments[4]:void 0;w(Object(v.a)(c)),B(Object(v.a)(e)),H(Object(v.a)(a)),_(t),U=o,c.length&&n.off(k.InfoRes)};return n.on(C.Denied,e),n.on(D.GoJoin,a),n.on(k.InfoRes,(function(e){return j(Object(m.a)({},e))})),n.on(C.PlayerUpdate,t),n.on(D.Turn,c),function(){n.off(D.Turn,c),n.off(D.GoJoin,a),n.off(C.Denied,e),n.off(C.PlayerUpdate,t)}}),[]),Object(c.useLayoutEffect)((function(){S.length||n.emit(D.InfoReq,s)}),[S.length]);if(!(null===u||void 0===u||null===(t=u.matrix)||void 0===t?void 0:t.length))return null;var J=E.find((function(e){return e.id===f}))||{};return Object(a.jsxs)("div",{className:T.a.GamePage,children:[Object(a.jsxs)("div",{className:T.a.winMap,children:[Object(a.jsx)("div",{className:T.a.start,children:"0"}),Object(a.jsx)("div",{className:T.a.way,children:E.map((function(e,t){return Object(a.jsxs)("div",{className:T.a.player,style:{zIndex:t,left:"".concat(e.winCount/U*100,"%")},children:[Object(a.jsx)("div",{className:T.a.nameColor,style:{backgroundColor:A(e.name)}}),e.name.slice(0,1)]},t)}))}),Object(a.jsx)("div",{className:T.a.end,children:U})]}),Object(a.jsx)("div",{className:T.a.gap,children:Boolean(y.length)?Object(a.jsxs)("div",{className:T.a.result,children:[Object(a.jsxs)("div",{className:T.a.winList,children:[Object(a.jsx)("div",{className:T.a.winnerIs,children:"Winner is"}),Object(a.jsx)("span",{children:y.join(", ")})]}),Object(a.jsxs)("div",{className:T.a.buttons,children:[Object(a.jsx)("div",{onClick:function(){n.emit(D.RePlay,s)},children:"Replay"}),Object(a.jsx)(i.b,{to:"/",children:"Home"})]})]}):Object(a.jsx)("div",{className:T.a.turn,children:Object(a.jsxs)("div",{className:T.a.title,children:[f===u.id?Object(a.jsx)("div",{className:T.a.your,children:"YOUR"}):Object(a.jsxs)("div",{className:T.a.others,children:[null===J||void 0===J?void 0:J.name,"'s"]}),"TURN"]})})}),Object(a.jsx)(p,Object(m.a)({},{data:u.matrix,onClick:function(e){q.includes(u.matrix[e])||n.emit(D.CheckNum,s,u.matrix[e])},className:T.a.Matrix,checkedList:q,isActive:f===u.id&&!y.length}))]})}function J(){return Object(a.jsx)("div",{children:Object(a.jsx)("h2",{children:"DeniedPage"})})}function z(){return Object(a.jsx)("div",{children:Object(a.jsx)("h2",{children:"NotFoundPage"})})}var F=n(71),Y=n.n(F);var Q=function(){return Object(a.jsx)("div",{className:Y.a.App,children:Object(a.jsx)(i.a,{children:Object(a.jsxs)(r.d,{children:[Object(a.jsx)(r.b,{exact:!0,path:"/",children:Object(a.jsx)(u,{})}),Object(a.jsx)(r.b,{path:"/denied",children:Object(a.jsx)(J,{})}),Object(a.jsx)(r.b,{path:"/:roomID",children:Object(a.jsx)(L,{})}),Object(a.jsx)(r.b,{path:"*",children:Object(a.jsx)(z,{})})]})})})},K=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,133)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,o=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),o(e),s(e)}))};s.a.render(Object(a.jsx)(Q,{}),document.getElementById("root")),K()},2:function(e,t,n){e.exports={JoinPage:"style_JoinPage__1yRqt",header:"style_header__3tP8g",qrcode:"style_qrcode__1Ymzf",fit:"style_fit__3ueTB",playerCount:"style_playerCount__2ZlMH",userName:"style_userName__2FLYj",matrix:"style_matrix__3DhF3",content:"style_content__3hdnE",show:"style_show__1iKK8",playerPane:"style_playerPane__3aZLP",name:"style_name__1NsHE",percentage:"style_percentage__1IAjC",bar:"style_bar__WRKm2",fin:"style_fin__-vbWu",qrcodePane:"style_qrcodePane__2NTJq",roomID:"style_roomID__2pQSQ",link:"style_link__3kdmi",renamePane:"style_renamePane__1NFcr",editorPane:"style_editorPane__3dOQM",buttons:"style_buttons__1B8NJ",reset:"style_reset__1bZl_",chatHistory:"style_chatHistory__2fE-_",msgBox:"style_msgBox__oveu_",isMe:"style_isMe__3khzJ",same:"style_same__23AjY",msg:"style_msg__19tUv",text:"style_text__HUwxi",sendMsgBar:"style_sendMsgBar__qhnKV",startBtn:"style_startBtn__3y_kI",sendBtn:"style_sendBtn__1QmdX",countdown:"style_countdown__3tY60",stopBtn:"style_stopBtn__1zDc6"}},27:function(e,t,n){e.exports={BingoMatrix:"style_BingoMatrix__3ELFw",active:"style_active__2Nq_8",box:"style_box__3N-zJ",checked:"style_checked__xbBbd",ing:"style_ing__FyHHC"}},6:function(e,t,n){e.exports={GamePage:"style_GamePage__3oB8L",winMap:"style_winMap__2EpiN",start:"style_start__3UEjd",way:"style_way__3TNYO",player:"style_player__1mIID",nameColor:"style_nameColor__haFkJ",end:"style_end__IFxsV",gap:"style_gap__3ZdYz",result:"style_result__3WXQ5",winList:"style_winList__OB6Xp",winnerIs:"style_winnerIs__8g5sy",buttons:"style_buttons__2R5Gl",turn:"style_turn__4Q5mq",title:"style_title__3wcDe",your:"style_your__1NriA"}},70:function(e,t,n){},71:function(e,t,n){},78:function(e,t,n){},9:function(e,t,n){e.exports={HomePage:"style_HomePage__39HyE",slogan:"style_slogan__3ESLi",ballGroup:"style_ballGroup__3Yrc5",ball:"style_ball__2mxKH",subTitle:"style_subTitle__1-Xg-",menu:"style_menu__2Jp3l",create:"style_create__2PDh_",form:"style_form__3edYN",rule:"style_rule__Cjqvv"}}},[[132,1,2]]]);
//# sourceMappingURL=main.484cd5ce.chunk.js.map