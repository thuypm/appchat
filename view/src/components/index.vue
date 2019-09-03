<template>
<div>
    <Header />
  <div class="row justify-content-center h-100">
			
				<div class="col-md-4 col-xl-3 chat"><div class="card mb-sm-3 mb-md-0 contacts_card">
					
					<div class="card-header">
						<div class="input-group">
							<input type="text" placeholder="Search..." name="" class="form-control search">
							<div class="input-group-prepend">
								<span class="input-group-text search_btn"><i class="fas fa-search"></i></span>
							</div>
						</div>
					</div>
					<div class="card-body contacts_body">
						<ul class="contacts" v-if="friends.length">
						 <li v-for="(friend) in friends" :key="friend.friendUsername" @click="getMess(friend)" v-bind:id="friend.friendUsername">
							<div class="d-flex bd-highlight">
								<div class="img_cont">
									<img v-bind:src="'http://localhost:3000/userImg/' + friend.image" class="rounded-circle user_img">
									<span class="online_icon"></span>
								</div>
								<div class="user_info">
									<span>{{friend.friendUsername}}</span>
									<p>sửa sau</p>
								</div>
							</div>
						</li>
					<!--	<li>
							<div class="d-flex bd-highlight">
								<div class="img_cont">
									<img src="https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg" class="rounded-circle user_img">
									<span class="online_icon offline"></span>
								</div>
								<div class="user_info">
									<span>Sahar Darya</span>
									<p>Sahar left 7 mins ago</p>
								</div>
							</div>
						</li>
						 -->
						</ul>
					</div>
					<div class="card-footer"></div>
				</div></div>
				<div class="col-md-8 col-xl-6 chat">
					<div class="card">
						<div class="card-header msg_head">
							<div class="d-flex bd-highlight">
								<div class="img_cont" v-if="selectPerson.image">
									<img v-bind:src="'http://localhost:3000/userImg/' + selectPerson.image" class="rounded-circle user_img">
									<span class="online_icon"></span>
								</div>
								<div class="user_info">
									<span>{{selectPerson.friendUsername}}</span>
									<p>{{numberOfMess}}</p>
								</div>
								<div class="video_cam">
									<span><i class="fas fa-video"></i></span>
									<span><i class="fas fa-phone"></i></span>
								</div>
							</div>
							<span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
							<div class="action_menu">
								<ul id="option">
									<li><i class="fas fa-user-circle"></i> View profile</li>
									<li><i class="fas fa-users"></i> Add to close friends</li>
									<li><i class="fas fa-plus"></i> Add to group</li>
									<li><i class="fas fa-ban"></i> Block</li>
								</ul>
							</div>
						</div>
						<div class="card-body msg_card_body" id="message">
							<div v-for="(message, index) in listMess" :key="index" > 
							<div class="d-flex justify-content-start mb-4" v-if="message.sent == selectPerson.friendUsername">
								<div class="t_mimg_consg">
									<img v-bind:src="'http://localhost:3000/userImg/' + message.sent +'.jpg'" class="rounded-circle user_img_msg">
								</div>
								<div class="msg_cotainer">
									{{message.content}}
									<span class="msg_time">{{message.time| DAY()}}</span>
								</div>
							</div>
							<div class="d-flex justify-content-end mb-4" v-else>
								<div class="msg_cotainer_send">
										{{message.content}}
									<span class="msg_time_send">{{message.time| DAY()}}</span>
								</div>	
							<div class="img_cont_msg">
								<img v-bind:src="'http://localhost:3000/userImg/' + message.sent +'.jpg'" class="rounded-circle user_img_msg">
								</div>
							</div>
							</div>
							<div v-show ="typing">
							<div class="d-flex justify-content-start mb-4">

								<div class="msg_cotainer" style="background-color: pink">
									<b> Đang nhập..... </b>
								</div>
							</div>
							</div>
						</div>
							
						
						<div class="card-footer">
							<div class="input-group">
								<div class="input-group-append">
									<span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
								</div>
								<textarea name="" class="form-control type_msg" placeholder="Type your message..."  @keyup="areTyping($event)" @keyup.enter ="send" v-model="content"></textarea>
								<div class="input-group-append" v-on:click ="send">
									<span class="input-group-text send_btn"><i class="fas fa-location-arrow" ></i></span>
								</div>
							</div>
						</div>
					</div>
				</div>
	
