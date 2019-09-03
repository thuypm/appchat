<template>
<div class="container">
<Header/>
<div class="card-header">
    <div class="input-group">
        <input  @keyup.enter="searchUser" type="text" placeholder="Search..." name="search" class="form-control search" v-model="search">
        <div class="input-group-prepend" >
            <button class="" v-on:click="searchUser">
                <span class="input-group-text search_btn"><i class="fas fa-search"></i></span></button>
        </div>
    </div>
    <div class="" style="margin-top: 30px">
<ul class="contacts"  >
 <div class="row" v-if="find == true">
            <div class="img_cont">
                <img v-bind:src="'http://localhost:3000/userImg/' + result.img " class="rounded-circle user_img">
              
          </div> 
          <div class="user_info p-2 flex-grow-1 bd-highlight" >
                <span><b>{{result.name}}</b></span>
        <h6> @ {{result.username}}</h6> </div> 
         <div class="p-2 flex-fill bd-highlight">
             <button type="button" v-bind:class="['btn', stt1.btn]" v-on:click="submit1(stt, result.username)">
                 <i v-bind:class="['fas', stt1.fa]"> </i>{{stt1.text}}</button></div> 
        <div class="p-2 flex-fill bd-highlight">
                   <button type="button" v-bind:class="['btn', stt2.btn]"  v-on:click="submit2(stt, result.username)">
                       <i v-bind:class="['fas', stt2.fa]"></i>  {{stt2.text}}
                       </button>
        </div>
 </div>
  <div class="row" style="background-color: white" v-if="unfind == true">
      <h4 style="color: black"> Không tìm thấy người này </h4>
  </div>
  
</ul>
</div>
</div></div>
</template>
<script>
import header from './layouts/header.vue';
       import axios from 'axios'
 export default {
         data(){
             return{
                 unfind: false,
                 find: false,
                 search: '',
                 stt: Number,
                 stt1:{
                        btn:'',
                        fa:'',
                        text:''
                 },
                 stt2:{
                        btn:'',
                        fa:'',
                        text:''
                 },
            result: {
                name: '',
                username: ''
            }
             }
         },

      components: {
          'Header': header
      },
      methods: {
      
            searchUser(){
                var user =(JSON.parse(localStorage.user));
                if(this.search == user.username)
                    {
                         this.result.username = user.username;
                         this.result.name = user.name;
                       this.stt1= {
                                        btn: 'btn-info',
                                        fa: 'fa-check',
                                        text: 'Đây là bạn rồi tìm gì nữa ?'
                                    }; 
                        this.stt2= {
                                        btn: 'btn-success',
                                        fa: 'fa-user',
                                        text: 'Trang cá nhân ?'
                                    };
                                    this.unfind = false;
                          this.find = true
                                    return false;
                    };

        axios.post('http://localhost:3000/api/search',{username: user.username, search:  this.search}).then((res)=>{
                    if(res.data.username)
                    {
                        
                        this.result= res.data;
                                this.stt = res.data.friend;
                          switch(res.data.friend){
                            case 0:
                                {
                                    this.stt1= {
                                        btn: 'btn-info',
                                        fa: 'fa-plus',
                                        text: 'Thêm bạn'
                                    };
                                     this.stt2= {
                                        btn: 'btn-danger',
                                        fa: 'fa-ban',
                                        text: 'Chặn'
                                      }
                                    break;
                                }  
                                 case 1:
                                {
                                    this.stt1= {
                                        btn: 'btn-info',
                                        fa: 'fa-check',
                                        text: 'Bạn bè'
                                    };
                                     this.stt2= {
                                        btn: 'btn-danger',
                                        fa: 'fa-ban',
                                        text: 'Hủy kết bạn'
                                    }
                                    break;
                                }   case 2:
                                {
                                    this.stt1= {
                                        btn: 'btn-info',
                                        fa: 'fa-plus',
                                        text: 'Chấp nhận kết bạn'
                                    };
                                     this.stt2= {
                                        btn: 'btn-danger',
                                        fa: 'fa-ban',
                                        text: 'Xóa lời mời'
                                    }
                                    break;
                                }   case 3:
                                {
                                    this.stt1= {
                                        btn: 'btn-dark',
                                        fa: 'fa-ban',
                                        text: 'Đang chặn'
                                    };
                                     this.stt2= {
                                        btn: 'btn-danger',
                                        fa: 'fa-check',
                                        text: 'Bỏ chặn ?'
                                    }
                                    break;
                                }  
                                case 4:
                                {
                                    this.stt1= {
                                        btn: 'btn-info',
                                        fa: 'fa-check',
                                        text: 'Đã gửi lời mời kết bạn'
                                    };
                                     this.stt2= {
                                        btn: 'btn-danger',
                                        fa: 'fa-ban',
                                        text: 'Hủy lời mời ?'
                                    }
                                    break;
                                }  
                          }
                          this.unfind = false;
                          this.find = true
                    }
                    else
                    {
                         this.find = false;
                        this.unfind = true;
                    }
                })
            },
        submit1(stt, username){
            var user =(JSON.parse(localStorage.user));
            switch(stt){
                case 0: {
        axios.post('http://localhost:3000/api/addFriend',{username: user.username, user:  this.result.username, friend: stt}).then((res)=>
                      {
                          
                      this.stt1= {
                                        btn: 'btn-info',
                                        fa: 'fa-check',
                                        text: 'Đã gửi lời mời kết bạn'
                                    };
                                     this.stt2= {
                                        btn: 'btn-danger',
                                        fa: 'fa-ban',
                                        text: 'Hủy lời mời ?'
                                    }
                                
                      });
                this.stt = 4;     
                          break;              
                }
        case 2:{
             axios.post('http://localhost:3000/api/addFriend',{username: user.username, user:  this.result.username, friend: stt}).then((res)=>{
                 this.stt1= {
                                        btn: 'btn-info',
                                        fa: 'fa-check',
                                        text: 'Bạn bè'
                                    };
                                     this.stt2= {
                                        btn: 'btn-danger',
                                        fa: 'fa-ban',
                                        text: 'Hủy kết bạn'
                                    }
                     });
                    this.stt = 1;      
                   break;

        }
            }
        }
      }
    
    }
</script>
<style scoped>

</style>
