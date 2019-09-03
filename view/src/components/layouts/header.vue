<template>
<div style="padding: 2%">
   <button type="button" class="btn btn-danger" v-on:click ="index" >
			<i class="fas fa-home" ></i> Trang chủ
		</button> 
	<button type="button" class="btn btn-success" v-on:click ="searchFriend">
			<i class="fas fa-plus"></i> Tìm bạn bè mới
		</button> 
		<button type="button" class="btn btn-primary" v-on:click ="profile">
				<i class="fas fa-user"></i> Trang cá nhân
			</button>
	<button type="button" class="btn btn-dark"  v-on:click ="signout" >
				<i class="fas fa-window-close"></i> Đăng xuất
			</button>
 </div>
 
 </template>


 <script>
     export default {
    
            methods: {
				index(){
					//  this.$router.push('/')  
					window.location.href  = '/'
				},
			searchFriend(){
					//  this.$router.push('/searchFriend')  
					window.location.href  = '/searchFriend'
				},
			profile(){
					//  this.$router.push('/profile')  
					window.location.href  = 'profile'
				},
              signout(){
            	  localStorage.removeItem('user');
                	window.location.href  = '/'
				}}
	 }
    
</script>
<style scope>
 
</style>
