<template>
    <div>
        <ul>
            <li v-for="(item,index) in shopList" :key="index">
                <input type="checkbox" v-model="item.flag" @click="Inputs(item)">
                <img :src="item.img" alt="">
                <span>{{item.title}}</span>
                <span class="old">{{item.oldPrice}}</span>
                <span>{{item.newPrice}}</span>
                <button @click="subNum(item)">-</button>
                <b>{{item.count}}</b>
                <button @click="addNum(item)">+</button>
                <span>小计:{{Number(item.prices).toFixed(2)}}</span>
                <button class="del" @click="remove(index)">删除</button>
            </li>
        </ul>
        <div>
            全选: <input type="checkbox" v-model="flag" @click="checkAll">
            <p>总数量:{{Allcount}}---总价格:{{Number(Allprice).toFixed(2)}}</p>
        </div>
    </div>
</template>

<script>
import Axios from "axios"
export default {
    data(){
        return{
            shopList:[],//保存请求到的数据
            flag:false,//保存全选按钮的状态
        }
    },
    created(){
        //发送请求
        Axios.get("/getList").then(res=>{
            this.shopList=res.data;
        })
    },
    methods:{
        Inputs(item){//点击复选框与数据中的flag相反
            item.flag=!item.flag
            //全选按钮实时监听着单选按钮的变化
            this.flag=this.shopList.every(item=>item.flag)
        },
        //——数量
        subNum(item){
            item.count=--item.count<1?1:item.count
            item.prices=item.count*item.newPrice
        },
        //+数量
        addNum(item){
            item.count++;
            item.prices=item.count*item.newPrice
        },
        //全选
        checkAll(){
            this.flag=!this.flag;//将全选按钮的状态取反
            this.shopList.forEach(item=>{
                //让数据中的每个商品的flag状态呢和全选按钮的选中状态一样
                item.flag=this.flag
            })
        },
        //删除
        remove(index){
            this.shopList.splice(index,1)
        }
    },
    computed:{
        //总数量
        Allcount(){
            return this.shopList.reduce((prev,next)=>{
                return next.flag?prev+next.count:prev
            },0)
        },
        //总价格
        Allprice(){
            return this.shopList.reduce((prev,next)=>{
                return next.flag?prev+next.count*next.newPrice:prev
            },0)
        }
    }
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        list-style: none;
    }
    ul{
        width: 650px;
        height: 440px;
        border: 1px solid #ccc;
    }
    ul>li{
        width: 650px;
        height: 109px;
        border-bottom: 1px solid #ccc;
    }
    img{
        width: 100px;
        height: 100px;
    }
    span{
        font-size: 14px;
        padding-left: 10px;
    }
    .old{
        text-decoration: line-through;
    }
    ul li b{
       margin-left: 10px; 
    }
    ul li button{
        width:50px;
        height: 24px;
        margin-left: 10px;
    }
    .del{
        float: right;
        margin-top: 84px;
    }
</style>