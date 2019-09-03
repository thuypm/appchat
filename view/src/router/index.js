import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import App from '@/App'
import signin from '@/components/signin'
import index from '@/components/index'
import searchFriend from '@/components/searchFriend'
import profile from '@/components/profile'
import signup from '@/components/signup'
Vue.use(Router)


 const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
   
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup,
     
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin ,
    
    },
    {
      path: '/searchFriend',
      name: 'searchFriend',
      component: searchFriend,
    
  
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
    
    }

  ]

})
router.beforeEach((to, from, next)=>{
switch(to.fullPath){
case '/signin':
  {
    if(localStorage.user != undefined)
    next('/')
  else 
    next();
    break;
  };
case '/signup':
    {
      if(localStorage.user != undefined)
     {   alert('vui lòng đăng xuất trước');
        next('/')
    }
    else 
      next();
      break;
    };
    default: {
      if(localStorage.user != undefined)
      next()
      else
      next('/signin')
      break;
    }
}

// if(to.fullPath == '/signin')
//   if(localStorage.user != undefined)
//     next('/')
//   else 
//     next();
// else
//   if(localStorage.user != undefined)
//       next()
//       else
//       next('/signin')

})


export default router