</div>
</div>
    
</template>


<script>
import header from './layouts/header.vue';
import axios from 'axios';
import io from 'socket.io-client';
var socket = io.connect('http://localhost:3000');
var timeout;
     export default {
         name: 'index',
  	    components: {
         Header: header
	  },
	   data(){
		
	return{
	isActive: false,
	selectMessID: '',
	friends:[],
	listMess:[],
	numberOfMess: Number,
	username: '',
	content: '',
	selectPerson: Object,
	typing: false,
		}
		 },

 created(){
			 this.loadData();
		 },
 filters: {
  /** Viết hoa chữ đầu tiên */
  DAY: function (time) {
  		var d= new Date();
				var temp = time - (d.getTimezoneOffset() * 60000);
				var reTime = new Date(temp);
				var time = reTime.getHours() + ":" + reTime.getMinutes();
				var day = reTime.getDay()+',th ' +reTime.getMonth()+ ',' + reTime.getFullYear();	
    return time + '  ' + day;
  }
},
	methods:{
		
	loadData(){
			var user = JSON.parse(localStorage.user);
			this.username = user.username;
			socket.emit('get_connect', user.username);
		},
	getMess(friend){
	
		this.selectMessID = friend.messID;
		this.selectPerson = friend;
		this.$nextTick(function(){
			var deselect = document.getElementsByClassName('active')[0];
			if(deselect)
				deselect.classList.remove('active');

		var select =  document.getElementById(friend.friendUsername);
		if(select)
		select.classList.add("active");
		})
		socket.emit('getFriendMess', friend.messID);
	},
	send(){
		  var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
		if(this.content.trim() != '')
			{
			socket.emit('send_mess',this.selectPerson.username, this.selectMessID, {
			type: 'text',
			content: this.content,
			sent: this.username,
			time: utc
			
		});
		this.content = '';

		
			}
	},
	areTyping(event){
		var self = this;
		if(event.keyCode != 13 && event.which != 13)
	{	 socket.emit('typing' , self.username, self.selectMessID, true);
		
        if(timeout)
        	clearTimeout(timeout);
			   timeout = setTimeout(function(){
					socket.emit("typing",self.username, self.selectMessID, false)
				}, 3000);
		  
		   }
	}
	},
	mounted: function () {
	var self = this;
			socket.on('res_connect', function(data){
				self.friends = data.friends;
				localStorage.user = JSON.stringify(data);
				if(self.friends.length	!= 0){
					self.getMess(self.friends[0]);
				}
			})
			socket.on('res_select', function(value){
			self.listMess= value.message;
			self.$nextTick(function(){	
						var messageBox =  document.getElementById('message');
						messageBox.scrollTop = messageBox.scrollHeight
					})
			
			});
			socket.on('typing', function(who, status){
			if(who != self.username && status == true)
						{	
						self.typing = true;	
								self.$nextTick(function(){
						var messageBox =  document.getElementById('message');
						messageBox.scrollTop = messageBox.scrollHeight
					})
								
						}	
			if(status == false)
						self.typing = false;
				})
			socket.on('ib_mess', function(ibMess, sent){
				self.typing = false;
		
				self.listMess.push(ibMess);
				self.$nextTick(function(){
						var messageBox =  document.getElementById('message');
						messageBox.scrollTop = messageBox.scrollHeight
					})
			})

	}

    }
</script>
<style scoped>
.card{
    height: 500px;
    border-radius: 15px !important;
    background-color: rgba(0,0,0,0.4) !important;
}

</style>
