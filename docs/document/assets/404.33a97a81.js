import{e,u as a,f as t,r as o,o as n,c as l,a as s,t as u,w as r,b as c}from"./app.a3cc65a4.js";var m=e({name:"404",setup(){var e,o,n;const l=a(),s=t(),u=null!=(e=s.value.notFound)?e:["Not Found"];return{getMsg:()=>u[Math.floor(Math.random()*u.length)],homeLink:null!=(o=s.value.home)?o:l.value,homeText:null!=(n=s.value.backToHome)?n:"Back to home"}}});const h={class:"theme-container"},d={class:"theme-default-content"},i=s("h1",null,"404",-1);m.render=function(e,a,t,m,v,f){const k=o("RouterLink");return n(),l("div",h,[s("div",d,[i,s("blockquote",null,u(e.getMsg()),1),s(k,{to:e.homeLink},{default:r((()=>[c(u(e.homeText),1)])),_:1},8,["to"])])])};export default m;
